
function StudentWorkDetailTableModuleJS() {
    return {
        title: "学生作业明细列表",
        icon: "person-stalker",
        count: 0,
        tableHead: [
            { title: "学号", key: "StudentNumber", align: "center" },
            { title: "学生姓名", key: "StudentName", align: "center" },
            {
                title: "提交时间",
                key: "SubmitTime",
                align: "center",
                width: 160,
                render: (h, params) => {
                    return h("div", [this.dateFormat(params.row.SubmitTime)])
                }
            },
            { title: "用时", key: "UseTimeFormat", align: "center" ,width: 120},
            { title: "用例通过数", key: "CasePassCount", align: "center" },
            { title: "圈复杂度", key: "Complexity", align: "center" },
            { title: "代码行数", key: "CodeRowNumber", align: "center" },
            {
                title: "查看作业",
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "span",
                            {
                                style: {
                                    color: "#2d8cf0",
                                    cursor: "pointer",
                                },
                                on: {
                                    click: () => {
                                       window.open(params.row.WorkPath); 
                                    }
                                }
                            },
                            "查看"
                        ),
                    ]);
                }
            }
        ],
        tableContent: []
    }
}
export { StudentWorkDetailTableModuleJS }
