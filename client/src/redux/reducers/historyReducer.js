import { PUSH_HISTORY, CLEAR_HISTORY, PUSH_HISTORY_SUCCESS } from "../constants";

const initialState = { isPushingHistory: false, isModalOpen: false, from: [], offsetTop: 0 };

export const historyReducer = (state = initialState, action) => {
	switch (action.type) {
		case PUSH_HISTORY:
			return {
				...state,
				isPushingHistory: true
			};
		case PUSH_HISTORY_SUCCESS:
			return {
				...state,
				isPushingHistory: false,
				...(action.payload.from ? { from: [action.payload.from, ...(state.from.length ? [state.from[0]] : [])] } : {}),
				...("offsetTop" in action.payload ? { offsetTop: action.payload.offsetTop } : {}),
				...("isModalOpen" in action.payload ? { isModalOpen: action.payload.isModalOpen } : {})
			};
		case CLEAR_HISTORY:
			return initialState;

		default:
			return state;
	}
};
