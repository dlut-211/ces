
function ClassRoomStudentTableModuleJS() {
    return {
        title: "我的课堂",
        icon: "person-stalker",
        count: 50,
        tableHead: [
            { title: "课程编号", key: "Code", align: "center",
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
                                this.LocalClassRoomId=params.row.ClassRoomId;
                                this.GetData()
                                }
                            }
                        },
                        params.row.Code
                    ),
                ]);
            }
            },
            { title: "课堂名称", key: "ClassRoomName", align: "center",
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
                                   //跳转
                                //    this.$router.push({
                                //     name:'StudentWorkPage',
                                //     params:{"Code":params.row.CourseId,"ClassRoomId":params.row.ClassRoomId}
                                // })
                                
                                this.LocalClassRoomId=params.row.ClassRoomId;
                                this.GetData()
                                }
                            }
                        },
                        params.row.ClassRoomName
                    ),
                ]);
            }
            },
            {title:"学期",key:"TermTypeName",align: "center"},
            {title:"上课日期",key:"Begin_End",align: "center",
            render: (h, params) => {
                return h("div", [this.dateFormatFirst(params.row.BeginDate)]
                +"-"+[this.dateFormatFirst(params.row.EndDate)])
            }
            },
            {title:"课程状态",key:"StatusName",align: "center"}
        ],
        tableContent: []
    }
}
export { ClassRoomStudentTableModuleJS }
