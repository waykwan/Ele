$(function(){
	//设置导航条的何时出现置顶
	$(window).scroll(function(){
		if($(window).scrollTop()>200){
			$('#toTop').addClass('navbar-fixed-top');
			$('#add').css('margin-top','.9rem');
		}
		else{
			$('#toTop').removeClass('navbar-fixed-top');
			$('#add').css('margin-top','0');
		}
	});
	//切换点餐/评价/商家内容
	let $c1 = $('#c1');
	let $c2 = $('#c2');
	let $c3 = $('#c3');
	let $b1 = $('#add');
	let $b2 = $('#assess');
	let $b3 = $('#business');
	let $b4 = $('#footer');
	let $c_arr = [$c1,$c2,$c3];
	console.log($c_arr);
	for(let i=0;i<$c_arr.length;i++){
		// console.log($c_arr.length);
		$c_arr[i].on('click',function(){
			switch(i){
				case 0: 
					$c1.addClass('in');
					$c2.removeClass('in');
					$c3.removeClass('in');
					$b1.css('display','block');
					$b2.css('display','none');
					$b3.css('display','none');
					$b4.css('display','block');
				break;
				case 1: 
					$c2.addClass('in');
					$c1.removeClass('in');
					$c3.removeClass('in');
					$b2.css('display','block');
					$b1.css('display','none');
					$b3.css('display','none');
					$b4.css('display','none');
				break;
				case 2: 
					$c3.addClass('in');
					$c2.removeClass('in');
					$c1.removeClass('in');
					$b3.css('display','block');
					$b1.css('display','none');
					$b2.css('display','none');
					$b4.css('display','none');
				break;
			}
		});
	}
})