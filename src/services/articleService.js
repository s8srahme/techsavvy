export default (url, instance) => {
	return {
		getOne: ({ id }) =>
			instance.get(`${url}/${id}`, {
				timeout: 5000
			}),
		getAll: () => instance.get(url),
		update: toUpdate => instance.put(`${url}/${toUpdate.id}`, toUpdate),
		create: toCreate => instance.put(url, toCreate),
		delete: ({ id }) => instance.delete(`${url}/${id}`),
		clap: ({ id }) => instance.post(`${url}/${id}/clap`),
		unclap: ({ id }) => instance.post(`${url}/${id}/unclap`),
		getAllComments: ({ id }) => instance.get(`${url}/${id}/comments`)
	};
};
