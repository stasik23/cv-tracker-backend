import mongoose from "mongoose";

export async function dbConnect() {
	try {
		const url: string | undefined = 'mongodb://localhost:27017/cv-tracker';

		if (!url) {
			throw new Error("DATABASE_URL is not defined");
		}

		await mongoose.connect(url);

		console.log("db connected");
	} catch (error) {
		throw new Error(`db connect error: ${error}`);
	}
}
