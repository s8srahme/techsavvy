import React, { Component } from "react";
import { NoMatch } from "../components";

export class NoMatchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => {
		return (
			<main className="wrapper">
				<NoMatch />
			</main>
		);
	};
}
