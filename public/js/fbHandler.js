/*fbHandler.js*/

window.fbAsyncInit = function() {
    FB.init({
      appId      : '241416459655151',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();   
  };

function prepareFriendsData(friendsList){
	var obj = {};

	for(var i = 0; i < friendsList.length; i++){
		obj[friendsList[i].id] = {"name": friendsList[i].name};
	}

	return obj;
}

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function defaultDataTratment(){
	// provisorio
	getFriendsData();
	getMyLikesData();		
}

function finishFriendsDataPreparation(){
	
	$(".statusBar").html("Ready!");
	
	var friend, friendLikeData;

	for(var i = 0; i < friendsList.length; i++){
		friend = friendsList[i];
		friendLikeData = friendsLikesData[friend.id];

		friendLikeData["name"] = friend.name;
	}
}

function getLikesFromFriends(friendsList){
	var friendId;
	initializeEndLikesFlags();
	for(var i = 0; i < friendsList.length; i++) {
		friendId = friendsList[i].id;
		likesFlags [friendId] = false;
		getLikesDataByID(friendId);
	}
	
}

function loginCallback(e){
	console.log("loginCallback");
	
	if(e.status == "connected"){
		
		defaultDataTratment();
		$("#tabs_row").css({"display": "block"});
		$(".btFBWrapper").css({"display": "none"})
	} else {
		alert("invalid facebook credentials");
	}
}

function getLikesDataByID(id) {
	FB.api("/" + id + "?fields=likes", "get", function(response){
		friendsLikesData[id] = response.likes.data;

		if(response.likes.paging && response.likes.paging.next){
			//sendFriendsLikesData(response.likes.data, id);
			FB.api(response.likes.paging.next, "GET", nextLikesByIDPage);
		} else {
			likesFlags[id] = true;
		}

		setStatus("Carregando...");
	});
}

function nextLikesByIDPage(response){
	
	if(response.paging == undefined)
		return;

	var superID = getIdByPagingURL(response.paging.previous);
	friendsLikesData[superID] = friendsLikesData[superID].concat(response.data);
	if(response.paging && response.paging.next) {
		FB.api(response.paging.next, "GET", nextLikesByIDPage);
	} else {
		likesFlags[superID] = true;
		
		if(isLikesDataReady())
			finishFriendsDataPreparation();
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

function getMyLikesData(){
	FB.api("/me?fields=likes", "get", function(response){
		myLikesData = response.likes.data;

		if(response.likes.paging && response.likes.paging.next){
			FB.api(response.likes.paging.next, "GET", nextLikesPage);
		}

		setStatus("Carregando...");
	});
}

function nextLikesPage(response){
	myLikesData = myLikesData.concat(response.data);
	if(response.paging && response.paging.next) {
		FB.api(response.paging.next, "GET", nextLikesPage);
	} else {
	}
}

function getFriendsData() {
	FB.api("/me?fields=friends,name", "get", function(response){
		friendsList = response.friends.data;
		setStatus("Amigos selecionados");
		
		//Quando fizer pagination em friends, favor inserir este trecho de codigo ao fim
		getLikesFromFriends(friendsList);
	});
}

function checkLoginState(){
	FB.login(loginCallback, {scope: "public_profile,email,user_likes,user_posts,user_friends", redirect_uri:"https://bubbletestbubui.herokuapp.com"})
}


/**
	Fb Helper Functions
*/

function getIdByPagingURL(pagingURL){
	return pagingURL.split("/")[4];
}