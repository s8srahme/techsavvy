import { combineReducers } from "redux";
import { articleReducer } from "./articleReducer";
import { userReducer } from "./userReducer";
import { authenticationReducer } from "./authenticationReducer";

export default combineReducers({
	articles: articleReducer,
	users: userReducer,
	authentication: authenticationReducer
});
