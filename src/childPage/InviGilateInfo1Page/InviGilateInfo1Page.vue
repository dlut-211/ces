
<template>
  <div class="InviGilateInfoPage">
      <selectModule :object="selectModule" @submit="find">
      <!-- <Date-picker v-model="selecttime[0]" type="datetime" placeholder="选择起始日期" style="width: 200px"></Date-picker> -->
      <!-- <Date-picker v-model="selecttime[1]" type="datetime" placeholder="选择终止日期" style="width: 200px"></Date-picker> -->

      </selectModule>
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addInviGilateInfo="addInviGilateInfo=true;$refs['addInviGilateInfoForm'].resetFields();">
       <!-- 全部发放监考费用 -->
        <!-- <Button slot="batchAudit" type="primary" size="small" style="float:right;margin-top:6px;margin-right:25px;" @click="this.deleverExpense">发放监考费用</Button>     -->
      </tableModule>
  </div>
</template>
<script>
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import {InviGilateInfoSelectModuleJS} from "./InviGilateInfoSelectModuleJS.js";
// 引入表格模块配置项
import {InviGilateInfoTableModuleJS} from "./InviGilateInfoTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      selectModule: (InviGilateInfoSelectModuleJS.bind(this))(),
      tableModule: (InviGilateInfoTableModuleJS.bind(this))(),
    editInviGilateInfo:false,
      editInviGilateInfoForm:{
			  Id:null,
        CourseName:"",
        ClassRoom:"",
        TestDate:"",
        TestTime:"",
        expense:"",
        AId:"",
        BId:"",
        CId:"",
        DId:"",
        AStatus:"",
        BStatus:"",
        CStatus:"",
        DStatus:"",
			VersionNumber: null
      },
	  nowPage: 1,
      pageSize: 10,
	  findInviGilateInfoForm:{
        CourseName:"",
        ClassRoom:"",
        TestDate:"",
        TestTime:"",
        expense:"",
        AId:"",
        BId:"",
        CId:"",
        DId:"",
        AStatus:"",
        BStatus:"",
        CStatus:"",
        DStatus:"",
        A_Name:""
      },
      Teacher_Num:["","","",""],
      userid:this.$store.state.id
    };
  },

  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "",
      "监考信息管理"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getInviGilateInfoList();
    
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
	//   添加货源表单验证方法
    addInviGilateInfoHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addInviGilateInfoAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editInviGilateInfoHandleSubmit: async function(name) {
      var result = await this.$refs.editInviGilateInfoForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editInviGilateInfoAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      console.log(a);
      this.findInviGilateInfoForm.CourseName = a.CourseName ?
        a.CourseName : "";
       this.findInviGilateInfoForm.A_Name = a.A_Name ?
        a.A_Name : "";
      this.findInviGilateInfoForm.ClassRoom = a.ClassRoom ?
        a.ClassRoom : "";
      this.findInviGilateInfoForm.TestDate = a.TestDate ?
        a.TestDate : "";
      this.findInviGilateInfoForm.TestTime = a.TestTime ?
        a.TestTime : "";
      this.findInviGilateInfoForm.expense = a.expense ?
        a.expense : "";
      this.findInviGilateInfoForm.AId = a.AId ?
        a.AId : "";
      this.findInviGilateInfoForm.BId = a.BId ?
        a.BId : "";
      this.findInviGilateInfoForm.CId = a.CId ?
        a.CId : "";
      this.findInviGilateInfoForm.DId = a.DId ?
        a.DId : "";
      this.findInviGilateInfoForm.AStatus = a.AStatus ?
        a.AStatus : "";
      this.findInviGilateInfoForm.BStatus = a.BStatus ?
        a.BStatus : "";
      this.findInviGilateInfoForm.CStatus = a.CStatus ?
        a.CStatus : "";
      this.findInviGilateInfoForm.DStatus = a.DStatus ?
        a.DStatus : "";
	  this.getInviGilateInfoList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getInviGilateInfoList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getInviGilateInfoList();
    },

    // 编辑监考信息
    editInviGilateInfoAction: function() {
          var params = this.editInviGilateInfoForm;
        Http.putInviGilateInfo(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
				this.editInviGilateInfoForm = {
					Id:null,
            CourseName:"",
            ClassRoom:"",
            TestDate:"",
            TestTime:"",
            expense:"",
            AId:"",
            BId:"",
            CId:"",
            DId:"",
            AStatus:"",
            BStatus:"",
            CStatus:"",
            DStatus:"",
					VersionNumber: null
        };
				this.editInviGilateInfo = false;
        this.getInviGilateInfoList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
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
    // 查询监考信息
    getInviGilateInfoList: function() {
      var startdate=this.formatDate(new Date(this.findInviGilateInfoForm.TestDate),'yyyy-MM-dd');
      var enddate=this.formatDate(new Date(this.findInviGilateInfoForm.TestTime),'yyyy-MM-dd');

      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        CourseName: this.findInviGilateInfoForm.CourseName,
        ClassRoom: this.findInviGilateInfoForm.ClassRoom,
        TestDate: startdate,
        TestDate1: enddate,
        expense: this.findInviGilateInfoForm.expense,
        AId: this.userid,
        BId: this.findInviGilateInfoForm.BId,
        CId: this.findInviGilateInfoForm.CId,
        DId: this.findInviGilateInfoForm.DId,
        AStatus: this.findInviGilateInfoForm.AStatus,
        BStatus: this.findInviGilateInfoForm.BStatus,
        CStatus: this.findInviGilateInfoForm.CStatus,
        DStatus: this.findInviGilateInfoForm.DStatus,
        A_Name: this.findInviGilateInfoForm.A_Name,
      };
      Http.getInviGilateInfoList(params).then(res => {
        if(res.StatusCode==1){
          for(var i=0;i<res.Data.Total;i++){
            //日期格式化
            res.Data.List[i].TestDate=this.formatDate(new Date(res.Data.List[i].TestDate),'yyyy-MM-dd hh:mm');
            res.Data.List[i].TestTime=this.formatDate(new Date(res.Data.List[i].TestTime),'yyyy-MM-dd hh:mm');
          }
          console.log("this.userid"+this.userid)
          for(var i=0;i<res.Data.Total;i++){
            if(this.userid==res.Data.List[i].BId){
              res.Data.List[i].AStatus=res.Data.List[i].BStatus

            }
             if(this.userid==res.Data.List[i].CId){
              res.Data.List[i].AStatus=res.Data.List[i].CStatus
            }
             if(this.userid==res.Data.List[i].DId){
              res.Data.List[i].AStatus=res.Data.List[i].DStatus
            }
          }
            this.tableModule.tableContent = res.Data.List;
            this.tableModule.count = res.Data.Total;
        }
      });
    },

    //确认监考
    changeStatus:function(){
      for(var i=0;i<this.Teacher_Num.length;i++){
        if(this.Teacher_Num[i]==this.$store.state.id)
        {
          switch(i){
            case 0:
              {
                this.editInviGilateInfoForm.AStatus=1;
                break;
              }
            case 1:
              {
                this.editInviGilateInfoForm.BStatus=1;
                break;
              }
            case 2:
              {
                this.editInviGilateInfoForm.CStatus=1;
                break;
              }
            case 3:
              {
                this.editInviGilateInfoForm.DStatus=1;
                break;
              }
          }
        }
      }
    },
deleverExpense:function(a,b,c,d){
    if(a==1)
      this.editInviGilateInfoForm.AStatus=2;
    if(b==1)
      this.editInviGilateInfoForm.BStatus=2;
    if(c==1)
      this.editInviGilateInfoForm.CStatus=2;
    if(d==1)
      this.editInviGilateInfoForm.DStatus=2;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./InviGilateInfoPage.scss";
</style>
