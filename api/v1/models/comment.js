const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	article_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Article",
		required: true
	},
	text: { type: String, required: true },
	created_at: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("Comment", commentSchema);
