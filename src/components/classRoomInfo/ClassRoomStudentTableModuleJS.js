
function ClassRoomStudentTableModuleJS() {
    return {
        title: "学生列表",
        icon: "person-stalker",
        titleBtn: {
            title: "导入学生",
            click: function () {
                this.$emit("importStudent");
            }
        },
        count: 0,
        tableHead: [
            { title: "学号", key: "studentNumber", align: "center" },
            { title: "姓名", key: "studentName", align: "center" },
            { title: "学校", key: "studentSchool", align: "center" },
            { title: "班级", key: "studentClassName", align: "center" },
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
                                                this.deleteClassRoomStudentAction(params.row.id)
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
export { ClassRoomStudentTableModuleJS }
