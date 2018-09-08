const ejs = require("ejs");
const fs = require("fs");

const filePath = `${__dirname}/templates/contact.ejs`;
const str = fs.readFileSync(filePath, "utf8");

const getHtmlString = data => {
	try {
		let htmlString = ejs.render(str, { filename: filePath, ...data });
		// console.log(htmlString);
		return htmlString;
	} catch (err) {
		// console.log(err);
		return err;
	}
};

module.exports = getHtmlString;
