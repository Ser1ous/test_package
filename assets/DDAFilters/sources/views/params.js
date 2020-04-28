import {JetView} from "webix-jet";
import {params} from "models/records";

class ParamsTable extends JetView{
	config(){
		return {
			view:"datatable",
			autoheight:true,
			editable: true,
			autoConfig:true,
			css:"webix_shadow_medium",
			onClick: {
				"deleteRow" : function  (event, id, target) {
					params.remove(id.row);
				},
				"paramValues": function (event, column, target) {
					this.$scope.getParentView().getParentView().addTab("paramsValue", column.row, "Значение параметров");
				}
			},
			columns: [
				{id: "id", header: "Id", width:50},
				{id: "desc", header:[ "Название", { content:"textFilter" } ], sort:"string", fillspace:true, minWidth:100, editor: 'text'},
				{id: "alias", header:[ "Префикс", { content:"textFilter" } ], sort:"string", minWidth:100, editor: 'text'},
				{id: "desc_en", header:[ "EN", { content:"textFilter" } ], sort:"string", minWidth:100, editor: 'text'},
				{id: "desc_ru", header:[ "RU", { content:"textFilter" } ], sort:"string", minWidth:100, editor: 'text'},
				{id: "desc_ua", header:[ "UA", { content:"textFilter" } ], sort:"string", minWidth:100, editor: 'text'},
				{id: "typeinput", header:[ "Тип ввода", { content:"selectFilter" } ], sort:"string", minWidth:100, editor: 'select', options:["input", "select"]},
				{id: "paramValues", header: "Варианты", template: "<div class='webix_primary'><button class='webix_button paramValues'>Выбрать</button></div>"},
				{id: "delete", header: "", template: "<span class='webix_icon wxi-trash deleteRow'></span>",  width:50}
			]
		};
	}
	init(view){
		view.sync(params);
	}
}
class ParamsForm extends JetView{
	config() {
		return {
		view: "form",
		cols: [
			{view: "text", name: "tv_id", labelAlign: "center", labelPosition:"top", label: "TvID"},
			{view: "text", name: "desc", labelAlign: "center", labelPosition:"top", label: "Название"},
			{view: "text", name: "prefix", labelAlign: "center", labelPosition:"top", label: "Префикс"},
			{view: "text", name: "alias", labelAlign: "center", labelPosition:"top", label: "Алиас"},
			{view: "text", name: "desc_en", labelAlign: "center", labelPosition:"top", label: "EN"},
			{view: "text", name: "desc_ru", labelAlign: "center", labelPosition:"top", label: "RU"},
			{view: "text", name: "desc_ua", labelAlign: "center", labelPosition:"top", label: "UA"},
			{view: "select", name: "typeinput", labelAlign: "center", labelPosition:"top", label: "Тип ввода", options:["input", "select"]},
			{view: "button", label: "<span class='webix_icon wxi-plus'></span>", width: 50, click:()=>{
					let formData = this.getRoot().getValues();
					formData.webix_operation = "insert";
					webix.ajax().post("http://filterkomora.ddaproduction.com/ssjetTest?action=crudParams", formData).then((obj)=>{
						params.load("http://filterkomora.ddaproduction.com/ssjetTest?action=crudParams");
					})
				}}
		]
		};
	}
}
export  default class Params extends JetView{
	config() {
		return{
			rows:[
				ParamsForm, ParamsTable
			]
		}
	}
}
