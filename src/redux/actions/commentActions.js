import {
	FETCH_COMMENTS,
	FETCH_COMMENTS_SUCCESS,
	FETCH_COMMENTS_FAILURE,
	FETCH_MORE_COMMENTS,
	FETCH_MORE_COMMENTS_SUCCESS,
	FETCH_MORE_COMMENTS_FAILURE,
	FETCH_COMMENT,
	FETCH_COMMENT_SUCCESS,
	FETCH_COMMENT_FAILURE,
	UPDATE_COMMENT,
	UPDATE_COMMENT_SUCCESS,
	UPDATE_COMMENT_FAILURE,
	DELETE_COMMENT,
	DELETE_COMMENT_SUCCESS,
	DELETE_COMMENT_FAILURE,
	CREATE_COMMENT,
	CREATE_COMMENT_SUCCESS,
	CREATE_COMMENT_FAILURE
} from "../constants";
import services from "services";

const get = type => {
	return {
		type
	};
};
const getSuccess = (type, payload) => {
	return {
		type,
		payload
	};
};
const getFailure = (type, error) => {
	return {
		type,
		error
	};
};

export const fetchAll = (id, seed, page, limit) => {
	return dispatch => {
		dispatch(get(seed === page ? FETCH_COMMENTS : FETCH_MORE_COMMENTS));
		services.articles
			.getAllComments(id, seed, page, limit)
			.then(res => {
				dispatch(getSuccess(seed === page ? FETCH_COMMENTS_SUCCESS : FETCH_MORE_COMMENTS_SUCCESS, res.data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(seed === page ? FETCH_COMMENTS_FAILURE : FETCH_MORE_COMMENTS_FAILURE, err));
			});
	};
};

export const fetchOne = id => {
	return dispatch => {
		dispatch(get(FETCH_COMMENT));
		services.comments
			.getOne(id)
			.then(res => {
				dispatch(getSuccess(FETCH_COMMENT_SUCCESS, res.data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(FETCH_COMMENT_FAILURE, err));
			});
	};
};

export const update = (id, updateData) => {
	return dispatch => {
		dispatch(get(UPDATE_COMMENT));
		services.comments
			.update(id, updateData)
			.then(res => {
				dispatch(getSuccess(UPDATE_COMMENT_SUCCESS, res.data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(UPDATE_COMMENT_FAILURE, err));
			});
	};
};

export const remove = (id, cbs) => {
	return dispatch => {
		dispatch(get(DELETE_COMMENT));
		services.comments
			.delete(id)
			.then(res => {
				dispatch(
					getSuccess(DELETE_COMMENT_SUCCESS, {
						...res,
						...{
							data: {
								message: "Comment deleted",
								deletedComment: {
									_id: id
								}
							}
						}
					})
				);
				cbs.onSuccessCb();
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(DELETE_COMMENT_FAILURE, err));
				cbs.onFailureCb(err);
			});
	};
};

export const create = (createData, cbs) => {
	return dispatch => {
		dispatch(get(CREATE_COMMENT));
		services.comments
			.create(createData)
			.then(res => {
				dispatch(getSuccess(CREATE_COMMENT_SUCCESS, res));
				cbs.onSuccessCb();
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(CREATE_COMMENT_FAILURE, err));
				cbs.onFailureCb(err);
			});
	};
};
