let fetch = require('isomorphic-fetch');

class Handler {
	constructor(url){
		this.url = url;
	}

	async process(){
		let listUrl = [];
		let result = [];
		let resultPokemon;

		try{
			listUrl = await this.prepareUrl(this.url);

			resultPokemon = listUrl.map(async (url) => {
				let data = await this.load(url);

				return data;
			});

			result = await Promise.all(resultPokemon);
		}catch (e){
			console.log(e);
		}



		result.sort((a,b) =>{
			let ret = 0;
			if(a.weight > b.weight)
				ret = 1;
			else if(a.weight < b.weight)
				ret = -1;

			return ret;
		});

		result.forEach((item) => console.log(item));
	}

	async prepareUrl(url){
		let listUrl = [];
		let result = [];
		let data = await fetch(url).then((response) => response.json()).catch((err)=>console.log(err));

		if(typeof data.next !== 'string')
			return [];
		/*
		if(data.next)
			result = await this.prepareUrl(data.next);
		*/
		listUrl = data.results.map(({url}) => url);

		return [...listUrl, ...result];
	}

	async load(url){
		let result = await fetch(url).then((response) => response.json()).catch((err)=>console.log(err));

		if(result.name)
			return {name:result.name, weight:result.weight};
		else
			return null;
	}
}

module.exports = Handler;