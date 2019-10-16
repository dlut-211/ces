
function SubjectGradeSelectModuleJS(){
    return {
        title: "学科查询",
        icon: "person-stalker",
            input: [
                {
                    name:"CourseName",//数据库返回来的变量名
                    placeholder:"请选择学科",
                    type:"selectAjaxSubject",
                    selected:[],
                    url:'getInviGilateInfoList'
                },
            ]
    }
}
export {SubjectGradeSelectModuleJS};
