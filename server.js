const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cloudinary = require("cloudinary");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const branch = require("git-branch");

const startServer = () => {
	const setRoutes = require("./api/v1/routes/");
	// setApiV2Routes = require("./api/v1/routes/");
	// const templateRoutes = require("./api/v1/routes/template");

	const app = express();
	const router = express.Router();
	// apiV2Router = express.Router();
	let port = process.env.PORT || 5000;
	// let allowedOrigins = ["http://localhost:3006", "http://yourapp.com"];
	let uri = process.env.MONGODB_URI;
	let config = {
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	};

	cloudinary.config(config);
	mongoose
		.connect(
			uri,
			{
				useCreateIndex: true,
				useNewUrlParser: true
			}
		)
		.then(() => console.log("Connected to database successfully"))
		.catch(err => console.error("Could not connect to database", err));

	app.use(
		cors({
			origin: (origin, callback) => {
				if (!origin) {
					console.log("Intercepted request with no origin");
					return callback(null, true);
				}
				// if (allowedOrigins.indexOf(origin) === -1) {
				// 	let msg = "The CORS policy for this site does not allow access from the specified Origin.";
				// 	return callback(new Error(msg), false);
				// }
				return callback(null, true);
			},
			allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
			methods: "GET, PUT, POST, PATCH, DELETE"
		})
	);
	// app.use((req, res, next) => {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	// 	if (req.method === "OPTIONS") {
	// 		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
	// 		return res.status(200).json({});
	// 	}
	// 	next();
	// });
	app.use(morgan("dev"));
	app.use("/uploads", express.static(path.join(__dirname, "api/v1/uploads")));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(helmet());
	app.set("view engine", "ejs");

	// app.use("/templates", templateRoutes.router);
	setRoutes(router);
	// setApiV2Routes(apiV2Router);
	app.use("/api/v1", router);
	// app.use("/api/v2", apiV2Router);

	if (process.env.NODE_ENV === "production" && !fs.existsSync(".env.production")) {
		app.use(express.static(path.join(__dirname, "client/build")));
		app.get("*", (req, res) => {
			res.sendFile(path.join(__dirname, "client/build", "index.html"));
		});
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

	app.listen(port, () => {
		console.log(`Server started at port ${port}`);
	});
};

branch("./")
	.then(name => {
		console.log("Switched to branch " + name);
		if (name === "master" && fs.existsSync(".env.production")) {
			console.log("Detected production environment");
			let { parsed, error } = dotenv.config({ path: ".env.production" });
			if (error) {
				throw error;
			}
		} else if (name === "develop" && fs.existsSync(".env.development")) {
			console.log("Detected development environment");
			let { parsed, error } = dotenv.config({ path: ".env.development" });
			if (error) {
				throw error;
			}
		}
	})
	.then(startServer)
	.catch(error => {
		console.log(error.message);
		startServer();
	});
