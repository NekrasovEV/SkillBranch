const express = require('express');
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const routes = require('./routes');
const fs	= require('fs');

const prepareDataUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10000';

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
		let fullData = [];
		try{

			if(fs.statSync('pokeapi.json')){
				let data = fs.readFileSync('pokeapi_real.json');
				fullData = JSON.parse(data);
			}
			else
			{
				res = await fetch(prepareDataUrl)


				if (!res)
					throw new Error("Не удалось загрузить pokeapi");

				json = await res.json();

				let maxPokemon = json.results.length;


				this.data = json;
				let i = 0;

				async function next() {
					try {
						let data = await fetch(json.results[i].url);
						let jsonData = await data.json();
						console.log(json.results[i].url);
						fullData.push({height: jsonData.height, weight: jsonData.weight, name: jsonData.name});
						i++;
						if (i < maxPokemon)
							await next();
					} catch (error) {
						console.log('Ошибка, повторяю попытку');
						await next();
					}
				}

				await next();

				fs.writeFileSync('pokeapi.json', JSON.stringify(fullData));
			}
			//res = await fetch('pokeapi.json');
			this.data = fullData;
		}
		catch(err) {
			console.log(err);
		}
	}

	startApp(){
		this.app.listen(3001, function () {
			console.log('Example app listening on port 3000!');
		})
	}

	async loadMiddleware(){
		this.app.use(cors());
		this.app.use(async  (req, res, next) => {
			req.data = this.data;
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