import { isNull } from "util";

function InviGilateInfoTableModuleJS() {
    return {
        title: "监考信息列表",
        icon: "person-stalker",
        // titleBtn1: {
        //     title: "发放监考费用",
        //     click: function () {
        //         console.log("zzzzz");
        //         this.deleverExpense();
        //         console.log("zzzzz");
        //     }
        // },
        count: 50,
        tableHead: [
            { title: "课程名", key: "CourseName", align: "center" },
            { title: "监考教室", key: "ClassRoom", align: "center" },
            { title: "考试日期", key: "TestDate", align: "center" },
            { title: "结束时间", key: "TestTime", align: "center" },
            //{ title: "费用", key: "expense", align: "center" },
            // { title: "监考老师A姓名", key: "A_Name", align: "center" },
            // { title: "监考老师B姓名", key: "B_Name", align: "center" },
            // { title: "监考老师C姓名", key: "C_Name", align: "center" },
            // { title: "监考老师D姓名", key: "D_Name", align: "center" },
            // {
            //     title: "操作",
            //     key: "action",
            //     align: "left",
            //     render: (h, params) => {
                    
            //         return h("div", [
            //             h(
            //                 "span",
            //                 {
            //                     style: {
            //                         color: "#2d8cf0",
            //                         cursor: "pointer",
            //                         margin: "0 5px"
            //                     },
            //                     on: {
            //                         click: () => {
            //                             this.editInviGilateInfoForm = {
            //                                 Id:params.row.Id,
            //                                 CourseName: params.row.CourseName,
            //                                 ClassRoom: params.row.ClassRoom,
            //                                 TestDate: params.row.TestDate,
            //                                 TestTime: params.row.TestTime,
            //                                 expense: params.row.expense,
            //                                 AId: params.row.AId,
            //                                 BId: params.row.BId,
            //                                 CId: params.row.CId,
            //                                 DId: params.row.DId,
            //                                 AStatus: params.row.AStatus,
            //                                 BStatus: params.row.BStatus,
            //                                 CStatus: params.row.CStatus,
            //                                 DStatus: params.row.DStatus,
			// 								VersionNumber: this.stringToByte(params.row.VersionNumber)
            //                             };
            //                             this.Names=[
            //                                 params.row.A_Name,
            //                                 params.row.B_Name,
            //                                 params.row.C_Name,
            //                                 params.row.D_Name
            //                                 ];//给数组赋值，存储教师的信息
            //                             // console.log("数组"+this.Names[0]);
            //                             // for(var i=0;i<this.Names.length;i++){
            //                             //     this.Names[i]=params.row.A_Name
            //                             // }
            //                           //console.log("BID"+this.editInviGilateInfoForm.BId);
            //                             this.editInviGilateInfo = true;

            //                         }
            //                     }
            //                 },
            //                 "编辑"
            //             ),
            //             h(
            //                 "span",
            //                 {
            //                     style: {
            //                         color: "#ed3f14",
            //                         cursor: "pointer",
            //                         margin: "0 5px"
            //                     },
            //                     on: {
            //                         click: () => {
			// 							this.$Modal.confirm({
            //                                 title: "<span style='color:red'><b>提示</b></span>",
            //                                 content: "确定要删除信息吗？",
            //                                 onOk: () => {
            //                                     this.deleteInviGilateInfoAction(params.row.Id)
            //                                 },
            //                                 onCancel: () => {
            //                                 }
            //                             }) 
            //                         }
            //                     }
            //                 },
            //                 "删除"
            //             )
            //         ]);
            //     }
            // },
            {
                title: "确认监考",
                key: "action1",
                align: "left",
                render: (h, params) => {
                    if(params.row.AStatus==2||params.row.AStatus==1)//已经确认过，不能再点击确认
                    {
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        color: "#808080",
                                        margin: "0 5px"
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                "已确认"
                            )
                        ]);
                    }
                    else
                    {
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
                                            this.editInviGilateInfoForm = {
                                                Id:params.row.Id,
                                                CourseName: params.row.CourseName,
                                                ClassRoom: params.row.ClassRoom,
                                                TestDate: params.row.TestDate,
                                                TestTime: params.row.TestTime,
                                                expense: params.row.expense,
                                                AId: params.row.AId,
                                                BId: params.row.BId,
                                                CId: params.row.CId,
                                                DId: params.row.DId,
                                                AStatus: params.row.AStatus,
                                                BStatus: params.row.BStatus,
                                                CStatus: params.row.CStatus,
                                                DStatus: params.row.DStatus,
                                                VersionNumber: this.stringToByte(params.row.VersionNumber)
                                            };
                                            // this.deleverExpense(params.row.AStatus,params.row.BStatus,params.row.CStatus,params.row.DStatus);
                                            this.Teacher_Num=[
                                                params.row.AId,
                                                params.row.BId,
                                                params.row.CId,
                                                params.row.DId
                                            ]
                                            this.changeStatus();
                                            this.editInviGilateInfoAction(); 
                                            
                                        }
                                    }
                                },
                                "确认"
                            )
                        ]);
                    }

                }
            }
            
        ],
        tableContent: []
    }
}
export { InviGilateInfoTableModuleJS }
