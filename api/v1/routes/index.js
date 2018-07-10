const userRoutes = require("./user");
const articleRoutes = require("./article");
const commentRoutes = require("./comment");

module.exports = router => {
	userRoutes(router);
	articleRoutes(router);
	commentRoutes(router);
};
