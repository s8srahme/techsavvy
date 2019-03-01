const ejs = require("ejs");
const fs = require("fs");

const filePath = {
	contact: `${__dirname}/contact.ejs`
};

const getHtmlString = ({ type, data }) => {
	const str = fs.readFileSync(filePath[type], "utf8");
	try {
		// console.log(data);
		const htmlString = ejs.render(str, { data });
		return htmlString;
	} catch (err) {
		return err;
	}
};

module.exports = getHtmlString;
