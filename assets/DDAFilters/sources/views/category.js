import {JetView} from "webix-jet";
import {category} from "models/records";

class CategoryTable extends JetView{
	config(){
		return {
			view:"datatable",
			autoheight:true,
			editable: true,
			css:"webix_shadow_medium",
			onClick: {
				"deleteRow" : function  (event, id, target) {
					category.remove(id.row);
				},
				"paramCategory": function (event, column, target) {
					this.$scope.getParentView().getParentView().addTab("paramsCategory", column.row, "Параметры категории");
				}
			},
			columns: [
				{id: "id", header:[ "Id", { content:"textFilter" } ], sort:"string", width:50},
				{id: "name", header:[ "Название", { content:"textFilter" } ], sort:"string", minWidth:100, fillspace: true, editor: 'text'},
				{id: "paramCategory", header: "Редактировать", template: "<div class='webix_primary'><button class='webix_button paramCategory'>Параметры</button></div>"},
				{id: "delete", header: "", template: "<span class='webix_icon wxi-trash deleteRow'></span>",  width:50}
			]
		};
	}
	init(view){
		view.sync(category);
	}
}
class CategoryForm extends JetView{
config() {
	return {
	view: "form",
		cols:[
					{view: "text", label: "Название", labelPosition: "top", labelAlign:"center", name: "name"},
					{view: "button", label: "<span class='webix_icon wxi-plus'></span>", width: 50, click:()=>{
						let formData = this.getRoot().getValues();
						formData.webix_operation = "insert";
							webix.ajax().post("http://filterkomora.ddaproduction.com/ssjetTest?action=crudCategories", formData).then((obj)=>{
								category.load("http://filterkomora.ddaproduction.com/ssjetTest?action=crudCategories");
							})
						}}
				],


}
}
}

export default class Category extends JetView {
	config() {
		return {
			rows: [
				CategoryForm, CategoryTable
			]

		}

	}
}
