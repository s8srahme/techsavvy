import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { _renderRoutes } from "./config";
import { Header, Footer } from "components";

class App extends Component {
	componentWillMount = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.token) {
			this.props.getOne({ id: "self" }, this.props.logout);
		}
	};

	render = () => {
		const { user, logout, handleClear, isLoading } = this.props;
		return (
			<BrowserRouter>
				<main>
					<Header isLoading={isLoading} user={user} onLogout={logout} onClear={handleClear} />
					{_renderRoutes()}
					<Footer />
				</main>
			</BrowserRouter>
		);
	};
}

const mapStateToProps = ({ users }) => ({
		user: users.user,
		hasErrored: users.hasErroredUser,
		isLoading: users.isLoadingUser,
		error: users.errorUser
	}),
	mapDispatchToProps = dispatch =>
		bindActionCreators(
			{
				getOne: actions.users.getOne,
				logout: actions.authentication.logout,
				handleClear: () => dispatch => dispatch({ type: "CLEAR_ONE" })
			},
			dispatch
		);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
