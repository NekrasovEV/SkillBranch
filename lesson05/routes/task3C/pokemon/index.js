const _ = require('lodash');

module.exports = {
	root: async function (req, res) {

		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = sorting.sort((pokemon1,pokemon2 ) => {
			let ret;

			if((pokemon1.name) > (pokemon2.name))
				return 1
			else if((pokemon1.name) < (pokemon2.name))
				return -1
			else
				return 0;
		})


		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	fat : async function (req, res) {

		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = sorting.sort((pokemon1,pokemon2 ) => {
			let ret;

			if((pokemon1.weight / pokemon1.height) > (pokemon2.weight / pokemon2.height))
				return 1
			else if((pokemon1.weight / pokemon1.height) < (pokemon2.weight / pokemon2.height))
				return -1
			else
				return 0;
		})


		return await res.json(limit(sort.reverse().map((pokemon)=>pokemon.name), query));
	},
	angular : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = sorting.sort((pokemon1,pokemon2 ) => {
			let ret;

			if((pokemon1.weight / pokemon1.height) > (pokemon2.weight / pokemon2.height))
				return 1
			else if((pokemon1.weight / pokemon1.height) < (pokemon2.weight / pokemon2.height))
				return -1
			else
				return 0;
		})


		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	huge : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.sortBy(sorting, 'height').reverse();

		return await res.json(_.sortBy(limit(sort.map((pokemon)=>pokemon.name), query),['height','name']));
	},
	micro : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.sortBy(sorting, 'height');


		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	heavy : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.sortBy(sorting, 'weight');

		return await res.json(limit(sort.reverse().map((pokemon)=>pokemon.name), query));
	},
	light : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.sortBy(sorting, 'weight');

		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	}
}

function limit(data, {offset = 0, limit = 20}){
	return data.filter((el) => el).slice(offset, limit);
}




