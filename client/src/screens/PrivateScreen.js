import React, { Component } from "react";

export class PrivateScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => <div className="private-content" />;
}
