import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./redux/configureStore";
import App from "./App";

const store = configureStore(),
	rootElement = document.getElementById("root");

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
registerServiceWorker();
// unregister();
