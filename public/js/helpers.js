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
}

function onMatchLikes(e){
	
}

function onGeMyFriendLikes(e){
	getLikesDataByID($("#friendsList").val());
}

function onGetLikesClick(e){
	getMyLikesData();
}