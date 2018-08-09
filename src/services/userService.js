export default (url, instance) => {
	return {
		getOne: ({ id }) => instance.get(`${url}/${id}`),
		getAll: () => instance.get(url),
		update: toUpdate => instance.put(`${url}/${toUpdate.id}`, toUpdate),
		create: toCreate => instance.post(`${url}/signup`, toCreate),
		check: toCheck => instance.post(`${url}/login`, toCheck),
		delete: ({ id }) => instance.delete(`${url}/${id}`),
		follow: ({ id }) => instance.put(`${url}/${id}/follow`),
		unfollow: ({ id }) => instance.put(`${url}/${id}/unfollow`),
		getAllArticles: ({ id }) => instance.get(`${url}/${id}/articles`)
	};
};
