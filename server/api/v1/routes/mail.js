const MailController = require("./../controllers").mail;

module.exports = router => {
	router.route("/mails/contact").post(MailController.contact);

	router.get("/templates/contact", (req, res, next) => {
		res.render(`${__dirname}/../templates/contact`, {
			// data: {
			// 	to: "bucky.barnes@emailservice.com",
			// 	from: "steve.rogers@emailservice.com",
			// 	subject: "You know me",
			// 	name: "Steve Rogers",
			// 	message: "Bucky. You've known me your entire life. Your name is James Buchanan Barnes..."
			// }
		});
	});
	// router.get("templates/signup", (req, res, next) => {});
	// router.get("templates/subscribe", (req, res, next) => {});
};
