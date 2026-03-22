import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;

		let statusColor = chalk.green;
		if (res.statusCode >= 500) statusColor = chalk.red;
		else if (res.statusCode >= 400) statusColor = chalk.yellow;
		else if (res.statusCode >= 300) statusColor = chalk.cyan;

		const headers = ["METHOD", "URL", "STATUS", "TIME", "BODY"];
		const headerRow = `│ ${headers[0].padEnd(6)} │ ${headers[1].padEnd(30)} │ ${headers[2].padEnd(6)} │ ${headers[3].padEnd(6)} │ ${headers[4].padEnd(20)} │`;

		console.log(
			"┌────────┬────────────────────────────────┬────────┬────────┬────────────────────┐",
		);
		console.log(headerRow);
		console.log(
			"├────────┼────────────────────────────────┼────────┼────────┼────────────────────┤",
		);

		const bodyStr =
			req.body && Object.keys(req.body).length > 0
				? JSON.stringify(req.body)
				: "";
		const row = `│ ${req.method.padEnd(6)} │ ${req.originalUrl.padEnd(30)} │ ${statusColor(res.statusCode.toString().padEnd(6))} │ ${(`${duration}ms`).padEnd(6)} │ ${bodyStr.padEnd(20)} │`;

		console.log(row);

		console.log(
			"└────────┴────────────────────────────────┴────────┴────────┴────────────────────┘",
		);
	});

	next();
}
