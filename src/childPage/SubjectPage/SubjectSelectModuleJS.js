
function SubjectSelectModuleJS(){
    return {
        title: "学科查询",
        icon: "person-stalker",
            input: [
                { name: "OptionCode", placeholder: "请输入学科代码‎", type: "input" },
                { name: "OptionValue", placeholder: "请输入学科名称", type: "input" },
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
export {SubjectSelectModuleJS};
