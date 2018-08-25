import {
	FETCH_ARTICLES,
	FETCH_ARTICLES_SUCCESS,
	FETCH_ARTICLES_FAILURE,
	FETCH_MORE_ARTICLES,
	FETCH_MORE_ARTICLES_SUCCESS,
	FETCH_MORE_ARTICLES_FAILURE,
	FETCH_ARTICLE,
	FETCH_ARTICLE_SUCCESS,
	FETCH_ARTICLE_FAILURE,
	UPDATE_ARTICLE,
	UPDATE_ARTICLE_SUCCESS,
	UPDATE_ARTICLE_FAILURE,
	CREATE_ARTICLE,
	CREATE_ARTICLE_SUCCESS,
	CREATE_ARTICLE_FAILURE
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

export const fetchAll = (seed, page, limit) => {
	return dispatch => {
		dispatch(get(seed === page ? FETCH_ARTICLES : FETCH_MORE_ARTICLES));
		services.articles
			.getAll(seed, page, limit)
			.then(res => {
				dispatch(getSuccess(seed === page ? FETCH_ARTICLES_SUCCESS : FETCH_MORE_ARTICLES_SUCCESS, res.data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(seed === page ? FETCH_ARTICLES_FAILURE : FETCH_MORE_ARTICLES_FAILURE, err));
			});
	};
};

export const fetchOne = id => {
	return dispatch => {
		dispatch(get(FETCH_ARTICLE));
		services.articles
			.getOne(id)
			.then(res => {
				dispatch(getSuccess(FETCH_ARTICLE_SUCCESS, res.data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(FETCH_ARTICLE_FAILURE, err));
			});
	};
};

export const update = (id, updateData) => {
	return dispatch => {
		dispatch(get(UPDATE_ARTICLE));
		services.articles
			.update(id, updateData)
			.then(res => {
				dispatch(getSuccess(UPDATE_ARTICLE_SUCCESS, res.data));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(UPDATE_ARTICLE_FAILURE, err));
			});
	};
};

export const create = createData => {
	return dispatch => {
		dispatch(get(CREATE_ARTICLE));
		services.articles
			.create(createData)
			.then(res => {
				dispatch(getSuccess(CREATE_ARTICLE_SUCCESS, res));
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(CREATE_ARTICLE_FAILURE, err));
			});
	};
};
