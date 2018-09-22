const authController = require("./../controllers").auth;

const checkAuth = require("../middlewares/auth");
const validatePhoto = require("../middlewares/photo");

module.exports = router => {
	router.route("/auth/signup").post(validatePhoto.uploadFile, authController.signup);
	router.route("/auth/login").post(authController.login);
	router.route("/auth/logout").post(checkAuth, authController.logout);
};
