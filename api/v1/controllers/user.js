const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const User = require("./../models/user");
const Article = require("./../models/article");

const querify = require("./../helpers/queryString");
const getRandomIntInclusive = require("./../helpers/randomInteger");

module.exports = {
	addUser: (req, res, next) => {
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

									image_url = result.url;
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
									console.log(result);
									res.status(201).json({
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
	deleteUser: (req, res, next) => {
		User.remove({ _id: req.params.id })
			.exec()
			.then(result => {
				if (!result) {
					return res.status(404).json({ message: "User not found" });
				}
				res.status(204).json({
					message: "User deleted",
					request: {
						type: "POST",
						url: "http://localhost:5000/api/users",
						body: {
							email: "String",
							password: "String"
						}
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	updateUser: async (req, res, next) => {
		const id = req.params.id;
		const updateOps = {};
		for (const propName in req.body) {
			if (propName !== "oldPassword" && propName !== "newPassword" && propName !== "email" && propName !== "photos")
				updateOps[propName] = req.body[propName];
		}

		if (req.body.oldPassword && req.body.newPassword) {
			let error = false;
			await User.find({ email: req.body.email })
				.exec()
				.then(async user => {
					if (user.length < 1) {
						error = true;
						return res.status(401).json({ message: "Mail does not exist" });
					}
					try {
						const match = await bcrypt.compare(req.body.oldPassword, user[0].password);
						if (match) {
							const hash = await bcrypt.hash(req.body.newPassword, 10);
							updateOps.password = hash;
						} else {
							error = true;
							return res.status(401).json({
								message: "Passwords do not match"
							});
						}
					} catch (err) {
						error = true;
						return res.status(500).json({
							message: "Update failed",
							error: err
						});
					}
				})
				.catch(err => {
					console.log(err);
					error = true;
					return res.status(500).json({
						message: "Update failed",
						error: err
					});
				});
			if (error) return;
		}

		if (req.files.length) {
			// console.log("files:", req.files);
			let image_url = "",
				path = req.files[0].path;

			await cloudinary.uploader.upload(
				path,
				result => {
					if (result) {
						image_url = result.url;
						fs.unlink(path, err => {
							if (err) console.log(err);
							else console.log("Image deleted");
						});
						console.log("File uploaded");
					} else {
						console.log("Error uploading file");
						image_url = "http://localhost:5000/" + path;
					}
				},
				{
					resource_type: "image",
					effect: "sepia"
				}
			);

			updateOps.image_url = image_url;
		}

		// console.log("updateOps:", updateOps);
		User.update({ _id: id }, { $set: updateOps })
			.exec()
			.then(result => {
				res.status(200).json({
					message: "User updated",
					request: {
						type: "GET",
						url: "http://localhost:5000/api/users/" + id
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	checkUser: (req, res, next) => {
		User.find({ email: req.body.email })
			.exec()
			.then(user => {
				if (user.length < 1) {
					return res.status(401).json({ message: "Mail does not exist" });
				}
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: "Auth failed"
						});
					}
					if (result) {
						const token = jwt.sign({ email: user[0].email, userId: user[0]._id }, process.env.JWT_KEY, {
							expiresIn: "30d"
						});
						return res.status(200).json({
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
	getAll: (req, res, next) => {
		const { page, limit, sort, filter } = querify(req);
		User.find(filter)
			.select("_id name email image_url followers following created_at")
			.limit(limit)
			.skip(limit * (page - 1))
			.sort(sort)
			.exec()
			.then(docs => {
				if (docs.length === 0) res.status(404).json({ message: "No entries found" });
				else {
					User.count(filter)
						.exec()
						.then(count => {
							const response = {
								meta: {
									count: docs.length,
									total: count,
									limit: limit,
									page: page,
									pages: Math.ceil(count / limit)
								},
								data: {
									users: docs.map(doc => {
										return {
											_id: doc._id,
											name: doc.name,
											email: doc.email,
											image_url: doc.image_url,
											followers: doc.followers,
											following: doc.following,
											created_at: doc.created_at,
											request: {
												type: "GET",
												url: "http://localhost:5000/api/users/" + doc._id
											}
										};
									})
								}
							};
							res.status(200).json(response);
						})
						.catch(err => res.status(500).json({ error: err }));
				}
			})
			.catch(err => res.status(500).json({ error: err }));
	},
	getAllArticles: (req, res, next) => {
		const { page, limit, sort, filter } = querify(req);
		const id = req.params.id;

		Article.find({ ...{ author_id: id }, ...filter })
			.limit(limit)
			.skip(limit * (page - 1))
			.sort(sort)
			.populate("author_id", "name")
			.exec((error, records) => {
				if (error) res.status(500).json({ error: error });
				else if (records.length === 0) res.status(200).json({ message: "No entries found" });
				else {
					Article.count({ ...{ author_id: id }, ...filter })
						.exec()
						.then(count => {
							const response = {
								meta: {
									count: records.length,
									total: count,
									limit: limit,
									page: page,
									pages: Math.ceil(count / limit)
								},
								data: {
									articles: records.map(record => {
										return {
											_id: record._id,
											title: record.title,
											description: record.description,
											category: record.category,
											claps: record.claps,
											author_id: record.author_id,
											created_at: record.created_at,
											featured_image_url: record.featured_image_url,
											request: {
												type: "GET",
												url: "http://localhost:5000/api/articles/" + record._id
											}
										};
									})
								}
							};
							return res.status(200).json(response);
						})
						.catch(err => {
							console.log(err);
							return res.status(500).json({ error: err });
						});
				}
			});
	},
	getUser: (req, res, next) => {
		const id = req.params.id === "self" ? req.userData.userId : req.params.id,
			is_owner = req.params.id === req.userData.userId;

		User.findById(id, "_id name username email location bio image_url followers following", (err, user) => {
			if (err) res.status(500).json({ error: err });
			else if (!user) res.status(404).json({ message: "User not found" });
			else {
				Article.count({ author_id: id })
					.exec()
					.then(count => {
						// let userCopy = Object.assign({}, user);
						// console.log(userCopy);
						let userObject = user.toObject();
						userObject["is_owner"] = is_owner;
						userObject.counts = { articles: count, followers: user.followers.length, following: user.following.length };

						return res.status(200).json({
							user: userObject,
							request: {
								type: "GET",
								url: "http://localhost:5000/api/users"
							}
						});
					})
					.catch(error => {
						console.log(error);
						return res.status(500).json({ error: error });
					});
			}
		});
	},
	followUser: (req, res, next) => {
		const following_id = req.params.following_id,
			follower_id = req.body.follower_id;

		if (following_id === follower_id) return res.status(409).json({ message: "Not allowed" });
		User.find()
			.where("_id")
			.in([following_id, follower_id])
			.exec()
			.then(async docs => {
				if (docs.length < 2) return res.status(404).json({ message: "User not found" });
				let response = await User.findById(follower_id)
					.then(doc => {
						if (!doc) return { status: 404, message: "Follower not found" };
						return doc
							.follow(following_id)
							.then(result => {
								if (result.message) return { status: 409, message: result.message };
							})
							.catch(err => {
								return { status: 500, error: err };
							});
					})
					.catch(err => {
						return { status: 500, error: err };
					});

				if (response)
					return res
						.status(response.status)
						.json(response.message ? { message: response.message } : { error: response.error });

				response = await User.findById(following_id)
					.then(doc => {
						if (!doc) return { status: 404, message: "Followee not found" };
						return doc
							.addFollower(follower_id)
							.then(result => {
								if (result.message) return { status: 409, message: result.message };
							})
							.catch(err => {
								return { status: 500, error: err };
							});
					})
					.catch(err => {
						return { status: 500, error: err };
					});

				if (response)
					return res
						.status(response.status)
						.json(response.message ? { message: response.message } : { error: response.error });

				res.status(200).json({
					message: "Followed user successfully",
					request: {
						type: "GET",
						url: ["http://localhost:5000/api/users/" + following_id, "http://localhost:5000/api/users/" + follower_id]
					}
				});
			})
			.catch(err => res.status(500).json({ error: err }));
	},
	unfollowUser: (req, res, next) => {
		const following_id = req.params.following_id,
			follower_id = req.userData.userId;

		if (following_id === follower_id) return res.status(409).json({ message: "Not allowed" });
		User.find()
			.where("_id")
			.in([following_id, follower_id])
			.exec()
			.then(async docs => {
				if (docs.length < 2) return res.status(404).json({ message: "User not found" });
				let response = await User.findById(follower_id)
					.then(doc => {
						if (!doc) return { status: 404, message: "Follower not found" };
						return doc
							.unfollow(following_id)
							.then(result => {
								if (result.message) return { status: 409, message: result.message };
							})
							.catch(err => {
								return { status: 500, error: err };
							});
					})
					.catch(err => {
						return { status: 500, error: err };
					});

				if (response)
					return res
						.status(response.status)
						.json(response.message ? { message: response.message } : { error: response.error });

				response = await User.findById(following_id)
					.then(doc => {
						if (!doc) return { status: 404, message: "Followee not found" };
						return doc
							.deleteFollower(follower_id)
							.then(result => {
								if (result.message) return { status: 409, message: result.message };
							})
							.catch(err => {
								return { status: 500, error: err };
							});
					})
					.catch(err => {
						return { status: 500, error: err };
					});

				if (response)
					return res
						.status(response.status)
						.json(response.message ? { message: response.message } : { error: response.error });

				res.status(200).json({
					message: "Unfollowed user successfully",
					request: {
						type: "GET",
						url: ["http://localhost:5000/api/users/" + following_id, "http://localhost:5000/api/users/" + follower_id]
					}
				});
			})
			.catch(err => res.status(500).json({ error: err }));
	}
};
