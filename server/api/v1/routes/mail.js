const MailController = require("./../controllers").mail;

module.exports = router => {
	router.route("/mails/create").post(MailController.mails_create_mail);
};
