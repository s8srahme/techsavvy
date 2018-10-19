const cuid = require("cuid");

const generateUrlSlug = title => {
	const fingerprint = cuid.slug();
	return `${slugify(title)}-${fingerprint}`;
};

const slugify = text => {
	return text
		.toString()
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "") // eslint-disable-line no-useless-escape
		.replace(/\-\-+/g, "-") // eslint-disable-line no-useless-escape
		.replace(/^-+/, "")
		.replace(/-+$/, "");
};

module.exports = generateUrlSlug;
