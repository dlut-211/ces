
    // 获取作业列表
    getSubjectGradeList: apiHost + '/subjectgrade/list',
    // 删除作业
    deleteSubjectGrade: apiHost + '/subjectgrade/remove',
    // 添加作业
    postSubjectGrade: apiHost + '/subjectgrade/add',
    // 编辑作业
    putSubjectGrade: apiHost + '/subjectgrade/edit',

// 获取作业列表
export const getSubjectGradeList = (param) =>{
    return GET(API.getSubjectGradeList,param);
}
// 添加作业
export const postSubjectGrade = (param) =>{
    return POST(API.postSubjectGrade,param);
}
// 编辑作业
export const putSubjectGrade = (param) =>{
    return PUT(API.putSubjectGrade,param);
}
// 删除作业
export const deleteSubjectGrade = (param) =>{
    return DELETE(API.deleteSubjectGrade,param);
}
