import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NotFoundScreen, HomeScreen, AboutScreen, ContactScreen, LicenseScreen } from "screens";
import Articles from "./articleRoutes";
import Users from "./userRoutes";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem("user") ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: "/", state: { isModalOpen: true, from: props.location, offsetTop: window.pageYOffset } }}
				/>
			)
		}
	/>
);

export const _renderRoutes = () => (
	<Route
		render={({ location }) => (
			<TransitionGroup>
				<CSSTransition key={location.pathname} classNames="fade" timeout={{ enter: 500, exit: 300 }} unmountOnExit>
					<div>
						<Switch
						// location={location}
						>
							<Route exact path="/" component={HomeScreen} />
							<Route exact path="/about" component={AboutScreen} />
							<Route exact path="/contact" component={ContactScreen} />
							<Route exact path="/license" component={LicenseScreen} />
							<PrivateRoute path="/blog" component={Articles} />
							<PrivateRoute path="/user" component={Users} />
							<Route component={NotFoundScreen} />
						</Switch>
					</div>
				</CSSTransition>
			</TransitionGroup>
		)}
	/>
);
