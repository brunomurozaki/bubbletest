/* AJAX HANDLER */

function startGetFriends(friendsObj){

	for(var i = 0; i < friendsObj.data.length; i++){
		friendsList.push(friendsObj.data[i].id);	
	}
	
	if(friendsObj.paging && friendsObj.paging.next)
	{
		continueSendingFriends(friendsObj.paging.next);
	} 
	else 
	{
		console.log("Fim de amigos");
		for(var i = 0; i < friendsList.length; i++)
		{
			answeredGet(LIKES_SUMMARY.replace(":id", friendsList[i]), null, function(res){
				friendsLikesSummary.left += res.left;
				friendsLikesSummary.right += res.right;
				friendsLikesSummary.press += res.press;
				friendsLikesSummary.neutral += res.neutral;
				
				okData.friends = true;
				mountMap();
			});
		}
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
		else // Lista de amigos completa
		{
			console.log("Fim de amigos");
			for(var i = 0; i < friendsList.length; i++)
			{
				answeredGet(LIKES_SUMMARY.replace(":id", friendsList[i]), null, function(res){
					friendsLikesSummary.left += res.left;
					friendsLikesSummary.right += res.right;
					friendsLikesSummary.press += res.press;
					friendsLikesSummary.neutral += res.neutral;

					okData.friends = true;
					mountMap();
				});
			}
		}
	});
}

function startAddingUser(req){
	if(req.location){
		answeredPost(LOCATION, {"fb_id": req.location.id, "name": req.location.name}, function(res){
			answeredPost(USER, {"fb_id": req.id, "name": req.name, "gender": req.gender.charAt(0), "birthday": req.birthday, "loc_fb_id": req.location.id}, function(){
				startAddLikes(req);
			});

		});	
	}
	else {
		answeredPost(USER, {"fb_id": req.id, "name": req.name, "gender": req.gender.charAt(0), "birthday": req.birthday, "loc_fb_id": null}, function(){
			startAddLikes(req);
		});		
	}
}

function startAddLikes(req){
	if(req.likes){
		var likesData = req.likes.data;

		for(var i = 0; i < likesData.length; i++)
		{
			unansweredPost(LIKES, {"users_fb_id": req.id, "pages_id": likesData[i].id});
		}

		if(req.likes&& req.likes.paging && req.likes.paging.next){
			continueSendingLikes(req.likes.paging.next, req.id);
		} else {
			answeredGet(LIKES_SUMMARY.replace(":id", myUser.id), null, function(res){
				myLikesSummary = res;

				okData.me = true;
				mountMap();
			});
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
		} else {
			answeredGet(LIKES_SUMMARY.replace(":id", myUser.id), null, function(res){
				myLikesSummary = res;
				
				okData.me = true;
				mountMap();
			});
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

function answeredPost(path, data, callback, failCallback){
	$.post(path, data, callback).fail(failCallback);
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

function getAllData(){
	getGenderSummaryLikes();
	getAgeSummaryLikes();
	getLocationSummaryLikes();
}

function getGenderSummaryLikes() {
	answeredGet(LIKES_GENDER.replace(":gender", myUser.gender.charAt(0)), null, function(res){
		genderLikesSummary = res;

		okData.gender = true;
		mountMap();
	});
}

function getAgeSummaryLikes() {
	answeredGet(LIKES_BIRTHDAY.replace(":birthday", myUser.birthday.replace(/\//g, "-")), null, function(res){
		ageLikesSummary = res;

		okData.age = true;
		mountMap();
	});
}

function getLocationSummaryLikes() {
	answeredGet(LIKES_LOCATION.replace(":id", myUser.location.id), null, function(res){
		locationLikesSummary = res;

		okData.location = true;
		mountMap();
	});
}