/*Js for editing yaml pages*/

$(function(){
	init();
});


var trackedPages = {};
var trackedPagesKeys = {};
var PAGES_DATA = "pages_data";

function init(){
	getPagesData();
}

function addPageRow(pageKey, page) {
	var row = $("<div>").addClass("formRow");
	var rowTitle = $("<h5>").addClass("rowTitle");
	var component, componentTitle, componentValue;
	var itens = Object.keys(page);
	var item, itemKey;

	row.append(rowTitle);
	rowTitle.append(pageKey);

	for(var i = 0; i < itens.length; i++){
		itemKey = itens[i];
		item = page[itemKey];

		component = $("<div>").addClass("component");
		componentTitle = $("<div>").addClass("componentTitle");
		componentValue = $("<div>").addClass("componentValue");
		
		componentTitle.append(itemKey);
		componentValue.append(item);
		component.append(componentTitle);
		component.append(componentValue);

		row.append(component);
	}

	$("#editForm").append(row);
}

function mountDataArray() {
	var page, pageKey;

	for(var i = 0; i < trackedPagesKeys.length; i++){
		pageKey = trackedPagesKeys[i];
		page = trackedPages[trackedPagesKeys[i]];
		addPageRow(pageKey, page);
	}

	//separateWingData();
	//mountMap();	
}
