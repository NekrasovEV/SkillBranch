const AsyncRouter = require("express-async-router").AsyncRouter;

const routes = AsyncRouter();

module.exports = function(){

	const task3B = require('./task3B');

	routes.use('/task3B',task3B());

	routes.all('*', async function (req, res) {
		return await res.status(404).send("Not Found");
	})

	routes.use(async function (err, req, res, next) {
		return await res.status(500).send("An error occured!");
	});

	return routes;
}


