//classes per guardar les dades
class Detall{
	constructor(titol, contingut){
		this.titol = titol;
		this.contingut = contingut;
	}
	setTitol(titol){this.titol = titol;}
	setContingut(contingut){this.contingut = contingut;}
	
	getTitol(){return this.titol;}
	getContingut(){return this.contingut;}
}
class Poble{
	constructor(poble){
		this.poble = poble;
		this.latitud;
		this.longitud;
		this.tipus;
		this.titol;
		this.descripcio = [];
		this.date;
		this.comarca;
	}
	
	 setContent(){
		var s="";
		for(var i = 0;  i < this.descripcio.length; i++){
			s = s 
			var t = this.descripcio[i].getTitol();
			var c = this.descripcio[i].getContingut();
			if (c != "" && c != undefined){
				s = s + t + ": " + c;
			}
			else{
				if ( c == undefined){
					s = s + "<span style="+'"'+"text-decoration:underline"+'"'+">" + t + "</span>";
				}
				if (c == ""){
					s = s + t;
				}
			}
			s = s+ "<br>"
		}
		return s
	}
	setLatitud(latitud){
		this.latitud = latitud;
	}
	setLongitud(longitud){
		this.longitud = longitud;
	}
	setTipus(tipus){
		this.tipus = tipus;
	}
	setTitol(titol){
		this.titol=titol;
	}
	getMapDetalls(){
		var s = new Map();
		for(var i = 0;  i <this.descripcio.length; i++){
			var t = this.descripcio[i].getTitol();
			var c = this.descripcio[i].getContingut();
			if(c == "" || c == undefined){
				c == "empty";
			}
			s = s.set(t, c);
		}
		return s;
	}
	
}

var marker;
var done = false;

var mapbuttons = new Map();

function updateMabButtonsIdesactivaActivaBotons(mapbuttons, c, obj){
	// si es el mateix, el desactiva
	if(mapbuttons.get(c) == $(obj).attr('id')){
		$(obj).css("opacity", 0.2);
		mapbuttons.set(c, "");
	}
	// si es un altre, desactiva l'altre i activa el actual
	else{
		$('#'+mapbuttons.get(c)).css("opacity", 0.2);
		$(obj).css("opacity", 1);
		mapbuttons.set(c, $(obj).attr('id'));
	}	
	return mapbuttons;
}

function updateMapButtonsIdesactivaActivaBotons(mapbuttons, c, obj){
	if(mapbuttons.get(c) == ""){
		mapbuttons.set(c, $(obj).attr('id'));
		$(obj).css("opacity", 1);
	}
	else{
		if(mapbuttons.get(c) == $(obj).attr('id')){
			$(obj).css("opacity", 0.2);
			mapbuttons.set(c, "");
		}
		else{
			$("#"+mapbuttons.get(c)).css("opacity", 0.2);
			$(obj).css("opacity", 1);
			mapbuttons.set(c, $(obj).attr('id'));
		}
	}
	return mapbuttons;
}

function tornaDetallsPobleMesProper(maplatlongs, marker, pobles){
	var dist = 1000;
	var nom = "";
	var it = maplatlongs.entries()
	var evlat = marker.getPosition().lat();
	var evlng = marker.getPosition().lng();


	//obte nom ajuntament mes proper from maplatlongs

	for(var i = 0; i < maplatlongs.size; i++){
		var next = it.next();
		var locstr = next.value[1];
		var locname = next.value[0];

		if(locstr != "NaNNaN"){
			var index = locstr.lastIndexOf(".")-1;
			var loclat = parseFloat(locstr.substring(0,index));
			var loclng = parseFloat(locstr.substring(index, locstr.length));

			var difa = loclat-evlat;
			var difb = loclng-evlng;
			var locdist = Math.sqrt(Math.pow(difa,2) + Math.pow(difb, 2));

			if(locdist < dist){
				dist = locdist;
				nom = locname;
			}
		}
	}

	//console.log(nom)

	// obte index poble from pobles
	var poble;
	for(var i = 0;  i < pobles.length ; i++){
		if(pobles[i].poble == nom){
			poble = pobles[i];
			break;
		}
	}
	return poble.getMapDetalls();
}


