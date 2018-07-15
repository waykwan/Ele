$(function(){
	//宽度未改变时
	$('html').css('font-size',($(window).width())/10+'px');
	//宽度随页面宽度的改变而改变
	$(window).resize(function(){
		$('html').css('font-size',($(window).width())/10+'px');
	});
	// $('html').css('font-size',($(window).width())/200+'rem');
	// $(window).resize(function(){
	// 	$('html').css('font-size',($(window).width())/200+'rem');
	// });
	//规定置顶按钮何时出现&&消失
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$('#up').css('display','block');
		}
		else{
			$('#up').css('display','none');
		}
	});
})