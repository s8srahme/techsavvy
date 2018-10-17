import { combineReducers } from "redux";
import { articleReducer } from "./articleReducer";
import { mailReducer } from "./mailReducer";
import { commentReducer } from "./commentReducer";
import { userReducer } from "./userReducer";
import { authenticationReducer } from "./authenticationReducer";
import { historyReducer } from "./historyReducer";

export default combineReducers({
	articles: articleReducer,
	users: userReducer,
	authentication: authenticationReducer,
	comments: commentReducer,
	mails: mailReducer,
	history: historyReducer
});
