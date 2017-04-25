/*helpers.js*/


function setFriendsList(friendsList){
	var select = $("#friendsList");
	for(var i = 0; i < friendsList.length; i++) {
		select.append($("<option>" + friendsList[i] + "</option>"));
	}
}

function setStatus(content){
	$("#status").html(content);
}