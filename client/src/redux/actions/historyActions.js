import { PUSH_HISTORY, PUSH_HISTORY_SUCCESS, CLEAR_HISTORY } from "../constants";

export const pushHistory = (history, cb) => {
	return dispatch => {
		dispatch({
			type: PUSH_HISTORY
		});
		dispatch({
			type: PUSH_HISTORY_SUCCESS,
			payload: history
		});
		if (cb) cb();
	};
};

export const clear = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_HISTORY
		});
	};
};
