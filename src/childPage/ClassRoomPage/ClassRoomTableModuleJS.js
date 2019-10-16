
function ClassRoomTableModuleJS() {
    return {
        title: "课堂列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加课堂",
            click: function () {
                this.$emit("addClassRoom");
            }
        },
        count: 50,
        tableHead: [
            { 
                title: "课堂名称",
                key: "Name",
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
                                        this.showForm = {
                                            Id: params.row.Id,
                                            Name: params.row.Name,
                                            CourseId: params.row.CourseId,
                                            CourseCode: params.row.CourseCode,
                                            CourseName: params.row.CourseName,
                                            Status: params.row.Status,
                                            StatusName: params.row.StatusName,
                                            TermType: params.row.TermType,
                                            TermTypeName: params.row.TermTypeName,
                                            DateFormat: params.row.DateFormat,
                                            CourseDescribe: params.row.CourseDescribe,
                                            CourseSyllabusPath: params.row.CourseSyllabusPath,
                                            dailyPerformanceWeight:params.row.dailyPerformanceWeight,//权重
                                            TestPerformaceWeight:params.row.TestPerformaceWeight,//权重
                                        };
                                        this.$refs.classRoomDetail.infoInit(this.showForm);
                                        this.classRoomInfoVisible = true;
                                    }
                                }
                            },
                            params.row.Name
                        )
                    ]);
                }
            },
            { title: "状态", key: "StatusName", align: "center" , width: 120},
            { title: "学期", key: "TermTypeName", align: "center" },
            { title: "上课日期", key: "DateFormat", align: "center" ,width: 175},
            { title: "课程代码", key: "CourseCode", align: "center" },
            { title: "课程名称", key: "CourseName", align: "center" },
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
                                    color: "#00CC00",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                    display: (params.row.Status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要开课吗？",
                                            onOk: () => {
                                                this.editClassRoomStatusAction(params.row.Id,2);
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "开课"
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
                                        this.editClassRoomForm = {
                                            Id:params.row.Id,
                                            BeginDate: params.row.BeginDate,
                                            CourseId: params.row.CourseId,
                                            CourseCode: params.row.CourseCode,
                                            CourseName: params.row.CourseName,
                                            EndDate: params.row.EndDate,
                                            TermType: params.row.TermType,
                                            Name: params.row.Name,
                                            dailyPerformanceWeight:params.row.dailyPerformanceWeight,//权重
                                            TestPerformaceWeight:params.row.TestPerformaceWeight,//权重
											VersionNumber: this.stringToByte(params.row.VersionNumber)
                                        };
                                        console.log(params.row.dailyPerformanceWeight+params.row.Id);
                                        this.editClassRoom = true;
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
                                                this.deleteClassRoomAction(params.row.Id)
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
                                    color: "#FF9933",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                    display: (params.row.Status == 2) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要结课吗？",
                                            onOk: () => {
                                                this.editClassRoomStatusAction(params.row.Id,4);
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "结课"
                        ),
                    ]);
                }
            }
        ],
        tableContent: []
    }
}
export { ClassRoomTableModuleJS }
