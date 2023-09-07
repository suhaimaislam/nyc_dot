/* 
Replace Subway Tabs REF with Symbols Script

OUTLINE : 
    - searches through the selected Subway Tabs REF text layer
    - replaces the REF text with corresponding Subway Tab symbol if FULL symbol name is found within REF name
    - script ignores dashes, newlines, and lettercase
    - selected REF layer must be visible and unlocked
    - symbols are added to a new layer called 'Subway Tabs'
    - for one station represented with multiple REF labels, a pictogram is added for each label
    - if symbol not added for a REF text, then REF text is made yellow and alert shown to user with REF text

SYMBOL NAMING :
    - station name without dashes
    - if station has multiple tabs with different train lines, add train lines after name (without spaces)
    - name 'street' as 'st' and 'square' as 'sq'
*/

var docRef=app.activeDocument;
docRef.layers.add().name = 'Subway Tabs';
docRef.activeLayer = docRef.layers.getByName('Subway Tabs');

for(i=0 ; i<docRef.selection.length ; i++) {
	var symbolAdded = false;
	var currObj=docRef.selection[i]; 
	var textPoint = currObj.anchor;

	// replaces a newline with a whitespace in REF name
	currObj.contents = currObj.contents.replace(/[\r\n]+/g," ");
	
	// replaces a dash with a whitespace in REF name
	currObj.contents = currObj.contents.replace(/-/g," ");

	// changes 'street' to 'st' in REF name
	if (currObj.contents.search("Street") != -1) {
		currObj.contents = currObj.contents.replace("Street", "St");
	}
    	else if (currObj.contents.search("street") != -1) {
        	currObj.contents = currObj.contents.replace("street", "St");
    	}
    
    	// changes 'square' to 'sq' in REF name
    	if (currObj.contents.search("Square") != -1) {
        	currObj.contents = currObj.contents.replace("Square", "Sq");
    	}
    	else if (currObj.contents.search("square") != -1) {
        	currObj.contents = currObj.contents.replace("square", "Sq");
    	}
    	
	// iterates through selected REF text and adds the corresponding symbol if partial name match found
    	for (var j=0 ; j<docRef.symbols.length ; j++) {
        	var symbolName = docRef.symbols[j].name;
        
        	if (currObj.contents.toLowerCase().search(symbolName.toLowerCase()) != -1) {
            		var currSymbol = docRef.symbolItems.add(docRef.symbols.getByName(symbolName));
	    		currSymbol.position = textPoint;
	    		symbolAdded = true;
            		break;
        	}
		else {
			symbolAdded = false;
		}
    	}
    
	// changes unmatched REF text fill color to yellow
    	if (symbolAdded == false) {
        	alert("Unable to add subway tab for the following station:\n" + currObj.contents);

		currObj.textRange.characterAttributes.fillColor.cyan = 0;
		currObj.textRange.characterAttributes.fillColor.magenta = 0;
		currObj.textRange.characterAttributes.fillColor.yellow = 100;
		currObj.textRange.characterAttributes.fillColor.black = 0;
    	}
}
