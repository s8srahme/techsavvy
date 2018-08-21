const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	// text: String,
	title: { type: String, required: true },
	description: { type: String, required: true },
	featured_image_url: String,
	claps: { type: Number, default: 0 },
	category: { type: String, required: true },
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	created_at: { type: Date, default: Date.now, required: true }
	// comments: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Comment"
	// 	}
	// ]
});

articleSchema.methods.unclap = function() {
	this.claps--;
	return this.save();
};

articleSchema.methods.clap = function() {
	this.claps++;
	return this.save();
};

// articleSchema.methods.createComment = function(c) {
// 	this.comments.push(c);
// 	return this.save();
// };

// articleSchema.methods.deleteComment = function(id) {
// 	let index = -1;
// 	this.comments.some((comment, i) => {
// 		if (comment._id.toString() === id) {
// 			index = i;
// 			return true;
// 		}
// 		return false;
// 	});
// 	if (index !== -1) {
// 		this.comments.splice(index, 1);
// 		return this.save();
// 	}
// 	return new Promise(resolve => {
// 		resolve({ message: "No valid entry found for provided ID" });
// 	});
// };

module.exports = mongoose.model("Article", articleSchema);
