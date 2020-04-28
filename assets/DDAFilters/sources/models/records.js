export const category = new webix.DataCollection({
	url:"http://filterkomora.ddaproduction.com/ssjetTest?action=crudCategories",
	save:"http://filterkomora.ddaproduction.com/ssjetTest?action=crudCategories"
// 		function (prop1, prop2, prop3) {
// 		if(prop2==="insert"){
// 			console.log(category.serialize().find((item)=> item.id===prop1));
// 			return false;
// 		}
// console.log(prop1);
// console.log(prop2);
// console.log(prop3);
// 	}
}),
			params = new webix.DataCollection({
				url:"http://filterkomora.ddaproduction.com/ssjetTest?action=crudParams",
				save:"http://filterkomora.ddaproduction.com/ssjetTest?action=crudParams"
			});

