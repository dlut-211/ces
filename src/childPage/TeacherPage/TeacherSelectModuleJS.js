
function TeacherSelectModuleJS(){
    return {
        title: "教师查询",
        icon: "person-stalker",
            input: [
                { name: "Number", placeholder: "请输入工号", type: "input" },
                { name: "Name", placeholder: "请输入姓名", type: "input" },
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
export {TeacherSelectModuleJS};
