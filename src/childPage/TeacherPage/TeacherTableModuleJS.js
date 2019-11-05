
function TeacherTableModuleJS() {
    return {
        title: "教师列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加教师",
            click: function () {
                this.$emit("addTeacher");
            }
        },
        count: 0,
        tableHead: [
            { title: "教师工号", key: "number", align: "center" },
            { title: "姓名", key: "name", align: "center" },
            { title: "学校", key: "schoolName", align: "center" },
            {
                title: "操作",
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "span",
                            {
                                style: {
                                    color: "#FF8000",
                                    cursor: "pointer",
                                    margin: "0 5px",
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "<span style='color:red'><b>提示</b></span>",
                                            content: "确定要重置("+ params.row.number +'/'+ params.row.name +")的密码吗？<br/><span style='color:red'><b>重置密码:123456</b></span>",
                                            onOk: () => {
                                                this.resetPasswordAction(params.row.id);
                                            },
                                            onCancel: () => {
                                            }
                                        }) 
                                    }
                                }
                            },
                            "重置密码"
                        ),
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
                                        this.editTeacherForm = {
                                            id:params.row.id,
                                            email: params.row.email,
                                            name: params.row.name,
                                            number: params.row.number,
                                            password: params.row.password,
                                            school: params.row.school,
                                            status: params.row.status,
                                            token: params.row.token,
                                            subjectId:params.row.subjectId,
                                            schoolId:params.row.schoolId
											//versionNumber: this.stringToByte(params.row.versionNumber)
                                        };
                                        this.editTeacher = true;

                                    }
                                }
                            },
                            "编辑"
                        ),
                        // h(
                        //     "span",
                        //     {
                        //         style: {
                        //             color: "#04B404",
                        //             cursor: "pointer",
                        //             margin: "0 5px"
                        //         },
                        //         on: {
                        //             click: () => {
                        //                 if(params.row.Status == 1){
                        //                     this.$Message.error('当前教师已为启用状态！');
                        //                 }
                        //                 else{
                        //                     this.$Modal.confirm({
                        //                         title: "<span style='color:red'><b>提示</b></span>",
                        //                         content: "确定要启用吗？",
                        //                         onOk: () => {
                        //                             this.enableTeacherAction(params.row.Id)
                        //                         },
                        //                         onCancel: () => {
                        //                         }
                        //                     }) 
                        //                 }
                        //             }
                        //         }
                        //     },
                        //     "启用"
                        // ),
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
										if(params.row.status == 2){
                                            this.$Message.error('当前教师已为禁用状态！');
                                        }
                                        else{
                                            this.$Modal.confirm({
                                                title: "<span style='color:red'><b>提示</b></span>",
                                                content: "确定要删除吗？",
                                                onOk: () => {
                                                    this.disableTeacherAction(params.row.id)
                                                },
                                                onCancel: () => {
                                                }
                                            }) 
                                        }
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
export { TeacherTableModuleJS }
