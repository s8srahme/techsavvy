import { authenticationConstants } from "../constants";

const initialState = {
	user: {},
	isLoadingUser: false,
	hasErroredUser: false,
	userError: {},

	loginData: {},
	isAuthenticated: false,
	isLoadingLogin: false,
	hasErroredLogin: false,
	loginError: null,

	registerData: {},
	isLoadingRegister: false,
	hasErroredRegister: false,
	registerError: null,

	logoutData: {},
	isLoadingLogout: false,
	hasErroredLogout: false,
	logoutError: null
};

let user = JSON.parse(localStorage.getItem("user"));
if (user) {
	initialState.isAuthenticated = true;
	initialState.loginData = user;
}

export const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case authenticationConstants.LOGIN_REQUEST:
			return {
				...state,
				isLoadingLogin: true
			};
		case authenticationConstants.LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoadingLogin: false,
				loginData: action.payload,
				loginError: null
			};
		case authenticationConstants.LOGIN_FAILURE:
			return {
				...state,
				isLoadingLogin: false,
				hasErroredLogin: true,
				loginError: action.error
			};

		case authenticationConstants.REGISTER_REQUEST:
			return {
				...state,
				isLoadingRegister: true
			};
		case authenticationConstants.REGISTER_SUCCESS:
			return {
				...state,
				isLoadingRegister: false,
				registerData: action.payload.createdUser,
				registerError: null
			};
		case authenticationConstants.REGISTER_FAILURE:
			return {
				...state,
				isLoadingRegister: false,
				hasErroredRegister: true,
				registerError: action.error
			};

		case authenticationConstants.LOGOUT_REQUEST:
			return {
				...state,
				isLoadingLogout: true
			};
		case authenticationConstants.LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				loginData: {},

				logoutData: action.payload.data,
				isLoadingLogout: false,
				hasErroredLogout: false,
				logoutError: null
			};
		case authenticationConstants.LOGOUT_FAILURE:
			return {
				...state,
				isLoadingLogout: false,
				hasErroredLogout: true,
				logoutError: action.error
			};

		case authenticationConstants.GET_SELF_REQUEST:
			return {
				...state,
				isLoadingUser: true
			};
		case authenticationConstants.GET_SELF_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				isLoadingUser: false,
				userError: {}
			};
		case authenticationConstants.GET_SELF_FAILURE:
			return {
				...state,
				hasErroredUser: true,
				isLoadingUser: false,
				userError: action.error
			};

		case "CLEAR_SELF":
			return {
				...initialState,
				logoutData: state.logoutData,
				isLoadingLogout: state.isLoadingLogout,
				hasErroredLogout: state.hasErroredLogout,
				logoutError: state.loginError
			};

		default:
			return state;
	}
};
