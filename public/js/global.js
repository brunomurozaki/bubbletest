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
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    am : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    ap : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    rr : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    pa : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    ro : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    to : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },

    // nordeste 
    ce : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    ma : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    rn : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    pe : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    se : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    ba : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    al : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    pb : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    pi : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },

    // sudeste
    mg : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    es : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    rj : {
        left : 30,
        right : 70,
        gender: {},
        age: {}
    },
    sp : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },

    // centro-oeste
    go : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    mt : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    ms : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },

    // distrito federal
    df : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },

    // sul
    rs : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    pr : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    },
    sc : {
        left : 50,
        right : 50,
        gender: {},
        age: {}
    }
}