import React from "react";
import { NotFound } from "./NotFound";
import { GA } from "utils";
// import PropTypes from "prop-types";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, info: "" };
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (nextState.hasError || nextProps.location.pathname !== this.props.location.pathname) return true;
		return false;
	};

	componentDidCatch = (error, info) => {
		this.setState({ hasError: true, error, info }, () => {
			GA.trackException(error);
		});
	};

	// componentWillMount = () => {
	// 	console.log(this.props.location);
	// };

	render = () => {
		if (this.state.hasError) return <NotFound hasError {...this.props} />;
		// return <React.Fragment>{this.props.children}</React.Fragment>;
		return (
			<div>
				{this.props.children}
				{/* <a target="_blank" href="www.google.com">
					hello
				</a> */}
			</div>
		);
	};
}

// ErrorBoundary.propTypes = {
// location: PropTypes.object.isRequired
// };
