import type { Request, Response } from "express";
import type { ICV } from "../models/cv.model";
import type { CVService } from "./cv.service";

export class CVController {
	constructor(private readonly cvService: CVService) {}

	async getCV(req: Request, res: Response): Promise<void> {
		const cvList: ICV[] = await this.cvService.getCV();
		res.json(cvList);
	}
	async createCV(req: Request, res: Response): Promise<void> {
		const userId = "69bfb0cf7d1c3f6580563ec5";
		const {
			title,
			summary,
			skills,
			experience,
			education,
			language,
			isActive,
		} = req.body;

		const newCV: ICV = await this.cvService.createCV({
			userId,
			title,
			summary,
			skills,
			experience,
			education,
			language,
			isActive,
		});

		res.status(201).json({
			message: "CV created successfully",
			data: newCV,
		});
	}

	async updateCV(req: Request, res: Response): Promise<void> {
		const {
			title,
			summary,
			skills,
			experience,
			education,
			language,
			isActive,
		} = req.body;
	}
	async deleteCV(req: Request, res: Response): Promise<void> {
		const id = req.params.id as string;
		await this.cvService.deleteCV(id);
		res.json({ message: "deleteCV" });
	}
}
