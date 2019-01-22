import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "../constants";
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

export const contact = (contactData, cbs) => {
	return dispatch => {
		dispatch(get(CONTACT_REQUEST));
		services.mails
			.contact(contactData)
			.then(res => {
				dispatch(getSuccess(CONTACT_SUCCESS, res));
				cbs.onSuccessCb();
			})
			.catch(err => {
				console.log("err:", err);
				dispatch(getFailure(CONTACT_FAILURE, err));
				cbs.onFailureCb(err);
			});
	};
};
