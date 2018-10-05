import React from "react";
import { NotFound } from "./NotFound";
import GA from "utils";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, info: "" };
	}

	componentDidCatch = (error, info) => {
		this.setState({ hasError: true, error, info }, () => {
			GA.trackException(error);
		});
	};

	render = () => {
		if (this.state.hasError) {
			return <NotFound hasError {...this.props} />;
		}
		return <div>{this.props.children}</div>;
	};
}
