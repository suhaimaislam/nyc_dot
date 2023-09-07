/* 
Recoloring Script Part 1

OUTLINE : 
    - searches through the layers in the document
    - compares layer objects' colors to selected swatches in swatch panel
    - changes layer selection color to orange if matching swatch color and/or name not found
    - changes layer selection color to green if matching swatch and name found
    - displays to user the number of paths and texts with correct and incorrect color
    - allows user to hide layers with correct color and keep incorrect color layer visible
    - layers must be unlocked
*/

//@target illustrator

var doc = app.activeDocument;
var allLayers = doc.layers;
var layerCount = allLayers.length;
var allPaths = doc.pathItems;
var pathCount = allPaths.length;
var allTexts = doc.textFrames;
var textCount = allTexts.length;

var pathMatch = false;
var textMatch = false;
var correctPath = [];
var incorrectPath = [];
var correctText = [];
var incorrectText = [];

var selectedSwatches = doc.swatches.getSelected();
var swatchCount = selectedSwatches.length;

// alerts user if no swatches were selected and does not run the script
if (selectedSwatches.length == 0) {
	alert("No Swatches Selected");
}
else {

    var whiteColor = new RGBColor();
    whiteColor.red = 255;
    whiteColor.green = 255;
    whiteColor.blue = 255;

    // sets all layer's selection mark color to white
    for (var i=0 ; i<layerCount ; i++) {
        if (allLayers[i].locked == false) {
            
            allLayers[i].color = whiteColor;
            var subLayers = allLayers[i].layers;
            
            if (subLayers.length > 0) {
                for (var j=0 ; j<subLayers.length ; j++) {
                    subLayers.color = whiteColor;
                }
            }
        }
    }

    var greenColor = new RGBColor();
    greenColor.red = 0;
    greenColor.green = 249;
    greenColor.blue = 0;

    var orangeColor = new RGBColor();
    orangeColor.red = 255;
    orangeColor.green = 147;
    orangeColor.blue = 0;

    // alerts user if they want the script to automatically update layer color to matching swatches
    if (confirm("Do you want to update layer colors with new swatches?")) {
        for (var i=0 ; i<layerCount ; i++) {
            for (var j=0 ; j<swatchCount ; j++) {
                var swatchColor = selectedSwatches[j];
                if (allLayers[i].name.toLowerCase() == swatchColor.name.toLowerCase() && allLayers[i].locked == false) {
                    if (allLayers[i].pathItems.length > 0) {
                        var layerPaths = allLayers[i].pathItems;
                        for (var k=0 ; k<layerPaths.length ; k++) {
                            if (layerPaths[k].filled) {
                                layerPaths[k].fillColor.cyan = swatchColor.color.cyan;
                                layerPaths[k].fillColor.magenta = swatchColor.color.magenta;
                                layerPaths[k].fillColor.yellow = swatchColor.color.yellow;
                                layerPaths[k].fillColor.black = swatchColor.color.black;
                            }
                            else if (layerPaths[k].stroked) {
                                layerPaths[k].strokeColor.cyan = swatchColor.color.cyan;
                                layerPaths[k].strokeColor.magenta = swatchColor.color.magenta;
                                layerPaths[k].strokeColor.yellow = swatchColor.color.yellow;
                                layerPaths[k].strokeColor.black = swatchColor.color.black;
                            }
                        }
                    }
                    if (allLayers[i].textFrames.length > 0) {
                        var textItems = allLayers[i].textFrames;
                        for (var k=0 ; k<textItems.length ; k++) {
                            textItems[k].textRange.characterAttributes.fillColor = swatchColor.color;
                        }
                    }
                }
            }
        }
    }

    // if path / text layer name matches swatch name and path / text color matches swatch color, then layer color is green
    // if path / text layer name does not match swatch name AND/OR color does not match, then layer color is orange
    for (var i=0 ; i<pathCount ; i++) {
        for (var j=0 ; j<swatchCount ; j++) {

            var swatchColor = selectedSwatches[j];

            if (allPaths[i].layer.name.toLowerCase().search(swatchColor.name.toLowerCase()) != -1 
		&& allPaths[i].layer.locked == false
                && Math.round(allPaths[i].fillColor.cyan) == Math.round(swatchColor.color.cyan)
                && Math.round(allPaths[i].fillColor.magenta) == Math.round(swatchColor.color.magenta)
                && Math.round(allPaths[i].fillColor.yellow) == Math.round(swatchColor.color.yellow)
                && Math.round(allPaths[i].fillColor.black) == Math.round(swatchColor.color.black)) {
                    pathMatch = true;
                    correctPath.push(allPaths[i]);
                    allPaths[i].layer.color = greenColor;
                    break;
                }
            else if (allPaths[i].layer.name.toLowerCase().search(swatchColor.name.toLowerCase()) != -1 
		&& allPaths[i].layer.locked == false
                && Math.round(allPaths[i].strokeColor.cyan) == Math.round(swatchColor.color.cyan)
                && Math.round(allPaths[i].strokeColor.magenta) == Math.round(swatchColor.color.magenta)
                && Math.round(allPaths[i].strokeColor.yellow) == Math.round(swatchColor.color.yellow)
                && Math.round(allPaths[i].strokeColor.black) == Math.round(swatchColor.color.black)) {

                    pathMatch = true;
                    correctPath.push(allPaths[i]);
                    allPaths[i].layer.color = greenColor;
                    break;
                }
            else {
                pathMatch = false;
            }   

        }

        if (pathMatch == false && allPaths[i].layer.locked == false) {
            incorrectPath.push(allPaths[i]);
            allPaths[i].layer.color = orangeColor;
        }
        
    }
    for (var i=0 ; i<textCount ; i++) {
        for (var j=0 ; j<swatchCount ; j++) {

            var swatchColor = selectedSwatches[j];

            if (allTexts[i].layer.name.toLowerCase().search(swatchColor.name.toLowerCase()) != -1
		&& allTexts[i].textRange.characterAttributes.fillColor.cyan == swatchColor.color.cyan
		&& allTexts[i].textRange.characterAttributes.fillColor.magenta == swatchColor.color.magenta
		&& allTexts[i].textRange.characterAttributes.fillColor.yellow == swatchColor.color.yellow
		&& allTexts[i].textRange.characterAttributes.fillColor.black == swatchColor.color.black) {
                    textMatch = true;
                    correctText.push(allTexts[i]);
                    allTexts[i].layer.color = greenColor;
                    break;
                }
            else {
                textMatch = false;
            }   

        }

        if (textMatch == false && allTexts[i].layer.locked == false) {
            incorrectText.push(allTexts[i]);
            allTexts[i].layer.color = orangeColor;
        }
        
    }

    // alerts user with number of paths and text with correct and incorrect colors
    alert('Document contains: ' 
        + '\nPaths with correct color: ' + correctPath.length 
        + '\nPaths with incorrect color: ' + incorrectPath.length 
        + '\nText with correct color: ' + correctText.length 
        + '\nText with incorrect color: ' + incorrectText.length) ;

    // alerts user if they want to hide the layer objects with the correctly matched swatch colors
    if (confirm("Do you want to hide layers with correct color?")) {
        for (var i=0 ; i<correctPath.length ; i++) {
            correctPath[i].hidden = true;
        }
        for (var i=0 ; i<correctText.length ; i++) {
            correctText[i].hidden = true;
        }
    }

}