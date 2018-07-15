$(function(){
	

	$(".man").click( function () {
	 $('.man').addClass('check'); 
	 $(this).siblings().removeClass("check");
	});
	$(".woman").click( function () {
	 $('.woman').addClass('check'); 
	 $(this).siblings().removeClass("check");
	 

	});

});
