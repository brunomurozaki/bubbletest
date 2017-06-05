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

var baseTrackedPages = {};
var trackedPages = {};
var trackedPagesKeys = {};

var pagesByTags = {};

var leftWing = {}; // Esquerda, anti-antiPT
var rightWing = {}; // Direita, anti-PT

var likesFlags = {};

var likesCount = {};

/*CONSTANTS*/
var FRIENDS_DATA_PATH = "friends_data";
var FRIENDS_LIKES_DATA = "friends_likes_data";
var PAGES_DATA = "pages_data";