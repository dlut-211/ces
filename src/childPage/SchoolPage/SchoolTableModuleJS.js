
function SchoolTableModuleJS() {
    return {
        title: "学校列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加学校",
            click: function () {
                this.$emit("addSchool");
            }
        },
        count: 0,
        tableHead: [
            //{ title: "教师工号", key: "number", align: "center" },
            { title: "学校名称", key: "name", align: "center" },
            // { title: "状态", key: "StatusName", align: "center" },
            {
                title: "操作",
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
                                    margin: "0 5px"
                                },
                                on: {
                                    click: () => {
                                        this.editSchoolForm = {
                                            id:params.row.id,
                                            name: params.row.name,
                                        };
                                        this.editSchool = true;

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
                                },
                                on: {
                                    click: () => {
										this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要删除信息吗？",
                                            onOk: () => {
                                                this.deleteSchoolAction(params.row.id)
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "删除"
                        ),
                    ]);
                }
            }
        ],
        tableContent: []
    }
}
export { SchoolTableModuleJS }
