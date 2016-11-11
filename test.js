

let fullName = "Евгений Владимирович  Путин некрасов";

let reg = fullName.match(/([\wа-яё]+\s*)/ig);

let FIO = reg.reverse().filter((el)=>el);

let ret;

switch(FIO.length){
	case 3 : {
		ret = `${FIO[0]} ${FIO[2][0]}. ${FIO[1][0]}.`;
		break;
	}
	case 2 : {
		ret = `${FIO[0]} ${FIO[1][0]}.`;
		break;
	}
	case 1 : {
		ret = `${FIO[0]}`;
		break;
	}
	default :
		ret = "Invalid fullname";
}

console.log(ret);