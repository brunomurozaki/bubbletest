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

function getLikesFromFriends(){
	var friendIds = Object.keys(friendsList);
	
	for(var i = 0; i < friendIds.length; i++) {
		getLikesDataByID(friendIds[i]);
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

		setStatus("Carregando...");
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
	
	if(response.paging && response.paging.next && friendsLikesData[superID].length != likesCount[superID]) {
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
	FB.login(loginCallback, {scope: "public_profile,email,user_likes,user_posts,user_friends", redirect_uri:"https://bubbletestbubui.herokuapp.com"})
}

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