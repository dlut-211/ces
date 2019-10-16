
    // 获取学生作业列表
    getStu_StudentWorkList: apiHost + '/stu_studentwork/list',
    // 删除学生作业
    deleteStu_StudentWork: apiHost + '/stu_studentwork/remove',
    // 添加学生作业
    postStu_StudentWork: apiHost + '/stu_studentwork/add',
    // 编辑学生作业
    putStu_StudentWork: apiHost + '/stu_studentwork/edit',

// 获取学生作业列表
export const getStu_StudentWorkList = (param) =>{
    return GET(API.getStu_StudentWorkList,param);
}
// 添加学生作业
export const postStu_StudentWork = (param) =>{
    return POST(API.postStu_StudentWork,param);
}
// 编辑学生作业
export const putStu_StudentWork = (param) =>{
    return PUT(API.putStu_StudentWork,param);
}
// 删除学生作业
export const deleteStu_StudentWork = (param) =>{
    return DELETE(API.deleteStu_StudentWork,param);
}
