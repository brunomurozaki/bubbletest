/* AJAX HANDLER */

function sendFriendsData(){
	var friendsData = prepareFBFriendsData();
	unansweredGet(FRIENDS_DATA_PATH, friendsData);
}

function sendFriendsLikesData(friendsLikesData, friendId){
	var obj = {"id": friendId, "data":friendsLikesData};
	unansweredGet(FRIENDS_LIKES_DATA, obj);
}

function getPagesData () {
	answeredGet(PAGES_DATA, {}, function(res){
		trackedPages = res;
		trackedPagesKeys = Object.keys(trackedPages);
		baseTrackedPages = jQuery.extend(true, {}, trackedPages);
	});
}

function getAllUsers(){
	answeredGet(ALL_USERS, {}, function(res){
		console.log(res);
		allServerUsers = res;
	});
}

function startGetFriends(friendsObj){

	for(var i = 0; i < friendsObj.data.length; i++){
		friendsList.push(friendsObj.data[i].id);	
	}
	
	if(friendsObj.paging.next)
	{
		continueSendingFriends(friendsObj.paging.next);
	}
}

function continueSendingFriends(url){
	FB.api(url, "GET", function(response){
		var friendsData = response.data;

		for(var i = 0; i < friendsData.length; i++){
			friendsList.push(friendsData[i].id);	
		}

		if(response.paging && response.paging.next)
		{
			continueSendingFriends(response.paging.next)
		}

	});
}

function startAddingUser(req){
	if(req.location){
		answeredPost(LOCATION, {"fb_id": req.location.id, "name": req.location.name}, function(res){
			unansweredPost(USER, {"fb_id": req.id, "name": req.name, "gender": req.gender.charAt(0), "birthday": req.birthday, "loc_fb_id": req.location.id});		
		});	
	}
	else {
		unansweredPost(USER, {"fb_id": req.id, "name": req.name, "gender": req.gender.charAt(0), "birthday": req.birthday, "loc_fb_id": null});		
	}

	if(req.likes){
		var likesData = req.likes.data;

		for(var i = 0; i < likesData.length; i++)
		{
			unansweredPost(LIKES, {"users_id": req.id, "pages_id": likesData[i].id});
		}

		if(req.likes.paging && req.likes.paging.next){
			continueSendingLikes(req.likes.paging.next, req.id);
		}
	}
}

function continueSendingLikes(url, userID){
	FB.api(url, "GET", function(response){

		var likesData = response.data;
		var userID = getIdByPagingURL(response.paging.previous);
		for(var i = 0; i < likesData.length; i++)
		{
			unansweredPost(LIKES, {"users_fb_id": userID, "pages_id": likesData[i].id});
		}

		if(response.paging && response.paging.next){
			continueSendingLikes(response.paging.next, userID);
		}
	});
}

/*TODO: Add the other user's information when I get all the permissions*/
function addUser(response){
	unansweredPost(USER, {"fb_id": response.id, "name": response.name, "gender": response.gender.charAt(0), "birthday": response.birthday});
}

function delUser(fb_id){
	unansweredGet(DEL_USER, {"fb_id": fb_id});		
}


function unansweredGet(path, data){
	$.get(path, data);
}

function answeredPost(path, data, callback){
	$.post(path, data, callback);
}


function unansweredPost(path, data){
	$.post(path, data);
}

function answeredGet(path, data, callback){
	$.get(path, data, callback);
}

function prepareFBFriendsData() {
	var object = {"friends_data": prepareFriendsData(friendsList)};
	console.log(object);
	return object;
}