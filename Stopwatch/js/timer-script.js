window.onload = function(){
	/* 	======================================================================	
		Browser & Object sniffing
	=========================================================================== */
	if(!document.getElementById) return false; // Als de browser niet getElementById kan, STOP DAN!

	
	
	/* 	======================================================================	
		JavaScript check
	=========================================================================== */		
	var removeElements = document.getElementsByClassName("js-disabled");
	for(var i = 0; i < removeElements.length; i++){
		document.body.removeChild(removeElements[i]);
	}
	
	
	
	/* 	======================================================================	
		Variables
	=========================================================================== */	
	var counter = 0; // Variabele voor de teller
	var stopwatch; // Variabele voor de javaScript timer.
	var stopwatchRunning = false; // De stopwatch loopt in het begin nog niet.
	
	
	/* 	======================================================================	
		Knoppen Initialisation & Event binding
	=========================================================================== */
	// Timer maken
	var timerDiv = document.createElement("div");
	timerDiv.setAttribute("id", "timer");
	var timerText = document.createTextNode("00:00"); // tekst aanmaken.
	timerDiv.appendChild(timerText); // tekst in de div stoppen.
	document.body.appendChild(timerDiv); // timer toevoegen aan de body.
	
	// Knoppen maken
	var btnStart = new Object();
	btnStart.name = "Start"; // Property van het object.
	
	var btnStop = new Object();
	btnStop.name = "Stop";
	
	var btnReset = new Object();
	btnReset.name = "Reset";
	
	var buttons = [btnStart, btnStop, btnReset]; // Array maken met drie objecten
	
	for(var i=0; i<buttons.length; i++){
		var btn = document.createElement("div");
		btn.setAttribute("id", "btn" + buttons[i].name); // btnStart, btnStop, btnReset
		btn.setAttribute("aria-role", "button");
		
		var btnText = document.createTextNode(buttons[i].name);
			
		btn.appendChild(btnText); // div de tekst geven.
		document.body.appendChild(btn); // div toevoegen body.
		
		btn.addEventListener('click', function(){
			if(this.textContent == "Start"){
				if(!stopwatchRunning){ // Als de stopwatch NIET loopt... Laat hem lopen!
					stopwatchRunning = true;
					stopwatch = setInterval(updateStopwatch, 10);
				}
			} else if(this.textContent == "Stop"){
				stopStopwatch();
			} else{
				resetStopwatch();
			}
		}, false); // Voor elke knop een event binden
	} // einde for
	
	
	/* 	======================================================================	
		Functions
	=========================================================================== */
	function updateStopwatch(){
		counter ++;
		
		var stopwatchDisplay = counter / 100; // Een counter van 552 = 5520 milliseconde. / 100 = 5.52 seconden.
		if(stopwatchDisplay > 59.99){ // Minuut bereikt? Begin opnieuw.
			counter = 0;
		}
		
		stopwatchDisplay = stopwatchDisplay.toString(); // Overschrijven van float naar string.
		stopwatchDisplay = stopwatchDisplay.replace(".", ":"); // replace() is een methode voor string objecten.
		
		if(counter < 1000){ // < 10 seconden: we willen een voorloopnul
			stopwatchDisplay = "0" + stopwatchDisplay;
		}
		
		if(stopwatchDisplay.length == 4){ // Dan hebben we maar één cijfer achter de : (bijv 00:1)
			stopwatchDisplay = stopwatchDisplay + "0";
		} else if(stopwatchDisplay.length == 2){ // Bijv: 02. Een heel cijfer, zonder getal achter de komma.
			stopwatchDisplay = stopwatchDisplay + ":00";
		}
		
			
		
		
		timerDiv.textContent = stopwatchDisplay;
	}
	
	function stopStopwatch(){
		if(stopwatchRunning){ // Loopt ie? Dan mag je hem stoppen...
			stopwatchRunning = false;
			clearInterval(stopwatch);
		}
	}
	
	function resetStopwatch(){
		counter = 0; // counter moet 0 worden
		stopwatchRunning = false; // staat van de stopwatch op stop zetten.
		clearInterval(stopwatch); // timer moet weg.
		timerDiv.textContent = "00:00"; // tekst van div resetten.
	}
};