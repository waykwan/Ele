/*
	加载模块
 */
let path = require('path');	// 路径处理模块
let ejs = require('ejs');   // 加载模板模块
let md5 = require('md5');   // 加载md5的加密模块

let cookieParser = require('cookie-parser');  // 加载COOKIE模块
let session = require('express-session');

let querystring = require('querystring');   // querystring这个模块主是用于提供字符串解释的功能
let express = require("express");
let app = express();			// 实例化一个Express对象

/*
	加载模拟数据模块
*/
// let blog = require('./data/blog');		// 相当于是加载数据库
let user = require('./model/user');		// 相当于是加载数据库

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8888);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));
// console.log(app.get('views'));

// 设定使用的模板的后缀名
app.set('view engine', 'html');

// 运行模板方法
app.engine('html', ejs.__express);
// 所有不是HTML请求内容都会指向到当前目录中的public目录中去
app.use(express.static(path.join(__dirname, 'public')));
app.use('/index', express.static(path.join(__dirname, 'public')));



// 为了使用SESSION需要对COOKIE进行设置
app.use(cookieParser("An"));

// 设置默认的session
app.use(session({
  secret:'an',
  rsave:false,
  saveUninitialized:true
}));



// 把API封装成文件进行处理
let api = require('./routes/api');
// app.get('/api', api.json);
app.get('/api/getName/:name', api.getName);


app.get('/', function(req, res){

	res.redirect('/index');		
});

app.get('/index', function(req, res){
	console.log('看看这里',req.session.user.usename);

  res.render('index');
});


//登录页面
app.get('/login', function(req, res){
	if(req.session.error === 0){
		req.session.error = 1;
		res.render('login', {'wrong':0});
	}
	// if(req.session.error=== -1){
	// 	req.session.error = -2;
	// 	res.render('login', {'wrong':-1});
	// }if(req.session.error=== -2){
	// 	res.render('login', {'wrong':-2});
	// }
	else{
		res.render('login',{'wrong':1});
	}
  
});


//登录页面
app.get('/My', function(req, res){
	console.log(req.session.user)
	if (req.session.user) {
		usename = req.session.user.usename;
		phone = req.session.user.usenum;

	}else{
		usename = "注册/登录";
		phone = "登录后获取更多优惠";

	}

  	res.render('My', {'usename' : usename,'phone' : phone});
});


app.get('/order',function(req,res){
	res.render('order');
});
app.get('/MyAddress', function(req, res){
  res.render('MyAddress');
});

app.get('/AddAddress', function(req, res){
  res.render('AddAddress');
});

app.get('/details', function(req, res){
  res.render('details');
});


app.get('/discover', function(req, res){
  res.render('discover');
});

//个人详细页
app.get('/info', function(req, res){
	if (req.session.user) {
		usename = req.session.user.usename;
		phone = req.session.user.usenum;

	}else{
		usename = "";
		phone = "";
	}

  	res.render('info', {'usename' : usename,'phone' : phone});
});

app.get('/rebind', function(req, res){
  res.render('rebind');
});

app.get('/search', function(req, res){
  res.render('search');
});


//修改密码
app.get('/update', function(req, res){
  res.render('update');
});


//修改用户名
app.get('/username', function(req, res){
  res.render('username');
});

//退出
app.get('/out', function(req, res){
  req.session.user={};
  req.session.user.usename="注册/登录";
  req.session.user.usenum="登录后获取更多优惠";

  res.render('index');
});



//登录路由post方法
app.post('/login',function(req,res){
	let post = '';
	req.on('data',function(data){
		post+=data;
	});

	req.on('end',function(){
		post = querystring.parse(post);
    	console.log(post);
    	let username = post.username;
    	let aaa=post.password;
    	let password = md5(post.password);       // 需要MD5加密	
		let num = post.num;     //判断是登录还是注册

		if (num == 0) {//注册console.log('注册');
			let phone = post.phone;
			user.getUserByName(username,function(result){
				if (username.length == 0 || phone.length< 11 || result.length>0 || aaa.length<=6) {
						
						res.redirect('/login');
						return;
				}
				user.setUser(username,phone , password,function(result){		
				if(result){

					user.getUser(username,password,function(result){
		          	// SESSION建立一个user属性，赋值到刚刚的用户数据
					req.session.user = result[0];
					console.log(req.session);
					res.redirect('/index');
					console.log('注册成功')
					});
				}
			});				
			});
			

			
			
						
		}else{//登录
			console.log('登录');
			 user.getUser(username, password, function(result){
			 	console.log(result);
		      if(result.length <= 0){
		      	console.log(111);
		      	req.session.user={};
				req.session.user.usename="注册/登录";
				req.session.user.usenum="登录后获取更多优惠";
			  	req.session.error = 0;
				res.redirect('/login');

		      }
		      else{
			      	// 在SESSION中新建一个user的属性，并且赋值为刚刚得到的用户数据
			      req.session.user = result[0];

			      console.log(222);
			      // res.end();
			      res.redirect('/index');
		      }

		      
		      // res.render('redirect', {msg:'登录成功，现在为您跳转。', url: '/index'});
		    });
		}
	});
});


app.listen(app.get('port'), function(){
  console.log(' 服务已经开启，端口为：'+app.get('port'));
});