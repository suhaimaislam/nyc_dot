/* 
ReplaceWithSymbol.jsx
Script for Adobe Illustrator

Purpose: Replaces selected items with Instances of a Symbol from the Symbols Panel.
	 Used for the Bike Share kiosks and SBS Bus Stops Icons.

Symbol Names:
Bike Share Kiosks - cb1
SBS Bus Stops - SBS Symbol
*/


function main() {
	var aDoc = app.activeDocument;

	var symbolName = prompt("Enter the name of the Symbol that you want to replace each selected object with:", "Symbol Name");
	
	// Stops proceeding to the rest of the script if the cancel button is clicked
	if (symbolName == null) {
		return;
	}

	var layerName = prompt("Enter the name that you would like the new layer to be called:", "Layer Name");

	// Stops proceeding to the rest of the script if the cancel button is clicked	
	if (layerName == null) {
		alert("No layer name entered. Symbols will not be placed.");
		return;
	}

	aDoc.layers.add().name = layerName;
	// aDoc.activeLayer = docRef.layers.getByName(layerName);

	// Iterates through the objects of the layer that has been selected
	var selLength = aDoc.selection.length;
	for(i = 0; i < selLength; i++) {
		var currObj = aDoc.selection[i];
		var currLeft = currObj.left;
		var currTop = currObj.top;
		var currWidth = currObj.width;
		var currHeight = currObj.height;

		// Attempts to add the symbols but will catch the error if the symbol name is not found		
		try {
			var currInstance = aDoc.symbolItems.add(aDoc.symbols.getByName(symbolName));
			currInstance.left = currLeft + (currWidth / 2) - (currInstance.width / 2);
			currInstance.top = currTop - (currHeight / 2) + (currInstance.height / 2);

			//currInstance.selected = true;

			//currObj.remove();
		}
		catch (e) {
			alert("Symbol with the name \"" + symbolName + "\" is not found. Make sure the symbol name entered is spelled correctly.");
			aDoc.layers[0].remove();
			return;
		}
	}
}

main();