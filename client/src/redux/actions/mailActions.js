import { CREATE_MAIL, CREATE_MAIL_SUCCESS, CREATE_MAIL_FAILURE } from "../constants";
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

export const create = (createData, cbs) => {
	return dispatch => {
		dispatch(get(CREATE_MAIL));
		services.mails
			.create(createData)
			.then(res => {
				dispatch(getSuccess(CREATE_MAIL_SUCCESS, res));
				cbs.onSuccessCb();
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(CREATE_MAIL_FAILURE, err));
				cbs.onFailureCb(err);
			});
	};
};
