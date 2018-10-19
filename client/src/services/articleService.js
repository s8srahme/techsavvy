export default (url, instance) => {
	return {
		getOne: urlSlug =>
			instance.get(`${url}/${urlSlug}`, {
				// timeout: 5000
			}),
		getAll: (seed, page, limit) => instance.get(`${url}?page=${page}&limit=${limit}`),
		update: (id, updateData) => instance.patch(`${url}/${id}`, updateData),
		create: createData => instance.post(url, createData),
		delete: id => instance.delete(`${url}/${id}`),
		clap: id => instance.post(`${url}/${id}/clap`),
		unclap: id => instance.post(`${url}/${id}/unclap`),
		getAllComments: (id, seed, page, limit) => instance.get(`${url}/${id}/comments?page=${page}&limit=${limit}`)
	};
};
