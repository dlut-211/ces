
function SchoolSelectModuleJS(){
    return {
        title: "学校查询",
        icon: "person-stalker",
            input: [
                //{ name: "number", placeholder: "请输入工号", type: "input" },
                { name: "name", placeholder: "请输入学校名称", type: "input" },
                // { name: "Status", placeholder: "请选择状态", type: "select", selected: [{ name: 1, value: "启用" }, { name: 2, value: "禁用" }]},
                {
                    name: "submit",
                    placeholder: "查询",
                    type: "button",
                    theme: "primary",
                    click: function () {
                        this.$emit("submit", this.form);
                    }
                }
            ]
    }
}
export {SchoolSelectModuleJS};
