/*helpers.js*/

$(function (){
	init();
});

function init(){
	bindEvents();
}

function bindEvents() {
	$("#btFB").on("click", checkLoginState);
	$('#globalData').on('change', tradeLocationData)
	$('#selectState').on('change', tradeLocationData)
}

function max(i, j){
	if (i > j) 
		return i;
	return j;
}