import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { instance } from "services";

const loggerMiddleware = createLogger({
		predicate: () => process.env.NODE_ENV === "development"
	}),
	instanceMiddleware = store => next => action => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.token) {
			instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
		} else if (store.getState().authentication.userLogin) {
			instance.defaults.headers.common["Authorization"] = "Bearer " + store.getState().authentication.userLogin.token;
		}
		next(action);
	},
	middlewares = [thunkMiddleware, loggerMiddleware, instanceMiddleware];

export default (initialState = {}) => {
	return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
};
