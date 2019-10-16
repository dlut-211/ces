
function TestPaperTableModuleJS() {
    return {
        title: "试卷列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加试卷",
            click: function () {
                this.$emit("addTestPaper");
            }
        },
        count: 0,
        tableHead: [
            { 
                title: "试卷名称", 
                key: "Name",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "span",
                            {
                                style: {
                                    color: "#2d8cf0",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                },
                                on: {
                                    click: () => {
                                        this.$emit("detailTestPaper",params.row);
                                    }
                                }
                            },
                            params.row.Name
                        )
                    ]);
                }
            },
            { title: "试卷类型", key: "TestPaperTypeName", align: "center" },
            { title: "状态", key: "StatusName", align: "center" },
            {
                title: "操作",
                key: "action",
                align: "center",
                field:'right',
                width: 140,
                render: (h, params) => {
                    return h("div", [
                        h(
                            "span",
                            {
                                style: {
                                    color: "#04B404",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                    display: (params.row.Status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要开始考试吗？",
                                            onOk: () => {
                                                this.editTestPaperStatusAction(params.row.Id,2);
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "考试"
                        ),
                        h(
                            "span",
                            {
                                style: {
                                    color: "#2d8cf0",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                    display: (params.row.Status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$emit("editTestPaper",params.row,this.courseKnowledgeList);
                                    }
                                }
                            },
                            "编辑"
                        ),
                        h(
                            "span",
                            {
                                style: {
                                    color: "#ed3f14",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                    display: (params.row.Status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
										this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要删除信息吗？",
                                            onOk: () => {
                                                this.deleteTestPaperAction(params.row.Id)
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "删除"
                        ),
                        h(
                            "span",
                            {
                                style: {
                                    color: "#FF8000",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                    display: (params.row.Status == 2) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "<span style='color:red'><b>撤销考试会清空所有学生答题情况</b></span><br/>确定要撤销试卷《"+ params.row.Name +"》的考试吗？",
                                            onOk: () => {
                                                this.editTestPaperStatusAction(params.row.Id,1);
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "撤销考试"
                        ),
                    ]);
                }
            }
        ],
        tableContent: []
    }
}
export { TestPaperTableModuleJS }
