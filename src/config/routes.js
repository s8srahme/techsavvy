import React from "react";
import { BrowserRouter, withRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Header, Footer } from "../components";
import {
	BlogListScreen,
	BlogViewScreen,
	BlogEditorScreen,
	NoMatchScreen,
	HomeScreen,
	UserViewScreen
} from "../screens";

// const RootComponent = props => {
// 	const Component = withRouter(({ location, history, match }) => {
// 		// const prevPath = location.state ? location.state.prevPath : "/",
// 		// 	nextPath = location.pathname,
// 		// 	shouldAnimate = nextPath !== prevPath;
// 		// console.log(shouldAnimate, location.key);
// 		return (
// 			<div>
// 				<Header location={location} history={history} match={match} />
// 				<TransitionGroup>
// 					<CSSTransition
// 						key={location.pathname}
// 						classNames="fade"
// 						// enter={shouldAnimate}
// 						// exit={shouldAnimate}
// 						timeout={{ enter: 500, exit: 300 }}
// 						unmountOnExit
// 					>
// 						{props.children}
// 					</CSSTransition>
// 				</TransitionGroup>
// 				<Footer />
// 			</div>
// 		);
// 	});
// 	return <Component />;
// };

const RootComponent = withRouter(({ location, history, match }) => {
	return (
		<div>
			<Header location={location} history={history} match={match} />
			<TransitionGroup>
				<CSSTransition key={location.pathname} classNames="fade" timeout={{ enter: 500, exit: 300 }} unmountOnExit>
					<Switch
					// location={location}
					>
						<Route exact path="/" component={HomeScreen} />
						<Route exact path="/blog" component={BlogListScreen} />
						<Route exact path="/blog/new-story" component={BlogEditorScreen} />
						<Route
							exact
							path="/blog/:slug"
							component={({ match }) => {
								return <BlogViewScreen slug={match.params.slug} />;
							}}
						/>
						<Route exact path="/user/:id" component={UserViewScreen} />
						<Route component={NoMatchScreen} />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			<Footer />
		</div>
	);
});

export const Router = () => {
	return (
		<BrowserRouter>
			{/* <Route
				render={({ location }) => ( */}
			{/* <RootComponent>
				<Switch
				// location={location}
				>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/blog" component={BlogListScreen} />
					<Route exact path="/blog/new-story" component={BlogEditorScreen} />
					<Route
						exact
						path="/blog/:slug"
						component={({ match }) => {
							return <BlogViewScreen slug={match.params.slug} />;
						}}
					/>
					<Route component={NoMatchScreen} />
				</Switch>
			</RootComponent> */}
			<RootComponent />
			{/* )} /> */}
		</BrowserRouter>
	);
};