function appendBotonsDeColors(n, mapdet, i, mapbuttons){
	var notAppendList = ["Altres emisores de ràdio 1", "Altres emisores de ràdio 2", "Altres emisores de ràdio 3", 
	"RÀDIO LOCAL", "TELEVISIÓ NACIONAL", "TELEVISIÓ LOCAL", "TELEVISIÓ ESTATAL",
	"Altres canals de TV 1", "Altres canals de TV 2", "Altres canals de TV 3", "ALTRES FORMES DE COMUNICACIÓ 1", "ALTRES FORMES DE COMUNICACIÓ 2",
	"Nom comercial del servei", "ALTRES FORMES DE COMUNICACIÓ", "OBSERVACIÓNS"];

	var t = n.value;
	if(notAppendList.indexOf(t) == -1){
		var c = mapdet.get(t);
		if(c=="") c = "sense informació";
		if(c==undefined) c = "--";
		$("ul#list1").append('<li class = "nel" id = "'+i+'">'+ t+ '</li>');
		var startli = '<li class = "iel">';
		var title = 'title = no arriba';
		var nastring = '<div id = "na'+i+'" title = "Sense Senyal" class = "na el ' +i+ '-example-class"></div>';
		var rstring = '<div id = "r'+i+'" title = " Senyal Dolenta" class = "r el ' +i+ '-example-class"></div>';
		var ostring = '<div id = "o'+i+'" title = "Sense Regular" class = "o el ' +i+ '-example-class"></div>';
		var gstring = '<div id = "g'+i+'" title = "Sense Bona" class = "g el ' +i+ '-example-class"></div>';
		var endli = '</li>';
		var string = startli+nastring+rstring+ostring+gstring+endli;
		$('ul#list2').append(string);
	}
	mapbuttons.set(i.toString(), "");
}


function initMap() {
		todo = !todo;
		try{
			var catalunya = {lat: 41.385900681193434, lng: 2.1711516380310063};
				infoWindow = new google.maps.InfoWindow();
				map = new google.maps.Map(document.getElementById('map_form'), {
				center: catalunya,
				zoom: 8,
			    zoomControl: false,
			    mapTypeControl: false,
			    scaleControl: false,
			    streetViewControl: false,
			    rotateControl: false,
			    fullscreenControl: false
			});
			cargaDatosSegonsID(map);
			google.maps.event.addListener(map, 'click', function(event){
					if (marker != undefined) marker.setMap(null);
					marker = new google.maps.Marker({
						position: event.latLng,
						map: map
					});
					console.log(marker.getPosition().lat());
					console.log(marker.getPosition().lng());
					if(done){

						var mapdet = tornaDetallsPobleMesProper(maplatlongs, marker,pobles);
						var it = mapdet.keys();
						$('ul#list1').children().remove();
						$('ul#list2').children().remove();

						for(var i = 0; i < mapdet.size; i++){
							var n = it.next();
							appendBotonsDeColors(n,mapdet,i,mapbuttons);

							$('.el').css('height', $('.nel').innerHeight());				//tamany de la caixa

							$("[class*=example-class").hover(function(){
								var c = this.className.match(/(\d+)-example-class/)[1];		//in hover
								$('#'+c).css('background-color', '#fcf4eb');
							}, function(){
								var c = this.className.match(/(\d+)-example-class/)[1];		//out hover
								$('#'+c).css('background-color', '#ffffff');
							});

							$('.el').on('click', function(event){
								event.stopImmediatePropagation();
								var c = this.className.match(/(\d+)-example-class/)[1];
								updateMapButtonsIdesactivaActivaBotons(mapbuttons, c, this);
							});
						}
					}
				document.getElementById('Latitud').value = (marker.getPosition().lat());
				document.getElementById('Longitud').value =(marker.getPosition().lng());
				
			});			
		}
		catch(err){
			console.log("error" + err);

		}
		typemap = "bright";
}


var JParsedText;

var array = [];
var windows = [];
var map;
var infoWindow;

var canals = [];
var pobles = [];
var markclusterer;	

var maplatlongs = new Map();

var todo = true;

var im;
var typemap = "";

var styledMapType;
var styledMapType2;

var inProgress;

inProgress = setValorInProgress();


//si el mapa ja esta fet
function updateIndicator() {
	// Show a different icon based on offline/online
	if(!todo){
		if(navigator.onLine){
			location.reload();
		}
		else{
			alert("S'ha perdut la connexió. En restablir-se es recarregarà la pàgina");
		}	
	}
	else{
		if(!navigator.onLine){
			alert("En aquests moments no setà connectat. En establir-se es recarregarà la pàgina");
			
		}
	}
}





