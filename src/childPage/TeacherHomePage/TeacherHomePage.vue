
<template>
  <div class="TeacherHomePage">
    <div>
    <h3>教师首页</h3>
        <!-- <ul>
          <li v-for="(item, index) in InviGilateInfo" :key="index" style="margin:0.5cm 0.5cm 0.5cm 0.5cm"> 
           
            监考科目《{{item.CourseName}}》| 监考教室：{{item.ClassRoom}} | 考试日期：{{dateFormatFinal(item.TestTime)}} | 待确认
          
          </li>
        </ul> -->
        <!-- <h4 style="color:red">待确认监考信息</h4>
        <Table stripe height="200"  :columns="columns1" :data="InviGilateInfo"></Table> -->
    </div>
    
    <!-- <div style="margin-top:20px">
      <h3>课程回顾</h3>
      <Table stripe height="200" :columns="ClassClosedColumns" :data="ClassClosedData"></Table>
    </div> -->

  </div>
</template>
<script>
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import {TeacherHomeSelectModuleJS} from "./TeacherHomeSelectModuleJS.js";
// 引入表格模块配置项
import {TeacherHomeTableModuleJS} from "./TeacherHomeTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      InviGilateInfo:[],
      columns1:[
        {
          title:'监考科目',
          key:'CourseName',
          align: "center",
        },
        {
          title:'教室',
          key:'ClassRoom',
          align: "center",
        },
        {
          title:'考试日期',
          key:'TestTime',
          align: "center",
          render: (h, params) => {
          return h("div", [this.dateFormat(params.row.TestTime)])
        }
        },
      ],
      //============课程回顾==============
      ClassClosedColumns: [
                    {
                        title: '课堂名称',
                        key: 'ClassName',
                        align: "center",
                    },
                    {
                        title: '作业完成率',
                        key: 'WorkCompletelyRate',
                        align: "center",
                    },
                    {
                        title: '作业平均分',
                        key: 'HomeworkAverageScore',
                        align: "center",
                    },
                    {
                        title: '考试平均分',
                        key: 'TextAverageScore',
                        align: "center",
                    },
                  
                ],
        ClassClosedData: [
                    {
                        ClassName: '高等数学',
                        WorkCompletelyRate: '90%',
                        HomeworkAverageScore: '85.2',
                        TextAverageScore: '91.5'
                    },
                    {
                        ClassName: '线性代数',
                        WorkCompletelyRate: '80%',
                        HomeworkAverageScore: '79.3',
                        TextAverageScore: '88.7'
                    },
                    {
                        ClassName: 'Java课程',
                        WorkCompletelyRate: '100%',
                        HomeworkAverageScore: '93.2',
                        TextAverageScore: '95.6'
                    },
                    {
                        ClassName: '数据结构',
                        WorkCompletelyRate: '60%',
                        HomeworkAverageScore: '64.5',
                        TextAverageScore: '59.8'
                    },
                ]
    };
  },
  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "",
      "课堂管理"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.OperDate()
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
    //获取教师未确认监考科目列表
    OperDate:function(){
      var mydate=new Date().getTime();
      console.log("mydate"+mydate);
      var tomorrowdate=mydate-3*24*60*60*1000;
      console.log("tomorrowdate"+tomorrowdate);
      var tomodate=this.dateFormatFinal(new Date(tomorrowdate));
      console.log("tomodate"+tomodate);
      var params={
        Aid:this.$store.state.id,
        nowtime:tomodate,
        page:1,
        limit:10
      }
      Http.getTeacherInvigilateByTime(params).then(res=>{
        if(res.StatusCode==1){
          this.InviGilateInfo=res.Data.List;
          this.TotalRecords=res.Data.Total;
        }
        else{
          this.$Message.error();
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./TeacherHomePage.scss";
</style>
