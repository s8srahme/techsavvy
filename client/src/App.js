import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { _renderRoutes } from "./config";
import { Header, Footer, Loader } from "components";

class App extends Component {
	state = {
		isLoading: true
	};

	componentDidMount = () => {
		this.setState({ isLoading: false });
	};

	componentWillMount = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.token) {
			this.props.getOne({ id: "self" });
		}
	};

	render = () => {
		const { isLoading } = this.state;
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
					/>
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
