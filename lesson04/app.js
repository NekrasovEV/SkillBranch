const express = require('express');
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const routes = require('./routes');

const prepareDataUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

class App {
	constructor(){
		this.data = {};
	}

	init(){
		this.app = express();
	}

	async prepare(){
		let res;
		let json;
		try{
			res = await fetch(prepareDataUrl)

			if(!res)
				throw new Error("Не удалось загрузить структуру компьютера");

			json = await res.json();
		}
		catch(err) {
			console.log(err);
		}

		return json;
	}

	startApp(){
		this.app.listen(3000, function () {
			console.log('Example app listening on port 3000!');
		})
	}

	async loadMiddleware(){
		this.app.use(cors());
		this.app.use(async  (req, res, next) => {
			req.data = this.data;
			next();
		})
		this.app.use(async  (req, res, next) => {

			req.data = await this.prepare()
			next();
		})
	}

	loadRoute(){
		this.app.use('/',routes())
	}

	async run(){
		this.init();
		await this.prepare();
		await this.loadMiddleware();
		this.loadRoute();
		this.startApp();
	}
}

module.exports = App;