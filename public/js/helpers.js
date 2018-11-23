/*helpers.js*/

$(function (){
	init();
});

function init(){
	bindEvents();
	initializeCombos();
}

function bindEvents() {
	$("#btFB").on("click", checkLoginState);
	$('#globalData').on('change', onChangeLocationCheck)
	$('#stateSelect').on('change', tradeLocationData)
}

function max(i, j){
	if (i > j) 
		return i;
	return j;
}

function onChangeLocationCheck(e){
	if($("#globalData")[0].checked)
		$(".stateSelectionWrapper").show();
	else
		$(".stateSelectionWrapper").hide();

	tradeLocationData(e);
}

function initializeCombos() {
	var stateCombo = $("#stateSelect");
	var ageCombo = $("#ageSelect");
	var optionElement;
	var currDate = new Date();


	var states = Object.keys(publicData);


	for(var i = 0; i < states.length; i++){
		optionElement = $("<option>")
			.val(states[i])
			.html(states[i].toUpperCase());

		stateCombo.append(optionElement)
	} 

	for(var i = currDate.getFullYear()-16; i > currDate.getFullYear()-100; i--){
		optionElement = $("<option>")
			.val(i)
			.html(i);
		
		ageCombo.append(optionElement);
	}

}