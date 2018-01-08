window.onload = function(){
	/* 	======================================================================	
		Browser & Object sniffing
	=========================================================================== */
	if(!document.getElementById) return false;
	if(!document.getElementById("cmmContactForm")) return false;
	
	
	
	/* 	======================================================================	
		Variables
	=========================================================================== */
	var cmmContactForm = document.getElementById("cmmContactForm");
	var submitKnop = document.getElementById("submit");
	var naamVeld = document.getElementById("naam");
	var leeftijdVeld = document.getElementById("leeftijd");
	var emailVeld = document.getElementById("email");
	


	/* 	======================================================================	
		Functions
	=========================================================================== */
	// Valideer velden:
	// 1. wat voor veld ben je (type input tag)? (text, email, checkbox, radio, etc).
	// 2. valideer het juiste type veld.
	
	// text: minimaleLengte 
	// email: minimalelengte, apenstaart vinden, punt vinden.
	// radio: minimaal één moet checked (geselecteerd).
	
	// 3. Als het veld goed is ingevuld (of niet...) geef user feedback.
	
	function validateVeld(welkVeld, minimaleLengte){
		var valid = false;
		
		if(welkVeld.type == "text"){
			valid = /^[a-zA-Z\s]{2,512}$/.test(welkVeld.value);
		} else if(welkVeld.type == "number"){
			var min = parseInt(welkVeld.getAttribute("min"));
			var max = parseInt(welkVeld.getAttribute("max"));
			var userInput = parseInt(welkVeld.value);
		
			valid = (userInput >=min) && (userInput <= max);
		}
		
		createFeedback(welkVeld, valid);
		return valid; // Nodig voor de submitknop check.
	}
	
	function createFeedback(welkVeld, testCondition){
		var spanLijst = welkVeld.parentNode.getElementsByTagName("span");
		if(spanLijst.length > 0){ // Er zitten spans in de moeder div!
			for(var i=0; i<spanLijst.length; i++){
				welkVeld.parentNode.removeChild(spanLijst[i]);
			}
		}
		
		// Icon genereren
		var iconFa = document.createElement("span");
		iconFa.setAttribute("aria-hidden", "true");
		
		var iconContainer = document.createElement("span");
		var iconText;
		
		testCondition ? welkVeld.style.backgroundColor = "rgba(0,255,0,0.3)" : welkVeld.style.backgroundColor = "rgba(255,0,0,0.3)";
		testCondition ? welkVeld.style.borderColor = "rgba(0,255,0,1)" : welkVeld.style.borderColor = "rgba(255,0,0,1)";
		testCondition ? iconText = document.createTextNode(" ") : iconText = document.createTextNode("Controleer dit veld, aub.");
		testCondition ? iconFa.setAttribute("class", "fa fa-check-circle") : iconFa.setAttribute("class", "fa fa-exclamation-circle");
		
		iconContainer.appendChild(iconFa); // Stop de fa icon in de container.
		iconContainer.appendChild(iconText); // Voeg tekst toe als sibling van de fa icon.
		welkVeld.parentNode.appendChild(iconContainer);
	}
	

	/* 	======================================================================	
		Events
	=========================================================================== */	
	submitKnop.addEventListener('click', function(e){
		var naamCorrect = validateVeld(naamVeld); 
		var leeftijdCorrect = validateVeld(leeftijdVeld);
		var allesCorrect = naamCorrect &&  leeftijdCorrect;
		
		if(!allesCorrect){
			e.preventDefault(); // Hou het insturen van het formulier tegen, totdat...
		}
	}, false);
	
	var formObjectsToCheck = [naamVeld, leeftijdVeld]; // Ik wil een handler geven aan elke object.
	var eventLijst = ['blur', 'keyup', 'click']; // Welke events wil ik gebruiken?
	
	for(hetEvent of eventLijst){ // Ga door de eventLijst heen.
		for(var i=0; i<formObjectsToCheck.length; i++){ // Ga door de formObjectsToCheck heen loopen.
			formObjectsToCheck[i].addEventListener(hetEvent, function(e){
				validateVeld(this);
			}, false);
		}
	}
} // Einde window.onload


































