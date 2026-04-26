import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";
import { CVController } from "./cv/cv.controller";
import { CVService } from "./cv/cv.service";
import { dbConnect } from "./db";
import { logger } from "./middleware/logger";

const app: Express = express();

const PORT: number = 3000;

app.use(express.json());

app.use(logger);

dbConnect();

app.use(
	cors({
		origin: process.env.DOMAIN_CLIENT,
	}),
);
const cvService = new CVService();
const cvController = new CVController(cvService);

app.get("/api/cv", async (req: Request, res: Response): Promise<void> => {
	cvController.getCV(req, res);
});
app.post("/api/cv", async (req: Request, res: Response): Promise<void> => {
	cvController.createCV(req, res);
});
app.get("/api/message", async (_req: Request, res: Response): Promise<void> => {
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

app.post("/api/message", async (req: Request, res: Response): Promise<void> => {
	const { message } = req.body;
	res.json({ message });
});

app.listen(PORT, () => {
	console.log(`Server started at port http://localhost:${PORT}`);
	console.log(`Check route: http://localhost:${PORT}/api/message`);
});
