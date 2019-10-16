
function ClassRoomSelectModuleJS(){
    return {
        title: "课堂查询",
        icon: "person-stalker",
            input: [
                { name: "Name", placeholder: "请输入课堂名称", type: "input" },
                {
                    name: "TermType", placeholder: "请选择学期类型", type: "select", selected: [
                        { name: 1, value: "春季学期" },
                        { name: 2, value: "夏季学期" },
                        { name: 3, value: "秋季学期" }
                    ]
                },
                { name: "BeginDate", placeholder: "请选择上课开始日期时段", type: "daterange" },
                { name: "EndDate", placeholder: "请选择上课结束日期时段", type: "daterange" },
                {
                    name: "Status", placeholder: "请选择状态", type: "select", selected: [
                        { name: 1, value: "未开课" },
                        { name: 2, value: "已开课" },
                        { name: 4, value: "已结课" }
                    ]
                },
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
export {ClassRoomSelectModuleJS};
