import mongoose, { type Document } from "mongoose";

export interface IExperience {
	company: string;
	position: string;
	startDate: Date;
	endDate?: Date;
	isCurrent?: boolean;
	description?: string;
}

export interface IEducation {
	institution: string;
	degree: string;
	field?: string;
	startDate: Date;
	endDate?: Date;
	isCurrent?: boolean;
}
export interface ILanguage {
	language: string;
	proficiency: string;
}

export interface ICV extends Document {
	userId: string; //mongoose.Types.ObjectId;
	title: string;
	summary: string;
	skills: string[];
	experience: IExperience[];
	education: IEducation[];
	language: ILanguage[];
	isActive: boolean;
	pdf: object;
}

const cvSchema = new mongoose.Schema<ICV>(
	{
		// userId: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// 	required: true,
		// },
		userId: { type: String, required: true },
		title: { type: String, required: true },
		summary: { type: String, required: true },
		skills: { type: [String], default: [] },
		experience: {
			type: [
				{
					company: { type: String, required: true },
					position: { type: String, required: true },
					startDate: { type: Date, required: true },
					endDate: { type: Date },
					isCurrent: { type: Boolean, default: false },
					description: { type: String },
				},
			],
			default: [],
		},
		education: {
			type: [
				{
					institution: { type: String, required: true },
					degree: { type: String, required: true },
					field: { type: String },
					startDate: { type: Date, required: true },
					endDate: { type: Date },
					isCurrent: { type: Boolean, default: false },
				},
			],
			default: [],
		},
		language: {
			type: [
				{
					language: { type: String, required: true },
					proficiency: { type: String, required: true },
				},
			],
			default: [],
		},
		isActive: { type: Boolean, default: true },
		pdf: { type: Object, default: null },
	},
	{ timestamps: true },
);

export default mongoose.model<ICV>("CV", cvSchema);
