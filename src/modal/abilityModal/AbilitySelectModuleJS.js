
function AbilitySelectModuleJS(){
    return {
        title: "能力点查询",
        icon: "person-stalker",
            input: [
                { name: "name", placeholder: "请输入能力点名称‎", type: "input" },
                {
                    name: "submit",
                    placeholder: "查询",
                    type: "button",
                    theme: "primary",
                    click: function () {
                        this.$emit("submit", this.form);
                    }
                }
            ]
    }
}
export {AbilitySelectModuleJS};
