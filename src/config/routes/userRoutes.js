import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserDetailScreen, UserEditingScreen, NotFoundScreen } from "screens";

export default ({ match }) => (
	<Switch>
		<Route exact path={`${match.url}/:userId`} component={UserDetailScreen} />
		<Route exact path={`${match.url}/:userId/edit`} component={UserEditingScreen} />
		<Route component={NotFoundScreen} />
	</Switch>
);
