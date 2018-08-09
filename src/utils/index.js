import axios from "axios";

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

export const exportBreakpoint = size => {
	const breakpoints = {
		mobile: {
			min: 320,
			max: 480
		},
		tablet: {
			min: 600,
			max: 768
		},
		desktop: {
			min: 1024,
			max: 1280
		}
	};
	return breakpoints[size];
};

export const createRequestInstance = () => {
	let instance = axios.create({
			baseURL: "http://localhost:5000/api/v1"
			// timeout: 2500
		}),
		user = JSON.parse(localStorage.getItem("user"));
	// console.log("token:", user);

	if (user && user.token) {
		instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
	}

	return instance;
};
