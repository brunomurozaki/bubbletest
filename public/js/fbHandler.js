/*fbHandler.js*/

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1955155201237687',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
    FB.AppEvents.logPageView();   
  };

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function prepareFriendsData(friendsList){
	var obj = {};

	for(var i = 0; i < friendsList.length; i++){
		obj[friendsList[i].id] = {"name": friendsList[i].name};
	}

	return obj;
}


function defaultDataTratment(){
	// provisorio
	
}

function getLikesFromFriends(){
	var friendIds = Object.keys(friendsList);
	
	for(var i = 0; i < friendIds.length; i++) {
		getLikesDataByID(friendIds[i]);
	}	
}

function loginCallback(e){
	console.log("loginCallback");
	console.log(e);
	
	if(e.status == "connected"){
		myID = e.authResponse.userID;
		accessToken = e.authResponse.accessToken;

		getUserData(myID, accessToken);
		defaultDataTratment();

		$("#tabs_row").css({"display": "block"});
		$(".btFBWrapper").css({"display": "none"})
	} else {
		alert("invalid facebook credentials");
	}
}

function getUserData(id, accessToken){
	FB.api("/me?fields=id,name,location,birthday,gender,likes,friends{id}", "get", function(response){
		myUser = response;
		startAddingUser(response);
		startGetFriends(response.friends);
		getAllData();
	});
}

function getLikesDataByID(id) {
	FB.api("/" + id + "?fields=likes", "get", function(response){
		//friendsLikesData[id] = response.likes.data;
		var listData = response.likes.data, data;
		friendsList[id].likes = {};
		
		for(var i = 0; i < listData.length; i++){
			data = listData[i];
			friendsList[id].likes[data.id] = {"name": data.name, "created_time": data.created_time};
		}
		
		if(response.likes.paging && response.likes.paging.next){
			//sendFriendsLikesData(response.likes.data, id);
			FB.api(response.likes.paging.next, "GET", nextLikesByIDPage);
		} else {
			
		}		
	});
}

function nextLikesByIDPage(response){
	
	if(response.paging == undefined) {	
		return;
	}
	
	var listData = response.data, data;
	var superID = getIdByPagingURL(response.paging.previous);
	
	for(var i = 0; i < listData.length; i++) {
		data = listData[i];
		friendsList[superID].likes[data.id] = {"name": data.name, "created_time": data.created_time};
	}
	
	if(response.paging && response.paging.next) {
		FB.api(response.paging.next, "GET", nextLikesByIDPage);
	} else {
		
	}
}

function isLikesDataReady(){
	var keys = Object.keys(likesFlags);
	
	for(var i = 0; i < keys.length; i++) {
		if(!likesFlags[keys[i]])
			return false;
	}
	
	return true;
}

function nextLikesPage(response){
	myLikesData = myLikesData.concat(response.data);
	if(response.paging && response.paging.next) {
		FB.api(response.paging.next, "GET", nextLikesPage);
	} else {
	}
}

function getFriendsData() {
	FB.api("/me?fields=friends", "get", function(response){
		var listData = response.friends.data, data;
		
		for(var i = 0; i < listData.length; i++) {
			data = listData[i];
			friendsList[data.id] = {"name": data.name};			
		}
		
		setStatus("Amigos selecionados");
		
		//Quando fizer pagination em friends, favor inserir este trecho de codigo ao fim
		getLikesFromFriends();
	});
}

function checkLoginState(){
	//FB.login(loginCallback, {scope: "public_profile,email,user_friends"});
	FB.login(loginCallback, {scope: "public_profile,email,user_friends,user_birthday,user_location,user_likes,user_gender,user_birthday"});
}

/*function migrateUsersToDB(){
	var keysToBeAdded = Object.keys(friendsList);
	keysToBeAdded.push(myID);

	for(var i = 0; i < keysToBeAdded.length; i++){
		addUser(keysToBeAdded[i]);
	}
}*/

function getFeed(){
	FB.api("/me/home", "get", function(response){
		debugger;
	});
}



/**
	Fb Helper Functions
*/

function getIdByPagingURL(pagingURL){
	return pagingURL.split("/")[4];
}