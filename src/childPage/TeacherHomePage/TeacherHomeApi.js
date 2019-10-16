
    // 获取课堂列表
    getTeacherHomeList: apiHost + '/teacherhome/list',
    // 删除课堂
    deleteTeacherHome: apiHost + '/teacherhome/remove',
    // 添加课堂
    postTeacherHome: apiHost + '/teacherhome/add',
    // 编辑课堂
    putTeacherHome: apiHost + '/teacherhome/edit',

// 获取课堂列表
export const getTeacherHomeList = (param) =>{
    return GET(API.getTeacherHomeList,param);
}
// 添加课堂
export const postTeacherHome = (param) =>{
    return POST(API.postTeacherHome,param);
}
// 编辑课堂
export const putTeacherHome = (param) =>{
    return PUT(API.putTeacherHome,param);
}
// 删除课堂
export const deleteTeacherHome = (param) =>{
    return DELETE(API.deleteTeacherHome,param);
}
