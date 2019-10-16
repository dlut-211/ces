
function InviGilateInfoSelectModuleJS(){
    return {
        title: "监考信息查询",
        icon: "person-stalker",
            input: [
               // { name: "CourseName", placeholder: "请输入课程名", type: "input" },
                
                { name: "A_Name", placeholder: "请输入监考老师姓名", type: "input" },
                
                {
                    name:"CourseName",//数据库返回来的变量名
                    placeholder:"请选择课程",
                    type:"selectInviCourseName",
                    selected:[],
                    url:'getInviGilateInfoList'
                },
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
