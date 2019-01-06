const express = require("express");
const router = express.Router();

router.get("/contact", (req, res, next) => {
	const drinks = [
			{ name: "Bloody Mary", drunkness: 3 },
			{ name: "Martini", drunkness: 5 },
			{ name: "Scotch", drunkness: 10 }
		],
		tagline =
			"Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

	res.render(`${__dirname}/../views/templates/contact`, {
		drinks: drinks,
		tagline: tagline
	});
});
// router.get("/signup", (req, res, next)=> {});
// router.get("/subscribe", (req, res, next)=> {});

exports.router = router;
