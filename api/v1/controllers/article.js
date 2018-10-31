const fs = require("fs");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

const Article = require("./../models/article");
const User = require("./../models/user");
const Comment = require("./../models/comment");

const querify = require("./../helpers/queryString");
const generateUrlSlug = require("./../helpers/urlSlug");

exports.articles_get_all = (req, res, next) => {
	const { page, limit, sort, filter } = querify(req);
	Article.find(filter, "_id text title description slug category author_id featured_image_url claps created_at", {
		skip: limit * (page - 1),
		limit,
		sort
	})
		.populate("author_id", "name")
		.exec((err, docs) => {
			if (err) res.status(500).json({ error: err });
			else if (docs.length === 0) res.status(200).json({ message: "No entries found" });
			else {
				Article.countDocuments(filter)
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
								articles: docs.map(doc => {
									return {
										_id: doc._id,
										text: doc.text,
										title: doc.title,
										category: doc.category,
										slug: doc.slug,
										description: doc.description,
										author_id: doc.author_id,
										featured_image_url: doc.featured_image_url,
										claps: doc.claps,
										created_at: doc.created_at,
										request: {
											type: "GET",
											url: "http://localhost:5000/api/articles/" + doc._id
										}
									};
								})
							}
						};
						res.status(200).json(response);
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({ error: err });
					});
			}
		});
};
exports.articles_get_article = (req, res, next) => {
	const slug = req.params.articleSlug;
	Article.findOne({ slug })
		.select("_id text title description category slug author_id featured_image_url claps created_at")
		.populate("author_id", "name email")
		.exec()
		.then(article => {
			if (article)
				res.status(200).json({
					article,
					request: {
						type: "GET",
						description: "Get all articles",
						url: "http://localhost:5000/api/articles"
					}
				});
			else res.status(404).json({ message: "No valid entry found for provided slug" });
		})
		.catch(err => res.status(500).json({ error: err }));
};
exports.articles_create_article = (req, res, next) => {
	// console.log(req.files);
	let { title, description, author_id, category } = req.body;
	let featured_image_url = "";

	User.findById(author_id)
		.then(async user => {
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			if (req.files.length) {
				await cloudinary.uploader.upload(req.files[0].path, result => {
					// console.log(result);
					if (result.secure_url) {
						featured_image_url = result.secure_url;
						fs.unlink(req.files[0].path, err => {
							if (err) console.log(err);
							else console.log("Image deleted");
						});
						console.log("File uploaded");
					} else {
						console.log("Error uploading file");
						featured_image_url = "http://localhost:5000/" + req.file.path;
					}
				});
			}

			const article = new Article({
				_id: new mongoose.Types.ObjectId(),
				title,
				description,
				author_id,
				// author_id: mongoose.Types.ObjectId(author_id),
				slug: generateUrlSlug(title),
				featured_image_url,
				category,
				created_at: new Date().toString()
			});
			article.save((err, article) => {
				if (err) {
					// return res.status(500).send("There was a problem adding the information to the database.");
					res.status(500).json({ error: err });
				} else if (!article) res.send(400);
				else {
					res.status(201).json({
						message: "Created article successfully",
						createdArticle: {
							_id: article._id,
							category: article.category,
							title: article.title,
							slug: article.slug,
							description: article.description,
							author_id: article.author_id,
							featured_image_url: article.featured_image_url,
							created_at: article.created_at,
							request: {
								type: "GET",
								url: "http://localhost:5000/api/articles/" + article._id
							}
						}
					});
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
exports.articles_delete_article = (req, res, next) => {
	const id = req.params.articleId;
	Article.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(204).json({
				message: "Article deleted",
				request: {
					type: "POST",
					url: "http://localhost:5000/api/articles",
					body: {
						text: "String",
						title: "String",
						description: "String",
						claps: "Number"
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
};
exports.articles_update_article = async (req, res, next) => {
	const id = req.params.articleId;
	const updateOps = {};
	let featured_image_url = "";
	// for (const ops of req.body) {
	// 	updateOps[ops.propName] = ops.value;
	// }

	if (req.files.length) {
		await cloudinary.uploader.upload(req.files[0].path, result => {
			// console.log(result);
			if (result.secure_url) {
				featured_image_url = result.secure_url;
				fs.unlink(req.files[0].path, err => {
					if (err) console.log(err);
					else console.log("Image deleted");
				});
				console.log("File uploaded");
			} else {
				console.log("Error uploading file");
				featured_image_url = "http://localhost:5000/" + req.file.path;
			}
		});
	}

	if (featured_image_url) updateOps.featured_image_url = featured_image_url;
	for (const propName in req.body) {
		if (propName !== "photos") updateOps[propName] = req.body[propName];
	}

	Article.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Article updated",
				request: {
					type: "GET",
					url: "http://localhost:5000/api/articles/" + id
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};
exports.articles_clap_article = (req, res, next) => {
	const id = req.params.articleId;
	Article.findOne({ _id: id }).exec((err, doc) => {
		if (err) res.status(500).json({ error: err });
		else if (!doc) res.status(404).json({ message: "Article not found" });
		else
			doc
				.clap()
				.then(article => {
					if (article)
						res.status(200).json({
							message: "Clapped article successfully",
							request: {
								type: "GET",
								url: "http://localhost:5000/api/articles/" + id
							}
						});
					else res.status(404).json({ message: "No valid entry found for provided ID" });
				})
				.catch(error => {
					res.status(500).json({
						error: error
					});
				});
	});
};
exports.articles_unclap_article = (req, res, next) => {
	const id = req.params.articleId;
	Article.findOne({ _id: id }).exec((err, doc) => {
		if (err) res.status(500).json({ error: err });
		else if (!doc) res.status(404).json({ message: "Article not found" });
		else
			doc
				.unclap()
				.then(article => {
					if (article)
						res.status(200).json({
							message: "Unclapped article successfully",
							request: {
								type: "GET",
								url: "http://localhost:5000/api/articles/" + id
							}
						});
					else res.status(404).json({ message: "No valid entry found for provided ID" });
				})
				.catch(error => {
					res.status(500).json({
						error: error
					});
				});
	});
};
exports.articles_get_all_comments = (req, res, next) => {
	const { page, limit, sort } = querify(req);
	const id = req.params.articleId;

	Comment.find({ article_id: id }, "_id text author_id article_id created_at", {
		skip: limit * (page - 1),
		limit,
		sort
	})
		.populate("author_id", "name image_url")
		.exec((err, docs) => {
			if (err) res.status(500).json({ error: err });
			else if (docs.length === 0) res.status(200).json({ message: "No entries found" });
			else {
				Comment.countDocuments({ article_id: id })
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
								comments: docs.map(doc => {
									return {
										_id: doc._id,
										text: doc.text,
										author_id: doc.author_id,
										article_id: doc.article_id,
										created_at: doc.created_at,
										request: {
											type: "GET",
											url: "http://localhost:5000/api/comments/" + doc._id
										}
									};
								})
							}
						};
						res.status(200).json(response);
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({ error: err });
					});
			}
		});
};
// exports.articles_create_comment = (req, res, next) => {
// 	const id = req.params.articleId;
// 	Article.findById(id)
// 		.then(doc => {
// 			if (!doc) return res.status(404).json({ message: "Article not found" });
// 			User.findById(req.body.author_id)
// 				.then(user => {
// 					if (!user) {
// 						return res.status(404).json({ message: "User not found" });
// 					}
// 					doc
// 						.createComment({
// 							_id: new mongoose.Types.ObjectId(),
// 							author_id: req.body.author_id,
// 							text: req.body.text
// 							// created_at: new Date()
// 						})
// 						.then(article => {
// 							if (article)
// 								res.status(200).json({
// 									message: "Commented article successfully",
// 									request: {
// 										type: "GET",
// 										url: "http://localhost:5000/api/articles/" + id
// 									}
// 								});
// 							else res.status(404).json({ message: "No valid entry found for provided ID" });
// 						})
// 						.catch(err => {
// 							res.status(500).json({
// 								error: err
// 							});
// 						});
// 				})
// 				.catch(e => {
// 					console.log(e);
// 					res.status(500).json({
// 						error: e
// 					});
// 				});
// 		})
// 		.catch(error => {
// 			res.status(500).json({
// 				error: error
// 			});
// 		});
// };
// exports.articles_delete_comment = (req, res, next) => {
// 	const articleId = req.params.articleId,
// 		commentId = req.params.commentId;
// 	Article.findOne({ _id: articleId }).exec((err, doc) => {
// 		if (err) res.status(500).json({ error: err });
// 		else if (!doc) res.status(404).json({ message: "Article not found" });
// 		else
// 			doc
// 				.deleteComment(commentId)
// 				.then(result => {
// 					if (!result.message)
// 						res.status(200).json({
// 							message: "Comment deleted",
// 							request: {
// 								type: "POST",
// 								url: "http://localhost:5000/api/articles/:articleId/comments",
// 								body: {
// 									author_id: "String",
// 									text: "String"
// 								}
// 							}
// 						});
// 					else res.status(409).json({ message: result.message });
// 				})
// 				.catch(error => {
// 					res.status(500).json({
// 						error: error
// 					});
// 				});
// 	});
// };
