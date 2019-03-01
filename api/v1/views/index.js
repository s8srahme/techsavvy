const ejs = require("ejs");
const fs = require("fs");

const filePath = `${__dirname}/templates/contact.ejs`;
const str = fs.readFileSync(filePath, "utf8");

const getHtmlString = data => {
	try {
		let htmlString = ejs.render(str, { filename: filePath, ...data });
		return htmlString;
	} catch (err) {
		return err;
	}
};

module.exports = getHtmlString;
