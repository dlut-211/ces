
<template>
  <div class="StudentWorkPage">
    
    
     <!-- 获取章节作业 -->
      <Modal
          v-model="ShowWorkList"
          title="章节作业"
		  width="800px"
		  :mask-closable="false" style="position:fixed;z-index:99999">
        <Table height="500" :columns="workColumn" :data="workList"></Table>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="ShowWorkList=false">取消</Button>
            <Button type="primary" size="large" @click="ShowWorkList=false">确定</Button>
        </div>
      </Modal>
      <!-- 显示完全描述内容 -->
      <Modal
          v-model="hided"
		  width="500px"
		  :mask-closable="false"
      style="position:fixed;z-index:99999"
      >
      <p style="font-size:15px">{{Describe}}</p>
      <div slot="footer"></div>
</Modal>
       <!-- 上传作业 -->
       <Modal
          v-model="SubmitWork"
          title="上传作业（仅支持上传:war、zip、rar类型的文件）"
		  width="800px"
		  :mask-closable="false"
      style="position:fixed;z-index:99999"
      >
        <Form :model="SubmitWorkForm" label-position="left" :label-width="100"  >
		  <Row>
          <Col span="12">
					<FormItem label="作业" class="forms" prop="WorkPath">
						<Upload :action="uploadFile" :headers="{Authorization:$store.state.token}" style="float: left; margin-right: 20px;" :show-upload-list="false" :on-success="handleAddSyllabusSuccess" :on-format-error="handleFormatError">
              <Button type="ghost" icon="ios-cloud-upload-outline">点击上传文件</Button>
            </Upload>
            <div v-if="SubmitWorkForm.WorkPath">
              <a :href="SubmitWorkForm.WorkPath" target="blank">{{SubmitWorkForm.Syllabus}}</a>
            </div>
					</FormItem>
          </Col>
          
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="SubmitWork=false">取消</Button>
            <Button v-if="SubmitWorkForm.WorkPath" type="primary" size="large" @click="SubmitWorkAction()">确定</Button>
            <Button v-if="!SubmitWorkForm.WorkPath" type="primary" disabled size="large" @click="SubmitWorkAction()">确定</Button>
        </div>
      </Modal>
    <!-- <div style="text-align:right">
        <Button type="primary" style="height:30px;" size="large" @click="getEchartsTestPaper()">饼图</Button>
        <Button type="primary" style="height:30px;" size="large" @click="huanbiDia(FatherClassRoomId)">环比图</Button>
        <Button type="primary" style="height:30px;" size="large" @click="leidaDia(FatherClassRoomId)">雷达图</Button>
    </div> -->
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addStudentWork="addStudentWork=true;$refs['addStudentWorkForm'].resetFields();"></tableModule>
   <Modal
          v-model="huanbi"
          title="课程环比图"
		  width="800px"
		  :mask-closable="false" style="position:fixed;z-index:99999">
  <div id="echarts1" :style="{width: '750px', height: '500px'}"></div>
   <div slot="footer"></div>
   </Modal>
    <Modal
          v-model="leida"
          title="雷达图"
		  width="800px"
		  :mask-closable="false" style="position:fixed;z-index:99999">
  <div id="echarts2" :style="{width: '1000px', height: '500px'}"></div>
   <div slot="footer"></div>
    </Modal>
     <Modal
          v-model="bingtu"
          title="饼图"
		  width="800px"
		  :mask-closable="false" style="position:fixed;z-index:99999">
      <div id="EchartsTestPaper" style="width: 600px;height:400px;"></div>
      <div slot="footer"></div>
      </Modal>
    
  </div> 
  
</template>
<script>



