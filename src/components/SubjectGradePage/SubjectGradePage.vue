
<template>
  <div class="SubjectGradePage">
    
  
   
    
         <div id="EchartsSubjectAbility" style="width:600px;height:500px"> </div>
	
   

        <!-- <div id="EchartsSubjectAbility" style="height:500px"> </div> -->
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addSubjectGrade="addSubjectGrade=true;$refs['addSubjectGradeForm'].resetFields();"></tableModule>
     
  </div>
</template>
<script>
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import {SubjectGradeSelectModuleJS} from "./SubjectGradeSelectModuleJS.js";
// 引入表格模块配置项
import {SubjectGradeTableModuleJS} from "./SubjectGradeTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      SubjectId: 1,
      SubjectName:"",
      selectModule: (SubjectGradeSelectModuleJS.bind(this))(),
      tableModule: (SubjectGradeTableModuleJS.bind(this))(),
      addSubjectGrade:false,
      addSubjectGradeForm:{
        Describe:"",
        ChapterId:"",
        Name:""
      },
      abilityModalVisible:false,
	  editSubjectGrade:false,
      editSubjectGradeForm:{
			Id:null,
        Describe:"",
        ChapterId:"",
        Name:"",
			VersionNumber: null
      },
      StudentTestScoreModelList:[],
      StudentAbility:[],
	  nowPage: 1,
      pageSize: 10,
	  findSubjectGradeForm:{
        Describe:"",
        ChapterId:"",
        Name:""
      },
	  rules: {
        Describe: [
          { required: true, message: "作业描述不能为空", trigger: "blur" }
        ],
        ChapterId: [
          { required: true, message: "章节Id不能为空", trigger: "blur" }
        ],
        Name: [
          { required: true, message: "作业名称不能为空", trigger: "blur" }
        ]
	  }
    };
  },
  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "",
      "学科课程"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getSubjectGradeList();
    this.getAbilityScore();
  //  this.DrawStudentSubjectAbilityEcharts();
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
    getAbilityScore:function(){
     var params = {
      SubjectId:this.SubjectId,
      StudentId:this.$store.state.id 
      };
  
      Http.StudentAbilityScoreEcharts(params).then(res => {
        if(res.StatusCode==1){
       
       //暂时没有能力点则提示
          if(res.Data.StudentTestScoreModelList.length==0&&res.Data.StudentRealityScoreModelList.length==0){
            this.abilityModalVisible = false;
            //提示语
          }else if(res.Data.StudentTestScoreModelList.length>0 || res.Data.StudentRealityScoreModelList.length>0){
       this.StudentTestScoreModelList = res.Data.StudentTestScoreModelList;
        //  this.StudentAbility = res.Data.StudentAbility;
        for(var i = 0;i<res.Data.StudentRealityScoreModelList.length;i++){
               this.StudentAbility.push(res.Data.StudentRealityScoreModelList[i].max);
            }
          }
  
           //        console.log(res.Data);
          // console.log(StudentTestScoreModelList);
           this.DrawStudentSubjectAbilityEcharts();
           // this.tableModule.count = valueList.length;
        }
      });


    },
    DrawStudentSubjectAbilityEcharts:function(){

let barSubjectAbility = this.$echarts.init(document.getElementById('EchartsSubjectAbility'));
      barSubjectAbility.setOption(  {
    title: {
        text: '学科能力点雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
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
      indicator: this.StudentTestScoreModelList
     
        //    { name: '信息技术（Information Techology）', max: 30000},
        //    { name: '客服（Customer Support）', max: 38000},
        //    { name: '研发（Development）', max: 52000},
        //    { name: '市场（Marketing）', max: 25000}
         
    },
    series: [{
        name: '能力点分数',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
              
              value : this.StudentAbility,
                name : '能力点分数'
            },
             
        ]
    }]
})
    


    },
    getSubjectGradeList:function(){
var params = {
        page: this.nowPage,
        limit: this.pageSize,
     SubjectId:this.SubjectId,
      StudentId:this.$store.state.id
      };
   
      Http.StudentSubjectScoreEcharts(params).then(res => {
        if(res.StatusCode==1){
            let valueList = res.Data.list;
          
            if(res.Data.list.length>0){
              this.SubjectName =  res.Data.list[0].OptionValue;
              this.SubjectId = res.Data.list[0].SubjectId;
               this.tableModule.tableContent = res.Data.list;
            this.tableModule.count = res.Data.list.length;
            }else if(res.Data.list.length==0){
              this.abilityModalVisible = false;
              this.tableModule.count = 0;
            }
           
        }
      });


    },
	//   添加货源表单验证方法
    addSubjectGradeHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addSubjectGradeAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editSubjectGradeHandleSubmit: async function(name) {
      var result = await this.$refs.editSubjectGradeForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editSubjectGradeAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      console.log(a);
      this.findSubjectGradeForm.Describe = a.Describe ?
        a.Describe : "";
      this.findSubjectGradeForm.ChapterId = a.ChapterId ?
        a.ChapterId : "";
      this.findSubjectGradeForm.Name = a.Name ?
        a.Name : "";
	  this.getSubjectGradeList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getSubjectGradeList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getSubjectGradeList();
    },
  
   
  }
};
</script>
<style lang="scss" scoped>
@import "./SubjectGradePage.scss";
</style>
