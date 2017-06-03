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

function stringfyData(friendsData){
	var ret = [];

	for(var i = 0; i < friendsData.length; i++){
		ret[ret.length] = friendsData[i].name;
	}
	return ret;
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
	setFriendsList(friendsList);
}

function getLikesFromFriends(friendsList){
	var friendId;
	for(var i = 0; i < friendsList.length; i++) {
		friendId = friendsList[i].id;
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
	}
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
		setStatus("Lista de likes carregada! Você possui " + myLikesData.length + " likes");
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