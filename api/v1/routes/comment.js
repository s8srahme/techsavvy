const CommentsController = require("./../controllers").comment;
const checkAuth = require("../middlewares/auth");

module.exports = router => {
	router.route("/comments").get(checkAuth, CommentsController.comments_get_all);
	router.route("/comments/:commentId").get(checkAuth, CommentsController.comments_get_comment);
	router.route("/comments/:commentId").delete(checkAuth, CommentsController.comments_delete_comment);
	router.route("/comments/:commentId").patch(checkAuth, CommentsController.comments_update_comment);
	router.route("/comments").post(checkAuth, CommentsController.comments_create_comment);
};
