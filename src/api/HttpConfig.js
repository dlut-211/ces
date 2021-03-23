//测试环境为true 开发环境为false
var IS_DEBUG = true;
var apiHost = IS_DEBUG ? '/api' : 'localhost:8443/api';
// var apiHost = IS_DEBUG ? '/api' : 'http://127.0.0.1:2834/api';

var API = {
    //学生登录
    studentLogin: apiHost + '/studentcontroller/selectByAccountAndPassword',
    //教师登录
    teacherLogin: apiHost + '/teacher/selectByAccountAndPassword',
    //管理员登录
    adminLogin: apiHost + '/usercontroller/selectByAccountAndPassword',
    // 后台用户登陆
    login: apiHost + '/testmd/selectByAccountAndPassword',
    // 修改密码
    updatePassword: apiHost + '/usercontroller/editpassword',
    // 返回用户拥有的权限的接口selectByAccountAndPassword
    // getPermission: apiHost + '/user/getpermission',
    // 校验Token是否失效
    verifyToken: apiHost + '/user/verifytoken',
    // 图片上传
    uploadImg: apiHost + '/upload/image',
    // 文件上传
    uploadFile: apiHost + '/course/uploadFile',
    //测试专用
    testPort:apiHost+'/user/testView',

    // 获取教师列表
    getTeacherList: apiHost + '/teacher/list',
    // 删除教师
    deleteTeacher: apiHost + '/teacher/remove',
    // 添加教师
    postTeacher: apiHost + '/teacher/add',
    // 编辑教师
    putTeacher: apiHost + '/teacher/edit',
    // 启用教师
    enableTeacher: apiHost + '/teacher/enable',
    // 禁用教师
    disableTeacher: apiHost + '/teacher/disable',
    // 重置教师密码
    resetTeacherPassWord: apiHost + '/teacher/resetPassWord',


   // 获取课程列表
   getCourseList: apiHost + '/course/getCourseList',
   // 删除课程
   deleteCourse: apiHost + '/course/deleteCourse',
   // 添加课程
   postCourse: apiHost + '/course/insertCourse',
   // 编辑课程
   putCourse: apiHost + '/course/updateCourse',

  // 获取章节树
  getChapterTree: apiHost + '/chapter/tree',
  // 获取主章节
  getChapterMain: apiHost + '/chapter/findChapterByCourseId',
  // 获取课程章节
  getChapterCourse: apiHost + '/chapter/courselist',
  // 获取章节列表
  getChapterList: apiHost + '/chapter/list',
  // 删除章节
  deleteChapter: apiHost + '/chapter/remove',
  // 添加章节
  postChapter: apiHost + '/chapter/add',
  // 编辑章节
  putChapter: apiHost + '/chapter/edit',


    // 获取课程所有知识点
    getKnowledgeAllList: apiHost + '/knowledge/list',
    // 获取知识点列表
    getKnowledgeList: apiHost + '/knowledge/page',
    // 删除知识点
    deleteKnowledge: apiHost + '/knowledge/remove',
    // 添加知识点
    postKnowledge: apiHost + '/knowledge/add',
    // 编辑知识点
    putKnowledge: apiHost + '/knowledge/edit',



    // 获取能力点列表
    getAbilityList: apiHost + '/ability/SubjectAbility',
    // 删除能力点
    deleteAbility: apiHost + '/ability/remove',
    // 添加能力点
    postAbility: apiHost + '/ability/add',
    // 编辑能力点
    putAbility: apiHost + '/ability/edit',
    //获取学科列表
    //getAllSubjectList: apiHost + '/MySystem/getAllSubjectList',
     //获取学科列表
    getAllSubjectList: apiHost + '/course/getAllSubjectList',
     //获取学校列表
     getAllSchoolList: apiHost + '/school/getAllSchoolList',

     // 获取章节作业
    getWorkChapterList: apiHost + '/work/list',
    // 获取作业列表
    getWorkList: apiHost + '/work/list',
    // 删除作业
    deleteWork: apiHost + '/work/remove',
    // 添加作业
    postWork: apiHost + '/work/add',
    // 编辑作业
    putWork: apiHost + '/work/edit',

    // 获取课堂列表
    getClassRoomList: apiHost + '/classroom/list',
    // 删除课堂
    deleteClassRoom: apiHost + '/classroom/remove',
    // 添加课堂
    postClassRoom: apiHost + '/classroom/add',
    // 编辑课堂
    putClassRoom: apiHost + '/classroom/edit',
    // 修改课堂状态
    editClassRoomStatus: apiHost + '/classroom/editstatus',


    // 获取课堂学员列表
    getClassRoomStudentList: apiHost + '/classroomstudent/list',
    // 学生首页
    getClassRoomStudentList1:apiHost + '/classroomstudent/selectClassRoomCountById',
    // 删除课堂学员
    deleteClassRoomStudent: apiHost + '/classroomstudent/remove',
    // 添加课堂学员
    postClassRoomStudent: apiHost + '/classroomstudent/add',
    // 编辑课堂学员
    putClassRoomStudent: apiHost + '/classroomstudent/edit',
    // 导入学生
    importClassRoomStudent: apiHost + '/classroomstudent/importstu',
    // 获取学生导入模板
    getClassRoomStudentTemplate: apiHost + '/classroomstudent/gettemplate',
    getClassRoomStudentTemplate2: 'http://47.99.65.198:8443/api' + '/classroomstudent/gettemplate',
    // 获取课堂章节作业
    getClassRoomWorkChapterList: apiHost + '/classroomwork/chapterlist',
    // 布置课堂作业
    layoutClassRoomWork: apiHost + '/classroomwork/layoutwork',
    // 撤销布置作业
    revokeLayoutClassRoomWork: apiHost + '/classroomwork/revokelayout',
    // 获取作业情况
    getClassroomWorkDetail: apiHost + '/studentwork/worklist',

    // 获取学生作业明细列表
    getStudentWorkDetailList: apiHost + '/studentworkdetail/list',
    // 删除学生作业明细
    deleteStudentWorkDetail: apiHost + '/studentworkdetail/remove',
    // 添加学生作业明细
    postStudentWorkDetail: apiHost + '/studentworkdetail/add',
    // 编辑学生作业明细
    putStudentWorkDetail: apiHost + '/studentworkdetail/edit',

    // 获取试卷列表
    getTestPaperList: apiHost + '/test_paper/list',
    // 删除试卷
    deleteTestPaper: apiHost + '/test_paper/remove',
    // 添加试卷
    postTestPaper: apiHost + '/test_paper/add',
    // 编辑试卷
    putTestPaper: apiHost + '/test_paper/edit',
    // 修改试卷状态
    editTestPaperStatus: apiHost + '/test_paper/examined',
    //撤销试卷
    editTestPaperStatus1:apiHost + '/test_paper/revokeExamined',
    // 根据试卷获取试题
    TestPaperDetailList: apiHost + '/testpaperdetail/testpaperlist',
    // 学生考试成绩
    studentTestPaperList: apiHost + '/studenttestpaper/testpaperlist',
    // 获取成绩导入模板
    getStudentTestPaperTemplate: apiHost + '/test_paper/gettemplate',
    // 导入试卷成绩
    importStudentTestPaper: apiHost + '/test_paper/importstp',

    // 获取学生作业列表
    getStudentWorkList: apiHost + '/studentwork/list',
    // 获取章节作业数
    getchapterWorkList: apiHost + '/classroomstudent/chapterWorkList',
    // 获取环比图所需数据
    getknowledgeScoreList: apiHost + '/studentWork/knowledgeScoreList',
    // 获取雷达图所需数据
    getabilityScoreList: apiHost + '/studentWork/abilityScoreList',
    // 删除学生作业
    deleteStudentWork: apiHost + '/studentwork/remove',
    // 添加学生作业
    postStudentWork: apiHost + '/studentwork/add',
    // 编辑学生作业
    putStudentWork: apiHost + '/studentwork/edit',

    // 获取学科列表
    getSubjectList: apiHost + '/MySystem/list',
    // 删除学科
    deleteSubject: apiHost + '/MySystem/remove',
    // 添加学科
    postSubject: apiHost + '/MySystem/add',
    // 编辑学科
    putSubject: apiHost + '/MySystem/edit',
    //获取学科能力点列表
    getSubjectAbility:apiHost + '/ability/SubjectAbility',

    // 获取学生作业列表
    getStu_StudentWorkList: apiHost + '/stu_studentwork/list',
    // 删除学生作业
    deleteStu_StudentWork: apiHost + '/stu_studentwork/remove',
    // 添加学生作业
    postStu_StudentWork: apiHost + '/stu_studentwork/add',
    // 编辑学生作业
    putStu_StudentWork: apiHost + '/stu_studentwork/edit',

    //获取学生完成的作业数量
    getStudentCompletedWork: apiHost + '/studentwork/studentcompletedwork',
    //获取某门课堂下所有的作业
    getClassRoomWork: apiHost + '/classroomwork/list',
    //获取章节作业
    getWorkByChapter: apiHost + '/classroomstudent/studentworkbychapter',
     // 获取作业列表
     getStudentCharptWordList: apiHost + '/studentcharptword/list',
     // 删除作业
     deleteStudentCharptWord: apiHost + '/studentcharptword/remove',
     // 添加作业
     postStudentCharptWord: apiHost + '/studentcharptword/add',
     // 编辑作业
     putStudentCharptWord: apiHost + '/studentcharptword/edit',

  //学生学科能力点雷达图
    StudentAbilityScoreEcharts: apiHost + '/StudentAbility/StudentAbilityScoreEcharts',
    //学生学科成绩总分
    StudentSubjectScoreEcharts: apiHost + '/StudentAbility/StudentSubjectScoreEcharts',


     // 获取监考信息列表
     getInviGilateInfoList: apiHost + '/invigilateinfo/list',
     // 删除监考信息
     deleteInviGilateInfo: apiHost + '/invigilateinfo/remove',
     // 添加监考信息
     postInviGilateInfo: apiHost + '/invigilateinfo/add',
     // 编辑监考信息
     putInviGilateInfo: apiHost + '/invigilateinfo/edit',
    //获取课程知识点名称
    getCKname : apiHost + '/knowledge/Kname',

    //根据时间来选择学生未提交的作业
    getStudentWorkByTime: apiHost+'/studentwork/studentworkbyTime',
    //根据时间来选择教师未提交的监考
    getTeacherInvigilateByTime:apiHost+'/invigilateinfo/teacherInvigilatebyTime',
    //获取课堂平均分
    getClassRoomAvgScore: apiHost+'/classroom/classRoomAvgScore',

    //获取学生所选课堂的总数
    getClassRoomListCount:apiHost+'/classroomstudent/listcount',

    //获取学生未提交的课程数
    getNoSubmitWork:apiHost+'/studentwork/studentnosubmitwork',

    //学生作业完成进度
    getStudentWorkInfoWithStudent:apiHost+'/vstudentworkinfowithstudentcontroller/getStudentWorkInfoWithStudent',

    //学生能力点获得情况
    getStudentAbilityInfo:apiHost+'/vstudentclroabilityrscontroller/pageresult',

    //获取作业数据总和
    getAllWorkInfoData: apiHost+'/vstudentworkinfowithstudentcontroller/getallworkinfodata',

    //获取学校列表
    getSchoolList:apiHost + '/school/list',
    //增加学校
    postSchool:apiHost + '/school/add',
    //删除学校
    deleteSchool:apiHost + '/school/remove',
    //编辑学校
    putSchool:apiHost + '/school/edit',

    //验证码校验
    checkImageCode: apiHost+'/imagecode/checkImageCode',

    //创建验证码
    createImageCode:apiHost+'/imagecode/createImageCode',

    //选择学生学科
    selectByStudentId:apiHost+'/studentcontroller/selectByStudentId',

    //下载作业
    downloadHomeWord:apiHost+'/course/fileDownload',
    //shiro跳转
    shiroLogin:apiHost+'/shiro/login',

    //添加课堂测试
    addKnowledgeTest: apiHost + '/course/addKnowledgeTest',

    //根据课堂 Id 和学生 Id 获取课堂测试的结果
    getTestResults: apiHost + '/studentTestRelation/getTestByClassroomAndStudent',

    //根据测试 Id 来获取学生测试的详细信息

    getTestDetail: apiHost + '/studentTestRelation/getTestDetail',

    //获取学生的能力掌握图

    studentAKTree: apiHost + '/knowledge/studentAKTree',
    // 课程能力点对应的知识点树形图获取数据
    courseAKTree:apiHost + '/knowledge/courseAKTree',
    // 点击树形图知识点获取题目信息
    findByCourseIdAndKnowledgeId:apiHost + '/knowledgetest/findByCourseIdAndKnowledgeId',

    // 课程添加随堂作业
    postKnowledgeTest: apiHost + '/knowledgetest/add',
    // 查看课程随堂作业
    getKnowledgeTestList: apiHost + '/knowledgetest/list',
    // 删除课程随堂作业
    delectKnowledgeTest: apiHost + '/knowledgetest/delect',
    // 编辑课程随堂作业
    editKnowledgeTest: apiHost + '/knowledgetest/edit',

    // 课堂获取随堂作业信息
    findClassroomWorkInfo:apiHost + '/knowledgetest/findClassInfo',
    // 发布随堂作业
    layoutClassWork: apiHost + '/classroomTestRelation/updateToOne',
    // 结束随堂作业
    rollBack: apiHost + '/classroomTestRelation/rollback',
    // 撤销随堂测试
    revokeClassTest : apiHost + '/studentTestRelation/revokeClassTest',
    // 随堂作业饼图展示
    getPieNums : apiHost + '/studentTestRelation/getPieNums',

}

export {
    API
}
