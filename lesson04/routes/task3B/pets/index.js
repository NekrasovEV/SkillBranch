module.exports =
{
	pets: async function (req, res) {

		let {query, params, data} = req;
		let ret;

		if (params.id === void(0)) {
			let keyFilter = Object.keys(query);

			if(keyFilter.length > 0){
				ret = data.pets.filter((pet) => {
					let isOk = true;
					keyFilter.forEach((key) =>{
						if(key == 'age_gt')
							isOk = isOk && pet['age'] > query[key];
						else if(key == 'age_lt')
							isOk = isOk && pet['age'] < query[key];
						else
							isOk = isOk && pet[key] == query[key];
					});

					return isOk;
				});


				return await res.json(ret);
			}
			else
				return await res.json(data.pets);
		}

		ret = data.pets.filter((pet) => pet.id == params.id);

		if (!ret.length)
			return await res.status(404).send("Not Found");

		return await res.json(ret[0]);
	},
	petsByUser : async function (req, res) {

		let {query, params, data} = req;
		let ret;

		ret = data.pets.filter((pet) => pet.userId == params.id);

		if (!ret.length)
			return await res.status(404).send("Not Found");

		return await res.json(ret);
	}
}