export const truncate = (string, maxLength, separator) => {
	if (string.length > maxLength) {
		let trimmedString = string.substr(0, maxLength);
		trimmedString =
			trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(separator))) + "...";
		return trimmedString;
	} else return string;
};

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
