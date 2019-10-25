
function SubjectGradeTableModuleJS() {
    return {
        title:"我的学科课程",
        icon: "person-stalker",
       
        count: 50,
        tableHead: [
            { title: "课程名", key: "classRoomName", align: "center" },
            { title: "学科名", key: "optionValue", align: "center" },
            { title: "平时成绩(分)", key: "workScore", align: "center" },
            { title: "考试成绩(分)", key: "testScore", align: "center" },
            { title: "总成绩(分)", key: "totalScore", align: "center" },
        ],
        tableContent: []
    }
}
export { SubjectGradeTableModuleJS }
