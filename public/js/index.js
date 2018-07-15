$(function(){
	//定位页的搜索
	let $bb = $('#bb');
	let $del = $('#delImg');

	let $goto1 = $('#goArdess');  //定义首页跳转定位页
	let $goto2 = $('#toBack');  //定义定位页跳转首页
	let $area1 = $('#myList');//区域1
	let $area2 = $('#all');  //区域2

	let $play1 = $('#locat');  //绑定定位符号
	let $play2 = $('#locatImg');

	//键位事件
	$bb.keydown(function() {
	  	if($bb.val() == ''){
			$del.css('display','none');
		}
		else{
			$del.css('display','block');
		}
	});
	$del.on('click',function(){
		$bb.val('');
		$del.css('display','none');
	})

	//首页与定位页相互事件
	$goto1.on('click',function(){
		$area2.css('display','block');
		$area1.css('display','none');
	});
	$goto2.on('click',function(){
		$area1.css('display','block');
		$area2.css('display','none');
	});
	//控制定位的动画开关
	$play1.on('click',function(){
		$play2.css('animation-play-state','running');
	})
})