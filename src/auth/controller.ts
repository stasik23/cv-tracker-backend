import { Router } from "express";
import bcrypt from "bcrypt"
import session from "express-session"
import { User } from "../models/user.model";
import { getUserByEmailService, userCreateService } from "../user/service"
import { sendEmail } from "./email.service";
import { SessionData } from "express-session";
import { isAuth } from "../middleware/isAuth";
import { forgotPassword, resetPassword } from "./auth.service";


const mailOptions = {
    from: 'kolesnikkosta572@gmail.com',
    to: 'kolesnikkosta572@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

const authRouter = Router()

authRouter.get("/check-auth", async (req, res) => {
    await sendEmail(mailOptions)
    return res.json('ok')
})

authRouter.post("/forgot-password", async (req, res) => {
    try {
        await forgotPassword(req, res)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occurred during password reset", error })
    }
})

authRouter.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword, email } = req.body;
        await resetPassword(token, newPassword, email);
        return res.json({ message: "Password reset successful" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occurred during password reset", error })
    }
})

authRouter.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        console.log(req.body);

        const existingUser = await getUserByEmailService(email)
        console.log(existingUser);

        if (existingUser) {
            throw new Error("User with this email already exists")
        }

        const result = await userCreateService({ firstName, lastName, email, password } as any)
        console.log(result);
        return res.json({ user: result })
    } catch (error) {
        return res.status(400).json({ message: "An error occurred during registration", error })
    }

})

authRouter.get("/logout", (req, res) => {
    console.log("logout")
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out")
        } else {
            return res.status(200).send("Logout successful")
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
            return res.status(401).json({ message: "Credentials are not correct" })
        }

        (req.session as SessionData).user = {
            id: existedUser._id.toString(),
        }
        return res.status(200).json({ message: "Login is successful" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occurred during login", error })
    }
})

authRouter.get('/profile', async (req, res) => {
    try {
        isAuth(req, res, () => {
            const sessionId = req?.session?.user?.id
            console.log("profile: ", sessionId);
            return res.json({ message: "You are authenticated", userId: sessionId })
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occurred while fetching profile", error })
    }
})

export { authRouter }