import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
	// const sessionId = req?.session?.user?.id
	// console.log("start: ", sessionId);

	// if (!sessionId) {
	//     return res.redirect("/login");
	// }

	// const user = await User.findById(sessionId)

	// if (!user) {
	//     console.log("User not found:", sessionId);
	//     return res.redirect("/login");
	// }

	console.log("ends");

	next();
}
