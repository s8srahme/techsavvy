export default (url, instance) => {
	return {
		register: toRegister => instance.post(`${url}/signup`, toRegister),
		login: toLogin => instance.post(`${url}/login`, toLogin),
		logout: () => instance.post(`${url}/logout`)
	};
};
