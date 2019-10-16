
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
      <Modal
          v-model="addInviGilateInfo"
          title="添加监考信息"
		  width="800px"
		  :mask-closable="false">
        <Form :model="addInviGilateInfoForm" label-position="left" :label-width="100" :rules="rules" ref="addInviGilateInfoForm">
		  <Row>
          <Col span="12">
					<FormItem label="课程名" class="forms" prop="CourseName">
						<Input v-model="addInviGilateInfoForm.CourseName"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="监考教室" class="forms" prop="ClassRoom">
						<Input v-model="addInviGilateInfoForm.ClassRoom"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="考试日期" class="forms" prop="TestDate">
			 <Date-picker v-model="addInviGilateInfoForm.TestDate" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
					</FormItem>
            </Col>
            <Col span="12">
					<FormItem label="考试日期" class="forms" prop="TestTime">
			 <Date-picker v-model="addInviGilateInfoForm.TestTime" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
					</FormItem>
            </Col>
          <!-- <Col span="12">
					<FormItem label="费用" class="forms" prop="expense">
						<Input v-model="addInviGilateInfoForm.expense"></Input>
					</FormItem>
          </Col> -->
           <Col span="12">
					<FormItem label="监考老师A" class="forms" prop="AId">
					<Select placeholder="请选择监考老师"  v-model="TeacherName_Num[0]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
           <Col span="12">
					<FormItem label="监考老师B" class="forms" prop="BId">
					<Select placeholder="请选择监考老师" clearable v-model="TeacherName_Num[1]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
           <Col span="12">
					<FormItem label="监考老师C" class="forms" prop="CId">
					<Select placeholder="请选择监考老师" clearable v-model="TeacherName_Num[2]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="监考老师D" class="forms" prop="DId">
					<Select placeholder="请选择监考老师" clearable v-model="TeacherName_Num[3]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addInviGilateInfo=false">取消</Button>
            <Button type="primary" size="large" @click="addInviGilateInfoHandleSubmit('addInviGilateInfoForm')">确定</Button>
        </div>
      </Modal>
	  <Modal 
          v-model="editInviGilateInfo" 
		  title="编辑监考信息"
		  width="800px"
		  :mask-closable="false">
		  <Form :model="editInviGilateInfoForm" label-position="left" :label-width="100" :rules="rules" ref="editInviGilateInfoForm">
		  <Row>
          <Col span="12">
					<FormItem label="课程名" class="forms" prop="CourseName">
						<Input v-model="editInviGilateInfoForm.CourseName"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="监考教室" class="forms" prop="ClassRoom">
						<Input v-model="editInviGilateInfoForm.ClassRoom"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="考试时间" class="forms" prop="TestDate">
						<Input v-model="editInviGilateInfoForm.TestDate"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="结束时间" class="forms" prop="TestTime">
						<Input v-model="editInviGilateInfoForm.TestTime"></Input>
					</FormItem>
          </Col>
          <!-- <Col span="12">
					<FormItem label="费用" class="forms" prop="expense">
						<Input v-model="editInviGilateInfoForm.expense"></Input>
					</FormItem>
          </Col> -->
          <Col span="12">
					<FormItem label="监考老师A" class="forms" prop="AId">
					<Select  v-model="Names[0]">      
            <Option  v-for="item in TeacherNa_ID" :value="item.Name" v-text="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
           <Col span="12">
					<FormItem label="监考老师B" class="forms" prop="BId">
					<Select placeholder="请选择监考老师" clearable v-model="Names[1]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
           <Col span="12">
					<FormItem label="监考老师C" class="forms" prop="CId">
					<Select placeholder="请选择监考老师" clearable v-model="Names[2]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>
					</Select>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="监考老师D" class="forms" prop="DId">
					<Select placeholder="请选择监考老师" clearable v-model="Names[3]">      
            <Option v-for="item in TeacherNa_ID" :value="item.Name" :key="item.Id">{{item.Name}}</Option>

					</Select>
					</FormItem>
          </Col>
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editInviGilateInfo=false">取消</Button>
            <Button type="primary" size="large" @click="editInviGilateInfoHandleSubmit('editInviGilateInfoForm')">确定</Button>
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
      addInviGilateInfo:false,
      TeacherName_Num:["","","",""],//定义定长数组存储下拉框信息
      addInviGilateInfoForm:{
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
        DStatus:""
      },
     ExpenseFlag:false,
    editInviGilateInfo:false,
    InvigiInfo:[],
    selecttime:[2],
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
      Names:[4],//定义一个数组，在编辑时存储教师信息
      M_statue:[],//定义一个数组，在编辑时存储教师状态
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
      TeacherNa_ID: [],
	  rules: {
        CourseName: [
          { required: true, message: "课程名不能为空", trigger: "blur" }
        ],
        ClassRoom: [
          { required: true, message: "监考教室不能为空", trigger: "blur" }
        ],
        TestDate: [
          { required: true, message: "考试日期不能为空" }
        ],
        TestTime: [
          { required: true, message: "考试时间不能为空"}
        ],
        // expense: [
        //   { required: true, message: "费用不能为空", trigger: "blur" }
        // ],
        // AId: [
        //   { required: true, message: "监考老师AId不能为空", trigger: "onchange" }
        // ],
        // BId: [
        //   { required: true, message: "监考老师Bid不能为空", trigger: "onchange" }
        // ],
        // CId: [
        //   { required: true, message: "监考老师Cid不能为空", trigger: "onchange" }
        // ],
        TeacherNameA_Num: [
          { required: true, message: "监考老师A不能为空", trigger: "change" ,type:"number"}
        ],
        // TeacherNameB_Num: [
        //   { required: false, message: "监考老师Did不能为空", trigger: "change" ,type:"number"}
        // ],
        // TeacherNameC_Num: [
        //   { required: false, message: "监考老师Did不能为空", trigger: "change" ,type:"number"}
        // ],
        // TeacherName_Num: [
        //   { required: false, message: "监考老师Did不能为空", trigger: "change" ,type:"number"}
        // ],
	  }
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
    this.getTeacherName_ID();
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
    // 添加监考信息
    addInviGilateInfoAction: function() {
      for(var i=0;i<this.TeacherName_Num.length;i++){//数组长度为length，最小为1,切割字符串截取编号
          if(this.TeacherName_Num[i]!=null&&this.TeacherName_Num[i]!="")
          {
            var start=this.TeacherName_Num[i].indexOf("-");
            var end=this.TeacherName_Num[i].indexOf(")");
            var str1=this.TeacherName_Num[i].slice(start+1,end);//截取编号
            var str_num=parseInt(str1);
            if(i==0)
            {
              this.addInviGilateInfoForm.AId=str_num;//赋值给Id
              //为状态设置初始值
            }
            if(i==1)
            {
              this.addInviGilateInfoForm.BId=str_num;
              
            }
            if(i==2)
            {
              this.addInviGilateInfoForm.CId=str_num;
              
            }
            if(i==3)
            {
              this.addInviGilateInfoForm.DId=str_num;
              
            }
      }
      }
      this.addInviGilateInfoForm.AStatus=0;
      this.addInviGilateInfoForm.BStatus=0;
      this.addInviGilateInfoForm.CStatus=0;
      this.addInviGilateInfoForm.DStatus=0;
      var params=this.addInviGilateInfoForm;
      Http.postInviGilateInfo(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addInviGilateInfoForm = {
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
            DStatus:""
          };
          for(var i=0;i<this.TeacherName_Num.length;i++){
            this.TeacherName_Num[i]="";
          }
		  this.addInviGilateInfo = false;
		  this.$refs["addInviGilateInfoForm"].resetFields();
          this.getInviGilateInfoList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
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
				this.$refs["editInviGilateInfoForm"].resetFields();
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
        AId: this.findInviGilateInfoForm.AId,
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
            if(res.Data.List[i].A_Name!=null){
              for(var j=0;j<this.TeacherNa_ID.length;j++){
                  if(res.Data.List[i].AId==this.TeacherNa_ID[j].Id){
                    res.Data.List[i].A_Name=this.TeacherNa_ID[j].Name;
                  }
              }
            }
             if(res.Data.List[i].B_Name!=null){
              for(var j=0;j<this.TeacherNa_ID.length;j++){
                  if(res.Data.List[i].BId==this.TeacherNa_ID[j].Id){
                    res.Data.List[i].B_Name=this.TeacherNa_ID[j].Name;
                  }
              }
            }
             if(res.Data.List[i].C_Name!=null){
              for(var j=0;j<this.TeacherNa_ID.length;j++){
                  if(res.Data.List[i].CId==this.TeacherNa_ID[j].Id){
                    res.Data.List[i].C_Name=this.TeacherNa_ID[j].Name;
                  }
              }
            }
             if(res.Data.List[i].D_Name!=null){
              for(var j=0;j<this.TeacherNa_ID.length;j++){
                  if(res.Data.List[i].DId==this.TeacherNa_ID[j].Id){
                    res.Data.List[i].D_Name=this.TeacherNa_ID[j].Name;
                  }
              }
            }
          }
            this.tableModule.tableContent = res.Data.List;
            this.tableModule.count = res.Data.Total;
            
        }
      });
    },
    // 删除监考信息
    deleteInviGilateInfoAction:function(id){
        var params = {
            id:id
        }
        Http.deleteInviGilateInfo(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("删除成功");
                this.getInviGilateInfoList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    //获取教师名与ID
    getTeacherName_ID:function(){
      var params={};
      Http.getTeacherList(params).then(res=>{
         
        if(res.StatusCode==1){
          for(var i=0;i<res.Data.Total;i++){
            res.Data.List[i].Name=res.Data.List[i].Name+"("+res.Data.List[i].Number+"-"+res.Data.List[i].Id+")";
          }
          this.TeacherNa_ID=res.Data.List;//存储教师对象
        }
      })
    },
    //确认监考
    changeStatus:function(na){
      for(var i=0;i<na.length;i++){
        if(na[i]!=null&&na[i]!="")
          {
            var end=na[i].indexOf("(");
            var str1=na[i].slice(0,end);//截取编号
            if(str1=="马瑞新")//后期转换为登录角色姓名
            {
                switch(i){
                  
                  case 0:
                    {
                      if(this.editInviGilateInfoForm.AStatus==0){
                        this.editInviGilateInfoForm.AStatus=1;
                      }
                    }
                  break;
                  case 1:
                     {
                      if(this.editInviGilateInfoForm.BStatus==0){
                        this.editInviGilateInfoForm.BStatus=1;
                      }
                    }
                  break;
                  case 2:
                     {
                      if(this.editInviGilateInfoForm.CStatus==0){
                        this.editInviGilateInfoForm.CStatus=1;
                      }
                    }
                  break;
                  case 3:
                     {
                      if(this.editInviGilateInfoForm.DStatus==0){
                        this.editInviGilateInfoForm.DStatus=1;
                      }
                    }
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
