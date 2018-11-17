/*helpers.js*/

$(function (){
	init();
});

function init(){
	bindEvents();
}

function bindEvents() {
	$("#btFB").on("click", checkLoginState);
}

function max(i, j){
	if (i > j) 
		return i;
	return j;
}