const userController = require("./../controllers").user;

const checkAuth = require("../middlewares/auth");
const validatePhoto = require("../middlewares/photo");

module.exports = router => {
	router.route("/users/:id").delete(checkAuth, userController.deleteUser);
	router.route("/users/:id").get(checkAuth, userController.getUser);
	router.route("/users/:id").patch([checkAuth, validatePhoto.uploadFiles], userController.updateUser);
	router.route("/users").get(userController.getAll);
	router.route("/users/:id/articles").get(checkAuth, userController.getAllArticles);
	router.route("/users/:following_id/follow").post(checkAuth, userController.followUser);
	router.route("/users/:following_id/unfollow").post(checkAuth, userController.unfollowUser);
};
