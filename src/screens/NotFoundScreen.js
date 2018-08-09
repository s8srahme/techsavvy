import React, { Component } from "react";
import { NotFound } from "../components";

export class NotFoundScreen extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {};
	// }

	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => {
		return (
			<div className="wrapper">
				<NotFound {...this.props} />
			</div>
		);
	};
}
