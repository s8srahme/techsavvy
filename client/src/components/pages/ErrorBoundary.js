import React from "react";
import { NotFound } from "./NotFound";
import { GA } from "utils";

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

	render = () => {
		if (this.state.hasError) return <NotFound hasError {...this.props} />;
		return <React.Fragment>{this.props.children}</React.Fragment>;
	};
}
