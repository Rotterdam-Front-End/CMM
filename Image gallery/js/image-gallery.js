window.onload = function(){	
	/* 	======================================================================	
		Browser & Object sniffing
	=========================================================================== */
	if(!document.getElementById) return false; // Als de browser NIET getElementById snapt, kappen we!
	if(!document.getElementById("galleryContainer")) return false; // We hebben twee id's nodig. Als ze niet bestaan, kappen we!
	if(!document.getElementById("galleryPagination")) return false;
	
	var galleryContainer = document.getElementById("galleryContainer");
	var galleryPagination = document.getElementById("galleryPagination");
	
	
	/* 	======================================================================	
		Gallery Initialisation
	=========================================================================== */
	var imgDir = "images/"; // Verwijzing naar de img map.
	
	// 1. Ga door alle a tags heen met de for loop.
	// 2. Check of de a tag in kwestie de class .galleryThumb heeft.
	// 3. Als dat zo is, dan wil ik de eerste a tag hebben, zodat ik de hoofdimage van de gallery kan maken.
	// 4. Bouw de thumbs en zet ze in de gallery.
	  
	var firstGalleryThumb = false;
	var eventLijst = ['click', 'mouseover', 'mouseout']; // Lijst met daarin de events voor de thumbjes.
	var imagesList = []; // Te vullen met plaatjes die we willen preloaden.
	
	
	for(var i=0; i<document.links.length; i++){ // Ga door ALLE a-tags heen van het document.
		if(document.links[i].className != 'galleryThumb') continue; // Als de a-tag NIET de classname heeft, gaan we in de for door naar de volgende stap
		
		// Stap 3.
		if(firstGalleryThumb == false){ // Alleen één keer, voor de eerste a.galleryThumb de hoofimg bouwen.
			firstGalleryThumb = true;
			
			// Maak een image aan, zet die op de src 'boot' graphic. En stop deze image in de galleryContainer div.
			var galleryImage = new Image();
			galleryImage.src = document.links[i].href; // Haal van de eerste a-tag, de href op. Stop deze in de src van de img.
	
			var figure = document.createElement("figure"); // Maak een figure tag aan.
			figure.appendChild(galleryImage); // Stop de image in de container.
	
			// Onderschrift voor de galleryImage maken, aan de hand van de eerst link (z'n title).
			var figCaption = document.createElement("figcaption"); // Maak een figcaption tag aan.
			figCaption.textContent = document.links[i].title; // Stop de title tekst van de eerste link in de figcaption tag.
			figure.appendChild(figCaption); // Stop de figcaption in de figure.
			galleryContainer.appendChild(figure); // Stop de figure in de galleryContainer
		}
		
		// Stap 4.
		// Bouw een img thumb en zet de thumb in de a-tag.
		var thumb = new Image();
		
		// thumbUrl = "images/boot.jpg"
		// file://map/submap/images/boot.jpg"
		// file://map/submap/images/boot-thumb-normal.jpg"
		var thumbUrl = document.links[i].href;
		imagesList.push(thumbUrl); // voeg hoofd image toe om te preloaden.
		
		var positieLaatsteSlash = thumbUrl.lastIndexOf("/") +1; // Geef mij de character positie van de laatste slash.
		var positieExtensie = thumbUrl.lastIndexOf(".");
		var imageName = thumbUrl.substring(positieLaatsteSlash, positieExtensie); // Maak een substring na de laatste slash, en voor het laatste punt.
		var imageExtensie = thumbUrl.substr(positieExtensie); // Geef mij de extensie.
		thumb.src = imgDir + imageName + "-thumb-normal" + imageExtensie;
		imagesList.push(imgDir + imageName + "-thumb-normal" + imageExtensie); // Voeg thumb toe om te preloaden.
		imagesList.push(imgDir + imageName + "-thumb-over" + imageExtensie); // Voeg thumb toe om te preloaden.
		
		thumb.alt = document.links[i].title;
		thumb.setAttribute("data-basename", imageName); // False id maken met een zelfverzonnen attribute.
		
		document.links[i].textContent = ""; // Tekst van de a-tag herschrijven naar... niets...
		document.links[i].appendChild(thumb); // Thumb in de stoppen.
		
		// 1. Voorzie de a-tag van een click event.
		// 2. Blokkeer de werking van a-tag (onclick)
		// 3. Update de hoofimage van de gallery (aan de hand van gegevens die we hierboven al hebben)
	 	
	 	// Voor elk item in de eventLijst array, maak een eventListener aan voor de a-tag.
	 	for(hetEvent of eventLijst){ // Ga drie keer door de array 	 			
			// Elke a-tag voorzien van een click-event.
			document.links[i].addEventListener(hetEvent, function(e){
				// JavaScript maakt automatisch event objecten aan (bij het afwerken van een event).
				// Deze kunnen we opvragen (nu met de variabele naam 'e').
				// Het event object heeft handige methods en properties over het event.
				e.preventDefault(); // Stop de werking van de a-tag.
				
				if(e.type == 'click'){
					galleryImage.src = this.href; // 'this' is document.links[i]. Update de hoofdimage.
					galleryImage.alt = this.title; // Update de alt a.d.v. a.title.
					figCaption.textContent = this.title; // Onderschrift updaten
				} else if(e.type == 'mouseover'){
					this.firstChild.src = imgDir + this.firstChild.getAttribute('data-basename') + "-thumb-over" + imageExtensie;
				} else if(e.type == 'mouseout'){
					this.firstChild.src = imgDir + this.firstChild.getAttribute('data-basename') + "-thumb-normal" + imageExtensie;
				}// Einde if hetEvent
			}, false); // Einde addEventListener
	 	} // Einde for eventLijst	
	} // eind for a-tag
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* 	======================================================================	
	Thumbnail Initialisatie en binding
	=========================================================================== */	
	
	
	
	/* 	======================================================================	
		Image Preloader
	=========================================================================== */	
	var preloadedImages= [];
	function preloadImages(){
		for(var i=0; i<imagesList.length; i++){ // Ga door de imagesList array heen. En voor elk item in de array, doe iets...
			preloadedImages[i] = new Image(); // Image constructor van JS, waarmee ik zelf afbeeldingen kan maken.
			preloadedImages[i].src = imagesList[i];
			console.log(imagesList[i]);
		}
	}
	preloadImages();
}