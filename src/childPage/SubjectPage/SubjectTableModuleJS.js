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
        count: 30,
        tableHead: [
            { title: "学科代码", key: "optionCode", align: "center" },
            { title: "学科名称", key: "optionValue", align: "center" },
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
                                            id:params.row.id,
                                            optionCode: params.row.optionCode,
                                            optionValue: params.row.optionValue,
                                            optionType:'Subject',
                                            optionTypeName:"学科",
											//versionnumber: this.stringToByte(params.row.versionnumber)
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
                                                this.deleteSubjectAction(params.row.id)
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
