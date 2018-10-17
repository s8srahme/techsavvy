import * as articleActions from "./articleActions";
import * as mailActions from "./mailActions";
import * as historyActions from "./historyActions";
import * as commentActions from "./commentActions";
import { userActions } from "./userActions";
import { authenticationActions } from "./authenticationActions";

export default {
	articles: articleActions,
	users: userActions,
	comments: commentActions,
	authentication: authenticationActions,
	mails: mailActions,
	history: historyActions
};
