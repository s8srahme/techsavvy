import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";

export const AppContext = React.createContext();

class AppProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offsetTop: 0
			// inc: () => {
			// 	this.setState({ number: this.state.number + 1 });
			// }
		};
		this.updated = false;
	}

	// componentDidUpdate = (prevProps, prevState, snapshot) => {};

	componentDidMount = () => {
		this.updated = true;
		this._handleScroll();
		window.addEventListener("scroll", this._handleScroll);
	};

	componentWillUnmount = () => {
		this.updated = false;
		window.removeEventListener("scroll", this._handleScroll);
	};

	_handleScroll = e => {
		let offsetTop = window.pageYOffset;
		if (this.props.location && this.props.location.pathname === "/") offsetTop = offsetTop + 100;
		if (this.updated) this.setState({ offsetTop });
	};

	render = () => {
		return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
	};
}

const mapStateToProps = ({ history }) => ({
		isModalOpen: history.isModalOpen,
		from: history.from,
		offsetTop: history.offsetTop,
		isPushingHistory: history.isPushingHistory
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				pushHistory: actions.history.pushHistory,
				clearHistory: actions.history.clear
			},
			dispatch
		);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AppProvider)
);
