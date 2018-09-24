import React from "react";
import { NotFound } from "./NotFound";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, info: "" };
	}

	componentDidCatch = (error, info) => {
		this.setState(
			{ hasError: true, error, info }
			// , () => console.log(this.state)
		);
	};

	render = () => {
		if (this.state.hasError) {
			return <NotFound hasError {...this.props} />;
		}
		return <div>{this.props.children}</div>;
	};
}
