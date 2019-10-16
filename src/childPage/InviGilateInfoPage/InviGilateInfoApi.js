
    // 获取监考信息列表
    getInviGilateInfoList: apiHost + '/invigilateinfo/list',
    // 删除监考信息
    deleteInviGilateInfo: apiHost + '/invigilateinfo/remove',
    // 添加监考信息
    postInviGilateInfo: apiHost + '/invigilateinfo/add',
    // 编辑监考信息
    putInviGilateInfo: apiHost + '/invigilateinfo/edit',

// 获取监考信息列表
export const getInviGilateInfoList = (param) =>{
    return GET(API.getInviGilateInfoList,param);
}
// 添加监考信息
export const postInviGilateInfo = (param) =>{
    return POST(API.postInviGilateInfo,param);
}
// 编辑监考信息
export const putInviGilateInfo = (param) =>{
    return PUT(API.putInviGilateInfo,param);
}
// 删除监考信息
export const deleteInviGilateInfo = (param) =>{
    return DELETE(API.deleteInviGilateInfo,param);
}
