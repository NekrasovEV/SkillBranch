const AsyncRouter = require("express-async-router").AsyncRouter;

const routes = AsyncRouter();

module.exports = function(param){

	const task3A = require('./task3A');

	routes.use('/task3A',task3A(param));

	routes.all('*', async function (req, res) {
		return await res.status(404).send("Not Found");
	})

	routes.use(async function (err, req, res, next) {
		return await res.status(500).send("An error occured!");
	});

	return routes;
}


