
function ClassRoomStudentSelectModuleJS(){
    return {
        title: "课堂学员查询",
        icon: "person-stalker",
            input: [
                { name: "StudnetId", placeholder: "请输入学生Id", type: "input" },
                { name: "ClassRoomId", placeholder: "请输入课堂Id", type: "input" },
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
export {ClassRoomStudentSelectModuleJS};
