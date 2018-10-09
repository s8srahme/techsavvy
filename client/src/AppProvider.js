import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export const AppContext = React.createContext();

class AppProvider extends Component {
	state = {
		offsetTop: 0
		// inc: () => {
		// 	this.setState({ number: this.state.number + 1 });
		// }
	};

	componentDidMount = () => {
		this._handleScroll();
		window.addEventListener("scroll", this._handleScroll);
	};

	componentWillUnmount = () => {
		window.removeEventListener("scroll", this._handleScroll);
	};

	_handleScroll = e => {
		let offsetTop = window.pageYOffset;
		if (this.props.location.pathname === "/") offsetTop = offsetTop + 100;
		this.setState({ offsetTop });
	};

	render = () => {
		return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
	};
}

export default withRouter(AppProvider);
