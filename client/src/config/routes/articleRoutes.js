import React from "react";
import { Switch, Route } from "react-router-dom";
import {
	ArticleListScreen,
	ArticleDetailScreen,
	ArticleEditorScreen,
	NotFoundScreen,
	ArticleFormScreen
} from "screens";

export default Object.assign(
	({ match }) => (
		<Switch>
			<Route exact path={match.url} component={ArticleListScreen} />
			<Route exact path={`${match.url}/create`} component={ArticleEditorScreen} />
			<Route
				exact
				path={`${match.url}/:slug`}
				// component={({ match }) => {
				// 	return <ArticleDetailScreen slug={match.params.slug} />;
				// }}
				component={ArticleDetailScreen}
			/>
			<Route exact path={`${match.url}/:slug/edit`} component={ArticleFormScreen} />
			<Route component={NotFoundScreen} />
		</Switch>
	),
	{ displayName: "ArticleRoutes" }
);
