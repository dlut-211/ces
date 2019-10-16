
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
        tableHead: [
            { title: "学科名称", key: "Subject_OptionValue", align: "center" },
            { title: "能力点名称‎", key: "Name", align: "center" },
            { title: "能力点描述", key: "Describe", align: "center" },
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
                                        this.editAbilityForm = {
                                            Id:params.row.Id,
                                            Name: params.row.Name,
                                            Describe:params.row.Describe,
                                            SubjectId: params.row.SubjectId,
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
