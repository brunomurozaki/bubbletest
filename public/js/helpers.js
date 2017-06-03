/*helpers.js*/

$(function (){
	init();
});


function setFriendsList(friendsList){
	var select = $("#friendsList");
	select.empty();
	for(var i = 0; i < friendsList.length; i++) {
		select.append($("<option value='" + friendsList[i].id + "'>" + friendsList[i].name + "</option>"));
	}
}

function setLikesList(likesList){
	var select = $("#myLikesSelect");
	select.empty();
	for(var i = 0; i < likesList.length; i++) {
		select.append($("<option value='" + likesList[i].id + "'>" + likesList[i].name + "</option>"));
	}	
}

function setLikesByIDList(likesList){
	var select = $("#myFriendsLikesSelect");
	select.empty();
	for(var i = 0; i < likesList.length; i++) {
		select.append($("<option value='" + likesList[i].id + "'>" + likesList[i].name + "</option>"));
	}	
}

function setStatus(content){
	$("#status").html(content);
}

function init(){
	bindEvents();
}

function bindEvents() {
	$("#getLikes").on("click", onGetLikesClick);
	$("#getFriendsLikes").on("click", onGeMyFriendLikes)
	$("#matchLikes").on("click", onMatchLikes)
	$("#btFB").on("click", checkLoginState);
	$("#startTestButton").on("click", onStartTest);
}

function onStartTest(e) {
	getPagesData();
}

function onMatchLikes(e){
	
}

function onGeMyFriendLikes(e){
	getLikesDataByID($("#friendsList").val());
	setLikesByIDList(myLikesData);
}

function onGetLikesClick(e){
	getMyLikesData();
	setLikesList(myLikesData);
}

function addPageByTag(pageKey, page){
	var tags = page.tags; 
	if(!tags)
		tags = ["untagged"];

	var obj = {pageName: pageKey, pageData: page};

	for(var i = 0; i < tags.length; i++){
		if(!pagesByTags[tags[i]])
			pagesByTags[tags[i]] = [obj];
		else
			pagesByTags[tags[i]] = pagesByTags[tags[i]].concat(obj);
	}
}

function mountDataArray(){
	var page, pageKey;

	for(var i = 0; i < trackedPagesKeys.length; i++){
		pageKey = trackedPagesKeys[i];
		page = trackedPages[trackedPagesKeys[i]];
		addPageByTag(pageKey, page);
	}

	separateWingData();
	mountMap();	
}

function separateWingData() {
	var absoluteLeftData = pagesByTags["Esquerda"].concat(pagesByTags["anti-antiPT"]);
	var absoluteRightData = pagesByTags["Direita"].concat(pagesByTags["anti-PT"]);

	var pageObject;

	// leftData
	for(var i = 0; i < absoluteLeftData.length; i++){
		pageObject = absoluteLeftData[i];
		if(pageObject.pageData.fb_id)
			leftWing[pageObject.pageData.fb_id] = {pageName: pageObject.pageName};
	}

	// rightData
	for(var i = 0; i < absoluteRightData.length; i++){
		pageObject = absoluteRightData[i];
		if(pageObject.pageData.fb_id)
			rightWing[pageObject.pageData.fb_id] = {pageName: pageObject.pageName};	
	}
}

function mountMap() {
	var rightDiv = $("#rightWing");
	var leftDiv  = $("#leftWing");
	var map = $("#politicalMap");
	var rightSize = Object.keys(rightWing).length;
	var leftSize = Object.keys(leftWing).length;

	rightDiv.css({"width": rightSize + "px", "height": rightSize + "px", "border-radius" : (rightSize / 2) + "px"})
	leftDiv.css({"width": leftSize + "px", "height": leftSize + "px", "border-radius" : (leftSize / 2) + "px"})

	map.css("display", "block");
}