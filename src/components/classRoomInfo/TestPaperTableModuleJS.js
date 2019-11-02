
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
                key: "name",
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
                                        console.log(params.row)
                                        this.$emit("detailTestPaper",params.row);
                                    }
                                }
                            },
                            params.row.name
                        )
                    ]);
                }
            },
            { title: "试卷类型", key: "testPaperType", align: "center",
                render:(h,params)=>{
                    if(params.row.testPaperType==1){
                    return h("div",[
                        h(
                        "span",
                        {},
                        "A卷"
                        )
                    ])
                    }
                    else if(params.row.testPaperType==2){
                    return h("div",[
                        h(
                        "span",
                        {},
                        "AB卷"
                        )
                    ])
                    }
                }
            },
            { title: "状态", key: "status", align: "center",
                render:(h,params)=>{
                    if(params.row.status==1){
                    return h("div",[
                        h(
                        "span",
                        {},
                        "未考试"
                        )
                    ])
                    }
                    else if(params.row.status==2){
                    return h("div",[
                        h(
                        "span",
                        {},
                        "已考试"
                        )
                    ])
                    }
                }
            },
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
                                    display: (params.row.status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要开始考试吗？",
                                            onOk: () => {
                                                this.editTestPaperStatusAction(params.row.id,2);
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
                                    display: (params.row.status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        console.log("zzzzzzzzzzzzz");
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
                                    display: (params.row.status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
										this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要删除信息吗？",
                                            onOk: () => {
                                                this.deleteTestPaperAction(params.row.id)
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
                                    display: (params.row.status == 2) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "<span style='color:red'><b>撤销考试会清空所有学生答题情况</b></span><br/>确定要撤销试卷《"+ params.row.name +"》的考试吗？",
                                            onOk: () => {
                                                this.editTestPaperStatusAction1(params.row.id,1);
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
