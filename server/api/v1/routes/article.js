const ArticlesController = require("./../controllers").article;

const checkAuth = require("../middlewares/auth");
const validatePhoto = require("../middlewares/photo");

module.exports = router => {
	router.route("/articles").get(ArticlesController.articles_get_all);
	router.route("/articles/:articleSlug").get(checkAuth, ArticlesController.articles_get_article);
	router.route("/articles/:articleId").delete(checkAuth, ArticlesController.articles_delete_article);
	router
		.route("/articles/:articleId")
		.patch(checkAuth, validatePhoto.uploadFiles, ArticlesController.articles_update_article);
	router.route("/articles").post(checkAuth, validatePhoto.uploadFiles, ArticlesController.articles_create_article);
	router.route("/articles/:articleId/comments").get(checkAuth, ArticlesController.articles_get_all_comments);
	// router.route("/articles/:articleId/comments").post(checkAuth, ArticlesController.articles_create_comment);
	// router
	// 	.route("/articles/:articleId/comments/:commentId")
	// 	.delete(checkAuth, ArticlesController.articles_delete_comment);
	router.route("/articles/:articleId/clap").post(checkAuth, ArticlesController.articles_clap_article);
	router.route("/articles/:articleId/unclap").post(checkAuth, ArticlesController.articles_unclap_article);
};
