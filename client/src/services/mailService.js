export default (url, instance) => {
	return {
		create: toCreate => instance.post(`${url}/create`, toCreate)
	};
};
