// Script to rotate layers in Adobe Illustrator

aDoc = app.activeDocument;
selArr = aDoc.selection;
numSel = selArr.length;

angle = Number(prompt("Angle to be Rotated By: (0-359)", 0));

for (i=0; i < numSel; i++)
{
	selArr[i].rotate(angle, angle);
}

/* 
Attempt to Rotate a Specified Layer
Error: No Such Element from the Line Below
 
//aDoc.activeLayer = aDoc.layers.getByName("Other Names");
//aDoc.activeLayer = aDoc.layers.index('1');
var aLay = aDoc.activeLayer;
var objs = aLay.compoundPathItems;
var numObjs = aLay.length;

angle = Number(prompt("Angle to be Rotated By: (0-359)", 0));

for (i=0; i < numObjs; i++)
{
	objs[i].rotate(angle, angle);
}
*/