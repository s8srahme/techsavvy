export default (url, instance) => {
	return {
		getOne: ({ id }) => instance.get(`${url}/${id}`),
		getAll: ({ page, limit }) => instance.get(`${url}?page=${page}&limit=${limit}`),
		update: (id, toUpdate) => instance.patch(`${url}/${id}`, toUpdate),
		delete: ({ id }) => instance.delete(`${url}/${id}`),
		follow: ({ followerId, followingId }) => instance.post(`${url}/${followingId}/follow`, { follower_id: followerId }),
		unfollow: ({ id }) => instance.post(`${url}/${id}/unfollow`),
		getAllArticles: ({ id, seed, page, limit }) => instance.get(`${url}/${id}/articles?page=${page}&limit=${limit}`)
	};
};
