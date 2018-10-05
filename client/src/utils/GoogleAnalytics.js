import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import { Route } from "react-router-dom";

class GoogleAnalytics extends Component {
	static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string
		}).isRequired,
		options: PropTypes.object
	};

	componentDidMount = () => {
		this._logPageChange(this.props.location.pathname, this.props.location.search);
	};

	componentDidUpdate = ({ location: prevLocation }) => {
		const {
			location: { pathname, search }
		} = this.props;
		const isDifferentPathname = pathname !== prevLocation.pathname;
		const isDifferentSearch = search !== prevLocation.search;

		if (isDifferentPathname || isDifferentSearch) {
			this._logPageChange(pathname, search);
		}
	};

	_logPageChange = (pathname, search = "") => {
		const page = pathname + search;
		const { location } = window;
		ReactGA.set({
			page,
			location: `${location.origin}${page}`,
			...this.props.options
		});
		ReactGA.pageview(page);
	};

	render = () => {
		return null;
	};
}

const TrackerRoute = () => <Route component={GoogleAnalytics} />;

const init = (options = {}) => {
	if (process.env.NODE_ENV === "production") {
		ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
			debug: process.env.REACT_APP_GA_DEBUG === true,
			...options
		});
		return true;
	}
	return false;
};

const trackEvent = index => {
	if (process.env.NODE_ENV === "production") {
		ReactGA.event({
			category: "Social",
			action: "Rated an App",
			value: index
		});
	}
};

const trackException = error => {
	if (process.env.NODE_ENV === "production") {
		ReactGA.exception({
			description: error,
			fatal: true
		});
	}
};

export default {
	GoogleAnalytics,
	TrackerRoute,
	init,
	trackEvent,
	trackException
};
