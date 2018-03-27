
//classes per guardar les dades
class Detall{
	constructor(titol, contingut){
		this.titol = titol;
		this.contingut = contingut;
	}

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
	
}

class Comarca{
	constructor(nom){
		this.nom = nom;
		this.canals = [];
		this.idget = "";
		this.linkpost = "";
	}
}

/*			FUNCIONS			*/


function setValorInProgress(){
	return 42;
}



function nomClosestAjuntament(maplatlongs, marker, pobles){
		/* maplatlongs: obtenir la lat i long de cada poble/resposta del formulari obtinguda*/
	/* marker: */
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

			if(locdist < dist && (nom.includes("Ajuntament"))){
				dist = locdist;
				nom = locname;
			}
		}
	}
	
	return nom;
}

function closestAjuntament(maplatlongs, marker, pobles){
	var nom = nomClosestAjuntament(maplatlongs, marker, pobles);
	
	var poble;
	for(var i = 0;  i < pobles.length ; i++){
		if(pobles[i].poble == nom){
			poble = pobles[i];
			break;
		}
	}
	return poble;
}





function ompleDiccionariComarques(){
	dict_comarques.set("altaribagorca",0);
	dict_comarques.set("altcamp",1);
	dict_comarques.set("altemporda",2);
	dict_comarques.set("altpanades",3);
	dict_comarques.set("alturgell",4);
	dict_comarques.set("anoia",5);
	dict_comarques.set("aran",6);
	dict_comarques.set("bagues",7);
	dict_comarques.set("baixcamp",8);
	dict_comarques.set("baixebre",9);
	dict_comarques.set("baixemporda",10);
	dict_comarques.set("baixllobregat",11);
	dict_comarques.set("baixpanades",12);
	dict_comarques.set("barcelones",13);
	dict_comarques.set("bergueda",14);
	dict_comarques.set("cerdanya",15);
	dict_comarques.set("concadebarbera",16);
	dict_comarques.set("garraf",17);
	dict_comarques.set("garrigues",18);
	dict_comarques.set("garrotxa",19);
	dict_comarques.set("girones",20);
	dict_comarques.set("lanoguera",21);
	dict_comarques.set("maresme",22);
	dict_comarques.set("montsia",23);
	dict_comarques.set("osona",24);
	dict_comarques.set("pallarsjussa",25);
	dict_comarques.set("pallarssobira",26);
	dict_comarques.set("pladestany",27);
	dict_comarques.set("pladurgell",28);
	dict_comarques.set("priorat",29);
	dict_comarques.set("riberadebre",30);
	dict_comarques.set("ripolles",31);
	dict_comarques.set("segarra",32);
	dict_comarques.set("segria",33);
	dict_comarques.set("selva",34);
	dict_comarques.set("solsones",35);
	dict_comarques.set("tarragones",36);
	dict_comarques.set("terraalta",37);
	dict_comarques.set("urgell",38);
	dict_comarques.set("vallesoccidental",39);
	dict_comarques.set("vallesoriental",40);
	dict_comarques.set("usuaris",41);
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


function ompleArrayCanals(data){

	var data = returnDataParsed(data);

	var length = data.feed.entry.length;
	for(var i = 0; i < length; i++){
		var locnom = data.feed.entry[i].gsx$nom.$t;
		var locjson = data.feed.entry[i].gsx$idjson.$t
		canals.push(new Detall(locnom, locjson));
	}
}

function omple_canalscomarca(data){
	var data = returnDataParsed(data);
	var entry = data.feed.entry;
	for(var i = 0; i < entry.length; i++){
		var entries = [];
		entries.push(entry[i].gsx$altaribagorca.$t);
		entries.push(entry[i].gsx$altcamp.$t);
		entries.push(entry[i].gsx$altemporda.$t);
		entries.push(entry[i].gsx$altpanades.$t);
		entries.push(entry[i].gsx$alturgell.$t);
		entries.push(entry[i].gsx$anoia.$t);
		entries.push(entry[i].gsx$aran.$t);
		entries.push(entry[i].gsx$bagues.$t);
		entries.push(entry[i].gsx$baixcamp.$t);
		entries.push(entry[i].gsx$baixebre.$t);
		entries.push(entry[i].gsx$baixemporda.$t);
		entries.push(entry[i].gsx$baixllobregat.$t);
		entries.push(entry[i].gsx$baixpanades.$t);
		entries.push(entry[i].gsx$barcelones.$t);
		entries.push(entry[i].gsx$bergueda.$t);
		entries.push(entry[i].gsx$cerdanya.$t);
		entries.push(entry[i].gsx$concadebarbera.$t);
		entries.push(entry[i].gsx$garraf.$t);
		entries.push(entry[i].gsx$garrigues.$t);
		entries.push(entry[i].gsx$garrotxa.$t);
		entries.push(entry[i].gsx$girones.$t);
		entries.push(entry[i].gsx$lanoguera.$t);
		entries.push(entry[i].gsx$maresme.$t);
		entries.push(entry[i].gsx$montsia.$t);
		entries.push(entry[i].gsx$osona.$t);
		entries.push(entry[i].gsx$pallarsjussa.$t);
		entries.push(entry[i].gsx$pallarssobira.$t);
		entries.push(entry[i].gsx$pladestany.$t);
		entries.push(entry[i].gsx$pladurgell.$t);
		entries.push(entry[i].gsx$priorat.$t);
		entries.push(entry[i].gsx$riberadebre.$t);
		entries.push(entry[i].gsx$ripolles.$t);
		entries.push(entry[i].gsx$segarra.$t);
		entries.push(entry[i].gsx$segria.$t);
		entries.push(entry[i].gsx$selva.$t);
		entries.push(entry[i].gsx$solsones.$t);
		entries.push(entry[i].gsx$tarragones.$t);
		entries.push(entry[i].gsx$terraalta.$t);
		entries.push(entry[i].gsx$urgell.$t);
		entries.push(entry[i].gsx$vallesoccidental.$t);
		entries.push(entry[i].gsx$vallesoriental.$t);
		for(var j = 0; j < entries.length; j++){
			if(entries[j] != "") comarques[j].canals.push(canals[entries[j]]);
		}

	}


}

function ompleArrayComarques(){
	comarques.push(new Comarca("altaribagorca"));
	comarques.push(new Comarca("altcamp"));
	comarques.push(new Comarca("altemporda"));
	comarques.push(new Comarca("altpanades"));
	comarques.push(new Comarca("alturgell"));
	comarques.push(new Comarca("anoia"));
	comarques.push(new Comarca("aran"));
	comarques.push(new Comarca("bagues"));
	comarques.push(new Comarca("baixcamp"));
	comarques.push(new Comarca("baixebre"));
	comarques.push(new Comarca("baixemporda"));
	comarques.push(new Comarca("baixllobregat"));
	comarques.push(new Comarca("baixpanades"));
	comarques.push(new Comarca("barcelones"));
	comarques.push(new Comarca("bergueda"));	
	comarques.push(new Comarca("cerdanya"));
	comarques.push(new Comarca("concadebarbera"));
	comarques.push(new Comarca("garraf"));
	comarques.push(new Comarca("garrigues"));
	comarques.push(new Comarca("garrotxa"));
	comarques.push(new Comarca("girones"));	
	comarques.push(new Comarca("lanoguera"));
	comarques.push(new Comarca("maresme"));
	comarques.push(new Comarca("montsia"));	
	comarques.push(new Comarca("osona"));
	comarques.push(new Comarca("pallarsjussa"));	
	comarques.push(new Comarca("pallarssobira"));	
	comarques.push(new Comarca("pladestany"));
	comarques.push(new Comarca("pladurgell"));	
	comarques.push(new Comarca("priorat"));
	comarques.push(new Comarca("riberadebre"));
	comarques.push(new Comarca("ripolles"));
	comarques.push(new Comarca("segarra"));	
	comarques.push(new Comarca("segria"));	
	comarques.push(new Comarca("selva"));
	comarques.push(new Comarca("solsones"));
	comarques.push(new Comarca("tarragones"));
	comarques.push(new Comarca("terraalta"));
	comarques.push(new Comarca("urgell"));
	comarques.push(new Comarca("vallesoccidental"));
	comarques.push(new Comarca("vallesoriental"));
}

function ompleDataCanalsComarca(data){
	data_canalscomarca = obteDataParsejada(data);
}


function executaAJAX3(id, todo, string){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4

            if (xmlhttp.status == 200) {
				todo(xmlhttp.responseText);
				if(string == "canals"){
			   		done_emissores = true;
			   		executaAJAX3(id_comarquescanals, omple_canalscomarca, "canalscomarca");
			   	}
			   	if( string == "canalscomarca"){
			   		done_cc = true;
			   		cargaDatosSegonsID(map);
			   	}

            }
            else if (xmlhttp.status == 400) {
              console.log('There was an error 400');

            }
            else {
               console.log('something else other than 200 was returned');

            }
        }
    };

    xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/"+id+"/1/public/values?alt=json-in-script&callback=callback", true);
    xmlhttp.send();
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


