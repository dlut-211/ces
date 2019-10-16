
<template>
  <div class="ClassRoomStudentPage">
      <!-- <selectModule :object="selectModule" @submit="find"></selectModule> -->
          <!-- <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize"></tableModule> -->
          <Table :columns="courseColumns" :data="courseList"></Table>
          <div style="text-align:right;margin-top:5px">
                <Button v-if="nowPage==1" disabled type="primary" @click="lastPage()">上一页</Button>
                <Button v-if="nowPage!=1"  type="primary" @click="lastPage()">上一页</Button>
                当前页:{{nowPage}}/{{courseListPages}};共{{TotalList}}条
                <Button v-if="nowPage==courseListPages" disabled type="primary" @click="nextPage()">下一页</Button>
                <Button v-if="nowPage!=courseListPages"  type="primary" @click="nextPage()">下一页</Button>
          </div>
   <Modal
          v-model="ShowChapterWorkList"
          title="章节作业"
		  width="800px"
		  :mask-closable="false" >
      <StudentWorkPage :FatherClassRoomId="LocalClassRoomId" ref="ChildStudentWork"></StudentWorkPage>
      </Modal>
        
        <!-- <p v-for="(item, index) in DoingWorkInfo" :key="index">{{item.ChapterName}}中作业：{{item.WorkName}}待提交;截止日期：{{dateFormatFinal(item.EndTime)}}</p> -->
  </div>
</template>
<script>
//引入章节作业模块
import StudentWorkPage from "@/components/StudentWorkPage/StudentWorkPage.vue";

// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import {ClassRoomStudentSelectModuleJS} from "./ClassRoomStudentSelectModuleJS.js";
// 引入表格模块配置项
import {ClassRoomStudentTableModuleJS} from "./ClassRoomStudentTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      selectModule: (ClassRoomStudentSelectModuleJS.bind(this))(),
      tableModule: (ClassRoomStudentTableModuleJS.bind(this))(),
      addClassRoomStudent:false,
      addClassRoomStudentForm:{
        StudnetId:"",
        ClassRoomId:""
      },
            courseColumns:[
            { title: "课程编号", key: "Code", align: "center",
            render: (h, params) => {
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#2d8cf0",
                                cursor: "pointer",
                                margin: "0 5px"
                            },
                            on: {
                                click: () => {
                                this.LocalClassRoomId=params.row.ClassRoomId;
                                this.GetData()
                                }
                            }
                        },
                        params.row.Code
                    ),
                ]);
            }
            },
        {
          title:'课堂名称',
          key:'ClassRoomName',
          align:"center",
          render:(h,params)=>{
             return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#2d8cf0",
                                cursor: "pointer",
                                margin: "0 5px"
                            },
                            on: {
                                click: () => {
                                this.LocalClassRoomId=params.row.ClassRoomId;
                                this.GetData()
                                }
                            }
                        },
                        params.row.ClassRoomName
                    ),
                ]);
          }
        },
        {
          title:'学期',
          key:'TermTypeName',
          align:"center"
        },
        {
          title:'上课日期',
          key:'Begin_End',
          align:"center",
          render: (h, params) => {
                return h("div", [this.dateFormatFirst(params.row.BeginDate)]
                +"-"+[this.dateFormatFirst(params.row.EndDate)])
            }
        },
        {
          title:'课程状态',
          key:'StatusName',
          align:"center"
        }
      ],
      TotalList:null,
      maxPageSize:99999,
      courseList:[],
      courseListPages:null,
      TotalRecords:null,
      ShowChapterWorkList:false,
      LocalClassRoomId:null,
      StudentAbility:[],
      SubjectId:1, 
	  nowPage: 1,
    pageSize: 5,
	  findClassRoomStudentForm:{
        StudnetId:"",
        ClassRoomId:""
      },

    };
  },
  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "",
      "课堂学员管理"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getClassRoomStudentList();
   
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule,
    StudentWorkPage:StudentWorkPage
  },
  methods: {
    //上一页
    lastPage:function(){
      this.nowPage=this.nowPage-1; 
      this.getClassRoomStudentList();
    },
    //下一页
    nextPage:function(){
      this.nowPage=this.nowPage+1;
      this.getClassRoomStudentList()
    },
   
    //时间相加
    OperDate:function(){
      var mydate=new Date().getTime();
      console.log("mydate"+mydate);
      var tomorrowdate=mydate-3*24*60*60*1000;
      console.log("tomorrowdate"+tomorrowdate);
      var tomodate=this.dateFormatFinal(new Date(tomorrowdate));
      
      console.log("tomodate"+tomodate);
      var params={
        StudentId:this.$store.state.id,
        nowtime:tomodate,
        page:1,
        limit:10
      }
      Http.getStudentWorkByTime(params).then(res=>{
        if(res.StatusCode==1){
          this.DoingWorkInfo=res.Data.List;
          this.TotalRecords=res.Data.Total;
        }
        else{
          this.$Message.error();
        }
      })
    },
    //获取模态框数据
    GetData:function(){
      //this.getchapterWorkList();
    //this.getClassRoomWork();
    //this.getStudentWorkCount();
    this.ShowChapterWorkList=true
this.$refs.ChildStudentWork.getchapterWorkList(this.LocalClassRoomId);
this.$refs.ChildStudentWork.getClassRoomWork(this.LocalClassRoomId);
this.$refs.ChildStudentWork.getStudentWorkCount(this.LocalClassRoomId);
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getClassRoomStudentList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getClassRoomStudentList();
    },
    
    // 查询课堂学员
    getClassRoomStudentList: function() {
      var params = {
        page: this.nowPage,
        limit: this.maxPageSize,
        StudentId:parseInt(this.$store.state.id),
      };
      Http.getClassRoomStudentList(params).then(res => {
        if(res.StatusCode==1){
            this.courseList = res.Data.List;
            this.courseListPages =Math.ceil(res.Data.Total/this.pageSize);
            if(this.maxPageSize==99999){
               this.TotalList=res.Data.Total;
            }
            this.maxPageSize=this.pageSize;
            
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./ClassRoomStudentPage.scss";
</style>
