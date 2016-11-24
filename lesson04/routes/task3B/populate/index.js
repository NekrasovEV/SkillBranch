module.exports =
{
	pets:async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let {pets} = data;

		if(params && params.id){
			pets = pets.filter((pet) => pet.id == params.id)
		}

		ret = pets.map((pet) => {
			let user = data.users.filter((user) => user.id == pet.userId)[0];
			pet.user = user;
			return pet;
		});

		let keyFilter = Object.keys(query);

		if(keyFilter.length > 0){
			ret = ret.filter((pet) => {
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

		if (!ret.length)
			return await res.status(404).send("Not Found");

		if(ret.length == 1)
			return await res.json(ret[0]);
		else
			return await res.json(ret);
	},
	users:async function (req, res) {
		let {query, params, data} = req;
		let ret;

		let {users} = data;

		if(params && params.id){
			if (/\D/.test(params.id))
				users = users.filter((user) => user.username == params.id).slice(0,1);
			else
				users = users.filter((user) => user.id == params.id);
		}


		ret = users.map((user) => {
			let pets = data.pets.filter((pet) => pet.userId == user.id);
			user.pets = pets;
			return user;
		});

		if (query.havePet) {
			return await ret.filter((user) => {
				let pets = data.pets.filter((pet) => {
					return pet.userId === user.id && pet.type == query.havePet;
				})

				return pets.length > 0;
			})
		}

		let keyFilter = Object.keys(query);

		if(keyFilter.length > 0){
			ret = ret.filter((pet) => {
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

		if (!ret.length)
			return await res.status(404).send("Not Found");

		if(ret.length == 1)
			return await res.json(ret[0]);
		else
			return await res.json(ret);
	}

}
