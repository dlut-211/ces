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
        key: "code",
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
                      id: params.row.id,
                      code: params.row.code,
                      name: params.row.name,
                      description: params.row.description,
                      syllabus: params.row.syllabus,
                      syllabusPath: params.row.syllabusPath,
                      createdByName: params.row.createdByName,
                      subjectId: params.row.subjectId,
                      subjectName: params.row.subjectName,
                      createdOn: this.dateFormatFirst(params.row.createdOn)
                    };
                    this.LocalSubjectId = params.row.subjectId;
                    this.$refs.CourseDetail.infoInit(this.showForm);
                    this.courseInfo = true;
                  }
                }
              },
              params.row.code
            )
          ]);
        }
      },
      {
        title: "课程名称",
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
                      id: params.row.id,
                      code: params.row.code,
                      name: params.row.name,
                      description: params.row.description,
                      syllabus: params.row.syllabus,
                      syllabusPath: params.row.syllabusPath,
                      createdByName: params.row.createdByName,
                      subjectName: params.row.subjectName,
                      createdOn: this.dateFormatFirst(params.row.createdOn)
                    };
                    this.LocalSubjectId = params.row.subjectId;
                    this.$refs.CourseDetail.infoInit(this.showForm);
                    this.courseInfo = true;
                  }
                }
              },
              params.row.name
            )
          ]);
        }
      },
      {title: "学科名称", key: "subjectName", align: "center"},
      {title: "建课老师", key: "createdByName", align: "center"},
      {
        title: "创建时间",
        key: "createdOn",
        align: "center",
        width: 160,
        render: (h, params) => {
          return h("div", [this.dateFormatFirst(params.row.createdOn)])
        }
      },
      {
        title: "操作",
        key: "action",
        align: "center",
        field: 'right',
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
                      id: params.row.id,
                      subjectName: params.row.subjectName,
                      code: params.row.code,
                      description: params.row.description,
                      name: params.row.name,
                      syllabus: params.row.syllabus,
                      syllabusPath: params.row.syllabusPath,
                      subjectId: params.row.subjectId,
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
                        this.deleteCourseAction(params.row.id)
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

export {CourseTableModuleJS}
