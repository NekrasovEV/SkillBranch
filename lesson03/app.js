const express = require('express');
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const routes = require('./routes');

const prepareDataUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

class App {
	constructor(){
		this.computer = {};
	}

	init(){
		this.app = express();
	}

	async prepare(){
		let res;
		try{
			res = await fetch(prepareDataUrl)

			if(!res)
				throw new Error("Не удалось загрузить структуру компьютера");

			this.computer = await res.json();
		}
		catch(err) {
			console.log(err);
		}
	}

	startApp(){
		this.app.listen(3000, function () {
			console.log('Example app listening on port 3000!');
		})
	}

	async loadMiddleware(){
		this.app.use(cors());
		this.app.use(async  (req, res, next) => {
			req.computer = this.computer;
			next();
		})
	}

	loadRoute(){
		this.app.use('/',routes(this.computer))
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