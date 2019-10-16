
function CourseTableModuleJS() {
    return {
        title: "课程列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加课程",
            click: function () {
                this.$emit("addCourse");
            }
        },
        count: 50,
        tableHead: [
            { 
                title: "课程编号",
                key: "Code",
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
                                            Code: params.row.Code,
                                            Name: params.row.Name,
                                            Describe: params.row.Describe,
                                            Syllabus: params.row.Syllabus,
                                            SyllabusPath: params.row.SyllabusPath,
                                            CreatedByName: params.row.CreatedByName,
                                            SubjectId:params.row.SubjectId,
                                            SubjectName:params.row.SubjectName,
                                            CreatedOn: this.dateFormatFirst(params.row.CreatedOn)
                                        };
                                        this.LocalSubjectId=params.row.SubjectId;
                                        this.$refs.CourseDetail.infoInit(this.showForm);
                                        this.courseInfo = true;
                                    }
                                }
                            },
                            params.row.Code
                        )
                    ]);
                }
            },
            { 
                title: "课程名称",
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
                                            Code: params.row.Code,
                                            Name: params.row.Name,
                                            Describe: params.row.Describe,
                                            Syllabus: params.row.Syllabus,
                                            SyllabusPath: params.row.SyllabusPath,
                                            CreatedByName: params.row.CreatedByName,
                                            SubjectName:params.row.SubjectName,
                                            CreatedOn: this.dateFormatFirst(params.row.CreatedOn)
                                        };
                                        this.LocalSubjectId=params.row.SubjectId;

                                        this.$refs.CourseDetail.infoInit(this.showForm);
                                        this.courseInfo = true;
                                    }
                                }
                            },
                            params.row.Name
                        )
                    ]);
                }
            },
            { title: "学科名称", key: "SubjectName", align: "center" },
            { title: "建课老师", key: "CreatedByName", align: "center" },
            {
                title: "创建时间",
                key: "CreatedOn",
                align: "center",
                width: 160,
                render: (h, params) => {
                    return h("div", [this.dateFormatFirst(params.row.CreatedOn)])
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
                                    color: "#2d8cf0",
                                    cursor: "pointer",
                                    margin: "0 5px"
                                },
                                on: {
                                    click: () => {
                                        this.editCourseForm = {
                                            Id:params.row.Id,
                                            SubjectName:params.row.SubjectName,
                                            Code: params.row.Code,
                                            Describe: params.row.Describe,
                                            Name: params.row.Name,
                                            Syllabus: params.row.Syllabus,
                                            SyllabusPath: params.row.SyllabusPath,
                                            SubjectName:params.row.SubjectName,
                                            SubjectId:params.row.SubjectId,
											VersionNumber: this.stringToByte(params.row.VersionNumber)
                                        };
                                        this.editCourse = true;

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
                                                this.deleteCourseAction(params.row.Id)
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
export { CourseTableModuleJS }
