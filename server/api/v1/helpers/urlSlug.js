const cuid = require("cuid");

const generateUrlSlug = title => {
	const fingerprint = cuid.slug(); // Returns a short random string with 7 to 10 characters. 'slug()' is good for things like URL slug disambiguation.
	return `${slugify(title)}-${fingerprint}`;
};

// Slug is a part of a URL that identifies a page in human-readable keywords. It is usually the end part of the URL, which can be interpreted as the name of the resource.
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
