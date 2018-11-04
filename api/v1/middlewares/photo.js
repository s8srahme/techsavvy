const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
		destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
		filename: (req, file, cb) =>
			cb(
				null,
				// new Date().toISOString() + file.originalname
				Date.now() +
					"-" +
					file.originalname
						.trim()
						.replace(/[^A-Za-z0-9_.]+/g, "-")
						.toLowerCase()
			)
	}),
	fileFilter = (req, file, cb) => {
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/svg+xml")
			cb(null, true);
		else cb(new Error("Invalid mimetype"), false);
	},
	uploadFile = multer({
		storage,
		limits: {
			fileSize: 1024 * 1024 * 5
		},
		fileFilter
	}).single("avatar"),
	uploadFiles = multer({
		storage,
		limits: {
			fileSize: 1024 * 1024 * 5
		},
		fileFilter
	}).array("photos", 12);

module.exports = {
	uploadFile: (req, res, next) => {
		uploadFile(req, res, err => {
			if (err) {
				console.log("A Multer error occurred when uploading", err.message);
				if (err.message === "Invalid mimetype")
					return res.status(422).json({
						error: "Uploaded image format is not supported"
					});
				return res.status(500).json({ error: err });
			}
			next();
		});
	},
	uploadFiles: (req, res, next) => {
		uploadFiles(req, res, err => {
			if (err) {
				console.log(err.message);
				if (err.message === "Invalid mimetype")
					return res.status(422).json({
						error: "Uploaded image format is not supported"
					});
				return res.status(500).json({ error: err });
			}
			next();
		});
	}
};
