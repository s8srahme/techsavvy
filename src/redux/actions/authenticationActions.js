import { authenticationConstants } from "../constants";
import services from "services";

const register = ({ email, password, name }) => {
	const request = () => {
		return { type: authenticationConstants.REGISTER_REQUEST };
	};
	const success = payload => {
		return { type: authenticationConstants.REGISTER_SUCCESS, payload };
	};
	const failure = error => {
		return { type: authenticationConstants.REGISTER_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.create({ email, password, name }).then(
			user => {
				dispatch(success(user.data));
			},
			error => {
				console.error("err:", error);
				dispatch(failure(error));
			}
		);
	};
};

const login = ({ email, password }) => {
	const request = () => {
		return { type: authenticationConstants.LOGIN_REQUEST };
	};
	const success = payload => {
		return { type: authenticationConstants.LOGIN_SUCCESS, payload };
	};
	const failure = error => {
		return { type: authenticationConstants.LOGIN_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.check({ email, password }).then(
			user => {
				// console.log(user);
				if (user.data.token) {
					localStorage.setItem("user", JSON.stringify(user.data));
				}
				dispatch(success(user.data));
			},
			error => {
				console.error("err:", error);
				dispatch(failure(error));
			}
		);
	};
};

export const logout = () => {
	const success = () => {
		return { type: authenticationConstants.LOGOUT_SUCCESS };
	};

	return dispatch => {
		localStorage.removeItem("user");
		dispatch(success());
	};
};

const getOne = ({ id }, cb = () => {}) => {
	const request = () => {
		return { type: authenticationConstants.GET_SELF_REQUEST };
	};
	const success = payload => {
		return { type: authenticationConstants.GET_SELF_SUCCESS, payload };
	};
	const failure = error => {
		return { type: authenticationConstants.GET_SELF_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.getOne({ id }).then(
			({ data }) => {
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

export const authenticationActions = {
	register,
	login,
	logout,
	getOne
};
