
function SubjectManageTableModuleJS() {
    return {
        title: "学生作业管理",
        icon: "person-stalker",
        titleBtn: {
            title: "图表统计",
            click: function () {
                this.$emit("addStu_StudentWork");
            }
        },
        count: 50,
       
    }
}
export { SubjectManageTableModuleJS }
