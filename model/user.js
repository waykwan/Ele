/*
  加载模块
*/
let mysql = require('mysql');

/*
  创建与数据库的连接
*/
let connection = mysql.createConnection({
  // 数据库的设置
  host:"localhost", // 服务器地址
  user:"root",    // 用户名
  password:"root",  // 密码
  port:"3306",    // 服务器端口
  database:"bolg"     // 需要连接的数据名
});

// 进行连接
connection.connect(function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log(' 数据库连接成功!');
});

exports.getUser = function(username, password, fun){
  let sql = 'select * from user where usename="'+username+'" and usepow="'+password+'"';
  console.log(sql);
  connection.query(sql, function(err, result){
    if(err){
      console.log(err);
      return ;
    }

    fun(result);
  });  

}



exports.getUserByName = function(username, fun){
  // console.log(username)
  let sql = 'select * from user where usename="'+username+'"';
  connection.query(sql, function(err, result){
    if(err){
      console.log(err);
      return ;
    }
    fun(result);
  });  

}

exports.setUser = function(username ,phone, password , fun){
  let sql = 'INSERT INTO `user` (`id`, `usename`, `usenum`, `usepow`) VALUES (NULL, "'+username+'", '+phone+', "'+password+'")';
    connection.query(sql, function(err, result){
    if(err){
      console.log(err);
      return ;
    }

    fun(result);
  });  
}
