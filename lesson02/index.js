const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.get('/', function (req, res) {
	let {a = 0, b = 0} = req.query;

	a = (+a) || 0;
	b = (+b) || 0;

	let sum = a + b;

	res.send(sum.toString());
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});