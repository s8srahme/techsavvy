import { userConstants } from "../constants";
import services from "services";

const getAll = () => {
	const request = () => {
		return { type: userConstants.GET_ALL_REQUEST };
	};
	const success = payload => {
		return { type: userConstants.GET_ALL_SUCCESS, payload };
	};
	const failure = () => {
		return { type: userConstants.GET_ALL_FAILURE };
	};

	return dispatch => {
		dispatch(request());
		services.users.getAll().then(
			({ data }) => dispatch(success(data)),
			error => {
				dispatch(failure(error));
				console.error(error);
			}
		);
	};
};

const getOne = ({ id }, cb = () => {}) => {
	const request = () => {
		return { type: userConstants.GET_ONE_REQUEST };
	};
	const success = payload => {
		return { type: userConstants.GET_ONE_SUCCESS, payload };
	};
	const failure = error => {
		return { type: userConstants.GET_ONE_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.getOne({ id }).then(
			({ data }) => {
				// console.log("userData:",data);
				dispatch(success(data));
			},
			error => {
				dispatch(failure(error));
				if (error.response.status === 401) cb();
				console.error(error);
			}
		);
	};
};

export const userActions = {
	getAll,
	getOne
};
