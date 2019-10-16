
function CourseTableModuleJS() {
    return {
        title: "课程列表",
        icon: "person-stalker",
        count: 50,
        tableHead: [
            {
                title: "请选择",
                key: "action",
                align: "left",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "Radio", {
                                props: {
                                    value: this.tableModule.tableContent[params.index].checked
                                },
                                on: {
                                    'on-change': () => {
                                        for (let i = 0; i < this.tableModule.tableContent.length; i++) {
                                            this.tableModule.tableContent[i].checked = false;
                                        }
                                        this.tableModule.tableContent[params.index].checked = true;
                                        this.choose = params.row;
                                    },
                                },
                            },
                        ),
                    ]);
                }
            },
            { title: "课程编号", key: "Code", align: "center" },
            { title: "课程名称", key: "Name", align: "center" },
            { title: "建课老师", key: "CreatedByName", align: "center" },
            {
                title: "创建时间",
                key: "CreatedOn",
                align: "center",
                width: 160,
                render: (h, params) => {
                    return h("div", [this.dateFormatFirst(params.row.CreatedOn)])
                }
            }
        ],
        tableContent: []
    }
}
export { CourseTableModuleJS }
