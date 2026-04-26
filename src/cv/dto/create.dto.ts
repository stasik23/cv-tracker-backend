import type { IEducation, IExperience, ILanguage } from "../../models/cv.model";

export type CreateCVDto = {
	userId: string;
	title: string;
	summary: string;
	skills: string[];
	experience: IExperience[];
	education: IEducation[];
	language: ILanguage[];
	isActive?: boolean;
};
