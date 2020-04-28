import {JetView} from "webix-jet";
import {params} from "models/records";

class ParamsValuesTable extends JetView{
	constructor(app, id) {
		super(app);
		this.id = id;
	}
	config(){
		return {
			view:"datatable",
			url:`${this.app.config.url}crudParamValues&param_id=${this.id}`,
			save:`${this.app.config.url}crudParamValues&param_id=${this.id}`,
			autoheight:true,
			editable: true,
			autoConfig:true,
			css:"webix_shadow_medium",
			onClick: {
				"deleteRow" : function  (event, id, target) {
					this.remove(id.row);
				},
			},
			columns: [
				{id: "id", header: "Id", width:50},
				{id: "value", header: "Название", fillspace:true, minWidth:100, editor: 'text'},
				{id: "alias", header: "Алиас", minWidth:100, editor: 'text'},
				{id: "value_en", header: "EN", minWidth:100, editor: 'text'},
				{id: "value_ru", header: "RU", minWidth:100, editor: 'text'},
				{id: "value_ua", header: "UA", minWidth:100, editor: 'text'},
				{id: "delete", header: "", template: "<span class='webix_icon wxi-trash deleteRow'></span>",  width:50}
			]
		};
	}
}
class ParamsValuesForm extends JetView{
	constructor(app, id) {
		super(app);
		this.id = id;
	}
	config() {
		return {
		view: "form",
		cols: [
			{view: "text", name: "value", labelAlign: "center", labelPosition:"top", label: "Название"},
			{view: "text", name: "alias", labelAlign: "center", labelPosition:"top", label: "Алиас"},
			{view: "text", name: "value_en", labelAlign: "center", labelPosition:"top", label: "EN"},
			{view: "text", name: "value_ru", labelAlign: "center", labelPosition:"top", label: "RU"},
			{view: "text", name: "value_ua", labelAlign: "center", labelPosition:"top", label: "UA"},
			{view: "button", label: "<span class='webix_icon wxi-plus'></span>", width: 50, click:()=>{
					let formData = this.getRoot().getValues();
					formData.webix_operation = "insert";
					webix.ajax().post(`${this.app.config.url}crudParamValues&param_id=${this.id}`, formData).then((obj)=>{
						this.getParentView().getSubView("paramsValuesTable").getRoot().load(`${this.app.config.url}crudParamValues&param_id=${this.id}`);
					})
				}}
		]
		};
	}
}
export  default class ParamsValues extends JetView{
	constructor(app, id) {
		super(app);
		this.id = id;
	}
	config() {
		return{
			rows:[
				{$subview:new ParamsValuesForm(this.app, this.id), name: "paramsValuesForm"}, {$subview: new ParamsValuesTable(this.app, this.id), name: "paramsValuesTable"}
			]
		}
	}
}
