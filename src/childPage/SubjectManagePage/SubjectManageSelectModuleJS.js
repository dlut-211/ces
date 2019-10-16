
function SubjectManageSelectModuleJS(){
    return {
        title: "学生作业查询",
        icon: "person-stalker",
            input: [
                { name: "ClassRoomStudentId", placeholder: "请输入学员Id", type: "input" },
                { name: "Score", placeholder: "请输入分数", type: "input" },
                { name: "WorkMessage", placeholder: "请输入作业留言", type: "input" },
                { name: "ClassRoomWorkId", placeholder: "请输入课堂作业Id", type: "input" },
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
export {SubjectManageSelectModuleJS};