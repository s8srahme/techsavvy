module.exports = req => {
	// console.log(req.query);

	let pages = req.query.page,
		page;
	if (!Array.isArray(pages)) {
		pages = [pages];
	}
	for (let pg of pages) {
		page = parseInt(pg, 10);
		if (isNaN(page) || page < 1) page = 1;
	}

	let limits = req.query.limit,
		limit;
	if (!Array.isArray(limits)) {
		limits = [limits];
	}
	for (let lmt of limits) {
		limit = parseInt(lmt, 10);
		if (isNaN(limit) || limit < 1) limit = 10;
		else if (limit > 50) limit = 50;
	}

	let sort = {};
	if (req.query.sort_by) {
		let sortItems = req.query.sort_by.split(",");
		for (let sortItem of sortItems) {
			let res = sortItem.split("."),
				key = res[0],
				dir = res[1];
			sort[key] = dir;
		}
	} else {
		sort = {
			created_at: "desc"
		};
	}

	let filter = {};
	Object.keys(req.query).forEach(key => {
		if (!["page", "limit", "sort_by"].includes(key)) {
			let values = req.query[key];
			if (!Array.isArray(values)) {
				values = [values];
			}
			for (let value of values) {
				let res = value.match("lte:|lt:|gte:|gt:");
				if (res) {
					let [k, val] = value.split(":"),
						obj = filter[key] || {};
					k = "$" + k;
					obj[k] = val;
					filter[key] = obj;
				} else filter[key] = value;
			}
		}
	});

	// console.log({ page, limit, sort, filter });
	return { page, limit, sort, filter };
};
