const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	bio: String,
	featured_image_url: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	// is_owner: Boolean,
	location: String,
	image_url: String,
	created_at: { type: Date, default: Date.now, required: true },
	updated_at: Date,
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
	// articles: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Article"
	// 	}
	// ],
	// meta: {
	// 	age: Number,
	// 	website: String
	// },
});

userSchema.methods.follow = function(following_id) {
	if (this.following.indexOf(following_id) === -1) {
		this.following.push(following_id);
		return this.save();
	}
	return new Promise(resolve => {
		resolve({ message: "Followee exists" });
	});
};

userSchema.methods.unfollow = function(following_id) {
	let index = this.following.indexOf(following_id);
	if (index !== -1) {
		this.following.splice(index, 1);
		return this.save();
	}
	return new Promise(resolve => {
		resolve({ message: "Not allowed" });
	});
};

userSchema.methods.addFollower = function(follower_id) {
	// if (this._id.toString() === follower_id) {
	// 	return new Promise(resolve => {
	// 		resolve({ message: "Not allowed" });
	// 	});
	// }
	if (this.followers.indexOf(follower_id) === -1) {
		this.followers.push(follower_id);
		return this.save();
	}
	return new Promise(resolve => {
		resolve({ message: "Follower exists" });
	});
};

userSchema.methods.deleteFollower = function(follower_id) {
	let index = this.followers.indexOf(follower_id);
	if (index !== -1) {
		this.followers.splice(index, 1);
		return this.save();
	}
	return new Promise(resolve => {
		resolve({ message: "Not allowed" });
	});
};

module.exports = mongoose.model("User", userSchema);
