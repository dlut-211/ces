import { API } from './HttpConfig';
import http from './http';



// 学生登陆
export const studentLogin = (param) => {
    return GET(API.studentLogin, param);
}
export const teacherLogin = (param) => {
    return GET(API.teacherLogin, param);
}
export const adminLogin = (param) => {
    return GET(API.adminLogin, param);
}
// 后台用户登陆
export const login = (param) => {
        return POST(API.login, param);
    }
  // 修改密码
export const updatePassword = (param) => {
    return PUT(API.updatePassword, param);
  }
    // 返回用户拥有的权限的接口
export const getPermission = (param) => {
        return GET(API.getPermission, param);
    }
    // 校验Token是否失效
export const verifyToken = (param) => {
        return GET(API.verifyToken, param);
    }
// 图片上传
export const uploadImg = (param,filesname) => {
    return POST(API.uploadImg+'?filesname='+filesname, param);
}
// 文件上传
export const uploadFile = (param,filesname) => {
    return POST(API.uploadFile+'?filesname='+filesname, param);
}

// 获取教师列表
export const getTeacherList = (param) =>{
    return GET(API.getTeacherList,param);
}
// 添加教师
export const postTeacher = (param) =>{
    return POST(API.postTeacher,param);
}
// 编辑教师
export const putTeacher = (param) =>{
    return PUT(API.putTeacher,param);
}
// 删除教师
export const deleteTeacher = (param) =>{
    return DELETE(API.deleteTeacher,param);
}
// 启用教师
export const enableTeacher = (param) =>{
    return GET(API.enableTeacher,param);
}
// 禁用教师
export const disableTeacher = (param) =>{
    return GET(API.disableTeacher,param);
}


// 获取课程列表
export const getCourseList = (param) =>{
    return GET(API.getCourseList,param);
}
// 添加课程
export const postCourse = (param) =>{
    return POST(API.postCourse,param);
}
// 编辑课程
export const putCourse = (param) =>{
    return PUT(API.putCourse,param);
}
// 删除课程
export const deleteCourse = (param) =>{
    return DELETE(API.deleteCourse,param);
}
//获取学科列表getAllSubjectList:
export const getAllSubjectList = (param) =>{
    return GET(API.getAllSubjectList,param);
}


// 获取章节树
export const getChapterTree = (param) =>{
    return GET(API.getChapterTree,param);
}
// 获取主章节
export const getChapterMain = (param) =>{
    return GET(API.getChapterMain,param);
}
// 获取课程章节
export const getChapterCourse = (param) =>{
    return GET(API.getChapterCourse,param);
}
// 获取章节列表
export const getChapterList = (param) =>{
    return GET(API.getChapterList,param);
}
// 添加章节
export const postChapter = (param) =>{
    return POST(API.postChapter,param);
}
// 编辑章节
export const putChapter = (param) =>{
    return PUT(API.putChapter,param);
}
// 删除章节
export const deleteChapter = (param) =>{
    return DELETE(API.deleteChapter,param);
}


// 获取课程所有知识点
export const getKnowledgeAllList = (param) =>{
    return GET(API.getKnowledgeAllList,param);
}
// 获取知识点列表
export const getKnowledgeList = (param) =>{
    return GET(API.getKnowledgeList,param);
}
// 添加知识点
export const postKnowledge = (param) =>{
    return POST(API.postKnowledge,param);
}
// 编辑知识点
export const putKnowledge = (param) =>{
    return PUT(API.putKnowledge,param);
}
// 删除知识点
export const deleteKnowledge = (param) =>{
    return DELETE(API.deleteKnowledge,param);
}


// 获取能力点列表
export const getAbilityList = (param) =>{
    return GET(API.getAbilityList,param);
}
// 添加能力点
export const postAbility = (param) =>{
    return POST(API.postAbility,param);
}
// 编辑能力点
export const putAbility = (param) =>{
    return PUT(API.putAbility,param);
}
// 删除能力点
export const deleteAbility = (param) =>{
    return DELETE(API.deleteAbility,param);
}


