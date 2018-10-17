import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "redux/actions";
import { Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NotFoundScreen, HomeScreen, AboutScreen, ContactScreen, LicenseScreen, PrivateScreen } from "screens";
import { ErrorBoundary } from "components";
import Articles from "./articleRoutes";
import Users from "./userRoutes";
import AppProvider from "../../AppProvider";

const ContextRoute = ({ contextComponent, component, ...rest }) => {
	const Provider = contextComponent,
		Component = component;
	return (
		<Route
			{...rest}
			render={props => (
				<Provider>
					<Component {...props} />
				</Provider>
			)}
		/>
	);
};

const PrivateRoute = ({ from, location, component: Component, path }) => {
	const user = JSON.parse(localStorage.getItem("user"));
	return (
		<Route
			path={path}
			// exact
			// strict
			render={props => {
				return user ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							search: `?redirect=${location.pathname.substring(1)}`
						}}
					/>
				);
			}}
		/>
	);
};

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
		),
	ConnectedPrivateRoute = connect(
		mapStateToProps,
		mapDispatchToProps
	)(PrivateRoute);

export const _renderRoutes = () => (
	<Route
		render={({ location, history, match }) => (
			<TransitionGroup>
				<CSSTransition key={location.pathname} classNames="fade" timeout={{ enter: 500, exit: 300 }} unmountOnExit>
					<ErrorBoundary hasError location={location} history={history}>
						<Switch location={location}>
							<ContextRoute exact path="/" contextComponent={AppProvider} component={HomeScreen} />
							<Route path="/login" component={PrivateScreen} />
							<Route exact path="/about" component={AboutScreen} />
							<Route exact path="/contact" component={ContactScreen} />
							<Route exact path="/license" component={LicenseScreen} />
							<ConnectedPrivateRoute match={match} path="/blog" component={Articles} />
							<ConnectedPrivateRoute match={match} path="/user" component={Users} />
							<Route component={NotFoundScreen} />
						</Switch>
					</ErrorBoundary>
				</CSSTransition>
			</TransitionGroup>
		)}
	/>
);
