
<template>
  <div class="SubjectGradePage">
    <Button type="info" @click="abilityModalVisible=true">学科能力点图</Button>
     <Modal
          v-model="abilityModalVisible"
          title="能力点雷达图"
		      width="600px" height="500px"
		      :mask-closable="false">
         <div id="EchartsSubjectAbility" style="width:600px;height:500px"> </div>
	
      </Modal>

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
      subjectId: this.$store.state.subjectId,
      subjectName:"",
      selectModule: (SubjectGradeSelectModuleJS.bind(this))(),
      tableModule: (SubjectGradeTableModuleJS.bind(this))(),
      addSubjectGrade:false,
      addSubjectGradeForm:{
        describe:"",
        chapterId:"",
        name:""
      },
      abilityModalVisible:false,
	  editSubjectGrade:false,
      editSubjectGradeForm:{
			Id:null,
        describe:"",
        chapterId:"",
        name:"",
			versionNumber: null
      },
      studentAbilityNameAndMaxDTOS:[],
      studentAbility:[],
	  nowPage: 1,
      pageSize: 10,
	  findSubjectGradeForm:{
        describe:"",
        chapterId:"",
        name:""
      },
	  rules: {
        describe: [
          { required: true, message: "作业描述不能为空", trigger: "blur" }
        ],
        chapterId: [
          { required: true, message: "章节Id不能为空", trigger: "blur" }
        ],
        name: [
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
      subjectId:this.subjectId,
      studentId:this.$store.state.id 
      };
  
      Http.StudentAbilityScoreEcharts(params).then(res => {
        console.log(res)
        if(res.statusCode==1){
       
       //暂时没有能力点则提示
          if(res.data.studentAbilityNameAndMaxDTOS.length==0&&res.data.realStudentAbilityNameAndMaxDTOS.length==0){
            this.abilityModalVisible = false;
            //提示语
          }else if(res.data.studentAbilityNameAndMaxDTOS.length>0 || res.data.realStudentAbilityNameAndMaxDTOS.length>0){
       this.studentAbilityNameAndMaxDTOS = res.data.studentAbilityNameAndMaxDTOS;
        //  this.StudentAbility = res.data.StudentAbility;
        for(var i = 0;i<res.data.realStudentAbilityNameAndMaxDTOS.length;i++){
          console.log(res.data.realStudentAbilityNameAndMaxDTOS[i].max)
               this.studentAbility.push(res.data.realStudentAbilityNameAndMaxDTOS[i].max);
               console.log(this.studentAbility)
            }
          }
  
           //        console.log(res.data);
          // console.log(studentAbilityNameAndMaxDTOS);
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
      indicator: this.studentAbilityNameAndMaxDTOS
     
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
              
              value : this.studentAbility,
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
        subjectId:this.subjectId,
        studentId:this.$store.state.id
      };
   
      Http.StudentSubjectScoreEcharts(params).then(res => {
        if(res.statusCode==1){
          console.log(res)
            let valueList = res.data.content;         
            if(res.data.content.length>0){
              this.subjectName =  res.data.content[0].optionValue;
              this.subjectId = res.data.content[0].subjectId;
               this.tableModule.tableContent = res.data.content;
               this.tableModule.count=res.data.total;
            }else if(res.data.content.length==0){
              this.abilityModalVisible = false;
              this.tableModule.count = 0;
            }
           
           console.log("总条数"+this.tableModule.count)
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
      this.findSubjectGradeForm.describe = a.describe ?
        a.describe : "";
      this.findSubjectGradeForm.chapterId = a.chapterId ?
        a.chapterId : "";
      this.findSubjectGradeForm.name = a.name ?
        a.name : "";
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
