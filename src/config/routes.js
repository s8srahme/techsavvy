import React from "react";
import { BrowserRouter, withRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Header, Footer } from "../components";
import { BlogListScreen, BlogViewScreen, NoMatchScreen, HomeScreen } from "../screens";

const links = [
	{
		name: "home",
		path: "/"
	},
	{
		name: "projects",
		path: "/blog"
	},
	{
		name: "about",
		path: "/about"
	},
	{
		name: "contact",
		path: "/contact"
	},
	{
		name: "photos",
		path: "/photos"
	}
];

const WithRouter = withRouter(({ location }) => (
	<div>
		<Header links={links} />
		<TransitionGroup>
			<CSSTransition key={location.key} classNames="fade" timeout={{ enter: 500, exit: 300 }}>
				<Switch
				// location={location}
				>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/blog" component={BlogListScreen} />
					<Route
						exact
						path="/blog/:slug"
						component={({ match }) => {
							return <BlogViewScreen slug={match.params.slug} />;
						}}
					/>
					<Route component={NoMatchScreen} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		<Footer />
	</div>
));

export const Router = () => {
	return (
		<BrowserRouter>
			{/* <Route
				render={({ location }) => ( */}
			<WithRouter />
			{/* )} /> */}
		</BrowserRouter>
	);
};
