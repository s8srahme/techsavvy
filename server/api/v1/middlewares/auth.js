const jwt = require("jsonwebtoken");

const User = require("./../models/user");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		const id = decoded.userId;

		User.findById(id)
			.exec()
			.then(user => {
				if (!user) {
					return res.status(401).json({ message: "User not found" });
				}
				if (token !== user.session_token)
					res.status(401).json({
						message: "Token revoked"
					});
				else {
					decoded.token = token;
					req.userData = decoded;
					next();
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err.message
				});
			});
	} catch (error) {
		console.log(error);
		if (error.name === "TokenExpiredError")
			return res.status(401).json({
				message: "Token expired"
			});
		else if (error.name === "JsonWebTokenError")
			return res.status(401).json({
				message: "Invalid signature"
			});
	}
};
