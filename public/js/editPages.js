/*Js for editing yaml pages*/

$(function(){
	init();
});

var tags = [];
var trackedPages = {};
var baseTrackedPages = {};
var trackedPagesKeys = {};
var PAGES_DATA = "pages_data";

function init(){
	getPagesData();
	bindEvents();
}

function bindEvents(){
	$("#saveButton").on("click", onClickSaveButton);
	$("#downloadButton").on("click", onClickDownloadButton);
	$("#resetButton").on("click", onClickResetButton);

}

function onClickResetButton(e) {
	mountDataArray(baseTrackedPages);
}

function onClickDownloadButton(e) {

}

function onClickSaveButton(e) {
	generateJsonData();	
}

function generateJsonData(){
	var rows = $(".formRow");

	for(var i = 0; i < rows.length; i++){
		changeData($(rows[i]));
	}

	console.log(trackedPages);
}

function changeData(row){
	var key = row.find(".rowTitle").html();
	var components = row.find(".component"), comp;
	var obj = trackedPages[key];
	var compTitle, compValue;

	if(obj == undefined)
	{
		debugger;
		return;
	}

	for(var i = 0; i < components.length; i++){
		comp = $(components[i]);
		compTitle = comp.find(".componentTitle");

		if(compTitle.html() == "tags") {
			compValue = comp.find(".componentValue");
			obj.tags = [];
			for(var j = 0; j < compValue.length; j++){
				obj.tags[obj.tags.length] = $(compValue[j]).html();
			}

		} else {
			obj[compTitle.html()] = comp.find(".componentValue").val();
		}
	}

}

function addPageRow(pageKey, page) {
	var row = $("<div>").addClass("formRow");
	var rowTitle = $("<a>").addClass("rowTitle");
	var component, componentTitle, componentValue, componentsWrapper;
	var itens = Object.keys(page);
	var item, itemKey;

	rowTitle.on("click", onClickTitle);

	row.append(rowTitle);
	rowTitle.append(pageKey);
	componentsWrapper = $("<div>").addClass("componentsWrapper");

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
		componentsWrapper.append(component);	
	}

	var addAttrWrapper = $("<div>").addClass("addAttrWrapper");

	var addAttrButton = $("<a>")
		.addClass("glyphicon")
		.addClass("glyphicon-plus")
		.addClass("addAttrButton")
		.on("click", onClickAddAttrButton);

	addAttrWrapper.append(addAttrButton)
	componentsWrapper.append(addAttrWrapper);

	row.append(componentsWrapper);
	$("#editForm").append(row);
}

function onClickAddAttrButton(e){
	createComponent($(this).parent().parent().parent()); //formRow
}

function createRow(){

}

function createComponent(row){

	var componentsWrapper = row.find(".componentsWrapper");

	var component = $("<div>").addClass("component");
	var componentTitle = $("<label contenteditable='true'>").addClass("componentTitle");
	var componentValue = $("<input>").addClass("componentValue");

	componentTitle.append("attr");
	component.append(componentTitle);
	component.append(componentValue);

	component.insertBefore(".addAttrWrapper");
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

function mountDataArray(pagesData) {
	var page, pageKey;
	$("#editForm").clear();

	if(pagesData == undefined)
		pagesData = trackedPagesKeys;

	for(var i = 0; i < pagesData.length; i++){
		pageKey = trackedPagesKeys[i];
		page = trackedPages[trackedPagesKeys[i]];
		addPageRow(pageKey, page);
	}

	fillTagsSelect();
	//separateWingData();
	//mountMap();	
}
