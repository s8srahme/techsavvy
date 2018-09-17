const cloudinary = require("cloudinary");

exports.photos_create_photo = async (req, res, next) => {
	try {
		if (req.files.length) {
			let image_urls = [];
			for (let i = 0; i < req.files.length; i++) {
				let file = req.files[i],
					result = await cloudinary.uploader.upload(file.path);

				if (result.url) {
					image_urls = [...image_urls, result.url];
				} else {
					console.log("Error uploading files");
					throw new Error("Error uploading file at index " + i);
				}
			}

			// console.log("File uploaded");
			res.status(201).json({
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
