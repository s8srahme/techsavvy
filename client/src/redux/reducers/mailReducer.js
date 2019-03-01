import { CREATE_MAIL, CREATE_MAIL_SUCCESS, CREATE_MAIL_FAILURE } from "../constants";

const initialState = {
	onCreateData: {},
	isFetchingCreateData: false,
	onCreateError: null
};

export const mailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_MAIL:
			return {
				...state,
				onCreateData: [],
				isFetchingCreateData: true
			};
		case CREATE_MAIL_SUCCESS:
			return {
				...state,
				isFetchingCreateData: false,
				onCreateData: action.payload,
				onCreateError: null
			};
		case CREATE_MAIL_FAILURE:
			return {
				...state,
				isFetchingCreateData: false,
				onCreateError: action.error
			};

		default:
			return state;
	}
};
