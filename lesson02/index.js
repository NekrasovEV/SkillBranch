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


app.get('/task2b', function (req, res) {
	let ret = "Invalid fullname";

	let {fullname = ''} = req.query;

	fullname = fullname.toLowerCase();
	if(/\d|_|\/|\[|\\|\^|\$|\.|\||\?|\*|\+|\(|\)|\./.test(fullname))
	{
		return res.send(ret);
	}

	let reg = fullname.match(/([^\s]+\s*)/ig) || [];

	let FIO = reg.reverse().filter((el)=>el);

	switch(FIO.length){
		case 3 : {
			ret = `${ucfirst(FIO[0])} ${ucfirst(FIO[2][0])}. ${ucfirst(FIO[1][0])}.`;
			break;
		}
		case 2 : {
			ret = `${ucfirst(FIO[0])} ${ucfirst(FIO[1][0])}.`;
			break;
		}
		case 1 : {
			ret = `${ucfirst(FIO[0])}`;
			break;
		}
	}

	res.send(ret);
});

function ucfirst(str)
{
	var first = str.charAt(0).toUpperCase();
	return first + str.substr(1);
}








app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});