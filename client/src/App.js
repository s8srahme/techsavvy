import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { _renderRoutes } from "config";
import { Footer, Header } from "components";
import { GA, CombinedContextProvider } from "utils";

class App extends Component {
	render = () => (
		<main>
			<BrowserRouter>
				<CombinedContextProvider>
					<Header />
					{GA.init() && <GA.TrackerRoute />}
					{_renderRoutes()}
					<Footer />
				</CombinedContextProvider>
			</BrowserRouter>
		</main>
	);
}

export default App;