// 获取章节作业
export const getWorkChapterList = (param) =>{
    return GET(API.getWorkChapterList,param);
}
// 获取作业列表
export const getWorkList = (param) =>{
    return GET(API.getWorkList,param);
}
// 添加作业
export const postWork = (param) =>{
    return POST(API.postWork,param);
}
// 编辑作业
export const putWork = (param) =>{
    return PUT(API.putWork,param);
}
// 删除作业
export const deleteWork = (param) =>{
    return DELETE(API.deleteWork,param);
}

// 获取课堂列表
export const getClassRoomList = (param) =>{
    return GET(API.getClassRoomList,param);
}
// 添加课堂
export const postClassRoom = (param) =>{
    return POST(API.postClassRoom,param);
}
// 编辑课堂
export const putClassRoom = (param) =>{
    return PUT(API.putClassRoom,param);
}
// 删除课堂
export const deleteClassRoom = (param) =>{
    return DELETE(API.deleteClassRoom,param);
}
// 修改课堂状态
export const editClassRoomStatus = (param) =>{
    return PUT(API.editClassRoomStatus,param);
}


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
// 导入学生
export const importClassRoomStudent = (param) =>{
    return POST(API.importClassRoomStudent,param);
}
// 获取学生导入模板
export const getClassRoomStudentTemplate = (param) =>{
    return GET(API.getClassRoomStudentTemplate,param);
}


// 获取课堂章节作业
export const getClassRoomWorkChapterList = (param) =>{
    return GET(API.getClassRoomWorkChapterList,param);
}
// 布置课堂作业
export const layoutClassRoomWork = (param) =>{
    return GET(API.layoutClassRoomWork,param);
}
// 撤销布置作业
export const revokeLayoutClassRoomWork = (param) =>{
    return GET(API.revokeLayoutClassRoomWork,param);
}
// 获取作业情况
export const getClassRoomWorkDetail = (param) =>{
    return GET(API.getClassRoomWorkDetail,param);
}

// 获取学生作业明细列表
export const getStudentWorkDetailList = (param) =>{
    return GET(API.getStudentWorkDetailList,param);
}
// 添加学生作业明细
export const postStudentWorkDetail = (param) =>{
    return POST(API.postStudentWorkDetail,param);
}
// 编辑学生作业明细
export const putStudentWorkDetail = (param) =>{
    return PUT(API.putStudentWorkDetail,param);
}
// 删除学生作业明细
export const deleteStudentWorkDetail = (param) =>{
    return DELETE(API.deleteStudentWorkDetail,param);
}


// 获取试卷列表
export const getTestPaperList = (param) =>{
    return GET(API.getTestPaperList,param);
}
// 添加试卷
export const postTestPaper = (param) =>{
    return POST(API.postTestPaper,param);
}
// 编辑试卷
export const putTestPaper = (param) =>{
    return PUT(API.putTestPaper,param);
}
// 删除试卷
export const deleteTestPaper = (param) =>{
    return DELETE(API.deleteTestPaper,param);
}
// 修改试卷状态
export const editTestPaperStatus = (param) =>{
    return PUT(API.editTestPaperStatus,param);
}
// 根据试卷获取试题
export const TestPaperDetailList = (param) =>{
    return GET(API.TestPaperDetailList,param);
}
// 学生考试成绩
export const studentTestPaperList = (param) =>{
    return GET(API.studentTestPaperList,param);
}
// 获取成绩导入模板
export const getStudentTestPaperTemplate = (param) =>{
    return GET(API.getStudentTestPaperTemplate,param);
}
// 导入试卷成绩
export const importStudentTestPaper = (param) =>{
    return POST(API.importStudentTestPaper,param);
}

