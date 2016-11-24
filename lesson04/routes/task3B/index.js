const AsyncRouter = require("express-async-router").AsyncRouter;
const _ = require('lodash');

const router = AsyncRouter();

module.exports = function(){

	router.get("/", async function (req, res) {
		return await res.json(req.computer);
	});

	return router;
};