const userRoutes = require("./user");
const articleRoutes = require("./article");
const commentRoutes = require("./comment");
const photoRoutes = require("./photo");
const mailRoutes = require("./mail");
const authRoutes = require("./auth");

module.exports = router => {
	userRoutes(router);
	articleRoutes(router);
	commentRoutes(router);
	photoRoutes(router);
	mailRoutes(router);
	authRoutes(router);
};
