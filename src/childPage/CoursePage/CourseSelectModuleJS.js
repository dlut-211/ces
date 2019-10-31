
function CourseSelectModuleJS(){
    return {
        title: "课程查询",
        icon: "person-stalker",
            input: [
                { name: "code", placeholder: "请输入课程编号", type: "input" },
                { name: "name", placeholder: "请输入课程名称", type: "input" },
                // { name: "createdByName", placeholder: "请输入建课老师", type: "input" },
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
export {CourseSelectModuleJS};
