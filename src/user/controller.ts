import { Router } from "express";
import { User } from "../models/user.model";
import { Request, Response } from "express";

const userRouter = Router()
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email } = req.body

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
        })

        res.json({ newUser })
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" })
    }
})

export { userRouter }