let User = require('../model/user');   //加载数据库


exports.getName = function(req,res){

	let username = req.params.name;
	// console.log(username);
	User.getUserByName(username, function(result){
		let json = {}
		if (result.length >0 ) {
			json.result = 1;
		}else{
			json.result = 0;
		}
		// let json = {};
		// // 一般数据建议使用JSON格式进行传输
		res.writeHead(200, {'Content-type': 'application/json'});
		res.end(JSON.stringify(json));
	});
}