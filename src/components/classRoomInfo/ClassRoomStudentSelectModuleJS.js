
function ClassRoomStudentSelectModuleJS(){
    return {
        title: "学生查询",
        icon: "person-stalker",
            input: [
                { name: "StudentNumber", placeholder: "请输入学号", type: "input" },
                { name: "StudentName", placeholder: "请输入姓名", type: "input" },
                { name: "StudentSchool", placeholder: "请输入学校", type: "input" },
                { name: "StudentClassName", placeholder: "请输入班级", type: "input" },
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
