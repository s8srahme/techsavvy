const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cloudinary = require("cloudinary");
const path = require("path");
const fs = require("fs");

const routes = require("./api/v1/routes/");
// const v2Routes = require("./api/v2/routes/");

const uri = process.env.MONGODB_URI;
const config = {
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
};
// let allowedOrigins = ["http://localhost:3006", "http://yourapp.com"];

cloudinary.config(config);
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log("Connected to database successfully"))
	.catch((err) => console.error("Could not connect to database", err));

// Implement the middleware function based on the 'options' object
app.use(
	((options) => (req, res, next) => {
		if (req.method === "OPTIONS") {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept, Authorization"
			);
			res.header(
				"Access-Control-Allow-Methods",
				"PUT, POST, PATCH, DELETE, GET"
			);
			return res.status(200).json({});
		}
		cors(options)(req, res, next);
	})({
		// origin: "*", // Configures the 'Access-Control-Allow-Origin' CORS header
		origin: (origin, callback) => {
			if (!origin) return callback(null, true); // Allows requests, like mobile apps or curl requests, with no origin
			// if (allowedOrigins.indexOf(origin) === -1) {
			// 	let msg = "The CORS policy for this site does not allow access from the specified origin";
			// 	return callback(new Error(msg), false);
			// }
			return callback(null, true);
		},
		allowedHeaders: [
			"Origin",
			"X-Requested-With",
			"Content-Type",
			"Accept",
			"Authorization"
		], // Configures the 'Access-Control-Allow-Headers' CORS header
		methods: "GET,PUT,POST,PATCH,DELETE" // Configures the 'Access-Control-Allow-Methods' CORS header
	})
);

app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "api/v1/uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet()); // Helmet is a collection of smaller middleware functions that set security-related HTTP response headers to protect your app from some well-known web vulnerabilities
app.set("view engine", "ejs");

app.use("/api/v1", routes);
// app.use("/api/v2", v2Routes);

// Serve up our React files by the Express server in production mode
if (
	process.env.NODE_ENV === "production" &&
	!fs.existsSync(".env.production")
) {
	app.use(express.static(path.join(__dirname, "../client/build"))); // Serve static files from the React frontend app
	app.get("*", (req, res, next) => {
		res.sendFile(path.join(__dirname, "../client/build", "index.html"));
	}); // Anything that doesn't match the above, send back index.html
} else {
	app.use((req, res, next) => {
		const error = new Error("Not found");
		error.status = 404;
		next(error);
	});
	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
			error: {
				message: error.message
			}
		});
	});
}

module.exports = app;
