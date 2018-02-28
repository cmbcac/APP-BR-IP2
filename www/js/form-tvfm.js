function setstyle(){

    // ample
    if(window.innerWidth > window.innerHeight){
        console.log("amplada: "+window.innerWidth);
        console.log("alçada: "+window.innerHeight);
        console.log("wrapcol: " + $(".wrapper").css('grid-template-columns'))
        console.log("wraprow:"+ $(".wrapper").css('grid-template-rows'))
        var h2x = $(".five").innerHeight();
        var w2x = $(".five").innerWidth() * 0.5;
        
        $("fieldset.pure-group").css("max-width", w2x);
        $(".fiveinfocontent").css("width", w2x);
        
        $(".fiveinfocontent").css("max-height", h2x);
        $(".fiveinfocontent").css("height", h2x);


    }
    // alt
    else {
        $('.five').css({
            'grid-template-columns': '1fr', 
            'grid-template-rows': '.5fr .5fr'});

        var h2x = $('.five').innerHeight() * 0.5;

        $('.fiveinfocontent').css({
            'max-height' : h2x
        });
    }
	
    if(window.innerHeight <= 1024){
        /*$('h1').css('font-size', '0.9em');*/
        $('textarea').attr('rows', '7');
    }
    if(window.innerHeight <= 824){
        $('h1').css('font-size', '1em');
        $('textarea').attr('rows', '2');
        $('#textform').css('font-size', '0.7em');

    }
    if(window.innerHeight <= 624){
        $('h1').css('font-size', '0.7em');
        $('textarea').attr('rows', '1');
    }
    $('textarea#message').css('width', $('fieldset').innerWidth()*0.99);
}


$(document).ready(setstyle);
$(window).resize(setstyle);

