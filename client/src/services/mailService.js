export default (url, instance) => {
	return {
		contact: toContact => instance.post(`${url}/contact`, toContact)
	};
};
