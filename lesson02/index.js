
let Handler = require('./library/handler');

/*
import express from 'express';

let app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
	*/

let handler = new Handler('https://pokeapi.co/api/v2/pokemon');
handler.process();