import echarts from 'echarts'
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import {StudentWorkSelectModuleJS} from "./StudentWorkSelectModuleJS.js";
// 引入表格模块配置项
import {StudentWorkTableModuleJS} from "./StudentWorkTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
import { API } from "@/api/HttpConfig";
export default {
  //name:"StudentWorkChild",
  props: ["FatherClassRoomId"],
   computed: {
      uploadFile: function() {
        return API.uploadFile+'?filesname=Syllabus';
      }
      },
  data: function() {
    return {
      classroomId:null,
      selectModule: (StudentWorkSelectModuleJS.bind(this))(),
      tableModule: (StudentWorkTableModuleJS.bind(this))(),
      addStudentWork:false,
      addStudentWorkForm:{
        ClassRoomStudentId:"",
        Score:"",
        WorkMessage:"",
        ClassRoomWorkId:""
      },
      isHide:true,
      huanbi:false,
      bingtu:false,
      leida:false,
       StudentWorkCount:"",
      ClassRoomWorkCount:"",
      workList:[],
      findWorkList:{
        studentId: null,
        chapterId : null,
        classroomId:null,  
      },
      Describe:"",
      hided:false,
       SubmitWorkForm: 
      {
        StudentWorkScore:null,
        CasePassCount:"",
        CodeRowNumber:"",
        Cpmplexity: "",
       Syllabus:"",
       WorkPath:"",
       SubmitTime:"",
       UseTime:"",
       studentWorkId:'',
      },
          editStudentWorkForm:{
        Id:"",
        ClassRoomStudentId:"",
        ClassRoomWorkId:"",
        Score:"",
        WorkMessage:"",
        VersionNumber:""
      },
      ShowWorkList:false,
      SubmitWork:false,
	  editStudentWork:false,
      editStudentWorkForm:{
			Id:null,
        ClassRoomStudentId:"",
        Score:"",
        WorkMessage:"",
        ClassRoomWorkId:"",
			VersionNumber: null
      },
	  nowPage: 1,
      pageSize: 10,
	  findStudentWorkForm:{
        ClassRoomStudentId:"",
        Score:"",
        WorkMessage:"",
        ClassRoomWorkId:""
      },
       workColumn:[
                    { 
                        title: "作业名称", 
                        key: "workName",
                    },
                    { title: "描述", key: "description",
                      render:(h,params)=>{
                        if(this.isHide==true){
                          return h('div',[
                            h(
                              "p",
                              {
                               class:'summary',
                               on:{
                                 click:()=>{
                                   this.hided=true;
                                   this.Describe=params.row.Description
                                   console.log("turetruetrue")
                                 }
                               }
                              },
                              params.row.Description
                            )
                          ])
                        }
                      }
                    },
                    {title:"发布时间",key:"layoutTime",
                      render:(h,params)=>{
                        return h("div",this.dateFormatFinal(params.row.layoutTime))
                      }},
                    {title:"截止时间",key:"endTime",
                      render:(h,params)=>{
                        return h("div",this.dateFormatFinal(params.row.endTime))
                      }},

                    { title: "成绩", key: "score" ,field:'right',width:100,
                     render: (h, params) => {
                       var mydate=new Date();
                       //console.log("mydate"+mydate)
                       
                   
                       if(params.row.isSubmit==0){
                         return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        color: "red",
                                        margin: "0 5px"
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                "未提交"
                            )
                        ]);
                       }
                      if(params.row.isScored==0){
                         return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        color: "#808080",
                                        margin: "0 5px"
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                "未评分"
                            )
                        ]);
                       }
                       else{
                         return h("div", [
                            h(
                                "span",
                                {
                          
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                params.row.score
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
                          if(params.row.status!=4){
                          var mydate=new Date()
                          if(this.dateFormatFinal(mydate)>=this.dateFormatFinal(params.row.endTime)){
                         return h("div",[
                           h(
                              "span",
                              {
                                  style: {
                                        color: "#808080",
                                        margin: "0 5px"
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                "已过期"
                           )
                         ])
                       }
                       else{
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            color: "#04B404",
                                            cursor: "pointer",
                                            margin: "0 5px",
                                            // display: (params.row.Status == 1) ?"inline":"none"
                                        },
                                        on: {
                                            click: () => {
                                              this.editStudentWorkForm={
                                                Id:params.row.studentWorkId, 
                                              ClassRoomStudentId:"",
                                               ClassRoomWorkId:"",
                                              Score:"",
                                              WorkMessage:"",
                                              VersionNumber:""
                                              };
                                              this.layouttime=params.row.layoutTime;
                                               this.SubmitWorkForm={
                                                 
                                                 StudentWorkScore:"",
                                                     CasePassCount:"",
                                                     CodeRowNumber:"",
                                                     Cpmplexity: "",
                                                     Syllabus:"",
                                                     WorkPath:"",
                                                     SubmitTime:"",
                                                     UseTime:"",
                                                   studentWorkId:params.row.studentWorkId,

                                               }
                                                this.SubmitWork=true;
                                               //this.SubmitWorkAction();
                                            }
                                        }
                                    },
                                    "上传作业"
                                ),
                               
                            ]);
                       }
                        }
                        else{
                          return h("div",[
                            h(
                              "span",
                              {
                                style:{
                                        color: "#808080",
                                        margin: "0 5px"
                                },
                              },
                              "已结课"
                            )
                          ])
                        }
                        }
                    },
                    { 
                        title: "下载作业", 
                        key: "workPath",
                        align: "center",
                        field:'right',
                        width: 140,
                        render: (h, params) => {
                          if(params.row.workPath==null){
                            return h("div",
                              {
                                style:{
                                        color: "#808080",
                                        margin: "0 5px"
                                },
                              },
                              "下载附件" 
                            )
                          }
                          else{
                            return h("A",
                              {
                                attrs:{
                                  href:params.row.workPath
                                },
                                style:{
                                        color: "#04B404",
                                        cursor: "pointer",
                                        margin: "0 5px"
                                },
                                // on:{
                                //   click:()=>{

                                //   }
                                // }
                            
                              },
                              "下载附件" 
                            )
                          }
                        }
                    },
                ],
	 
    };
  },
  mounted:function(){
	// this.$store.commit("changeBreadCrumb", [
  //     "首页",
  //     "",
  //     "学生作业管理"
  //   ]);
  //   this.$store.commit("changeOpenName", [""]);
  //   this.$store.commit("changeActiveName", "NetGraphPage");
    this.getchapterWorkList();
    //this.getClassRoomWork();
    //this.getStudentWorkCount();
    
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
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
//提交作业
 SubmitWorkAction:function(){
   
   console.log("我在这里"+this.Score)
     this.SubmitWorkForm.SubmitTime=this.formatDate(new Date(),"yyyy/MM/dd hh:mm:ss");
    var submitTime=new Date().getTime();
    var laytime=new Date(this.layouttime).getTime();
     this.SubmitWorkForm.UseTime=parseInt((submitTime-laytime)/1000);
      var params={
        createdBy:this.$store.state.id,
        casePassCount:"",
        lineOfCode:"",
        cpmplexity: "",
        workPath: this.SubmitWorkForm.WorkPath,
        submitTime: this.SubmitWorkForm.SubmitTime,
        useTime:this.SubmitWorkForm.UseTime,
        studentWorkId:this.SubmitWorkForm.studentWorkId,
        modifiedBy:this.$store.state.id,
        modifiedOn:this.SubmitWorkForm.SubmitTime,
      }
      console.log(" Submittime"+params.submitTime)
    console.log("秒数："+this.SubmitWorkForm.UseTime);
    Http.postStudentWorkDetail(params).then(res=>{
      if(res.statusCode==1){
        
      this. SubmitWorkForm=
      {
        StudentWorkScore:"",
        CasePassCount:"",
        CodeRowNumber:"",
        Cpmplexity: "",
       Syllabus:"",
       WorkPath:"",
       SubmitTime:"",
       UseTime:"",
       studentWorkId:'',
      }
      this.SubmitWork=false;
      this.$Message.success(res.message);
      this.getWorkByChapter();
      this.getchapterWorkList(this.findWorkList.ClassRoomId);
      this.getClassRoomWork(this.findWorkList.ClassRoomId);
    this.getStudentWorkCount(this.findWorkList.ClassRoomId);
     // 
      }
    })
    
  
   
  },

    //获取章节作业
    getWorkByChapter:function(){
                var params = this.findWorkList;
                Http.getWorkByChapter(params).then(res => {
                    if(res.statusCode==1){
                        
                        //this.TestScore=res.Data.List[0].Score;
                        this.workList = res.data.content;
                        
                    }
                });
                
            },

             handleAddSyllabusSuccess: async function(res, file) {
        if (res.statusCode == 1) {
          this.$Message.success("上传成功");
          this.SubmitWorkForm.WorkPath = res.data.path;
          this.SubmitWorkForm.Syllabus = res.data.fileName;   
        }
        else{
            this.$Message.error("请选择指定类型的文件上传")
          }
    },
    // 编辑上传成功钩子 异步方法
    handleEditSyllabusSuccess: async function(res, file) {
        console.log(res)
        if (res.StatusCode == 1) {
          this.editCourseForm.WorkPath = res.data;
          this.editCourseForm.Syllabus = res.fileName;
          console.log(this.editCourseForm)
        }
    },
    // 文件格式验证失败钩子
    handleFormatError: function(res, file) {
        console.log(res)
        this.$Message.error("文件格式不正确");
    },
    
	//   添加货源表单验证方法
    addStudentWorkHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addStudentWorkAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editStudentWorkHandleSubmit: async function(name) {
      var result = await this.$refs.editStudentWorkForm.validate(valid => {});
      if (result) {
        // console.log(this);
        this.editStudentWorkAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      // console.log(a);
      this.findStudentWorkForm.ClassRoomId = a.ClassRoomId ?
        a.ClassRoomId : "2";
	  this.getchapterWorkList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getchapterWorkList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getchapterWorkList();
    },
    // 添加学生作业
    addStudentWorkAction: function() {
      var params = this.addStudentWorkForm;
      Http.postStudentWork(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addStudentWorkForm = {
            ClassRoomId:"2",
          };
		  this.addStudentWork = false;
		  this.$refs["addStudentWorkForm"].resetFields();
          this.getchapterWorkList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 查询学生作业s
    getchapterWorkList: function() {
      // if(e!=null){
      //   this.nowPage=1;
      //   this.classroomId=e;
      // }
      var params = {
        nowPage: this.nowPage,
        pageSize: this.pageSize,
        classroomId: this.$store.state.classroomId,
        studentId:this.$store.state.id
      };
      Http.getchapterWorkList(params).then(res => {
        console.log(res)
        if(res.statusCode==1){
          // this.classroomId=params.classroomId;
          this.tableModule.tableContent = res.data.content;
            this.tableModule.count = res.data.totalRecode;
        }
      });
    },
 
 huanbiDia:function(e){
this.bingtu=false;
this.leida=false;
this.huanbi=true;

 let myChart1 = this.$echarts.init(document.getElementById('echarts1'));
   // 绘制图表
    var params = {
        page: this.nowPage,
        limit: this.pageSize,
        ClassRoomId: e,
        StudentId:this.$store.state.id
      };
    Http.getknowledgeScoreList(params).then(res => {
        console.log(res)
        if(res.StatusCode==1){
        myChart1.setOption({
          title: {
            text: '环比图',
            subtext: 'JAVA程序设计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['测试111','平均值']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: res.Data.KnowledgeName,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 分'
            }
          },
          series: [
            {
              name:'测试111',
              type:'line',
              data:res.Data.Score,
            },
            {
              name:'平均值',
              type:'line',
              data:res.Data.AvgScore,
              markPoint: {
                data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              },
            }
          ]
        });
        }
    });
 },
 leidaDia:function(e){
   this.leida=true;
       let myChart2 = this.$echarts.init(document.getElementById('echarts2'));

   var params = {
        page: this.nowPage,
        limit: this.pageSize,
        ClassRoomId: e,
        StudentId:this.$store.state.id
      };
      Http.getabilityScoreList(params).then(res => {
        console.log(res)
        if(res.StatusCode==1){
          myChart2.setOption({
            title: {
                text: '雷达图'
            },
            tooltip: {},
            legend: {
              data: ['个人', '平均']
            },
            radar: {
              // shape: 'circle',
              name: {
                  textStyle: {
                      color: '#fff',
                      backgroundColor: '#999',
                      borderRadius: 3,
                      padding: [3, 5]
                }
              },
              indicator: [
                { name: '能力点A', max: 100},
                { name: '能力点B', max: 100},
                { name: '能力点C', max: 100},
                { name: '能力点D', max: 100},
                { name: '能力点E', max: 100},
                { name: '能力点F', max: 100}
              ]
            },
            series: [{
              name: '个人 vs 平均',
              type: 'radar',
              data : [
                  {
                      value : res.Data.Score,
                      name : '个人'
                  },
                  {
                      value : res.Data.AvgScore,
                      name : '平均'
                  }
              ]
            }]
          })
        }
      });
 },
//获取学生完成的作业数量
  getStudentWorkCount:function(e){
      var params={
       StudentId: this.$store.state.id,        
       ClassRoomId:e
      }
      Http.getStudentCompletedWork(params).then(res=>{
        if(res.StatusCode==1){
          this.StudentWorkCount=res.Data.StudentCompletedCount;
         
        }
      })
    },
    //获取课堂作业总数
     getClassRoomWork:function(e){
      var params={
        ClassRoomId:e
      }
      Http.getClassRoomWork(params).then(res=>{
        if(res.StatusCode==1){
          this.ClassRoomWorkCount=res.Data.Total; 
        }
      })
    },
      getEchartsTestPaper:function(){
      this.bingtu=true;
     
      let barTestPaper = this.$echarts.init(document.getElementById('EchartsTestPaper'));
      barTestPaper.setOption({
title: {
        text: '课程作业完成进度图',
        left: 'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    color:['#1b5e20','#e53935'],
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['已完成','未完成'],
    },
    series : [
        {
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:[
                {value:this.StudentWorkCount, name: '已完成'},
                {value:(this.ClassRoomWorkCount-this.StudentWorkCount), name: '未完成'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]

      })
    },
}
};
</script>
<style>
.summary {
    overflow: hidden;    /* 隐藏溢出内容 */
    text-overflow: clip;    /* 修剪文本 */
    display: -webkit-box;    /* 弹性布局 */
    -webkit-box-orient: vertical;    /* 从上向下垂直排列子元素 */
    -webkit-line-clamp: 3;    /* 限制文本仅显示前三行 */
    color: forestgreen;
    cursor: pointer;
}
.showBtn {
    width: 50%;
    height: 3rem;
    position: absolute;    /*相对父元素定位*/
    top: 3rem;    /* 刚好遮挡在最后两行 */
    left: 3rem;
    z-index: 0;    /* 正序堆叠，覆盖在p元素上方 */
    text-align: center;
    /* background: linear-gradient(rgba(233,236,239,.5), white);    背景色半透明到白色的渐变层 */
    /* background: black; */

    padding-top: 3rem;
}

</style>
