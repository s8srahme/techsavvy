import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { instance } from "services";

const loggerMiddleware = createLogger({
		predicate: () => process.env.NODE_ENV === "development"
	}),
	instanceMiddleware = store => next => action => {
		// console.log("Middleware triggered:", action);
		const user = JSON.parse(localStorage.getItem("user")),
			loginData = store.getState().authentication.loginData;
		// console.log(user, loginData);

		if (user && user.success === false) {
			localStorage.removeItem("user");
			store.dispatch({
				type: "LOGOUT_SUCCESS",
				payload: {
					data: {
						success: true,
						message: "Session expired"
					}
				}
			});
			store.dispatch({ type: "CLEAR_ONE" });
			store.dispatch({ type: "CLEAR_SELF" });
		} else if (user && user.token) {
			instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
		} else if (loginData && loginData.token) {
			instance.defaults.headers.common["Authorization"] = "Bearer " + loginData.token;
		}
		next(action);
	},
	middlewares = [thunkMiddleware, loggerMiddleware, instanceMiddleware];

export default (initialState = {}) => {
	return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
};
