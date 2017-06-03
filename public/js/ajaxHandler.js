/* AJAX HANDLER */

function sendFriendsData(){
	var friendsData = prepareFBFriendsData();
	unansweredGet(FRIENDS_DATA_PATH, friendsData);
}

function sendFriendsLikesData(friendsLikesData){
	console.log(friendsLikesData);
}

function unansweredGet(path, data){
	$.get(path, data);
}

function answeredGet(path, data, callback){
	$.get(path, data, callback);
}


function prepareFBFriendsData() {
	var object = {"friends_data": prepareFriendsData(friendsList)};
	console.log(object);
	return object;
}