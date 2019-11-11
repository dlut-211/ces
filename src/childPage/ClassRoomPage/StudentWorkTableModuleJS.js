function StudentWorkTableModuleJS() {
  return {
    title: "学生作业列表",
    icon: "person-stalker",
    count: 0,
    tableHead: [
      { title: "学号", key: "studentNumber", align: "left" },
      { title: "学生姓名", key: "studentName", align: "left" },
      {
        title: "最终提交时间",
        key: "submitTime",
        align: "center",
        width: 160,
        render: (h, params) => {
          return h("div", [this.dateFormat(params.row.submitTime)])
        }
      },
      { title: "用时", key: "useTimeFormat", align: "center" ,width: 120},
      { title: "分数", key: "score", align: "center" },

      {
        title: "提交次数",
        key: "workName",
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "span",
              {
                style: {
                  color: (params.row.submitCount == 0) ? "#495060" :"#2d8cf0",
                  cursor: (params.row.submitCount == 0) ?  'auto' : "pointer",
                },
                on: {
                  click: () => {
                    if(params.row.submitCount > 0){
                      this.studentWorkId = params.row.id;
                      this.getStudentWorkDetailList();
                      this.studentWorkDetailVisible = true;
                    }
                  }
                }
              },
              params.row.submitCount + "次"
            )
          ]);
        }
      },
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
                  display: (params.row.isSubmit == 1) ?"inline":"none"
                },
                on: {
                  click: () => {
                    window.open(params.row.workPath);
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
          if(params.row.isSubmit === 0) {
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
                      this.addStudentWorkDetailForm.studentWorkId = params.row.id;
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
                        id: params.row.id,
                        classroomWorkId: params.row.classroomWorkId,
                        classroomStudentId: params.row.classroomStudentId,
                        isScore: 1,
                        score: "",
                        workMessage: params.row.workMessage
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
