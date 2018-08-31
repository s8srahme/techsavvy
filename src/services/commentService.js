export default (url, instance) => {
	return {
		getOne: id => instance.get(`${url}/${id}`),
		getAll: (seed, page, limit) => instance.get(`${url}?page=${page}&limit=${limit}`),
		update: (id, updateData) => instance.patch(`${url}/${id}`, updateData),
		create: createData => instance.post(url, createData),
		delete: id => instance.delete(`${url}/${id}`)
	};
};
