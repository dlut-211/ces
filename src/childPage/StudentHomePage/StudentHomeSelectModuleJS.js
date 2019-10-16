
function StudentHomeSelectModuleJS(){
    return {
        title: "作业查询",
        icon: "person-stalker",
            input: [
                { name: "Describe", placeholder: "请输入作业描述", type: "input" },
                { name: "ChapterId", placeholder: "请输入章节Id", type: "input" },
                { name: "Name", placeholder: "请输入作业名称", type: "input" },
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
export {StudentHomeSelectModuleJS};
