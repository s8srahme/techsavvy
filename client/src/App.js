import React, { Component } from "react";
import { _renderRoutes } from "./config";
import { Header, Footer } from "components";
import GA from "./utils";
import AppProvider from "./AppProvider";

class App extends Component {
	render = () => (
		<main>
			<AppProvider>
				<Header />
			</AppProvider>
			{GA.init() && <GA.TrackerRoute />}
			{_renderRoutes()}
			<Footer />
		</main>
	);
}

export default App;
