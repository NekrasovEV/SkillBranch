


function test(){
	return Promise.resolve(setTimeout(()=>cb(1),1000));

}


async function run(){
	let res = await test();

	console.log(res);
}

run();