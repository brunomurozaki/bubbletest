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
var LIKES = "/api/likes";
var LOCATION = "/api/location";
var DEL_USER = "del_user";
var LIKES_SUMMARY = "/api/users/:id/likesSummary";
var LIKES_BIRTHDAY = "/api/users/age/:birthday/likes";
var LIKES_GENDER = "/api/users/:gender";
var LIKES_LOCATION = "/api/location/:id/likes";

var myUser = {};

var publicData = {
    // norte
    ac = {
        gender: {},
        age: {}
    },
    am = {
        gender: {},
        age: {}
    },
    ap = {
        gender: {},
        age: {}
    },
    rr = {
        gender: {},
        age: {}
    },
    pa = {
        gender: {},
        age: {}
    },
    ro = {
        gender: {},
        age: {}
    },
    to = {
        gender: {},
        age: {}
    },

    // nordeste 
    ce = {
        gender: {},
        age: {}
    },
    ma = {
        gender: {},
        age: {}
    },
    rn = {
        gender: {},
        age: {}
    },
    pe = {
        gender: {},
        age: {}
    },
    se = {
        gender: {},
        age: {}
    },
    ba = {
        gender: {},
        age: {}
    },
    al = {
        gender: {},
        age: {}
    },
    pb = {
        gender: {},
        age: {}
    },
    pi = {
        gender: {},
        age: {}
    },

    // sudeste
    mg = {
        gender: {},
        age: {}
    },
    es = {
        gender: {},
        age: {}
    },
    rj = {
        gender: {},
        age: {}
    },
    sp = {
        gender: {},
        age: {}
    },

    // centro-oeste
    go = {
        gender: {},
        age: {}
    },
    mt = {
        gender: {},
        age: {}
    },
    ms = {
        gender: {},
        age: {}
    },

    // distrito federal
    df = {
        gender: {},
        age: {}
    },

    // sul
    rs = {
        gender: {},
        age: {}
    },
    pr = {
        gender: {},
        age: {}
    },
    sc = {
        gender: {},
        age: {}
    }
}