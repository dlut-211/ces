
function StudentWorkTableModuleJS() {
    return {
        title: "学生作业列表",
        icon: "person-stalker",
        count: 50,
        tableHead: [
            { title: "课程名称", key: "CourseName", align: "center" },
            { title: "课堂名称", key: "ClassRoomName", align: "center" },
            { title: "章节名", key: "ChapterName", align: "center" },
            { title: "完成作业数", key: "CompleteCount", align: "center" },
            { title: "作业总数", key: "WorkCount", align: "center" },
            {title: "操作", key: "Action1",
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
                                    click:() => {
                                        console.log(this.ShowWorkList)
                                        this.bingtu=false;
                                        this.huanbi=false;
                                        this.leida=false;
                                        
                                            this.ShowWorkList=true;
                                            console.log(this.ShowWorkList)
                                            this.findWorkList={
                                                StudentId:params.row.StudentId ,
                                                chapterId : params.row.ChapterId,
                                                ClassRoomId:params.row.ClassRoomId     
                                              };
                                              
                                             this.getWorkByChapter();
                                    }
                                }
                            },
                            "查看作业"
                        )
                    ]);
                },

            }
        ],
        tableContent: []
    }
}
export { StudentWorkTableModuleJS }