function cargaDatosSegonsID(map){
	var data_altaribagorca = '1o28GgM3THzqLivRGjD17jF4-AMb66Km_S34GKFDe85s';
	var data_altcamp = '1JndbQsVpzVTIID0sf_1wJuqDADPtrerqXFIUF__LBMI';
	var data_altemporda = '1h7cGJ9oGbA0sXr0HuRR75rb2N88xURh2ZAlJJ50kdxE';
	var data_altpanades = '1FrQO4IDl70l4qUj63OzMAHqLlhV67qWc-xP-jzSCkos';
	var data_alturgell = '1WA1ZXw6U9mWfhTpfLCPwNl8nGzxWliHCjjnCtVlL5bk';
	var data_anoia = '19iwB4oW8VEwq7SB8J0reQKdavQRGsG9TTSx16Rq7YDk';
	var data_aran = '1fI5RFLliSB0MtECvxT4GuoMoQpRo3OKjbU4sQ5O4muk';
	var data_bagues = '1R4nBEm019vzeZR11YMMXhqfKx35c-_4fXsYMhtDUuw8';
	var data_baixcamp = '1t7VrTbVEnTcbU9pJzNFrVJGjaf19iX3OGZHZQABGlLo';
	var data_baixebre = '14O6RbL-l4RBbWLEKDZnqNYIe9tR2eMITNg_VbdAmxyk';
	var data_baixemporda = '1tpoJwXMhlAWYpCooOJzQFXAxiykKhULaPSyGH2VIfuE';
	var data_baixllobregat = '1YGuMrnJ2XVGX8thsAskzHeuD-XbyMZcKQ8Ssqu2HjPc';
	var data_baixpanades = '1IWHBt17GWnvLfUcxOahKlOcw6H9R2t84s7Bms2wmK20';
	var data_barcelones = '1L_pt_2ZZeIDHTXn9YR_M-cPbqkehWhQ_1tRHFNxC80c';
	var data_bergueda = '1v2EU6xywTdbERXuXiJxyaWOC_Pjtfa_TfZ6vjjbLt3w';
	var data_cerdanya = '1pA8n5HtPM_olfm0NKmqd96n7QImq4KDjzptR4AnbGi4';
	var data_concadebarbera = '1XKh4HWgzd_u0R5Sg5D8W7ejTZ9wo8KrEU2im4yA89J0';
	var data_garraf = '1uIXneWHDJUiVUDmKzkQ4cpoWfBBPrrLd49wkiTLj5YM';
	var data_garrigues = '1Fk7zg-UVfpNACKO_VXNyc4RHUPI8_wPca-222DUOm9I';
	var data_garrotxa = '1hiT9nZyM2eLlZOV_89oIDhEd9eFpQbMbSTwWwrreoGk';
	var data_girones = '1gwxSZo-qq1BAryC_p6QmNGaqEdBkcVxnLtWVjy8Dt8Q';
	var data_lanoguera = '1IvfTi-9CdQkpL2TMgZqxh23Y2tC6gM8p-ZONkE4f-6g';
	var data_maresme = '1IQmY3wZ7FvMKKkVdt2ng04y5TddZmW838ZGAhLacUqk';
	var data_montsia = '1L-t6Q4OrOJ8mXEzKybaKW-_b-JqFGt3JHnG_jbht2yg';
	var data_osona = '1le8uZrUcwbAxpEHTyk4dL2fbe6wvpakiGypWiDJAQ_E';
	var data_pallarsjussa = '1hy7v51_l5kuQo7zMualXrRa7t6K7ejU5NjSHwAIxKa0'
	var data_pallarssobira = '1mbrnJmAf6m2NDOQZDNOnSF7uV9A4u3msOVUBcXtTxlo';
	var data_pladestany = '1VJx7xzVzfCabMLjcQVNJq9OHAPPf3XxcTTNxip9MbP4';
	var data_pladurgell = '1BzQOfc5N3fd8GkOtknw6fKG4zC944LMxvjQeruyOS-A';
	var data_priorat = '1PFIY8LZp4AIWEijroS2ccqvOKoTxj9HAdRGVEeXgLaE';
	var data_riberadebre = '1zYDmSNj4z1yYqkYXoGYnMXens0dOnsIYAJiUsaEfD3w';
	var data_ripolles = '1IRPgPcO4ve_1au3FTO1l3JBB9TwNWhrmma6qTxyKKb8';
	var data_segarra = '1x0PtIoyZlzCjES6yeX9hNBTAuUveoW4fIPJvscSAQ8A';
	var data_segria = '1HW__ThUYmvfIdoqZF59z34ZWSTitsiecvFX0BR2tzCs';
	var data_selva = '1LQwqX1guN7SnFRDCJiQhxZb8pH-ucwMRXxyX0FAnzpo';
	var data_solsones = '1Sd1cRLYTzL0Hdif91tRn_jpP2Cbe3pqs2fODQe4wdgw';
	var data_tarragones = '14b4BaoVcvOXxrTfEsqaJ1ngp8LRr0p0paraRc_kEPxU';
	var data_urgell = '1pMUw811VKG9HMAbmU4AcBVPjXVMH4TXbUPwcelicwAc';
	var data_terraalta = '1EGkzHJP6NG0D4Srqva5zBg_MB_-uCoWfFQ6d_Fc-y4Y';
	var data_usuaris = '1mTRB-z51LqajrD5h6bNyNg5ZNhFuFjpQ6O0r3oYF498';
	var data_vallesoccidental = '1WCIpcQTYJ3_xr8vJFvTtoVLdQ_7qT7rHC7Tg9JzXoQ4';
	var data_vallesoriental = '1NU4L0FKxogRbWrt6jqXuAJlxOkvEq9XkxIPKVn5IWlc';
	var data_usuaris = '1mTRB-z51LqajrD5h6bNyNg5ZNhFuFjpQ6O0r3oYF498'
	executaAJAX(map,"altaribagorca",data_altaribagorca);
	executaAJAX(map,"altcamp",data_altcamp);
	executaAJAX(map,"altemporda",data_altemporda);
	executaAJAX(map,"altpanades",data_altpanades);
	executaAJAX(map,"alturgell",data_alturgell);
	executaAJAX(map,"anoia",data_anoia);
	executaAJAX(map,"aran",data_aran);
	executaAJAX(map,"bagues",data_bagues);
	executaAJAX(map,"baixcamp",data_baixcamp);
	executaAJAX(map,"baixebre",data_baixebre);
	executaAJAX(map,"baixemporda",data_baixemporda);
	executaAJAX(map,"baixllobregat",data_baixllobregat);
	executaAJAX(map,"baixpanades",data_baixpanades);
	executaAJAX(map,"barcelones",data_barcelones);
	executaAJAX(map,"bergueda",data_bergueda);
	executaAJAX(map,"cerdanya",data_cerdanya);
	executaAJAX(map,"concadebarbera",data_concadebarbera);
	executaAJAX(map,"garraf",data_garraf);
	executaAJAX(map,"garrigues",data_garrigues);
	executaAJAX(map,"garrotxa",data_garrotxa);
	executaAJAX(map,"girones",data_girones);
	executaAJAX(map,"lanoguera",data_lanoguera);
	executaAJAX(map,"maresme",data_maresme);
	executaAJAX(map,"montsia",data_montsia);
	executaAJAX(map,"osona",data_osona);
	executaAJAX(map,"pallarsjussa",data_pallarsjussa);
	executaAJAX(map,"pallarssobira",data_pallarssobira);
	executaAJAX(map,"pladestany",data_pladestany);
	executaAJAX(map,"pladurgell",data_pladurgell);
	executaAJAX(map,"priorat",data_priorat);
	executaAJAX(map,"riberadebre",data_riberadebre);
	executaAJAX(map,"ripolles",data_ripolles);
	executaAJAX(map,"segarra",data_segarra);
	executaAJAX(map,"segria",data_segria);
	executaAJAX(map,"selva",data_selva);
	executaAJAX(map,"solsones",data_solsones);
	executaAJAX(map,"tarragones",data_tarragones);
	executaAJAX(map,"terraalta",data_terraalta);
	executaAJAX(map,"urgell",data_urgell);
	executaAJAX(map,"vallesoccidental",data_vallesoccidental);
	executaAJAX(map,"vallesoriental",data_vallesoriental);
	executaAJAX(map,"usuaris",data_usuaris);
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

function setIcon(){
	im = {
		url: 'img/user-icon.png',
		scaledSize: new google.maps.Size(35, 35),

	};
}


function afegeixUsuaris(pobles, entry){
	var p = new Poble(entry['gsx$direcció'].$t);
	p.comarca = "usuari";
	p.descripcio.push(new Detall("Observació", entry['gsx$observacions'].$t));
	pobles.push(p);
}

function afegeixPoble(comarca, pobles, entry){
	var p = new Poble(entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t);
	p.comarca = comarca;
	obteContingutSegonsComarca(comarca, pobles, p, entry);
}


function obteContingutSegonsComarca(comarca, pobles, poble, entry){

	//canals = guardaCanals();
	canalsc = comarques[dict_comarques.get(comarca)].canals;
	
	obtenEntrys(pobles,poble,entry, canalsc);
	
}

function obtenEntrys(pobles, poble, entry, canalscomarca){
	poble.idform = entry.id.$t.substring(43,87);
	poble.latitud = entry.gsx$latitude.$t;
	poble.longiutd = entry.gsx$longitude.$t;
	for(i = 0; i < canalscomarca.length; i++){
		var tosearch = canalscomarca[i].contingut;
		if(poble.comarca == "bagues" && tosearch == "gsx$radiomarca"){
			tosearch = "gsx$radioblanca";
		}
		if(poble.comarca == "osona" && tosearch == "gsx$televisiódelberguedà"){
			tosearch = "gsx$canaltaronja";
		}
		try{
			if(tosearch == "" || tosearch == undefined){
			poble.descripcio.push(new Detall(canalscomarca[i].titol));
			}
			else{
				poble.descripcio.push(new Detall(canalscomarca[i].titol, entry[tosearch].$t));
			}
		}
		catch(err){
			
			console.log(poble);
			console.log(canalscomarca[i])
			console.log(canals[canalscomarca[i]].titol)
			console.log(canals[canalscomarca[i]].contingut)
			console.log(entry);
		}
		
	}
	pobles.push(poble);
}


function afegeixBotonsCobertures(n, i){
	/*
	n: nom de la emissora
	i: index
	*/
	
	var notAppendList = ["Altres emisores de ràdio 1", "Altres emisores de ràdio 2", "Altres emisores de ràdio 3", 
	"RÀDIO LOCAL", "TELEVISIÓ NACIONAL", "TELEVISIÓ LOCAL", "TELEVISIÓ ESTATAL",
	"Altres canals de TV 1", "Altres canals de TV 2", "Altres canals de TV 3", "ALTRES FORMES DE COMUNICACIÓ 1", "ALTRES FORMES DE COMUNICACIÓ 2",
	"Nom comercial del servei", "ALTRES FORMES DE COMUNICACIÓ", "OBSERVACIÓNS"];

	var t = n.value;
	if(notAppendList.indexOf(t) == -1){
		$("ul#list1").append('<li class = "nel" id = "'+i+'">'+ t+ '</li>');
		var startli = '<li class = "iel">';
		var title = 'title = no arriba';
		var id = " ["+t+"]";
		var name = id;
		var iput = '<input type ="radio" id="'+id+'" name = "'+name+'" ';
		var nastring = iput+'value = "Sense Senyal" title = "Sense Senyal" class = "na el ' +i+ '-example-class">';
		var rstring = iput+'value = "Dolenta" title = " Senyal Dolenta" class = "r el ' +i+ '-example-class">';
		var ostring = iput+'value = "Regular" title = "Senyal Regular" class = "o el ' +i+ '-example-class">';
		var gstring = iput+'value = "Bona" title = "Senyal Bona" class = "g el ' +i+ '-example-class">';
		var endli = '</li>';
		var string = startli+nastring+rstring+ostring+gstring+endli;
		$('ul#list2').append(string);
	}
	mapbuttons.set(i.toString(), "");
	
}


/*				VARIABLES 				*/

var marker;
var ajuntamentsDescarregats = false;	//formularis descarregats?

var JParsedText;

var map;
var array = []; 				// array de marcadors, dels formularis
var infoWindow;					// per crear la finestra d'informació de cada formulari. 


var canals = [];				// es guardaran totes les emissores que hi han amb el seu nom json, per a poder extreure'n la informació dels formularis. 
var pobles = [];				// es refereix als formularis omplerts, inicialment només ho havien omplert ajuntaments per tan cada punt era un poble diferent (i uns quants usuaris deixant les seves observacions)
var comarques = [];				// es guardaran les 41 comarques, nom, links i canals/emissores que tenen associades, de ràdio i tv.

var done_emissores = false;
var done_cc = false;
ompleArrayComarques();
var idemissores = "1T-sCSgblXVc3R7oEuKK-Fm9p-pkjGFt0cCnwERGON50";
var id_comarquescanals = '1p_2jhSOWnop5TkdFxmNhzMk16uWbkv22CggAvUg0YyM';
//executaAJAX3(id_comarquescanals, omple_canalscomarca, string);



var markclusterer;	

var maplatlongs = new Map();	// per a que no hi hagin dos marcadors en la mateixa ubicació. 

var todo = true;				// si la càrrega d'informació està per fer quan estigui online es recarregarà la pàgina, per a que es faci. 

var im;							// per a guardar l'icona del marcador
var typemap = "";

var styledMapType;				// disseny del mapa de dia
var styledMapType2;				// disseny del mapa de nit

var inProgress;					// quantes peticions ajax s'han de fer (de cada document, n'hi ha 41 + usuaris en el cas de broadcasting)

inProgress = setValorInProgress();

var ajuntament;

var dict_comarques = new Map();	//hi guarda de cada comarca l'index. 
ompleDiccionariComarques();


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
			//cargaDatosSegonsID(map);
			executaAJAX3(idemissores, ompleArrayCanals, "canals");
			google.maps.event.addListener(map, 'click', function(event){
					if (marker != undefined) marker.setMap(null);
					marker = new google.maps.Marker({
						position: event.latLng,
						map: map
					});
					console.log(marker.getPosition().lat());
					console.log(marker.getPosition().lng());
					if(ajuntamentsDescarregats){

						var pob = closestAjuntament(maplatlongs, marker, pobles);	//	ajuntament més proper
						var com = pob.comarca;										//	nom de la comarca en la que pertany
						var icom = dict_comarques.get(com);							// 	index de la comarca
						var numdet = comarques[icom].length;						// 	quants detalls te
						$('ul#list1').children().remove();
						$('ul#list2').children().remove();

						for(var i = 0; i < numdet.length; i++){
							var n = comarques[icom].titol;							//nom de cada detall/canal/emissora que te
							afegeixBotonsCobertures(n,i);

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




