$(function(){

	$(".login").hide();

	$("#new").click( function () {
	 $('.main').show(); 
	 $('.login').hide(); 
	 $("#new").attr({ class: "loginSelect1" });
	 $("#login").attr({ class: "" });

	});


	$("#login").click( function () {

	 $('.main').hide(); 
	 $('.login').show(); 
	 $("#login").attr({ class: "loginSelect1" });
	 $("#new").attr({ class: "" });

	});
	
	if($('.aa').val()== 0){
		$("#login").click();
	}

})