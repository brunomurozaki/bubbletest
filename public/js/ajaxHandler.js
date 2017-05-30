/* AJAX HANDLER */

function sendFriendsData(){
	var friendsData = prepareFBFriendsData();
	unansweredGet(FRIENDS_DATA_PATH, friendsData);
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
	/* 
		object sketch
		{ 
			"friends_data":{
				"friend_fb_id1": {
					"name": "friend's name"
				}
			}
		}	
	*/
}
















function unansweredGet(path, data){
	$.get(path, data);
}