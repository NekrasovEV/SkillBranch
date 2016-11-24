const AsyncRouter = require("express-async-router").AsyncRouter;
const _ = require('lodash');
const users = require('./users');
const pets = require('./pets');
const populate = require('./populate');

const router = AsyncRouter();

module.exports = function(){

	router.get("/", async function (req, res) {
		return await res.json(req.data);
	});

	router.get("/users", users);
	router.get("/users/populate",populate.users);
	router.get("/users/:id/populate",populate.users);
	router.get("/users/:id",users);
	router.get("/users/:id/pets",pets.petsByUser);
	router.get("/pets",pets.pets);
	router.get("/pets/populate",populate.pets);
	router.get("/pets/:id/populate",populate.pets);
	router.get("/pets/:id",pets.pets);

	return router;
};