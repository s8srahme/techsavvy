import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./redux/configureStore";
import App from "./App";

const store = configureStore(),
	rootElement = document.getElementById("root");

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	rootElement
);
registerServiceWorker();
// unregister();
