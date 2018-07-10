const mongoose = require("mongoose");

const Article = require("./../models/article");
const User = require("./../models/user");
const Comment = require("./../models/comment");

const querify = require("./../helpers/queryString");

exports.comments_get_all = (req, res, next) => {
	const { page, limit, sort, filter } = querify(req);
	Comment.find(
		filter,
		"_id text author_id article_id created_at",
		{
			skip: limit * (page - 1),
			limit,
			sort
		},
		(err, docs) => {
			if (err) res.status(500).json({ error: err });
			else if (docs.length === 0) res.status(404).json({ message: "No entries found" });
			else {
				Comment.count(filter)
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
						return res.status(500).json({ error: err });
					});
			}
		}
	);
};
exports.comments_get_comment = (req, res, next) => {
	const id = req.params.commentId;
	Comment.findById(id)
		.select("_id text author_id article_id created_at")
		.populate("author_id", "name email")
		.exec()
		.then(comment => {
			if (comment)
				res.status(200).json({
					comment,
					request: {
						type: "GET",
						description: "Get all comments",
						url: "http://localhost:5000/api/comments"
					}
				});
			else res.status(404).json({ message: "No valid entry found for provided ID" });
		})
		.catch(err => res.status(500).json({ error: err }));
};
exports.comments_create_comment = async (req, res, next) => {
	let { text, author_id, article_id } = req.body;
	Article.findById(article_id)
		.then(article => {
			if (!article) {
				return res.status(404).json({ message: "Article not found" });
			}
			User.findById(author_id)
				.then(user => {
					if (!user) {
						return res.status(404).json({ message: "User not found" });
					}
					const comment = new Comment({
						_id: new mongoose.Types.ObjectId(),
						text,
						author_id,
						article_id,
						created_at: new Date().toString()
					});
					return comment.save();
				})
				.then(result => {
					if (!result) res.status(404).json({ message: "No valid entry found for provided ID" });
					else {
						res.status(201).json({
							message: "Comment stored",
							createdComment: {
								_id: result._id,
								text: result.text,
								author_id: result.author_id,
								article_id: result.article_id,
								created_at: result.created_at,
								request: {
									type: "GET",
									url: "http://localhost:5000/api/comments/" + result._id
								}
							}
						});
					}
				})
				.catch(err => {
					res.status(500).json({
						error: err
					});
				});
		})
		.catch(error => {
			res.status(500).json({
				error: error
			});
		});
};
exports.comments_delete_comment = (req, res, next) => {
	const id = req.params.commentId;
	Comment.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(204).json({
				message: "Comment deleted",
				request: {
					type: "POST",
					url: "http://localhost:5000/api/comments",
					body: {
						author_id: "String",
						article_id: "String",
						text: "String"
					}
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};
exports.comments_update_comment = (req, res, next) => {
	const id = req.params.commentId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Comment.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Comment updated",
				request: {
					type: "GET",
					url: "http://localhost:5000/api/comments/" + id
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};
