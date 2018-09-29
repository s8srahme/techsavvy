const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const User = require("./../models/user");

const getRandomIntInclusive = require("./../helpers/randomInteger");

module.exports = {
	signup: (req, res, next) => {
		User.find({ email: req.body.email })
			.exec()
			.then(user => {
				if (user.length >= 1) {
					return res.status(409).json({ message: "Mail exists" });
				} else {
					bcrypt.hash(req.body.password, 10, async (err, hash) => {
						if (err) {
							return res.status(500).json({
								error: err
							});
						} else {
							let image_url = "";
							// console.log("avatar:", req.file);
							if (req.file) {
								await cloudinary.uploader.upload(req.file.path, result => {
									if (!result) {
										console.log("Error uploading file");
										image_url = "http://localhost:5000/" + req.file.path;
										return;
									}

									image_url = result.secure_url;
									fs.unlink(req.file.path, err => {
										if (err) console.log(err);
										else console.log("Image deleted");
									});
									console.log("File uploaded");
								});
							}

							let username = req.body.name.replace(/\s+/g, "").toLowerCase();
							let result = await (async () => {
								const handlePromise = user => {
									if (user.length >= 1) {
										console.log({ message: "Username exists" });
										username = req.body.name.replace(/\s+/g, "").toLowerCase() + getRandomIntInclusive(1, 99);
										return false;
									} else {
										return true;
									}
								};

								for (;;) {
									let result = await User.find({ username })
										.exec()
										.then(handlePromise)
										.catch(err => {
											console.log(err);
											return { status: 500, error: err };
										});
									if (result) return result;
								}
							})();

							if (typeof result === "object")
								return res
									.status(result.status)
									.json(result.message ? { message: result.message } : { error: result.error });

							const user = new User({
								_id: new mongoose.Types.ObjectId(),
								email: req.body.email,
								password: hash,
								name: req.body.name,
								username,
								image_url
							});
							user
								.save()
								.then(result => {
									// console.log(result);
									res.status(201).json({
										success: true,
										message: "User created",
										createdUser: {
											_id: result._id,
											name: result.name,
											username: result.username,
											email: result.email,
											image_url: result.image_url
										},
										request: {
											type: "GET",
											url: "http://localhost:5000/api/users/" + result._id
										}
									});
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										error: err
									});
								});
						}
					});
				}
			});
	},
	login: (req, res, next) => {
		User.find({ email: req.body.email })
			.exec()
			.then(user => {
				if (user.length < 1) {
					return res.status(401).json({ message: "Mail does not exist" });
				}
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: "Wrong password"
						});
					}
					if (result) {
						const token = jwt.sign({ email: user[0].email, userId: user[0]._id }, process.env.JWT_KEY, {
							expiresIn: "30d"
						});
						return res.status(200).json({
							success: true,
							message: "Auth successful",
							token: token
						});
					}
					return res.status(401).json({
						message: "Auth failed"
					});
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	logout: (req, res, next) => {
		const id = req.userData.userId,
			token = req.userData.token;

		User.findById(id)
			.exec()
			.then(user => {
				if (!user) {
					return res.status(401).json({ message: "User not found" });
				}
				// console.log(user);
				user
					.revokeToken(token)
					.then(result => {
						res.status(200).json({
							success: true,
							message: "Logout successful"
						});
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err.message
						});
					});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err.message
				});
			});
	}
};
