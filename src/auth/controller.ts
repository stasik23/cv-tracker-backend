import { Router } from "express";
import bcrypt from "bcrypt"
import session from "express-session"
import { User } from "../models/user.model";
import { getUserByEmailService, userCreateService } from "../user/service"


const authRouter = Router()

authRouter.get("/check-auth", (req, res) => {
    return res.json('ok')
})

authRouter.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body
        console.log(req.body);
        
        const existingUser = await getUserByEmailService(email)
        console.log(existingUser);
        
        if (existingUser) {
            throw new Error("User with this email already exists")
        }
        // if (password !== confirmPassword) {
        //     throw new Error("Passwords do not match")
        // }

        const result = await userCreateService({ firstName, lastName, email, password })
        console.log(result);
        return res.json({ user: result })
    } catch (error) {
        return res.status(400).json({ error })
    }

})

authRouter.get("/logout", (req, res) => {
    console.log("logout")
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out")
        }
    })
})

authRouter.post("/login", async (req, res) => {
    console.log("login")

    try {
        const { password, email } = req.body
        const existedUser = await User.findOne({ email })

        if (!existedUser) {
            throw new Error("User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(password, existedUser.password)

        if (!isPasswordCorrect) {
            throw new Error("Credentials are not correct")
        }

        req.session.user = {
            id: existedUser._id.toString(),
        };

        res.json({
            user: {
                id: existedUser._id.toString(),
                email: existedUser.email,
            }
        })
        return res.status(200).json({ message: "Login is successful" })
    } catch (error) {
        console.error(error)
    }
})

export { authRouter }