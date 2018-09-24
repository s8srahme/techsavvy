import { userConstants } from "../constants";

const initialState = {
	users: [],
	isLoadingUsers: false,
	hasErroredUsers: false,
	usersError: {},

	user: {},
	isLoadingUser: false,
	hasErroredUser: false,
	userError: null,

	onUpdateData: {},
	isLoadingUpdateData: false,
	onUpdateError: null,

	onFollowData: {},
	isLoadingFollowData: false,
	onFollowError: {},

	onUnfollowData: {},
	onUnfollowError: {}
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
				usersError: error
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
				isLoadingUser: false,
				userError: null
			};
		case userConstants.GET_ONE_FAILURE:
			return {
				...state,
				hasErroredUser: true,
				isLoadingUser: false,
				userError: error
			};

		case userConstants.UPDATE_REQUEST:
			return {
				...state,
				isLoadingUpdateData: true
			};
		case userConstants.UPDATE_SUCCESS:
			return {
				...state,
				onUpdateData: payload,
				isLoadingUpdateData: false,
				onUpdateError: null
			};
		case userConstants.UPDATE_FAILURE:
			return {
				...state,
				isLoadingUpdateData: false,
				onUpdateError: error
			};

		case "CLEAR_ONE":
			return initialState;

		case userConstants.FOLLOW_REQUEST:
			return {
				...state,
				isLoadingFollowData: true
			};
		case userConstants.FOLLOW_SUCCESS:
			return {
				...state,
				onFollowData: payload,
				onUnfollowData: {},
				isLoadingFollowData: false,
				onFollowError: {}
			};
		case userConstants.FOLLOW_FAILURE:
			return {
				...state,
				isLoadingFollowData: false,
				onFollowError: error
			};

		case userConstants.UNFOLLOW_REQUEST:
			return {
				...state,
				isLoadingFollowData: true
			};
		case userConstants.UNFOLLOW_SUCCESS:
			return {
				...state,
				onUnfollowData: payload,
				isLoadingFollowData: false,
				onFollowData: {},
				onUnfollowError: {}
			};
		case userConstants.UNFOLLOW_FAILURE:
			return {
				...state,
				isLoadingFollowData: false,
				onUnfollowError: error
			};

		default:
			return state;
	}
};
