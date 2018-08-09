import { userConstants } from "../constants";

const initialState = {
	users: [],
	isLoadingUsers: false,
	hasErroredUsers: false,
	errorUsers: {},

	user: {},
	isLoadingUser: false,
	hasErroredUser: false,
	errorUser: {}
};

export const userReducer = (state = initialState, { type, payload, error }) => {
	switch (type) {
		case userConstants.GET_ALL_REQUEST:
			return {
				...state,
				isLoadingUsers: true
			};
		case userConstants.GET_ALL_SUCCESS:
			return {
				...state,
				users: payload.users,
				isLoadingUsers: false
			};
		case userConstants.GET_ALL_FAILURE:
			return {
				...state,
				hasErroredUsers: true,
				isLoadingUsers: false,
				errorUsers: error
			};

		case userConstants.GET_ONE_REQUEST:
			return {
				...state,
				isLoadingUser: true
			};
		case userConstants.GET_ONE_SUCCESS:
			return {
				...state,
				user: payload.user,
				isLoadingUser: false
			};
		case userConstants.GET_ONE_FAILURE:
			return {
				...state,
				hasErroredUser: true,
				isLoadingUser: false,
				errorUser: error
			};

		case "CLEAR_ONE":
			return initialState;

		default:
			return state;
	}
};
