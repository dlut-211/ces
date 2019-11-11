
function TeacherHomeSelectModuleJS(){
    return {
        title: "课堂查询",
        icon: "person-stalker",
            input: [
                { name: "BeginDate", placeholder: "请输入开始日期", type: "input" },
                { name: "CourseId", placeholder: "请输入课程Id", type: "input" },
                { name: "EndDate", placeholder: "请输入结束日期", type: "input" },
                { name: "TermType", placeholder: "请输入学期类型", type: "input" },
                { name: "Name", placeholder: "请输入课堂名称", type: "input" },
                { name: "Status", placeholder: "请输入课堂状态", type: "input" },
                { name: "dailyPerformanceWeight", placeholder: "请输入平时成绩所占权重", type: "input" },
                { name: "TestPerformanceWeight", placeholder: "请输入考试成绩所占权重", type: "input" },
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
export {TeacherHomeSelectModuleJS};