//innecessari de moment, comunica que hi ha un nou proces fent-se
function handleBefore() {
	inProgress++;
};

//es diu que hi ha un proces menys i si no n'hi ha cap s'executa el clusteritzador
function handleComplete(name) {
	if (!--inProgress) {
		// do what's in here when all requests have completed.
		console.log(inProgress);
		markerCluster = new MarkerClusterer(map, array,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
		done = true;
	}
};

function controlaInformacio(data,nom){
	
	comarca = nom
	/*parseja text*/

	data = returnDataParsed(data);
	
	/*inicialitza variables*/
	var myLatLng;
	var features = [], latfield, lonfield;
	if (!data || !data.feed) return features;
	
	/*busca markers*/
	for (var i = 0; i < data.feed.entry.length; i++){
		
		//entry
		var entry = data.feed.entry[i];

		
		//ubicacio
		try{[latfield, lonfield] = getLatLang(entry)}
		catch(e){break;}
		var latlon = latfield.toString()+lonfield.toString()
		
		if(entry['gsx$indiqueuelmunicipidesdonompliuelformulari'] != undefined){
			var valuemap = entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t;
			maplatlongs.set(valuemap,latlon);
		}
			
		//valuemap = valuemap + 1;
		

		
		/*var lng_radius = 0.0003,         // degrees of longitude separation
		lat_to_lng = latfield / lonfield,  // lat to long proportion in Warsaw
		step = 2 * Math.PI / 8,
		angle = 0.5 + (step * valuemap),
		lat_radius = lng_radius / lat_to_lng;
		lonfield = lonfield + (Math.cos(angle) * lng_radius);
        latfield = latfield + (Math.sin(angle) * lat_radius);
		*/
		myLatLng = {lat: latfield, lng: lonfield};
		
		var marker2 = setMarker(comarca, myLatLng, entry, map, array)
		
		//pobles
		if(comarca != "usuaris"){
			afegeixPoble(comarca, pobles, entry);
		}
		else{
			afegeixUsuaris(pobles, entry);
		}
		
	}	

}

//treiem els primers caracters i ultims per poder parsejar
//fem el parsing i ho retornem
function returnDataParsed(data){
	var start = 25;
	var end = data.length - 2;
	var JSONText = data.slice(start,end);
	JParsedText = JSON.parse(JSONText);
	return JParsedText;
}

//mira de totes les entries quina és latfield i quina és lonfield
//si no ho troba error, sino retorna la tupla
function getLatLang(entry){

	var latfield = '', lonfield = '';
	for (var f in entry) {
		if (f.match(/\$Lat/i)){
			latfield = f;           
		}
		if (f.match(/\$Lon/i)){
			lonfield = f;
		}
	}
	if((latfield != '')  && (lonfield != '')){
		latfield = Number(entry[latfield].$t);
		lonfield = Number(entry[lonfield].$t);
	}
	else{
		throw "no latfield lonfield";
	}
	return [latfield, lonfield];
}
	
//si es una comarca obte el nom de municipi i posa icona normal
//sino, o es usuari o es iptv, "" es iptv, el titol, es el  nom de la entitat
//ambdos posen icona, que canvia segons el mapa
//coloca el marcador i ho enxufa al array de marcadors
//retorna el marker	
function setMarker(comarca, myLatLng, entry, map, array){
	if(comarca !="usuaris" && comarca != ""){
		var marker = new google.maps.Marker({
			position: myLatLng,
			title: entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t,
			map: map
		});
	}
	else{
		var title = comarca == "" ? 'gsx$entitat' : 'gsx$direcció';
		setIcon();
		var marker = new google.maps.Marker({
			position: myLatLng,
			title: entry[title].$t,
			icon: im,
			map: map
		});
	}
	marker.setMap(map);
	array.push(marker);
	return marker;
	
	
}
	

//es posa la url segons la id, es diu que es vol obtenir
//si tot va bé, vol dir que tenim info i la administrem
//sino igualment, quan acaba ho comunica


function executaAJAX(map,nom,id){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
			   controlaInformacio(xmlhttp.responseText,nom);
			   handleComplete(nom);
           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
              handleComplete(nom);
           }
           else {
               console.log('something else other than 200 was returned');
               handleComplete(nom);
           }
        }
    };

    xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/"+id+"/1/public/values?alt=json-in-script&callback=callback", true);
    xmlhttp.send();
}



// informa a l'usuari dels canvis de conexió
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);
updateIndicator();
