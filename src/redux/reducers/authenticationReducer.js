import { userConstants } from "../constants";

const initialState = {
	user: {},
	hasLoggedIn: false,
	isLoadingLogin: false,
	isLoadingSignup: false,
	hasErroredLogin: false,
	hasErroredSignup: false
};

let user = JSON.parse(localStorage.getItem("user"));
if (user) {
	initialState.hasLoggedIn = true;
	initialState.user = user;
}

export const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				...state,
				isLoadingLogin: true
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				...state,
				hasLoggedIn: true,
				isLoadingLogin: false,
				user: action.payload
			};
		case userConstants.LOGIN_FAILURE:
			return {
				...state,
				isLoadingLogin: false,
				hasErroredLogin: true
			};

		case userConstants.LOGOUT_SUCCESS:
			return {
				...state,
				hasLoggedIn: false,
				user: {}
			};

		default:
			return state;
	}
};
