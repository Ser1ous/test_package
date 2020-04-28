import {JetView} from "webix-jet";

import {checkboxStatus} from "../models/helpers";

class ParamsCategoryTable extends JetView {
    constructor(app, id) {
        super(app);
        this.id = id;
    }

    config() {
        function threeStateCompare(value, filter) {
            if (filter == "thirdState") return true;
            return value == filter
        };

        return {
            view: "datatable",
            url: `${this.app.config.url}crudParamsCategory&category_id=${this.id}`,
            save: `${this.app.config.url}crudParamsCategory&category_id=${this.id}`,
            autoheight: true,
            editable: true,
            checkboxRefresh: true,
            css: "webix_shadow_medium",
            on: {
                "onAfterDelete": () => {
                    console.log("onAfterDelete");
                    this.getParentView().getSubView('paramsCategorySelect').refresh();
                }
            },
            onClick: {
                "deleteRow": function (event, id, target) {
                    this.remove(id.row);
                },
                "paramValues": function (event, column, target) {
                    let currentRow = this.getItem(column.row);
                    this.$scope.getParentView().getParentView().addTab("paramsValue", currentRow.param_id, "Значение параметров");
                }
            },
            columns: [
                {id: "id", header: ["Id", {content: "textFilter"}], sort: "string", width: 50},
                {
                    id: "name",
                    header: ["Параметр", {content: "textFilter"}],
                    sort: "string",
                    fillspace: true,
                    minWidth: 100
                },
                {
                    id: "show_in_category",
                    header: ["Показывать в категории", {
                        content: "checkboxFilter",
                        compare: threeStateCompare
                    }],
                    template: "{common.checkbox()}",
                    cssFormat: (value, obj) => checkboxStatus(value, obj.show_in_category),
                    minWidth: 100,
                    editor: 'text'
                },
                {
                    id: "show_in_filter",
                    header: ["Показывать в фильтре", {
                        content: "checkboxFilter",
                        compare: threeStateCompare
                    }],
                    template: "{common.checkbox()}",
                    cssFormat: (value, obj) => checkboxStatus(value, obj.show_in_filter),
                    minWidth: 100,
                    editor: 'text'
                },
                {
                    id: "sort",
                    header: ["Сортировка", {
                        content: "checkboxFilter",
                        compare: threeStateCompare
                    }],
                    template: "{common.checkbox()}",
                    cssFormat: (value, obj) => checkboxStatus(value, obj.sort),
                    minWidth: 100,
                    editor: 'text'
                },
                {
                    id: "type_output",
                    header: ["Тип отображения", {content: "selectFilter"}],
                    sort: "string",
                    minWidth: 100,
                    editor: 'select',
                    options: ["range", "rangeslider", "select", "checkbox", "radio"]
                },
                {id: "paramValues", header: "Варианты", template: "<div class='webix_primary'><button class='webix_button paramValues'>Выбрать</button></div>"},
                {id: "delete", header: "", template: "<span class='webix_icon wxi-trash deleteRow'></span>", width: 50}
            ]
        };
    }
}

class ParamsCategorySelect extends JetView {
    constructor(app, id) {
        super(app);
        this.id = id;
    }

    config() {
        return webix.ajax(`${this.app.config.url}getAvailableParamsForCategory&category_id=${this.id}`).then(data => {
            return {
                view: "combo",
                on: {
                    onChange: function (newv, oldv) {
                        let param_id = newv;
                        let desc = this.getText();
                        let webix_operation = "insert";
                        let category_id = this.$scope.id;
                        webix.ajax().post(`${this.$scope.app.config.url}crudParamsCategory&category_id=${this.$scope.id}`, {
                            desc,
                            param_id,
                            webix_operation,
                            category_id
                        }).then(() => {
                            this.$scope.getParentView().getSubView("paramsCategoryTable").refresh();
                            this.$scope.refresh();
                            this.setValue("");
                        })
                    }
                },
                options: {
                    view: "suggest", // optional
                    body: {
                        view: "list",
                        data: data.json().data,
                        template: "#desc#",
                    }
                }
            }
        })
    }
}

export default class ParamsCategory
    extends JetView {
    constructor(app, id) {
        super(app);
        this.id = id;
    }

    config() {
        return {
            rows: [
                {
                    $subview: new ParamsCategorySelect(this.app, this.id),
                    name: "paramsCategorySelect"
                }, {$subview: new ParamsCategoryTable(this.app, this.id), name: "paramsCategoryTable"}
            ]
        }
    }
}
