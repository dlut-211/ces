<template>
    <div>
        
    <Tabs v-model="tabIndex">
        <TabPane label="课堂信息">
            <div class="courseInfo">
                <div class="classTitle">
                    <Row>
                        <Col span="2" style="text-align:right;">课堂名称：</Col>
                        <Col span="20">{{classRoomData.Name}}</Col>
                        <Col v-if="classRoomData.Status == 1" span="2" style="background-color:red;text-align:center;color:white;">{{classRoomData.StatusName}}</Col>
                        <Col v-if="classRoomData.Status == 2" span="2" style="background-color:green;text-align:center;color:white;">{{classRoomData.StatusName}}</Col>
                        <Col v-if="classRoomData.Status == 4" span="2" style="background-color:orange;text-align:center;color:white;">{{classRoomData.StatusName}}</Col>
                    </Row>
                    <Row>
                        <Col span="2" style="text-align:right;">课堂学期：</Col>
                        <Col span="22">{{classRoomData.TermTypeName}}</Col>
                    </Row>
                    <Row>
                        <Col span="2" style="text-align:right;">上课日期：</Col>
                        <Col span="22">{{classRoomData.DateFormat}}</Col>
                    </Row>
                    <Row>
                        <Col span="2" style="text-align:right;">课程信息：</Col>
                        <Col span="22">{{classRoomData.CourseName}} ({{classRoomData.CourseCode}})</Col>
                    </Row>
                     <Row>
                        <Col span="2" style="text-align:right;">作业权重：</Col>
                        <Col span="22">{{classRoomData.dailyPerformanceWeight*100}}%</Col>
                    </Row>
                    <Row>
                         <Col span="2" style="text-align:right;">考试权重：</Col>
                        <Col span="22">{{classRoomData.TestPerformaceWeight*100}}%</Col>
                    </Row>
                    <Row v-if="classRoomData.CourseSyllabusPath">
                        <Col span="2" style="text-align:right;">教学大纲：</Col>
                        <Col span="22"><a :href="classRoomData.CourseSyllabusPath" :download="classRoomData.CourseSyllabusPath" target="blank">查看</a></Col>
                    </Row>
                    <Row>
                        <Col span="2" style="text-align:right;">课程简介：</Col>
                    </Row>
                </div>
                <div class="describe"><p>{{classRoomData.CourseDescribe}}</p></div>
            </div>
        </TabPane>
        <TabPane label="课程章节">
            <div>
                <Table height="500" :columns="chapterColumn" :data="chapterData"></Table>
            </div>
        </TabPane>
        <TabPane label="学生">
            <div>
                <selectModule :object="studentSelectModule" @submit="studentFind"></selectModule>
                <tableModule :object="studentTableModule" @changePage="studentChangePage" @changeSize="studentChangeSize" @importStudent="importStudent()"></tableModule>
            </div>
        </TabPane>
        <TabPane label="作业">
            <div>
                <Row>
                    <Col span="6">
                        <Table height="500" highlight-row :columns="mainChpterColumn" :data="mainChapters" @on-current-change=selectChapter></Table>
                    </Col>
                    <Col span="18">
                        <Table height="500" :columns="workColumn" :data="workList"></Table>
                    </Col>
                </Row>
            </div>
        </TabPane>
        <TabPane label="试卷"  v-if="classRoomData.status != 1">
            <div>
                <tableModule :object="testPaperTableModule" @changePage="testPaperChangePage" @changeSize="testPaperChangeSize" @addTestPaper="addTestPaperAction"></tableModule>
            </div>
        </TabPane>
    </Tabs>
    <Modal
          v-model="ShowEndTime"
          title="请选择截止时间"
		  width="800px"
		  :mask-closable="false" style="position:fixed;z-index:99999">
            <DatePicker type="datetime" v-model="EndTime" placeholder="选择日期" :rules="rules" style="width: 200px"></DatePicker>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="ShowEndTime=false">取消</Button>
            <Button type="primary" size="large" @click="layoutWorkAction(LocalClassRoomWorkId)">确定</Button>
        </div>
      </Modal>
    </div>
