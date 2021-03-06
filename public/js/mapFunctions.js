/*mapFunctions.js*/

/* MAP FUNCTIONS */

function mountMap() {
	var rightDiv = $("#rightWing");
	var leftDiv  = $("#leftWing");
	var map = $("#testWrapper");
	var startButton = $("#startTestButton");

	var rightSize = Object.keys(rightWing).length;
	var leftSize = Object.keys(leftWing).length;

	rightDiv.css({"width": rightSize + "px", "height": rightSize + "px", "border-radius" : (rightSize / 2) + "px"})
	leftDiv.css({"width": leftSize + "px", "height": leftSize + "px", "border-radius" : (leftSize / 2) + "px"})

	map.css("display", "block");
	startButton.css({"display": "none"});

	createMyInitialPosition();
}

function createMyInitialPosition() {

	var posX = getMapCenterX(); 
	var posY = getMapCenterY();

	var me = $("<div id='me'>").addClass("point");
	me.css({"left": posX + "px", "top": posY + "px"});

	me.insertBefore($("#dataInformation"));
}

function mountList(myLikesOnLeft, myLikesOnRight){
	var leftPages = $("#leftPages");
	var rightPages = $("#rightPages");

	leftPages.empty();
	rightPages.empty();
	
	var newItem, pageItem;

	for(var i = 0; i < myLikesOnLeft.length; i++){
		newItem = $("<li>").addClass("pageItem").addClass("list-group-item");
		pageItem = myLikesOnLeft[i];
		newItem.append(pageItem["pageName"]);
		leftPages.append(newItem);
	}

	for(var i = 0; i < myLikesOnRight.length; i++){
		newItem = $("<li>").addClass("pageItem").addClass("list-group-item");	
		pageItem = myLikesOnRight[i];
		newItem.append(pageItem["pageName"]);
		rightPages.append(newItem);
	}
}


function drawMyPosition(elem, leftLikes, rightLikes, totalLikes){

	var percentageLeft = 0;
	
	if(totalLikes == 0) {
		percentageLeft = 0.5; 
	} else {
		percentageLeft = ((leftLikes*100)/totalLikes)/100;
	}

	var centerX = getMapCenterX();
	var posX = centerX - (percentageLeft * centerX) ;

	elem.css({"left": posX + "px"});

	// TODO melhorar isso pra qualquer tipo de bubble
	$(".floatRight").find("span").html((Math.floor(100 - (percentageLeft*100))) + "%");
	$(".floatLeft").find("span").html((Math.ceil(percentageLeft*100)) + "%"); 
}


/***************** MAP HELPERS *****************/

function getMapCenterX(){
	var politicalMap = $("#politicalMap");
	var bubblesWrapper = $(".bubbleWrapper");
	var bubblesUnity = $(".bubble");

	var x = $(bubblesWrapper[0]).width();
	var y = $(bubblesWrapper[1]).width();
	var z = politicalMap.width();
	var h = z - (x + y);

	return h/2; 	
}

function getMapCenterY(){
	var politicalMap = $("#politicalMap");
	var bubblesWrapper = $(".bubbleWrapper");
	var bubblesUnity = $(".bubble");

	return (max($(bubblesUnity[0]).width(), $(bubblesUnity[1]).width()) + $(".bubbleTitle").outerHeight()) / 2; 	
}