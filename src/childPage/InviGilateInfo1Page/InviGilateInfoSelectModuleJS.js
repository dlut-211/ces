
function InviGilateInfoSelectModuleJS(){
    return {
        title: "监考信息查询",
        icon: "person-stalker",
            input: [
                {name:"TestDate",placeholder:"请选择起始时间",type:"date"},
                {name:"TestTime",placeholder:"请选择结束时间",type:"date"},
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
export {InviGilateInfoSelectModuleJS};
