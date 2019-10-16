
    // 获取课堂学员列表
    getClassRoomStudentList: apiHost + '/classroomstudent/list',
    // 删除课堂学员
    deleteClassRoomStudent: apiHost + '/classroomstudent/remove',
    // 添加课堂学员
    postClassRoomStudent: apiHost + '/classroomstudent/add',
    // 编辑课堂学员
    putClassRoomStudent: apiHost + '/classroomstudent/edit',

// 获取课堂学员列表
export const getClassRoomStudentList = (param) =>{
    return GET(API.getClassRoomStudentList,param);
}
// 添加课堂学员
export const postClassRoomStudent = (param) =>{
    return POST(API.postClassRoomStudent,param);
}
// 编辑课堂学员
export const putClassRoomStudent = (param) =>{
    return PUT(API.putClassRoomStudent,param);
}
// 删除课堂学员
export const deleteClassRoomStudent = (param) =>{
    return DELETE(API.deleteClassRoomStudent,param);
}
