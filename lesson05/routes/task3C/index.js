const AsyncRouter = require("express-async-router").AsyncRouter;
const _ = require('lodash');
const pokemon = require('./pokemon');

const router = AsyncRouter();

module.exports = function(){

	router.get("/",pokemon.root );
	router.get("/fat", pokemon.fat);
	router.get("/angular", pokemon.angular);
	router.get("/huge", pokemon.huge);
	router.get("/light", pokemon.light);
	router.get("/micro", pokemon.micro);
	router.get("/heavy", pokemon.heavy);


	return router;
};