import { userConstants } from "../constants";
import services from "services";

const login = ({ email, password }) => {
	const request = () => {
		return { type: userConstants.LOGIN_REQUEST };
	};
	const success = payload => {
		return { type: userConstants.LOGIN_SUCCESS, payload };
	};
	const failure = error => {
		return { type: userConstants.LOGIN_FAILURE, error };
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
				dispatch(failure());
			}
		);
	};
};

export const logout = () => {
	const success = () => {
		return { type: userConstants.LOGOUT_SUCCESS };
	};

	return dispatch => {
		localStorage.removeItem("user");
		dispatch(success());
	};
};

export const authenticationActions = {
	login,
	logout
};
