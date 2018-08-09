import React, { Component } from "react";
import { Contact } from "../components";

export class ContactScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	render = () => {
		return <Contact />;
	};
}
