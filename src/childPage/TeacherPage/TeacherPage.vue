
<template>
  <div class="TeacherPage">
      <selectModule :object="selectModule" @submit="find"></selectModule>
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addTeacher="addTeacher=true;$refs['addTeacherForm'].resetFields();"></tableModule>
      <Modal
          v-model="addTeacher"
          title="添加教师"
		  width="800px"
		  :mask-closable="false">
        <Form :model="addTeacherForm" label-position="left" :label-width="100" :rules="rules" ref="addTeacherForm">
		  <Row>
          <Col span="12">
					<FormItem label="工号" class="forms" prop="Number">
						<Input v-model="addTeacherForm.Number"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="姓名" class="forms" prop="Name">
						<Input v-model="addTeacherForm.Name"></Input>
					</FormItem>
          </Col>
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addTeacher=false">取消</Button>
            <Button type="primary" size="large" @click="addTeacherHandleSubmit('addTeacherForm')">确定</Button>
        </div>
      </Modal>
	  <Modal 
          v-model="editTeacher" 
		  title="编辑教师"
		  width="800px"
		  :mask-closable="false">
		  <Form :model="editTeacherForm" label-position="left" :label-width="100" :rules="rules" ref="editTeacherForm">
		  <Row>
          <Col span="12">
					<FormItem label="工号" class="forms" prop="Number">
						<Input v-model="editTeacherForm.Number"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="姓名" class="forms" prop="Name">
						<Input v-model="editTeacherForm.Name"></Input>
					</FormItem>
          </Col>
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editTeacher=false">取消</Button>
            <Button type="primary" size="large" @click="editTeacherHandleSubmit('editTeacherForm')">确定</Button>
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
import {TeacherSelectModuleJS} from "./TeacherSelectModuleJS.js";
// 引入表格模块配置项
import {TeacherTableModuleJS} from "./TeacherTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      selectModule: (TeacherSelectModuleJS.bind(this))(),
      tableModule: (TeacherTableModuleJS.bind(this))(),
      addTeacher:false,
      addTeacherForm:{
        Name:"",
        Number:"",
      },
	  editTeacher:false,
      editTeacherForm:{
			  Id:null,
        Name:"",
        Number:"",
			  VersionNumber: null
      },
	  nowPage: 1,
      pageSize: 10,
	  findTeacherForm:{
        Name:"",
        Number:"",
        Status:1
      },
	  rules: {
        School: [
          { required: true, message: "学校不能为空", trigger: "blur" }
        ],
        Name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        Number: [
          { required: true, message: "工号不能为空", trigger: "blur" }
        ],
	  }
    };
  },
  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "用户管理",
      "教师"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getTeacherList();
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
	//   添加货源表单验证方法
    addTeacherHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addTeacherAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editTeacherHandleSubmit: async function(name) {
      var result = await this.$refs.editTeacherForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editTeacherAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      this.findTeacherForm.Name = a.Name ?
        a.Name : "";
      this.findTeacherForm.Number = a.Number ?
        a.Number : "";
      this.findTeacherForm.Status = a.Status ?
        a.Status : null;
	  this.getTeacherList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getTeacherList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getTeacherList();
    },
    // 添加教师
    addTeacherAction: function() {
      var params = this.addTeacherForm;
      Http.postTeacher(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addTeacherForm = {
            Name:"",
            Number:""
          };
		  this.addTeacher = false;
		  this.$refs["addTeacherForm"].resetFields();
          this.getTeacherList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 编辑教师
    editTeacherAction: function() {
        var params = this.editTeacherForm;
        Http.putTeacher(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
				this.editTeacherForm = {
					Id:null,
            Name:"",
            Number:"",
					VersionNumber: null
				};
				this.editTeacher = false;
				this.$refs["editTeacherForm"].resetFields();
                this.getTeacherList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 查询教师
    getTeacherList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        Name: this.findTeacherForm.Name,
        Number: this.findTeacherForm.Number,
        Status: this.findTeacherForm.Status
      };
      Http.getTeacherList(params).then(res => {
        if(res.StatusCode==1){   
            this.tableModule.tableContent = res.Data.List;
            this.tableModule.count = res.Data.Total;
          
        }
      });
    },
    // 删除教师
    deleteTeacherAction:function(id){
        var params = {
            id:id
        }
        Http.deleteTeacher(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("删除成功");
                this.getTeacherList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 启用教师
    enableTeacherAction:function(id){
        var params = {
            id:id
        }
        Http.enableTeacher(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("启用成功");
                this.getTeacherList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 禁用教师
    disableTeacherAction:function(id){
        var params = {
            id:id
        }
        Http.disableTeacher(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("禁用成功");
                this.getTeacherList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./TeacherPage.scss";
</style>
