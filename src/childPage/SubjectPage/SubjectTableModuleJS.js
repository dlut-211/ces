function SubjectTableModuleJS() {
    return {
        title: "学科列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加学科",
            click: function () {
                this.$emit("addSubject");
            }
        },
        count: 50,
        tableHead: [
            { title: "学科代码", key: "OptionCode", align: "center" },
            { title: "学科名称", key: "OptionValue", align: "center" },
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
                                    color: "#2d8cf0",
                                    cursor: "pointer",
                                    margin: "0 5px"
                                },
                                on: {
                                    click: () => {
                                        this.editSubjectForm = {
                                            Id:params.row.Id,
                                            OptionCode: params.row.OptionCode,
                                            OptionValue: params.row.OptionValue,
                                            OptionType:'Subject',
                                            OptionTypeName:"学科",
											VersionNumber: this.stringToByte(params.row.VersionNumber)
                                        };
                                        this.editSubject = true;

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
                                                this.deleteSubjectAction(params.row.Id)
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
                                    color: "#8CF02D",
                                    cursor: "pointer",
                                    margin: "0 5px"
                                },
                                on: {
                                    click: () => {
                                        this.showAbilityList = true ; 
                                        this.findAbilityList={
                                            
                                            SubjectId:params.row.Id,  
                                          };
                                        this.getSubjectAbility1();
                                       

                                    }
                                }
                            },
                            "能力点管理"
                        ),
                    ]);
                }
            }
        ],
        tableContent: []
    }
}
export { SubjectTableModuleJS }
