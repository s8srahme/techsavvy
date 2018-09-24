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

const getOne = ({ id }) => {
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
				console.error(error);
			}
		);
	};
};

const update = (id, updateData) => {
	const request = () => {
		return { type: userConstants.UPDATE_REQUEST };
	};
	const success = payload => {
		return { type: userConstants.UPDATE_SUCCESS, payload };
	};
	const failure = error => {
		return { type: userConstants.UPDATE_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.update(id, updateData).then(
			({ data }) => {
				dispatch(success(data));
			},
			error => {
				dispatch(failure(error));
				console.error(error);
			}
		);
	};
};

const follow = ({ followingId, followerId }) => {
	const request = () => {
		return { type: userConstants.FOLLOW_REQUEST };
	};
	const success = payload => {
		return { type: userConstants.FOLLOW_SUCCESS, payload };
	};
	const failure = error => {
		return { type: userConstants.FOLLOW_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.follow({ followingId, followerId }).then(
			res => {
				dispatch(success(res));
			},
			error => {
				dispatch(failure(error));
				console.error(error);
			}
		);
	};
};

const unfollow = ({ id }) => {
	const request = () => {
		return { type: userConstants.UNFOLLOW_REQUEST };
	};
	const success = payload => {
		return { type: userConstants.UNFOLLOW_SUCCESS, payload };
	};
	const failure = error => {
		return { type: userConstants.UNFOLLOW_FAILURE, error };
	};

	return dispatch => {
		dispatch(request());
		services.users.unfollow({ id }).then(
			res => {
				// console.log(res);
				dispatch(success(res));
			},
			error => {
				dispatch(failure(error));
				console.error(error);
			}
		);
	};
};

export const userActions = {
	getAll,
	getOne,
	update,
	follow,
	unfollow
};
