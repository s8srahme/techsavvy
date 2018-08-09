import { FETCHING_LIST, FETCHING_LIST_SUCCESS, FETCHING_LIST_FAILURE } from "../constants";
import services from "services";

export const getList = () => {
	return {
		type: FETCHING_LIST
	};
};

export const getListSuccess = data => {
	return {
		type: FETCHING_LIST_SUCCESS,
		payload: data
	};
};

export const getListFailure = () => {
	return {
		type: FETCHING_LIST_FAILURE
	};
};

export const fetchList = () => {
	return dispatch => {
		dispatch(getList());
		services.articles
			.getAll()
			.then(data => {
				dispatch(getListSuccess(data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getListFailure());
			});
	};
};
