
function StudentWorkTableModuleJS() {
    return {
        title: "学生作业列表",
        icon: "person-stalker",
        count: 50,
        tableHead: [
            { title: "章节名", key: "chapterName", align: "center" },
            { title: "完成作业数", key: "completeCount", align: "center",
            render:(h,params)=>{
                if(params.row.completeCount==null){
                    return h("div",[
                        h(
                            "span",
                            {

                            },
                            "0"
                        )
                    ])
                }
                else
                {
                    return h("div",[
                        h(
                            "span",
                            {},
                            params.row.completeCount
                        )
                    ])
                }
            }    
        },
            { title: "作业总数", key: "workCount", align: "center" },
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
                                                studentId:params.row.studentId ,
                                                chapterId : params.row.chapterId,
                                                classroomId:params.row.classroomId,
                                                nowPage:1,
                                                pageSize:99999    
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
