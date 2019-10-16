
function StudentWorkTableModuleJS() {
    return {
        title: "学生作业列表",
        icon: "person-stalker",
        count: 0,
        tableHead: [
            { title: "学号", key: "StudentNumber", align: "left" },
            { title: "学生姓名", key: "StudentName", align: "left" },
            {
                title: "最终提交时间",
                key: "SubmitTime",
                align: "center",
                width: 160,
                render: (h, params) => {
                    return h("div", [this.dateFormat(params.row.SubmitTime)])
                }
            },
            { title: "用时", key: "UseTimeFormat", align: "center" ,width: 120},
            { title: "分数", key: "Score", align: "center" },
           
            { 
                title: "提交次数", 
                key: "WorkName",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "span",
                            {
                                style: {
                                    color: (params.row.SubmitCount == 0) ? "#495060" :"#2d8cf0",
                                    cursor: (params.row.SubmitCount == 0) ?  'auto' : "pointer",
                                },
                                on: {
                                    click: () => {
                                        if(params.row.SubmitCount > 0){
                                            this.studentWorkId = params.row.Id;
                                            this.getStudentWorkDetailList();
                                            this.studentWorkDetailVisible = true;
                                        }
                                    }
                                }
                            },
                            params.row.SubmitCount + "次"
                        )
                    ]);
                }
            },
            { title: "作业留言", key: "WorkMessage", align: "center" },
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
                                    display: (params.row.IsSubmit == 1) ?"inline":"none"
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
            },
            {
                title: "操作",
                key: "action",
                align: "center",
                field:'right',
                width: 140,
                render: (h, params) => {
                    if(params.row.IsSubmit==0){
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
										this.addStudentWorkDetailForm.StudentWorkId = params.row.Id;
                                        this.$refs['addStudentWorkDetailForm'].resetFields();
                                        this.addStudentWorkDetail = true;
                                    }
                                }
                            },
                            "提交作业"
                        )
                    ]);
                }
                else{
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
                                       
                                       this.editStudentWorkForm={
                                            Id:params.row.Id,
                                            ClassRoomWorkId:params.row.ClassRoomWorkId,
                                            ClassRoomStudentId:params.row.ClassRoomStudentId,
                                            isScore:1,
                                            Score:"",
                                            WorkMessage:params.row.WorkMessage,
                                            VersionNumber:this.stringToByte(params.row.VersionNumber)
                                          };
                                          this.StudentGrade=true;
                                    }
                                }
                            },
                            "评分"
                        )
                    ]);
                }
                }
            }
        ],
        tableContent: []
    }
}
export { StudentWorkTableModuleJS }
