const AsyncRouter = require("express-async-router").AsyncRouter;
const _ = require('lodash');

const router = AsyncRouter();

module.exports = function(){

	router.get("/", async function (req, res) {
		return await res.json(req.data);
	});

	router.get("/users");
	router.get("/users/:id");
	router.get("/users/:id/pets");
	router.get("/pets");
	router.get("/pets/:id");




	return router;
};