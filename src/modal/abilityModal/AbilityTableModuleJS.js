
function AbilityTableModuleJS() {
    return {
        title: "能力点列表",
        icon: "person-stalker",
        titleBtn: {
            title: "添加能力点",
            click: function () {
                this.$emit("addAbility");
            }
        },
        count: 50,
        tableHead: [{
                title: "请选择",
                key: "action",
                align: "left",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "Radio", {
                                props: {
                                    value: this.tableModule.tableContent[params.index].checked
                                },
                                on: {
                                    'on-change': () => {
                                        for (let i = 0; i < this.tableModule.tableContent.length; i++) {
                                            this.tableModule.tableContent[i].checked = false;
                                        }
                                        this.tableModule.tableContent[params.index].checked = true;
                                        this.choose = params.row;
                                    },

                                },
                            },
                        ),
                    ]);
                }
            },
            { title: "能力点名称‎", key: "Name", align: "center" },
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
                                        this.editAbilityForm = {
                                            Id:params.row.Id,
                                            Name: params.row.Name,
                                            SubjectId:params.row.SubjectId,//添加学科
											VersionNumber: this.stringToByte(params.row.VersionNumber)
                                        };
                                        this.editAbility = true;

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
                                                this.deleteAbilityAction(params.row.Id)
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
export { AbilityTableModuleJS }
