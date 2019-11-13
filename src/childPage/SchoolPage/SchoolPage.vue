
<template>
  <div class="SchoolPage">
      <selectModule :object="selectModule" @submit="find"></selectModule>
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addSchool="addSchool=true;$refs['addSchoolForm'].resetFields();"></tableModule>
      <Modal
          v-model="addSchool"
          title="添加学校"
		  width="800px"
		  :mask-closable="false">
        <Form :model="addSchoolForm" label-position="left" :label-width="100" :rules="rules" ref="addSchoolForm">
		  <Row>
          <!-- <Col span="12">
					<FormItem label="工号" class="forms" prop="number">
						<Input v-model="addTeacherForm.number"></Input>
					</FormItem>
          </Col> -->
          <Col span="12">
					<FormItem label="姓名" class="forms" prop="name">
						<Input v-model="addSchoolForm.name"></Input>
					</FormItem>
          </Col>
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addSchool=false">取消</Button>
            <Button type="primary" size="large" @click="addSchoolHandleSubmit('addSchoolForm')">确定</Button>
        </div>
      </Modal>
	  <Modal 
          v-model="editSchool" 
		  title="编辑学校"
		  width="800px"
		  :mask-closable="false">
		  <Form :model="editSchoolForm" label-position="left" :label-width="100" :rules="rules" ref="editSchoolForm">
		  <Row>
          <!-- <Col span="12">
					<FormItem label="工号" class="forms" prop="number">
						<Input v-model="editTeacherForm.number"></Input>
					</FormItem>
          </Col> -->
          <Col span="12">
					<FormItem label="学校名称" class="forms" prop="name">
						<Input v-model="editSchoolForm.name"></Input>
					</FormItem>
          </Col>
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editSchool=false">取消</Button>
            <Button type="primary" size="large" @click="editSchoolHandleSubmit('editSchoolForm')">确定</Button>
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
import {SchoolSelectModuleJS} from "./SchoolSelectModuleJS.js";
// 引入表格模块配置项
import {SchoolTableModuleJS} from "./SchoolTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      selectModule: (SchoolSelectModuleJS.bind(this))(),
      tableModule: (SchoolTableModuleJS.bind(this))(),
      addSchool:false,
      addSchoolForm:{
        name:"",
      },
	  editSchool:false,
      editSchoolForm:{
			  id:"",
        name:"",
      },
	  nowPage: 1,
      pageSize: 10,
	  findSchoolForm:{
        name:"",
      },
	  rules: {
        // school: [
        //   { required: true, message: "学校不能为空", trigger: "blur" }
        // ],
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        // number: [
        //   { required: true, message: "工号不能为空", trigger: "blur" }
        // ],
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
    this.getSchoolList();
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
	//   添加货源表单验证方法
    addSchoolHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addSchoolAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editSchoolHandleSubmit: async function(name) {
      var result = await this.$refs.editSchoolForm.validate(valid => {});
      if (result) {
        console.log("编辑")
        console.log(this);
        
        this.editSchoolAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      this.findSchoolForm.name = a.name ?
        a.name : "";
      // this.findTeacherForm.number = a.number ?
      //   a.number : "";
      // this.findTeacherForm.status = a.status ?
      //   a.status : null;
	  this.getSchoolList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getSchoolList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getSchoolList();
    },
    // 添加学校
    addSchoolAction: function() {
      var params = this.addSchoolForm;
      Http.postSchool(params).then(res => {
      if (res.statusCode == 1) {
      this.$Message.success(res.message);
      this.addSchool = false;
      this.getSchoolList();
      }
      else{
           this.$Message.error(res.message);
          }
      });
    },
    // 编辑学校
    editSchoolAction: function() {
      console.log("a进来啦！！！！！！！！！")
        var params = {
            id:this.editSchoolForm.id,
            name:this.editSchoolForm.name
        }
        
        Http.putSchool(params).then(res=>{
            if(res.statusCode==1){
                this.$Message.success("编辑成功");
                this.editSchool = false;
                this.getSchoolList();
            }
            else{
                this.$Message.error("编辑失败");
            }
        })
    },
    // 查询教师
    getSchoolList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        name: this.findSchoolForm.name,
        //number: this.findTeacherForm.number,
        //Status: this.findTeacherForm.Status
      };
      Http.getSchoolList(params).then(res => {
        if(res.statusCode==1){   
            this.tableModule.tableContent = res.data.content;
            this.tableModule.count = res.data.totalElements;
          
        }
      });
    },
    // 删除教师
    deleteSchoolAction:function(id){
        var params = {
            id:id
        }
        Http.deleteSchool(params).then(res=>{
            if(res.statusCode==1){
                this.$Message.success("删除成功");
                this.getSchoolList();
            }
            else{
                this.$Message.error("删除失败");
            }
        })
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./SchoolPage.scss";
</style>
