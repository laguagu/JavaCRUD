//funktio tietojen hakemista varten. Kutsutaan backin GET metodia
function haeHenkilot() {
	let hakusana = document.getElementById("hakusana").value;
	let url = "asiakkaat?hakusana=" + hakusana;
	fetch(url)
		.then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi 
		.then(response => printItems(response))
		.catch(errorText => console.error("Fetch failed: " + errorText));
}
//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList) {
	console.log(respObjList);
	let htmlStr = "";
	for (let item of respObjList) {//yksi kokoelmalooppeista		
		htmlStr += "<tr id='rivi_" + item.id + "'>";
		htmlStr += "<td>" + item.etunimi + "</td>";
		htmlStr += "<td>" + item.sukunimi + "</td>";
		htmlStr += "<td>" + item.puhelin + "</td>";
		htmlStr += "<td>" + item.sposti + "</td>";
		htmlStr+="<td><a href='muutaAsiakas.jsp?id="+item.id+"'>Muuta</a>&nbsp;";  
		htmlStr += "<td><span class='poista' onclick=varmistaPoisto("+item.id+",'"+encodeURI(item.etunimi)+"')>Poista</span></td>"; //encodeURI() muutetaan erikoismerkit, välilyönnit jne. UTF-8 merkeiksi.
		htmlStr += "</tr>";
	}
	document.getElementById("tbody").innerHTML = htmlStr;
}
//funktio tietojen lisäämistä varten. Kutsutaan backin POST-metodia ja välitetään kutsun mukana asiakkaan tiedot json-stringinä.
function lisaaTiedot() {
	
	let formData = serialize_form(document.lomake); //Haetaan tiedot lomakkeelta ja muutetaan JSON-stringiksi
	console.log(formData);
	let url = "asiakkaat";
	let requestOptions = {
		method: "POST", //Lisätään asiakas
		headers: { "Content-Type": "application/json" },
		body: formData
	};
	fetch(url, requestOptions)
		.then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
		.then(responseObj => {
			//console.log(responseObj);
			if (responseObj.response == 0) {
				document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys epäonnistui.";
			} else if (responseObj.response == 1) {
				document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys onnistui.";
				document.lomake.reset(); //Tyhjennetään asiakkaann lisäämisen lomake		        	
			}
			setTimeout(function() { document.getElementById("ilmo").innerHTML = ""; }, 3000);
		})
		.catch(errorText => console.error("Fetch failed: " + errorText));
}

//Poistetaan asiakas kutsumalla backin DELETE-metodia ja välittämällä sille poistettavan asiakkaann id
function poistaAsiakas(id, etunimi){
	let url = "asiakkaat?id=" + id;    
    let requestOptions = {
        method: "DELETE"             
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
			alert("Asiakkaan poisto epäonnistui.");	        	
        }else if(responseObj.response==1){ 
			document.getElementById("rivi_"+id).style.backgroundColor="red";
			alert("Asiakkaan " + decodeURI(etunimi) +" poisto onnistui."); //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
			haeHenkilot();        	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}	
//Haetaan muutettavan auton tiedot. Kutsutaan backin GET-metodia ja välitetään kutsun mukana muutettavan tiedon id
function haeAsiakas() {		
    let url = "asiakkaat?id=" + requestURLParam("id"); //requestURLParam() on funktio, jolla voidaan hakea urlista arvo avaimen perusteella. Löytyy main.js -tiedostosta 	
	//console.log(url);
    let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(response => {
   		//console.log(response);
   		document.getElementById("id").value=response.id;
		document.getElementById("etunimi").value=response.etunimi;
		document.getElementById("sukunimi").value=response.sukunimi;
		document.getElementById("puhelin").value=response.puhelin;
		document.getElementById("sposti").value=response.sposti;
   	}) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}	

//funktio tietojen päivittämistä varten. Kutsutaan backin PUT-metodia ja välitetään kutsun mukana uudet tiedot json-stringinä.
function paivitaTiedot(){	
	let formData = serialize_form(lomake); //Haetaan tiedot lomakkeelta ja muutetaan JSON-stringiksi
	console.log(formData);	
	let url = "asiakkaat";    
    let requestOptions = {
        method: "PUT", //Muutetaan asiakas
        headers: { "Content-Type": "application/json; charset=UTF-8" },  
    	body: formData
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		console.log(responseObj);
   		if(responseObj.response==0){
   			document.getElementById("ilmo").innerHTML = "Asiakkaan muutos epäonnistui.";	
        }else if(responseObj.response==1){ 
        	document.getElementById("ilmo").innerHTML = "Asiakkaan muutos onnistui.";
			document.lomake.reset(); //Tyhjennetään auton muuttamisen lomake		        	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}