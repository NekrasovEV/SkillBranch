const AsyncRouter = require("express-async-router").AsyncRouter;

const routes = AsyncRouter();

module.exports = function(){

	const task3C = require('./task3C');

	routes.use('/task3C',task3C());

	routes.all('*', async function (req, res) {
		return await res.status(404).send("Not Found");
	})

	routes.use(async function (err, req, res, next) {
		return await res.status(500).send("An error occured!");
	});

	return routes;
}


