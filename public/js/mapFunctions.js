
var okData = {me: false, friends: false, location: false, gender: false, age: false}

var myLikesSummary = {left: 0, right: 0, press: 0, neutral: 0};
var friendsLikesSummary = {left: 0, right: 0, neutral: 0, press: 0};
var locationLikesSummary = {left: 0, right: 0, neutral: 0, press: 0};
var genderLikesSummary = {left: 0, right: 0, neutral: 0, press: 0};
var ageLikesSummary = {left: 0, right: 0, neutral: 0, press: 0};

function mountMap(){
	if(okData.me)
	{
		mountGenericMap("myMap", myLikesSummary);
	}

	if(okData.friends)
	{
		mountGenericMap("friendsMap", friendsLikesSummary);
	}

	if(okData.location)
	{
		mountGenericMap("locationMap", locationLikesSummary);
	}

	if(okData.gender)
	{
		mountGenericMap("genderMap", genderLikesSummary);
	}

	if(okData.age)
	{
		mountGenericMap("ageMap", ageLikesSummary);
	}
}

function mountGenericMap(elementId, likesObj){
	var total = likesObj.left + likesObj.right;

	if(total == 0)
		return;

	var myMap = $("#" + elementId);
	var loadingDiv = myMap.find(".loading");
	var testPercentage = myMap.find(".testPercentage");
	var leftPercentage = Math.round((likesObj.left*100)/total);
	var rightPercentage = 100 - leftPercentage;

	// Atualizando os numeros
	myMap.find(".leftPercentage>.numberPercentage").html(leftPercentage + "%");
	myMap.find(".rightPercentage>.numberPercentage").html(rightPercentage + "%");

	// Atualizando o tamanho da barra
	myMap.find(".leftPercentage>.colorWrapper>.colorPercentage").css({width: leftPercentage + "%"});
	myMap.find(".rightPercentage>.colorWrapper>.colorPercentage").css({width: rightPercentage + "%"});
	
	loadingDiv.remove();
	testPercentage.css({display: "block"})

}

function tradeLocationData(e){
	if($("#globalData")[0].checked){
		getLocationData($("#stateSelect").val().toLowerCase())
	} else {
		mountMap();
	}
}

function getLocationData(state){
	mountGenericMap("locationMap", publicData[state]);
}

function blockLocation(){
	okData.location = true;
	mountMap();

	$("#globalData")[0].checked = true;
	$("#globalData").prop("disabled", "disabled");
	onChangeLocationCheck();
}