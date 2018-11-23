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
    ac : {
        left : 23,
        right : 77,
        gender: {},
        age: {}
    },
    am : {
        left : 49,
        right : 51,
        gender: {},
        age: {}
    },
    ap : {
        left : 49,
        right : 51,
        gender: {},
        age: {}
    },
    rr : {
        right : 71,
        left : 29,
        gender: {},
        age: {}
    },
    pa : {
        left : 54,
        right : 46,
        gender: {},
        age: {}
    },
    ro : {
        right : 72,
        left : 28,
        gender: {},
        age: {}
    },
    to : {
        left : 51,
        right : 49,
        gender: {},
        age: {}
    },

    // nordeste 
    ce : {
        left : 71,
        right : 29,
        gender: {},
        age: {}
    },
    ma : {
        left : 73,
        right : 27,
        gender: {},
        age: {}
    },
    rn : {
        left : 63,
        right : 37,
        gender: {},
        age: {}
    },
    pe : {
        left : 66,
        right : 34,
        gender: {},
        age: {}
    },
    se : {
        left : 68,
        right : 32,
        gender: {},
        age: {}
    },
    ba : {
        left : 73,
        right : 27,
        gender: {},
        age: {}
    },
    al : {
        left : 60,
        right : 40,
        gender: {},
        age: {}
    },
    pb : {
        left : 65,
        right : 35,
        gender: {},
        age: {}
    },
    pi : {
        left : 77,
        right : 23,
        gender: {},
        age: {}
    },

    // sudeste
    mg : {
        right : 58,
        left : 42,
        gender: {},
        age: {}
    },
    es : {
        right : 63,
        left : 37,
        gender: {},
        age: {}
    },
    rj : {
        right : 68,
        left : 32,
        gender: {},
        age: {}
    },
    sp : {
        right : 68,
        left : 32,
        gender: {},
        age: {}
    },

    // centro-oeste
    go : {
        right : 65,
        left : 35,
        gender: {},
        age: {}
    },
    mt : {
        right : 66,
        left : 34,
        gender: {},
        age: {}
    },
    ms : {
        right : 65,
        left : 50,
        gender: {},
        age: {}
    },

    // distrito federal
    df : {
        right : 70,
        left : 30,
        gender: {},
        age: {}
    },

    // sul
    rs : {
        left : 37,
        right : 63,
        gender: {},
        age: {}
    },
    pr : {
        left : 32,
        right : 68,
        gender: {},
        age: {}
    },
    sc : {
        left : 76,
        right : 24,
        gender: {},
        age: {}
    }
}