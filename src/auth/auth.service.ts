import { IUser, User } from "../models/user.model";
import { sendEmail } from "./email.service";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
const SECONDS_IN_M = 60
const EXPIRED_TIME = 2
const MS_IN_S = 1000

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + SECONDS_IN_M * EXPIRED_TIME * MS_IN_S;
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: 'kolesnikkosta572@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You have requested a password reset. Please click the link to reset your password: ${resetUrl}`
        };
        await sendEmail(mailOptions);
    } catch (error) {
        res.status(500).json({ message: "Error sending reset email" });
    }
};

export const validateResetToken = async (token: string, email: string): Promise<IUser | null> => {
    try {
        console.log("Validating reset token+email:", token, email);
        const user = await User.findOne({
            email: email,
            // resetPasswordToken: token,
            // resetPasswordExpires: { $gt: Date.now() }
        });
        console.log(user?.resetPasswordExpires);
        
        if (user?.resetPasswordExpires) {
            if (user?.resetPasswordExpires + SECONDS_IN_M * EXPIRED_TIME * MS_IN_S < Date.now()) {
                console.log(user);
                return user
            } else {
                throw new Error("Token is expired")
            }
        }
        return null
        // 3000ms = data
        // data + 3m < date.now() => move forward
    } catch (err: any) {
        throw new Error(err.message)
    }

}

export const resetPassword = async (token: string, newPassword: string, email: string): Promise<void> => {
    const user = await validateResetToken(token, email);
    if (!user) {
        throw new Error("Invalid or expired reset token");
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
}