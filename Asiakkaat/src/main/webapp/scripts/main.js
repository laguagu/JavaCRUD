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
		htmlStr += "</tr>";
	}
	document.getElementById("tbody").innerHTML = htmlStr;
}


//Tutkitaan lisättävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaLisaa() {
	if (tutkiTiedot()) {
		lisaaTiedot();
	}
}

//funktio syöttötietojen tarkistamista varten (yksinkertainen)
function tutkiTiedot() {
	let ilmo = "";
	let d = new Date();
	if (document.getElementById("etunimi").value.length < 3) {
		ilmo = "Etunimi ei kelpaa!";
		document.getElementById("etunimi").focus();
	} else if (document.getElementById("sukunimi").value.length < 2) {
		ilmo = "Sukunimi ei kelpaa!";
		document.getElementById("sukunimi").focus();
	} else if (document.getElementById("puhelin").value.length < 1) {
		ilmo = "puhelin ei kelpaa!";
		document.getElementById("puhelin").focus();
	} else if (document.getElementById("sposti").value.length < 1) {
		ilmo = "Sposti ei kelpaa!";
		document.getElementById("sposti").focus();
	} 
	if (ilmo != "") {
		document.getElementById("ilmo").innerHTML = ilmo;
		setTimeout(function() { document.getElementById("ilmo").innerHTML = ""; }, 3000);
		return false;
	} else {
		document.getElementById("etunimi").value = siivoa(document.getElementById("etunimi").value);
		document.getElementById("sukunimi").value = siivoa(document.getElementById("sukunimi").value);
		document.getElementById("puhelin").value = siivoa(document.getElementById("puhelin").value);
		document.getElementById("sposti").value = siivoa(document.getElementById("sposti").value);
		return true;
	}
}

//Funktio XSS-hyökkäysten estämiseksi (Cross-site scripting)
function siivoa(teksti) {
	teksti = teksti.replace(/</g, "");//&lt;
	teksti = teksti.replace(/>/g, "");//&gt;	
	teksti = teksti.replace(/'/g, "''");//&apos;	
	return teksti;
}

//funktio tietojen lisäämistä varten. Kutsutaan backin POST-metodia ja välitetään kutsun mukana auton tiedot json-stringinä.
function lisaaTiedot() {
	let formData = serialize_form(document.lomake); //Haetaan tiedot lomakkeelta ja muutetaan JSON-stringiksi
	//console.log(formData);
	let url = "henkilot";
	let requestOptions = {
		method: "POST", //Lisätään auto
		headers: { "Content-Type": "application/json" },
		body: formData
	};
	fetch(url, requestOptions)
		.then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
		.then(responseObj => {
			//console.log(responseObj);
			if (responseObj.response == 0) {
				document.getElementById("ilmo").innerHTML = "Auton lisäys epäonnistui.";
			} else if (responseObj.response == 1) {
				document.getElementById("ilmo").innerHTML = "Auton lisäys onnistui.";
				document.lomake.reset(); //Tyhjennetään auton lisäämisen lomake		        	
			}
			setTimeout(function() { document.getElementById("ilmo").innerHTML = ""; }, 3000);
		})
		.catch(errorText => console.error("Fetch failed: " + errorText));
}