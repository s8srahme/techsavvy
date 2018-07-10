export const slugify = text => {
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
