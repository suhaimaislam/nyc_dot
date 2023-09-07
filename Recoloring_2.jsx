/* 
Recoloring Script Part 2

OUTLINE : 
    - Run this script after running Recoloring_Script_Part1 and hiding correctly colored layers
    - unhides layers that were labeled as the correct color (green selection mark color)
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

var greenColor = new RGBColor();
greenColor.red = 0;
greenColor.green = 249;
greenColor.blue = 0;

var orangeColor = new RGBColor();
orangeColor.red = 255;
orangeColor.green = 147;
orangeColor.blue = 0;

for (var i=0 ; i<pathCount ; i++) {
	if (allPaths[i].layer.color.red == 0 && allPaths[i].layer.color.green == 249 && allPaths[i].layer.color.blue == 0) {
		allPaths[i].hidden = false;
	}
}
for (var i=0 ; i<textCount ; i++) {
	if (allTexts[i].layer.color.red == 0 && allTexts[i].layer.color.green == 249 && allTexts[i].layer.color.blue == 0) {
		allTexts[i].hidden = false;
	}
}