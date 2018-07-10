const multer = require("multer");

const storage = multer.diskStorage({
		destination: (req, file, cb) => cb(null, "./uploads/"),
		filename: (req, file, cb) =>
			cb(
				null,
				// new Date().toISOString() + file.originalname
				Date.now() + "-" + file.originalname.replace(/[^A-Za-z0-9_.]+/g, "-").toLowerCase()
			)
	}),
	fileFilter = (req, file, cb) => {
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") cb(null, true);
		else cb(new Error("Invalid mimetype"), false);
	},
	upload = multer({
		storage,
		limits: {
			fileSize: 1024 * 1024 * 5
		},
		fileFilter
	}).single("image");

module.exports = upload;
