const dotenv = require("dotenv");
const fs = require("fs");

try {
	if (
		process.env.NODE_ENV === "production" &&
		fs.existsSync(".env.production")
	) {
		const { parsed, error } = dotenv.config({ path: ".env.production" });
		if (error) throw error;
		// console.log(parsed);
	} else if (process.env.NODE_ENV === "development") {
		const { parsed, error } = dotenv.config({ path: ".env.development" });
		if (error) throw error;
		// console.log(parsed);
	}
} catch (error) {
	console.log(error.message);
}
