import React, { Component } from "react";
import { UserForm } from "../../components";

export class UserFormScreen extends Component {
	// componentWillMount = () => {
	// 	window.scrollTo(0, 0);
	// };

	render = () => {
		const { showModal, onClose } = this.props;
		return <UserForm showModal={showModal} onClose={onClose} />;
	};
}
