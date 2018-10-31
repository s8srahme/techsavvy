import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import actions from "redux/actions";

export const EventContext = React.createContext();

class EventContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offsetTop: 0,
			isOnline: true,
			windowWidth: 0,
			windowHeight: 0
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
		this._updateOnlineStatus();
		this._handleResize();

		window.addEventListener("scroll", this._handleScroll);
		window.addEventListener("resize", this._handleResize);
		window.addEventListener("online", this._updateOnlineStatus);
		window.addEventListener("offline", this._updateOnlineStatus);
	};

	componentWillUnmount = () => {
		this.updated = false;

		window.removeEventListener("resize", this._handleResize);
		window.removeEventListener("scroll", this._handleScroll);
		window.removeEventListener("online", this._updateOnlineStatus);
		window.removeEventListener("offline", this._updateOnlineStatus);
	};

	_updateOnlineStatus = event => {
		if (this.updated) this.setState({ isOnline: navigator.onLine });
	};

	_handleScroll = e => {
		let offsetTop = window.pageYOffset;
		if (this.props.location && this.props.location.pathname === "/") offsetTop = offsetTop + 100;
		if (this.updated) this.setState({ offsetTop });
	};

	_handleResize = e => {
		if (this.updated)
			this.setState({
				windowHeight: window.innerHeight,
				windowWidth: window.innerWidth
			});
	};

	render = () => {
		return <EventContext.Provider value={this.state}>{this.props.children}</EventContext.Provider>;
	};
}

// const mapStateToProps = ({ history }) => ({
// 		isModalOpen: history.isModalOpen,
// 		from: history.from,
// 		offsetTop: history.offsetTop,
// 		isPushingHistory: history.isPushingHistory
// 	}),
// 	mapDispatchToProps = dispatch =>
// 		bindActionCreators(
// 			{
// 				pushHistory: actions.history.pushHistory,
// 				clearHistory: actions.history.clear
// 			},
// 			dispatch
// 		);

// export default withRouter(
// 	connect(
// 		mapStateToProps,
// 		mapDispatchToProps
// 	)(EventProvider)
// );
export default withRouter(EventContextProvider);
