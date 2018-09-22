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
				user
					.isValidToken(token)
					.then(result => {
						if (result) {
							res.status(401).json({
								message: "Validation failed"
							});
						} else {
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
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err.message
				});
			});
	} catch (error) {
		return res.status(401).json({
			message: "Validation failed"
		});
	}
};
