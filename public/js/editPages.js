/*Js for editing yaml pages*/

$(function(){
	init();
});

var tags = [];
var trackedPages = {};
var trackedPagesKeys = {};
var PAGES_DATA = "pages_data";

function init(){
	getPagesData();
}

function addPageRow(pageKey, page) {
	var row = $("<div>").addClass("formRow");
	var rowTitle = $("<a>").addClass("rowTitle");
	var component, componentTitle, componentValue;
	var itens = Object.keys(page);
	var item, itemKey;

	rowTitle.on("click", onClickTitle);

	row.append(rowTitle);
	rowTitle.append(pageKey);

	for(var i = 0; i < itens.length; i++){
		itemKey = itens[i];
		item = page[itemKey];

		component = $("<div>").addClass("component");
		componentTitle = $("<label>").addClass("componentTitle");

		componentTitle.append(itemKey);
		component.append(componentTitle);

		if(itemKey == "tags"){
			for(var j = 0; j < item.length; j++) {
				componentValue = $("<div>").addClass("componentValue").addClass("tag");
				componentValue.append(item[j]);
				if(tags.indexOf(item[j]) == -1)
					tags[tags.length] = item[j];
				component.append(componentValue);
			}
		} else {
			componentValue = $("<input>").addClass("componentValue");
			componentValue.val(item);	
			component.append(componentValue);
		}

		row.append(component);
	}

	$("#editForm").append(row);
}

function fillTagsSelect(){
	var select = $("#tagSelect");
	var option;
	for(var i = 0; i < tags.length; i++){
		option = $("<option>").append(tags[i]);
		option.val(tags[i]);
		select.append(option);
	}
}

function onClickTitle(e){
	$(this).siblings().toggle();
}

function mountDataArray() {
	var page, pageKey;

	for(var i = 0; i < trackedPagesKeys.length; i++){
		pageKey = trackedPagesKeys[i];
		page = trackedPages[trackedPagesKeys[i]];
		addPageRow(pageKey, page);
	}

	fillTagsSelect();
	//separateWingData();
	//mountMap();	
}
