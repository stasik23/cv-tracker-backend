import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";
// import session from 'express-session';
import dotenv from "dotenv";
import { authRouter } from "./auth/controller";
// import MongoStore from 'connect-mongo';
import { dbConnect } from "./db";
import { logger } from "./middleware/logger";

const app: Express = express();

dotenv.config();

const PORT: number = 3000;

const mongoUrl = process.env.DATABASE_URL;

app.use(express.json());

app.use(logger);

dbConnect();

app.use(
	cors({
		origin: process.env.DOMAIN_CLIENT,
	}),
);

// app.use(session({
//   secret: process.env.SECRET || 'foo',
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days in milliseconds
//   },
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: mongoUrl,
//     dbName: "session",
//     ttl: 14 * 24 * 60 * 60 // 14 days in seconds
//   })
// }));

app.get("/api/message", async (req: Request, res: Response): Promise<void> => {
	try {
		res.json({
			message: "Express backend is working",
		});
	} catch (error: any) {
		res.json({
			message: error.message,
			status: "Working is bad",
		});
	}
});

app.use("/auth", authRouter);

app.post("/api/message", async (req: Request, res: Response): Promise<void> => {
	const { message } = req.body;
	res.json({ message });
});

app.listen(PORT, () => {
	console.log(`Server started at port http://localhost:${PORT}`);
	console.log(`Check route: http://localhost:${PORT}/api/message`);
});
