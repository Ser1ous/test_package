import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter } from "webix-jet";
import {checkboxFilter} from "./models/helpers";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id 		: APPNAME,
			url		: "http://filterkomora.ddaproduction.com/ssjetTest?action=",
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top"
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	webix.ui.datafilter.checkboxFilter = checkboxFilter;
	webix.ready(() => new MyApp().render('appWrap') );
}
