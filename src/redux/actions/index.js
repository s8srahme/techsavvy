import * as articleActions from "./articleActions";
import { userActions } from "./userActions";
import { authenticationActions } from "./authenticationActions";

export default {
	articles: articleActions,
	users: userActions,
	authentication: authenticationActions
};
