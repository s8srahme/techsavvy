const cloudinary = require("cloudinary");
const fs = require("fs");

exports.photos_create_photo = async (req, res, next) => {
	try {
		if (req.files.length) {
			let image_urls = [];
			for (let i = 0; i < req.files.length; i++) {
				let file = req.files[i],
					result = await cloudinary.v2.uploader.upload(file.path, {
						public_id: file.originalname.substr(0, file.originalname.lastIndexOf("."))
					});

				if (result.secure_url) {
					image_urls = [...image_urls, result.secure_url];
					fs.unlink(file.path, err => {
						if (err) console.log(err);
					});
				} else {
					console.log("Error uploading files");
					throw new Error("Error uploading file at index " + i);
				}
			}

			// console.log("File uploaded");
			res.statusCode = 200;
			res.json({
				message: "Uploaded photos successfully",
				createdPhotos: {
					image_urls,
					request: {
						type: "POST",
						url: "http://localhost:5000/api/photos/create"
					}
				}
			});
		} else {
			console.log("Error uploading files");
			res.status(500).json({ error: "Error uploading files" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: err.message
		});
	}
};
