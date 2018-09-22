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
		services.auth.register({ email, password, name }).then(
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
		services.auth.login({ email, password }).then(
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

export const logout = cb => {
	const request = () => {
		return { type: authenticationConstants.LOGOUT_REQUEST };
	};
	const success = payload => {
		return { type: authenticationConstants.LOGOUT_SUCCESS, payload };
	};
	const failure = error => {
		return { type: authenticationConstants.LOGOUT_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		// if (typeof cb === "function") {
		services.auth.logout().then(
			response => {
				dispatch(success(response));
				localStorage.removeItem("user");
				cb();
			},
			error => {
				console.error("err:", error);
				dispatch(failure(error));
			}
		);
		// } else {
		// 	dispatch(
		// 		success({
		// 			data: {
		// 				success: true,
		// 				message: "Session expired"
		// 			}
		// 		})
		// 	);
		// 	dispatch({ type: "CLEAR_ONE" });
		// 	dispatch({ type: "CLEAR_SELF" });
		// 	localStorage.removeItem("user");
		// }
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
