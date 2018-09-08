const PhotoController = require("./../controllers").photo;

const validatePhoto = require("../middlewares/photo");

module.exports = router => {
	router.route("/photos/create").post(validatePhoto.uploadFiles, PhotoController.photos_create_photo);
};
