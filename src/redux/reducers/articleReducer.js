import { FETCHING_LIST, FETCHING_LIST_SUCCESS, FETCHING_LIST_FAILURE } from "../constants";

const initialState = {
	list: [],
	isFetchingList: false,
	hasErroredList: false
};

export const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_LIST:
			return {
				...state,
				list: [],
				isFetchingList: true
			};
		case FETCHING_LIST_SUCCESS:
			return {
				...state,
				isFetchingList: false,
				list: action.payload
			};
		case FETCHING_LIST_FAILURE:
			return {
				...state,
				isFetchingList: false,
				hasErroredList: true
			};
		default:
			return state;
	}
};
