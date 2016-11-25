const _ = require('lodash');

module.exports = {
	root: async function (req, res) {

		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.orderBy(sorting, ['name'], ['asc']);

		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	fat : async function (req, res) {

		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.orderBy(sorting, [(item) => {
			return item.weight/item.height;
		}, 'name'], ['desc', 'asc']);


		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	angular : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.orderBy(sorting, (item) => {
			return [item.weight/item.height, item.name];
		}, ['asc','asc']);

		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	huge : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.orderBy(sorting, ['height', 'name'], ['desc','asc']);

		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	micro : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.orderBy(sorting, ['height', 'name'], ['asc','asc']);


		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	heavy : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];
		let sort = _.orderBy(sorting, ['weight', 'name'], ['desc','asc']);

		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	},
	light : async function (req, res) {
		let {query, params, data} = req;
		let ret;
		let sorting = [...data];

		let sort = _.orderBy(sorting, ['weight', 'name'], ['asc','asc']);

		return await res.json(limit(sort.map((pokemon)=>pokemon.name), query));
	}
}

function limit(data, {offset = 0, limit = 20}){
	return data.filter((el) => el).slice(offset).slice(0,limit);
}




