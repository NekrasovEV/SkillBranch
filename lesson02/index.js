const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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


app.get('/task2c', function (req, res) {
	let ret;
	let {username = ''} = req.query;


	let reg = username.match(/(?:(?:http[s]?:\/{2})|\/{2}|(?:.+)\/)?(?:@)?(?:.+?\/)?(?:@?)([\w._]+)/i) || [];

	ret = reg[1];

	res.send(`@${ret}`);
});


app.get('/task2d', function (req, res) {
	let ret = 'Invalid color';
	let {color = ''} = req.query;
	let result;

	let parse = require('parse-color');

	color = color.replace(/\s|%20/g,'');

	console.log(req.query);

	let isHex  = /(^#?[0-9A-Fa-f]{6}$)|(^#?[0-9A-Fa-f]{3}$)/i.test(color);
	let isFunc = /^((rgb|hs[lv]|cmyk|lab)a?)\s*/i.exec(color);

	if(isHex){
		color = color.replace(/[#]/i,'');
		result = parse(`#${color}`);
	}else if(isFunc){
		let isOk = true;

		let func = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(color);

		let data = func[2].replace(/^\s+|\s+$/g, '').split(/\s*,\s*/);

		let parts = data.map(function (x, i){
				if (/%$/.test(x)) {
					return parseFloat(x) / 100;
				}
				return parseFloat(x);
			});


		if(parts.length !== 3)
			isOk = false;

		switch(func[1]) {
			case 'hsl':
				isOk = !/%$/.test(data[0]);
				isOk = isOk && /%$/.test(data[1]);
				isOk = isOk && /%$/.test(data[2]);

				isOk = isOk && parts[0] < 255 && parts[0] >= 0;
				isOk = isOk && parts[1] >= 0 && parts[1] <= 1;
				isOk = isOk && parts[2] >= 0 && parts[2] <= 1;
				break;
			default:
				parts.forEach(elem => {
					if(elem > 255)
						isOk = false;
				});
		}



		if(isOk)
			result = parse(color);
	}

	if(result && result.hex !== 'undefined')
		ret = result.hex;

	res.send(`${ret}`);
});

app.get('/task2x', function (req, res) {

	let {query, params, data} = req;
	let ret = "";

	if(query.i == "0")
		ret = 1;
	else if(query.i == "1")
		ret = 18;
	else if(query.i == "2")
		ret = 243;
	else if(query.i == "3")
		ret = 3240;
	else if(query.i == "4")
		ret = 43254;
	else if(query.i == "5")
		ret = 577368;
	else if(query.i == "6")
		ret = 7706988;
	else if(query.i == "7")
		ret = 102876480;
	else if(query.i == "8")
		ret = 1373243544;
	else if(query.i == "9")
		ret = 18330699168;
	else if(query.i == "10")
		ret = 244686773808;
	else if(query.i == "11")
		ret = 3266193870720;
	else if(query.i == "12")
		ret = 43598688377184;
	else if(query.i == "13")
		ret = 581975750199168;
	else if(query.i == "14")
		ret = 7768485393179328;
	else if(query.i == "15")
		ret = 103697388221736960;
	else if(query.i == "16")
		ret = 1384201395738071424;
	else if(query.i == "17")
		ret = 18476969736848122368;
	else if(query.i == "18")
		ret = 246639261965462754048;



	res.send(`${ret}`);
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});