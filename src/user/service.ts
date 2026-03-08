import bcrypt from "bcrypt"
import { User, IUser } from "../models/user.model.js"

export const userCreateService = async ({ firstName, lastName, email, password }: IUser) => {
    try {
        if (!password || typeof password !== 'string') {
            throw new Error("Password is required and must be a string")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = {
            firstName,
            lastName,
            email,
            hashedPassword
        }
        return User.create(newUser)
    }
    catch (error) {
        throw new Error("Error creating user: " + error)
    }
}

export const getUserByEmailService = async (email: IUser) => {
    try {
        if (!email) {
            throw new Error("Email is required")
        }
        return User.findOne({ email })
    }
    catch (error) {
        throw new Error("Error fetching user by email: " + error)
    }
}