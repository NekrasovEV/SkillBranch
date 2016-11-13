const AsyncRouter = require("express-async-router").AsyncRouter;
const _ = require('lodash');

const router = AsyncRouter();

module.exports = function(param){

	router.get("/", async function (req, res) {
		return await res.json(req.computer);
	});

	let pathes = [];

	function createPath(obj, originPath = "") {
		_.forIn(obj, function (value, key) {
			path = originPath;
			path += `/${key}`;
			if (_.isObject(value)) {
				createPath(value, path);
			}else{
				pathes.push(path);
			}
		});
		if(originPath)
			pathes.push(originPath);
	}

	createPath(param);

	pathes.forEach((item)=>{
		router.get(item, async function (req, res) {
			let data = item.split('/').filter((el)=>el);
			let elem = data.reduce(function(item, current) {
				return item[current];
			}, req.computer);

			return await res.json(elem);
		});
	});

	router.get("/volumes", async function (req, res) {

		let ret = {};
		let data = {};
		req.computer.hdd.forEach((item)=>{
			ret[item.volume] = ret[item.volume] || 0;
			ret[item.volume] += item.size;
		});

		_.forIn(ret, function (value, key) {
			data[key] = value.toString() + "B";
		});

		return await res.json(data);
	});


	return router;
};