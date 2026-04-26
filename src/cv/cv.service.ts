import CV, {
	type ICV,
	type IEducation,
	type IExperience,
	type ILanguage,
} from "../models/cv.model";

type CreateCVDto = {
	userId: string;
	title: string;
	summary: string;
	skills: string[];
	experience: IExperience[];
	education: IEducation[];
	language: ILanguage[];
	isActive?: boolean;
};

export class CVService {
	async getCV(): Promise<ICV[]> {
		try {
			return await CV.find();
		} catch (error) {
			throw new Error(`Failed to fetch CVs: ${error}`);
		}
	}

	async createCV(data: CreateCVDto): Promise<ICV> {
		try {
			return await CV.create(data);
		} catch (error) {
			throw new Error(`Failed to create CV: ${error}`);
		}
	}
	async deleteCV(id: string): Promise<void> {
		try {
			CV.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(`Failed to delete CVs: ${error}`);
		}
	}
}
