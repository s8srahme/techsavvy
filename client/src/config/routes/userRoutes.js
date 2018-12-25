import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserDetailScreen, UserEditingScreen, NotFoundScreen } from "screens";

const UserRoutes = ({ match, location, history }) => (
	<Switch>
		<Route exact path={`${match.url}/:userId`} render={props => <UserDetailScreen {...props} />} />
		<Route exact path={`${match.url}/:userId/edit`} component={UserEditingScreen} />
		<Route component={NotFoundScreen} />
	</Switch>
);
UserRoutes.displayName = "UserRoutes";

export default UserRoutes;
