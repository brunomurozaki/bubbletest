/*GLOBALS*/
var friendsList = [];
var postReference = {};
var likesReference = {};
var currentFriendID = -1;
var isFinished = {}; 
var myLikesData = [];
var logged = false;
var isPagingLikes = false;
var friendsLikesData = {};

var trackedPages = {};
var trackedPagesKeys = {};

var pagesByTags = {};

/*CONSTANTS*/
var FRIENDS_DATA_PATH = "friends_data";
var FRIENDS_LIKES_DATA = "friends_likes_data";
var PAGES_DATA = "pages_data";