import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { _renderRoutes } from "./config";
import { Header, Footer, Loader } from "components";
import GA from "./utils";

class App extends Component {
	state = {
		isLoading: true,
		isOnline: true
	};

	componentDidMount = () => {
		this._updateOnlineStatus();
		this.setState({ isLoading: false });

		window.addEventListener("online", this._updateOnlineStatus);
		window.addEventListener("offline", this._updateOnlineStatus);
	};

	componentWillMount = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.token) {
			this.props.getOne({ id: "self" });
		}
	};

	componentWillUnmount = () => {
		window.removeEventListener("online");
		window.removeEventListener("offline");
	};

	_updateOnlineStatus = event => {
		this.setState({ isOnline: navigator.onLine });
	};

	render = () => {
		const { isLoading, isOnline } = this.state;
		const { user, logout, handleClear, isLoadingUser, isLoadingLogout } = this.props;

		if (isLoading) {
			return (
				<div className="wrapper">
					<div className="news-loader-content pull">
						<Loader />
					</div>
				</div>
			);
		}
		return (
			<BrowserRouter>
				<main>
					<Header
						isLoadingUser={isLoadingUser}
						isLoadingLogout={isLoadingLogout}
						user={user}
						onLogout={logout}
						onClear={handleClear}
						isOnline={isOnline}
					/>
					{GA.init() && <GA.TrackerRoute />}
					{_renderRoutes()}
					<Footer />
				</main>
			</BrowserRouter>
		);
	};
}

const mapStateToProps = ({ authentication }) => ({
		user: authentication.user,
		isLoadingUser: authentication.isLoadingUser,
		hasErroredUser: authentication.hasErroredUser,
		userError: authentication.userError,

		isLoadingLogout: authentication.isLoadingLogout,
		hasErroredLogout: authentication.hasErroredLogout,
		logoutError: authentication.logoutError
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				getOne: actions.authentication.getOne,
				logout: actions.authentication.logout,
				handleClear: () => dispatch => {
					dispatch({ type: "CLEAR_ONE" });
					dispatch({ type: "CLEAR_SELF" });
				}
			},
			dispatch
		);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
