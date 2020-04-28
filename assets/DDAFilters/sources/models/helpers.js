export const checkboxFilter ={
    getInputNode:function(node){
        return node.firstChild ? node.firstChild.firstChild : {
            indeterminate:true
        };
    },
    getValue:function(node){
        var value = this.getInputNode(node).checked;
        var three = this.getInputNode(node).indeterminate;
        return three ? "thirdState" : value;
    },
    _stateSetter:function(e){
        if (this.readOnly)
            this.checked=this.readOnly=false;
        else if (!this.checked)
            this.readOnly=this.indeterminate=true;
    },
    refresh: function(master, node, columnObj){
        master.registerFilter(node, columnObj, this);
        var input = node.querySelector("input");
        input.onclick = this._stateSetter;
        input.indeterminate = true;
        input.onchange = function(){
            master.filterByAll()
        }
    },
    render:function(master, column){
        var html = "<input type='checkbox' id='cb1'>";
        return html;
    }
};
export function checkboxStatus(value, objParam){
    if (objParam) return "row-marked";
    return "";
};
