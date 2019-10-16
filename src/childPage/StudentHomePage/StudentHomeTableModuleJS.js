
function StudentHomeTableModuleJS() {
    return {
        title: "作业列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加作业",
            click: function () {
                this.$emit("addStudentHome");
            }
        },
        count: 50,
        tableHead: [
            { title: "作业描述", key: "Describe", align: "center" },
            { title: "章节Id", key: "ChapterId", align: "center" },
            { title: "作业名称", key: "Name", align: "center" },
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
                                        this.editStudentHomeForm = {
                                            Id:params.row.Id,
                                            Describe: params.row.Describe,
                                            ChapterId: params.row.ChapterId,
                                            Name: params.row.Name,
											VersionNumber: this.stringToByte(params.row.VersionNumber)
                                        };
                                        this.editStudentHome = true;

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
                                                this.deleteStudentHomeAction(params.row.Id)
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
export { StudentHomeTableModuleJS }