// 获取章节作业数
export const getchapterWorkList = (param) =>{
    return GET(API.getchapterWorkList,param);
}
// 获取环比图所需数据
export const getknowledgeScoreList = (param) =>{
    return GET(API.getknowledgeScoreList,param);
}
// 获取雷达图所需数据
export const getabilityScoreList = (param) =>{
    return GET(API.getabilityScoreList,param);
}
// 添加学生作业
export const postStudentWork = (param) =>{
    return POST(API.postStudentWork,param);
}
// 编辑学生作业
export const putStudentWork = (param) =>{
    return PUT(API.putStudentWork,param);
}
// 删除学生作业
export const deleteStudentWork = (param) =>{
    return DELETE(API.deleteStudentWork,param);
}

// 获取学科列表
export const getSubjectList = (param) =>{
return GET(API.getSubjectList,param);
}
// 添加学科
export const postSubject = (param) =>{
return POST(API.postSubject,param);
}
// 编辑学科
export const putSubject = (param) =>{
return PUT(API.putSubject,param);
}
// 删除学科
export const deleteSubject = (param) =>{
return DELETE(API.deleteSubject,param);
}

// 获取学科能力点列表
export const getSubjectAbility = (param) =>{
return GET(API.getSubjectAbility,param);
}

// 获取学生作业列表
export const getStudentWorkList = (param) =>{
    return GET(API.getStudentWorkList,param);
}

// 获取学生已完成作业数量
export const getStudentCompletedWork = (param) =>{
    return GET(API.getStudentCompletedWork,param);
}

//获取某门课堂下的所有作业
export const getClassRoomWork = (param) =>{
    return GET(API.getClassRoomWork,param);
}

//获取章节作业
export const getWorkByChapter = (param) =>{
    return GET(API.getWorkByChapter,param);
}

// 获取作业列表
export const getStudentCharptWordList = (param) =>{
    return GET(API.getStudentCharptWordList,param);
}
// 添加作业
export const postStudentCharptWord = (param) =>{
    return POST(API.postStudentCharptWord,param);
}
// 编辑作业
export const putStudentCharptWord = (param) =>{
    return PUT(API.putStudentCharptWord,param);
}
// 删除作业
export const deleteStudentCharptWord = (param) =>{
    return DELETE(API.deleteStudentCharptWord,param);
}

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
 //学生学科能力点雷达图
 export const StudentAbilityScoreEcharts = (param) =>{
    return GET(API.StudentAbilityScoreEcharts,param);
}

 //学生学科成绩总分
 export const StudentSubjectScoreEcharts = (param) =>{
    return GET(API.StudentSubjectScoreEcharts,param);
}
//添加课程知识点时，获取知识点名称
export const getCKname = (param) =>{
    return GET(API.getCKname,param);
}

//获取监考信息列表
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

//根据时间来查询学生作业
export const getStudentWorkByTime = (param) =>{
    return GET(API.getStudentWorkByTime,param);
}
//根据时间来选择教师未提交的监考
export const getTeacherInvigilateByTime = (param) =>{
    return GET(API.getTeacherInvigilateByTime,param);
}

//获取课堂的平均分
export const getClassRoomAvgScore = (param) =>{
    return GET(API.getClassRoomAvgScore,param);
}

export const getClassRoomListCount = (param) =>{
    return GET(API.getClassRoomListCount,param);
}


export const getNoSubmitWork = (param) =>{
    return GET(API.getNoSubmitWork,param);
}

export const getStudentWorkInfoWithStudent = (param) =>{
    return GET(API.getStudentWorkInfoWithStudent,param);
}

export const getStudentAbilityInfo = (param) =>{
    return GET(API.getStudentAbilityInfo,param);
}

//测试端口
export const testPort=(param)=>{
    return GET(API.testPort,param);
}


//---------------------------------------------------------------------------------------------------
// 定义4种请求
const GET = (url, param) => {
    return http.get(url, param);
}

const POST = (url, param) => {
    if (typeof(param) != undefined) {
        return http.post(url, param);
    } else {
        return http.post(url);
    }

};

const PUT = (url, param) => {
    return http.put(url, param);
};

const DELETE = (url, param) => {
    return http.delete(url, param);
};