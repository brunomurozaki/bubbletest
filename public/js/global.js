/*GLOBALS*/
var friendsList = [];
var postReference = {};
var likesReference = {};
var currentFriendID = -1;
var isFinished = {}; 
var myLikesData = [];
var logged = false;
var isPagingLikes = false;

/*CONSTANTS*/
var FRIENDS_DATA_PATH = "friends_data";