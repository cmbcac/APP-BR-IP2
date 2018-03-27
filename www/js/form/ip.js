function setstyle(){
	if(window.innerWidth < 763){
		$(".urls").css("grid-template-columns", "1fr 1fr");
		$(".urls").css( {"grid-template-rows" : "1fr 1fr 1fr"});
	}

}
$(document).ready(setstyle);
$(window).resize(setstyle);