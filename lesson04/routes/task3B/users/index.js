module.exports = async function (req, res) {

	let {query, params, data} = req;
	let ret;

	if (params.id === void(0)) {
		if (query.havePet) {
			return await data.users.filter((user) => {
				let pets = data.pets.filter((pet) => {
					return pet.userId === user.id && pet.type === query.havePet;
				})

				return pets.length > 0;
			})
		}


		let keyFilter = Object.keys(query);

		if (keyFilter.length > 0) {
			ret = data.users.filter((user) => {
				let isOk = true;
				keyFilter.forEach((key) => {
					isOk = user[key] == query[key];
				});

				return isOk;
			});


			return await res.json(ret);
		}
		else
			return await res.json(data.users);
	}


	if (/\D/.test(params.id))
		ret = data.users.filter((user) => user.username == params.id);
	else
		ret = data.users.filter((user) => user.id == params.id);

	if (!ret.length)
		return await res.status(404).send("Not Found");

	return await res.json(ret[0]);
};