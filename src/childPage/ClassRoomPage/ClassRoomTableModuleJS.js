
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
                key: "name",
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
                                            Id: params.row.id,
                                            Name: params.row.name,
                                            CourseId: params.row.courseId,
                                            CourseCode: params.row.courseCode,
                                            CourseName: params.row.courseName,
                                            Status: params.row.status,
                                            StatusName: params.row.statusName,
                                            TermType: params.row.termType,
                                            TermTypeName: params.row.termTypeName,
                                            DateFormat: params.row.dateFormat,
                                            CourseDescribe: params.row.courseDescribe,
                                            CourseSyllabusPath: params.row.courseSyllabusPath,
                                            dailyPerformanceWeight:params.row.dailyPerformanceWeight,//权重
                                            testPerformanceWeight:params.row.testPerformanceWeight,//权重
                                        };
                                        this.$refs.classRoomDetail.infoInit(this.showForm);
                                        this.classRoomInfoVisible = true;
                                    }
                                }
                            },
                            params.row.name
                        )
                    ]);
                }
            },
            { title: "状态", key: "statusName", align: "center" , width: 120},
            { title: "学期", key: "termTypeName", align: "center" },
            { title: "上课日期", key: "dateFormat", align: "center" ,width: 175},
            { title: "课程代码", key: "courseCode", align: "center" },
            { title: "课程名称", key: "courseName", align: "center" },
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
                                    display: (params.row.status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要开课吗？",
                                            onOk: () => {
                                                this.editClassRoomStatusAction(params.row.id,2);
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
                                    display: (params.row.status == 1) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.editClassRoomForm = {
                                            Id:params.row.id,
                                            BeginDate: params.row.beginDate,
                                            CourseId: params.row.courseId,
                                            CourseCode: params.row.courseCode,
                                            CourseName: params.row.courseName,
                                            EndDate: params.row.endDate,
                                            TermType: params.row.termType,
                                            Name: params.row.name,
                                            dailyPerformanceWeight:params.row.dailyPerformanceWeight,//权重
                                            testPerformanceWeight:params.row.testPerformanceWeight,//权重
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
                                    display: (params.row.status == 1) ?"inline":"none"
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
                                    display: (params.row.status === 2) ?"inline":"none"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要结课吗？",
                                            onOk: () => {
                                                this.editClassRoomStatusAction(params.row.id,4);
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
