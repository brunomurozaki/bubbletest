/*helpers.js*/



$(function (){
	init();
});


function setFriendsList(friendsList){
	var select = $("#friendsList");
	for(var i = 0; i < friendsList.length; i++) {
		select.append($("<option>" + friendsList[i] + "</option>"));
	}
}

function setLikesList(likesList){
	var select = $("#myLikesSelect");
	for(var i = 0; i < likesList.length; i++) {
		select.append($("<option>" + likesList[i] + "</option>"));
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
}

function onGetLikesClick(e){
	getMyLikesData();
}