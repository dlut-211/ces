
function TeacherHomeTableModuleJS() {
    return {
        title: "课堂列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加课堂",
            click: function () {
                this.$emit("addTeacherHome");
            }
        },
        count: 50,
        tableHead: [
            { title: "开始日期", key: "BeginDate", align: "center" },
            { title: "课程Id", key: "CourseId", align: "center" },
            { title: "结束日期", key: "EndDate", align: "center" },
            { title: "学期类型", key: "TermType", align: "center" },
            { title: "课堂名称", key: "Name", align: "center" },
            { title: "课堂状态", key: "Status", align: "center" },
            { title: "平时成绩所占权重", key: "dailyPerformanceWeight", align: "center" },
            { title: "考试成绩所占权重", key: "TestPerformaceWeight", align: "center" },
            {
                title: "操作",
                key: "action",
                align: "left",
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
                                        this.editTeacherHomeForm = {
                                            Id:params.row.Id,
                                            BeginDate: params.row.BeginDate,
                                            CourseId: params.row.CourseId,
                                            EndDate: params.row.EndDate,
                                            TermType: params.row.TermType,
                                            Name: params.row.Name,
                                            Status: params.row.Status,
                                            dailyPerformanceWeight: params.row.dailyPerformanceWeight,
                                            TestPerformaceWeight: params.row.TestPerformaceWeight,
											VersionNumber: this.stringToByte(params.row.VersionNumber)
                                        };
                                        this.editTeacherHome = true;

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
                                    margin: "0 5px"
                                },
                                on: {
                                    click: () => {
										this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要删除信息吗？",
                                            onOk: () => {
                                                this.deleteTeacherHomeAction(params.row.Id)
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "删除"
                        )
                    ]);
                }
            }
        ],
        tableContent: []
    }
}
export { TeacherHomeTableModuleJS }
