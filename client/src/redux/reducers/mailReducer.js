import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "../constants";

const initialState = {
	onContactData: {},
	isFetchingContactData: false,
	onContactError: null
};

export const mailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CONTACT_REQUEST:
			return {
				...state,
				onContactData: [],
				isFetchingContactData: true
			};
		case CONTACT_SUCCESS:
			return {
				...state,
				isFetchingContactData: false,
				onContactData: action.payload,
				onContactError: null
			};
		case CONTACT_FAILURE:
			return {
				...state,
				isFetchingContactData: false,
				onContactError: action.error
			};

		default:
			return state;
	}
};