</template>
<script>
    // 引入查询模块组件
    import selectModule from "@/components/selectModule/selectModule.vue";
    // 引入表格模块组件
    import tableModule from "@/components/tableModule/tableModule.vue";
    // 引入查询模块配置项
    import {ClassRoomStudentSelectModuleJS} from "./ClassRoomStudentSelectModuleJS.js";
    // 引入表格模块配置项
    import {ClassRoomStudentTableModuleJS} from "./ClassRoomStudentTableModuleJS.js";
    // 引入表格模块配置项
    import {TestPaperTableModuleJS} from "./TestPaperTableModuleJS.js";
    // 引入API
    import * as Http from "@/api/HttpService.js";
    import {
        API
    } from "@/api/HttpConfig";
    export default {
        data: function() {
            return {
                tabIndex: 0,
                classRoomData:{
                    Id: null,
                    Name: "",
                    CourseId: null,
                    CourseCode: "",
                    CourseName: "",
                    Status: null,
                    StatusName: "",
                    TermType: null,
                    TermTypeName: "",
                    DateFormat: "",
                    CourseDescribe: "",
                    CourseSyllabusPath: "",
                    dailyPerformanceWeight:null,//添加权重
                    TestPerformaceWeight:null
                },
                ShowEndTime:false,
                //截止时间
                EndTime:"",
                LocalClassRoomWorkId:null,
                // 课程章节
                //检测Endtime是否为空
                rules:{
                    EndTime:[
                        {required: true, message: "截止时间不能为空"}
                    ]
                },
                chapterColumn:[
                    { 
                        title: "章节", 
                        key: "name",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            fontWeight: params.row.chapterLevel == 1 ? 'bold': 'normal',
                                            paddingLeft:this.paddingValue(params.row.chapterLevel)
                                        }
                                    },
                                    params.row.name
                                )
                            ]);
                        }
                    },
                    { title: "描述", key: "Describe" }
                ],
                chapterData:[],
                // 学生
                studentSelectModule: (ClassRoomStudentSelectModuleJS.bind(this))(),
                studentTableModule: (ClassRoomStudentTableModuleJS.bind(this))(),
                studentNowPage: 1,
                studentPageSize: 10,
                findClassRoomStudentForm:{
                    StudentNumber:"",
                    StudentName:"",
                    StudentSchool:"",
                    StudentClassName:""
                },
                // 作业
                theme3: 'dark',
                mainChapters:[],
                chooseChapter:false,
                chooseChapterId:null,
                // 主章节
                mainChpterColumn:[
                    { 
                        title: "主章节", 
                        key: "name",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            fontSize:'14px',
                                            fontWeight: params.row.chapterLevel == 1 ? 'bold': 'normal',
                                            paddingLeft:this.paddingValue(params.row.chapterLevel)
                                        }
                                    },
                                    params.row.name
                                )
                            ]);
                        }
                    }
                ],
                // 作业
                workColumn:[
                    { 
                        title: "作业名称", 
                        key: "workName",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            color: (params.row.status == 1) ? "#495060" :"#2d8cf0",
                                            cursor: (params.row.status == 1) ?  'auto' : "pointer",
                                            margin: "0 5px",
                                        },
                                        on: {
                                            click: () => {
                                                if(params.row.status == 2){
                                                    this.openStudentWorkDetailAction(params.row);
                                                }
                                            }
                                        }
                                    },
                                    params.row.workName
                                )
                            ]);
                        }
                    },
                    { title: "描述", key: "description" },
                    { title: "状态", key: "status" ,field:'right',width:80,
                        render:(h, params)=>{
                            if(params.row.status == 1){
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style:{
                                                color:"#d50000"
                                            }
                                        },
                                        "未布置"
                                    )
                                ]);                                
                            } else if(params.row.status == 2) {
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style:{
                                                color:"#04B404"
                                            }
                                        },
                                        "已布置"
                                    )
                                ]);                                
                            }
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        field:'right',
                        width: 140,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            color: "#04B404",
                                            cursor: "pointer",
                                            margin: "0 5px",
                                            display: (params.row.status == 1) ?"inline":"none"
                                        },
                                        on: {
                                            click: () => {
                                                this.LocalClassRoomWorkId=params.row.id
                                                this.ShowEndTime=true;
                                            }
                                        }
                                    },
                                    "布置作业"
                                ),
                                h(
                                    "span",
                                    {
                                        style: {
                                            color: "#FF8000",
                                            cursor: "pointer",
                                            margin: "0 5px",
                                            display: (params.row.status == 2) ?"inline":"none"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.confirm({
                                                    title: "<span style='color:red'><b>提示</b></span>",
                                                    content: "<span style='color:red'><b>撤销布置作业会清空所有学生作业情况</b></span><br/>确定要撤销布置作业《"+ params.row.workName +"》吗？",
                                                    onOk: () => {
                                                        this.revokeLayoutWorkAction(params.row.id);
                                                    },
                                                    onCancel: () => {
                                                    }
                                                }) 
                                            }
                                        }
                                    },
                                    "撤销布置作业"
                                )
                            ]);
                        }
                    }
                ],
                workList:[],
                // 试卷
                testPaperTableModule: (TestPaperTableModuleJS.bind(this))(),
                testPaperNowPage: 1,
                testPaperPageSize: 10,
                // 课程知识点
                courseKnowledgeList:[]
            };
        },
        components: {
            selectModule: selectModule,
            tableModule: tableModule
        },
        mounted: function() {
        },
        methods: {
            infoInit :function(form){
                this.tabIndex = 0;
                this.classRoomData = form;
                this.getCourseChapter();
                this.studentNowPage = 1;
                this.studentPageSize = 10;
                this.getClassRoomStudentList();
                this.getMainChaperts();
                if(this.classRoomData.Status != 1){
                    this.getTestPaperList();
                }
                this.getCourseKnowledgeList();
            },
            // 课程章节====================================================
            // 获取课程章节
            getCourseChapter:function(){
                this.chapterData = [];
                var params = {
                    id : this.classRoomData.CourseId
                };
                Http.getChapterCourse(params).then(res => {
                    if(res.statusCode==1){
                        this.chapterData = res.data;
                    }
                });
            },
            // 学生=======================================================
            // 查询方法
            studentFind: function(a) {
                this.findClassRoomStudentForm.StudentNumber = a.StudentNumber ?
                    a.StudentNumber : "";
                this.findClassRoomStudentForm.StudentName = a.StudentName ?
                    a.StudentName : "";
                this.findClassRoomStudentForm.StudentSchool = a.StudentSchool ?
                    a.StudentSchool : "";
                this.findClassRoomStudentForm.StudentClassName = a.StudentClassName ?
                    a.StudentClassName : "";
                this.getClassRoomStudentList();
            },
            // 改变页码
            studentChangePage:function(page){
                this.studentNowPage = page;
                this.getClassRoomStudentList();
            },
            // 改变每页显示的条数
            studentChangeSize: function(size) {
                this.studentPageSize = size;
                this.getClassRoomStudentList();
            },
            // 查询课堂学员
            getClassRoomStudentList: function() {
                var params = {
                    page: this.studentNowPage,
                    limit: this.studentPageSize,
                    ClassRoomId: this.classRoomData.Id,
                    StudentNumber: this.findClassRoomStudentForm.StudentNumber,
                    StudentName: this.findClassRoomStudentForm.StudentName,
                    StudentSchool: this.findClassRoomStudentForm.StudentSchool,
                    StudentClassName: this.findClassRoomStudentForm.StudentClassName
                };
                Http.getClassRoomStudentList(params).then(res => {
                    if(res.statusCode==1){
                        this.studentTableModule.tableContent = res.data;
                        this.studentTableModule.count = res.data.total;
                    }
                });
            },
            // 删除课堂学员
            deleteClassRoomStudentAction:function(id){
                var params = {
                    id:id
                }
                Http.deleteClassRoomStudent(params).then(res=>{
                    if(res.statusCode==1){
                        this.$Message.success("删除成功");
                        this.getClassRoomStudentList();
                    }
                    else{
                        this.$Message.error(res.message);
                    }
                })
            },
            importStudent:function(){
                this.$emit("importStudent",this.classRoomData.Id)
            },
            // 作业=============================================================
            // 获取课程主章节（作业用）
            getMainChaperts:function(){
                this.chooseChapter = false;
                this.mainChapters = [];
                this.workList = [];
                var params = {
                    id : this.classRoomData.CourseId
                };
                Http.getChapterCourse(params).then(res => {
                    if(res.statusCode==1){
                        this.mainChapters = res.data;
                    }
                });
            },
            selectChapter:function(now,old){
                if(now.parentId){
                    this.chooseChapter = true;
                    this.chooseChapterId = now.id;   
                    this.getWorkByChapter();     
                }           
            },
            getWorkByChapter:function(){
                var params = {
                    classroomId: this.classRoomData.Id,
                    chapterId : this.chooseChapterId
                };
                Http.getClassRoomWorkChapterList(params).then(res => {
                    if(res.statusCode==1){
                        this.workList = res.data;
                    }
                });
            },
    //日期格式化
formatDate:function(date, fmt) {
    var o = { 
        "M+" : date.getMonth()+1,                 //月份 
        "d+" : date.getDate(),                    //日 
        "h+" : date.getHours(),                   //小时 
        "m+" : date.getMinutes(),                 //分 
        "s+" : date.getSeconds(),                 //秒 
        "q+" : Math.floor((date.getMonth()+3)/3), //季度 
        "S"  : date.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
},            
            layoutWorkAction:function(id){
                
                var params = {
                    userId:this.$store.state.id,
                    classroomWorkId: id,
                    endTime:this.formatDate(this.EndTime,'yy/MM/dd hh:mm:ss')
                };
                Http.layoutClassRoomWork(params).then(res =>{
                    if(res.statusCode == 1){
                        this.$Message.success(res.message);
                        this.getWorkByChapter();
                        this.EndTime="";
                        this.ShowEndTime=false;
                    }else{
                        this.$Message.error(res.message);
                    }
                    
                });
            },
            revokeLayoutWorkAction:function(id){
                var params = {
                    classroomWorkId: id,
                    userId:this.$store.state.id
                };
                Http.revokeLayoutClassRoomWork(params).then(res =>{
                    if(res.statusCode == 1){
                        this.$Message.success(res.message);
                        this.getWorkByChapter();
                    }else{
                        this.$Message.error(res.message);
                    }
                    
                });
            },
            openStudentWorkDetailAction:function(row){
                this.$emit("openWorkDetail",row)
            },
            // 试卷======================================================================
            // 改变页码
            testPaperChangePage:function(page){
                this.testPaperNowPage = page;
                this.getTestPaperList();
            },
            // 改变每页显示的条数
            testPaperChangeSize: function(size) {
                this.testPaperPageSize = size;
                this.getTestPaperList();
            },
            // 查询试卷
            getTestPaperList: function() {
                var params = {
                    page: this.testPaperNowPage,
                    pageSize: this.testPaperPageSize,
                    classroomId: this.classRoomData.Id
                };
                Http.getTestPaperList(params).then(res => {
                    if(res.statusCode==1){
                        this.testPaperTableModule.tableContent = res.data.content;
                        this.testPaperTableModule.count = res.data.numberOfElements;
                    }
                });
            },
            addTestPaperAction:function(){
                this.$emit("addTestPaper",this.classRoomData.Id,this.courseKnowledgeList);
            },
            // 删除试卷
            deleteTestPaperAction:function(id){
                var params = {
                    testPaperId:id
                }
                Http.deleteTestPaper(params).then(res=>{
                    if(res.statusCode==1){
                        this.$Message.success("删除成功");
                        this.getTestPaperList();
                    }
                    else{
                        this.$Message.error(res.message);
                    }
                })
            },
            // 修改试卷状态
            editTestPaperStatusAction:function(id,status){
                var params = {
                    id:id,
                    status:status
                }
                Http.editTestPaperStatus(params).then(res=>{
                    if(res.statusCode==1){
                        this.getTestPaperList();
                        this.$Message.success(res.message);
                    }
                    else{
                        this.$Message.error(res.message);
                    }
                })
            },
            // 撤销试卷
            editTestPaperStatusAction1:function(id,status){
                var params = {
                    id:id,
                    status:status
                }
                Http.editTestPaperStatus1(params).then(res=>{
                    if(res.statusCode==1){
                        this.getTestPaperList();
                        this.$Message.success(res.message);
                    }
                    else{
                        this.$Message.error(res.message);
                    }
                })
            },
            // 获取课程知识点列表
            getCourseKnowledgeList:function(){
                this.courseKnowledgeList = [];
                var params = {
                    courseId : this.classRoomData.CourseId
                };
                Http.getKnowledgeAllList(params).then(res => {
                    if(res.StatusCode==1){
                        this.courseKnowledgeList = res.Data.List;
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "./classRoomInfo.scss";
</style>
<style lang="scss">
    .ivu-table td.status-column-orange{
        background-color: #FF8C00;
        color: #fff;
        font-weight:bold;
    }
    .ivu-table td.status-column-green{
        background-color: green;
        color: #fff;
        font-weight:bold;
    }
    .ivu-table td.status-column-red{
        background-color: red;
        color: #fff;
        font-weight:bold;
    }
    .ivu-table td.status-column-blue{
        background-color: #00B2EE;
        color: #fff;
        font-weight:bold;
    }
    .ivu-table td.status-column-gray{
        background-color: gray;
        color: #fff;
        font-weight:bold;
    }
</style>