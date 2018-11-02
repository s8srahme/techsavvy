import React from "react";
import axios from "axios";
import http from "http";
import https from "https";
import GA from "./GoogleAnalytics";
import EventContextProvider, { EventContext } from "./EventContext";
import LocaleContextProvider, { LocaleContext } from "./LocaleContext";

// export const extractId = str => {
// 	let params = str.split("-");
// 	return params[params.length - 1];
// };

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
		baseURL: "http://localhost:5000/api/v1",
		timeout: 60000,
		httpAgent: new http.Agent({ keepAlive: true }),
		httpsAgent: new https.Agent({ keepAlive: true }),
		maxRedirects: 10,
		maxContentLength: 10 * 1000 * 1000,
		validateStatus: status => {
			if (status === 401) {
				let user = JSON.parse(localStorage.getItem("user"));
				if (user && user.token) {
					user.success = false;
					user.message = "Session expired";
				}
				localStorage.setItem("user", JSON.stringify(user));
			}
			return status >= 200 && status < 300;
		}
	});

	instance.interceptors.request.use(
		config => {
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			// if (error.response && error.response.status === 401) {
			// 	let user = JSON.parse(localStorage.getItem("user"));
			// 	if (user && user.token) {
			// 		user.success = false;
			// 		user.message = "Session expired";
			// 	}
			// 	localStorage.setItem("user", JSON.stringify(user));
			// }
			return Promise.reject(error);
		}
	);

	// let user = JSON.parse(localStorage.getItem("user"));
	// if (user && user.token) {
	// 	instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
	// }

	return instance;
};

export const extractContent = (html, allowSpaces = true) => {
	let span = document.createElement("span");
	span.innerHTML = html;
	if (allowSpaces) {
		let children = span.querySelectorAll("*");
		for (let i = 0; i < children.length; i++) {
			if (children[i].textContent) children[i].textContent += " ";
			else children[i].innerText += " ";
		}
	}
	return [span.textContent || span.innerText].toString().replace(/ +/g, " ");
};

export const ellipsizeTextBox = (id, text, hasExpanded) => {
	let el = document.getElementById(id);
	if (hasExpanded) {
		el.innerHTML = text;
	}

	let wordArray = el.innerHTML.split(" ");
	while (el.scrollHeight > el.offsetHeight) {
		wordArray.pop();

		let lastWord = wordArray[wordArray.length - 1];
		let lastChar = lastWord.charAt(lastWord.length - 1);
		if (/[^a-zA-Z0-9]/.test(lastChar)) {
			lastWord = lastWord.substr(0, lastWord.length - 1);
			wordArray[wordArray.length - 1] = lastWord;
		}

		el.innerHTML = wordArray.join(" ") + "...";
	}
};

export const parseQueryString = search => {
	let query = search.substring(1),
		pairs = query.split("&"),
		obj = {};

	for (let i = 0; i < pairs.length; i++) {
		let pair = pairs[i].split("=");
		obj[pair[0]] = pair[1];
	}

	return obj;
};

export { GA };

export const CombinedContextProvider = ({ children }) => (
	<EventContextProvider>
		<LocaleContextProvider>{children}</LocaleContextProvider>
	</EventContextProvider>
);

export const CombinedContextConsumer = ({ children }) => (
	<EventContext.Consumer>
		{context => (
			<LocaleContext.Consumer>
				{({ preferredLocale, onChangeLanguage, langs }) =>
					children({ context, preferredLocale, onChangeLanguage, langs })
				}
			</LocaleContext.Consumer>
		)}
	</EventContext.Consumer>
);
