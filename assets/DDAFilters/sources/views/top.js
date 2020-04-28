import {JetView} from "webix-jet";
import Category from "./category";
import Params from "./params";
import ParamsValues from "./paramsValues";
import ParamsCategory from "./paramsCategory";



export default class TopView extends JetView{
	addTab(tabId, id, title){

		let tabView = this.getRoot().queryView({view:"tabview"});
		if(tabView.getTabbar().optionIndex(tabId)!==-1){
			tabView.getTabbar().removeOption(tabId);
		}
		let innerView = tabId==="paramsCategory"?{$subview: new ParamsCategory(this.app, id)}:{$subview: new ParamsValues(this.app, id)};
		tabView.addView({
			header: `<div class='tab-close'>${title}<span class='close-icon webix_icon wxi-close'></span></div>`,
			body: {id: tabId, cols:[innerView]}
		});
		tabView.getTabbar().setValue(tabId);
	}
	config(){
		return {
			type:"clean", paddingX:5, css:"app_layout", rows:[
				{  paddingX:5, paddingY:10, rows: [ {css:"webix_shadow_medium", rows:[
							{
								width: 850,
								view: "tabview",
								tabbar: {
									optionWidth: 210,
									on:{
										onAfterTabClick: function (id, ev) {
											if (ev.target.classList.contains("close-icon")) {
												if(id==="paramsCategory"){
													this.setValue("categoryTab");
												} else {
													this.setValue("paramsTab");
												}
												this.removeOption(id);
											}

										},
									},
								},
								cells: [
									{
										header: "Категории",
										body: {id: "categoryTab", $subview: Category, name: "category"}
									},
									{
										header: "Параметры",
										body: {id: "paramsTab", $subview: Params, name: "params"}
									}
								],

							}
						]} ]},
			]
		};
	}
	init(){
		// this.use(plugins.Menu, "top:menu");
	}
}
