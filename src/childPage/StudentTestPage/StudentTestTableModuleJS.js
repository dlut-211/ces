
function StudentTestTableModuleJS() {
    return {
        title: "学生作业列表",
        icon: "person-stalker",
        count: 50,
        tableHead: [
            { title: "题目名称", key: "name", align: "center",
            render: (h, params) => {
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#2d8cf0",
                                cursor: "pointer",
                                margin: "0 5px"
                            },
                            on: {
                                click: () => {
                                this.knowledgeTestId=params.row.knowledgeTestId;
                                this.getTestDetail()
                                }
                            }
                        },
                        params.row.name
                    ),
                ]);
            } },
            { title: "知识点", key: "knowledgeName", align: "center"},
            { title: "完成状态", key: "status", align: "center",
            render: (h, params) => {
                if(params.row.status=='错误'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "red",
                                cursor: "pointer",
                                margin: "0 5px",
                            },
                        },
                        params.row.status
                    )
                ]);
            }else {
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#2d8cf0",
                                cursor: "pointer",
                                margin: "0 5px",
                            },
                        },
                        params.row.status
                    )
                ]);
            }
        }
        },
            {title: "班级通过率", key: "rate"}
        ],
        tableContent: []
    }
}
export { StudentTestTableModuleJS}
