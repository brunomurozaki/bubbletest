/*GLOBALS*/
var friendsList = {};
var postReference = {};
var likesReference = {};
var currentFriendID = -1;
var isFinished = {}; 
var myLikesData = [];
var logged = false;
var isPagingLikes = false;
var friendsLikesData = {};
var myID = "";

var baseTrackedPages = {};
var trackedPages = {};
var trackedPagesKeys = {};

var pagesByTags = {};

var leftWing = {}; // Esquerda, anti-antiPT
var rightWing = {}; // Direita, anti-PT

var likesFlags = {};

var likesCount = {};

var allServerUsers = {};

/*CONSTANTS*/
var FRIENDS_DATA_PATH = "friends_data";
var FRIENDS_LIKES_DATA = "friends_likes_data";
var PAGES_DATA = "pages_data";
var ALL_USERS = "get_users";
var USER = "/api/users";
var LOCATION = "/api/location";
var DEL_USER = "del_user";