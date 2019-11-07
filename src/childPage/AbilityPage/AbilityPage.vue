
<template>
  <div class="AbilityPage">
      <selectModule :object="selectModule" @submit="find"></selectModule>
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addAbility="addAbility=true;$refs['addAbilityForm'].resetFields();"></tableModule>
      <Modal
          v-model="addAbility"
          title="添加能力点"
		  width="500px"
		  :mask-closable="false">
        <Form :model="addAbilityForm" label-position="left" :label-width="100" :rules="rules" ref="addAbilityForm">
		  <Row>
          <Col span="12">
					<FormItem label="能力点名称‎" class="forms" prop="Name">
						<Input v-model="addAbilityForm.Name"></Input>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="能力点描述" class="forms" prop="Describe">
            <Input type="textarea" v-model="addAbilityForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input>
					</FormItem>
          </Col>
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addAbility=false">取消</Button>
            <Button type="primary" size="large" @click="addAbilityHandleSubmit('addAbilityForm')">确定</Button>
        </div>
      </Modal>
	  <Modal 
          v-model="editAbility" 
		  title="编辑能力点"
		  width="800px"
		  :mask-closable="false">
		  <Form :model="editAbilityForm" label-position="left" :label-width="100" :rules="rules" ref="editAbilityForm">
		  <Row>
          <Col span="12">
					<FormItem label="能力点名称‎" class="forms" prop="Name">
						<Input v-model="editAbilityForm.Name"></Input>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="能力点描述" class="forms" prop="Describe">
            <Input type="textarea" v-model="editAbilityForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input>
					</FormItem>
          </Col>
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editAbility=false">取消</Button>
            <Button type="primary" size="large" @click="editAbilityHandleSubmit('editAbilityForm')">确定</Button>
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
import {AbilitySelectModuleJS} from "./AbilitySelectModuleJS.js";
// 引入表格模块配置项
import {AbilityTableModuleJS} from "./AbilityTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      selectModule: (AbilitySelectModuleJS.bind(this))(),
      tableModule: (AbilityTableModuleJS.bind(this))(),
      addAbility:false,
      addAbilityForm:{
        Name:"",
        Describe:"",
        SubjectId:this.$route.params.SubjectId
      },
	  editAbility:false,
      editAbilityForm:{
			Id:null,
        Name:"",
        Describe:"",
        SubjectId:this.$route.params.SubjectId,
			VersionNumber: null
      },
	  nowPage: 1,
      pageSize: 10,
	  findAbilityForm:{
        Name:"",
        SubjectId:"",
        Describe:"",
        Subject_OptionValue:"",
      },
	  rules: {
        Name: [
          { required: true, message: "能力点名称‎不能为空", trigger: "blur" }
        ],
        SubjectId: [
          { required: true, message: "学科编号不能为空", trigger: "blur" }
        ]
	  }
    };
  },
  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "",
      "能力点管理"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getAbilityList();
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
	//   添加货源表单验证方法
    addAbilityHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addAbilityAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editAbilityHandleSubmit: async function(name) {
      var result = await this.$refs.editAbilityForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editAbilityAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      
      console.log(a);
      this.findAbilityForm.Subject_OptionValue = a.Subject_OptionValue ? 
        a.Subject_OptionValue : "",
      this.findAbilityForm.Name = a.Name ?
        a.Name : "";
      this.findAbilityForm.SubjectId = a.SubjectId ?
        a.SubjectId : "";
      this.findAbilityForm.Describe = a.Describe ?
        a.Describe : "",
	  this.getAbilityList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getAbilityList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getAbilityList(); 
    },
    // 添加能力点
    addAbilityAction: function() {
      var params = this.addAbilityForm
      Http.getSubjectAbility(params).then(res => {
        if(res.StatusCode==1){
            if( res.Data.Total==0){
                Http.postAbility(params).then(res => {
                  if (res.StatusCode == 1) {
                    this.$Message.success(res.Message);
                    this.addAbilityForm = 
                    {
                      Name:"",
                      Describe:"",
                      SubjectId:this.$route.params.SubjectId
                    };
                this.addAbility = false;
                this.$refs["addAbilityForm"].resetFields();
                    this.getAbilityList();
                  }
                  else
                  {
                      this.$Message.error(res.Message);
                  }
                });
            }
            else{
              this.$Message.error('能力点已存在');
            }
        }
      });
      
    },
    // 编辑能力点
    editAbilityAction: function() {
        var params = this.editAbilityForm;
        Http.putAbility(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
				this.editAbilityForm = {
					Id:null,
            Name:"",
            Describe:"",
            SubjectId:this.$route.params.SubjectId,
					VersionNumber: null
				};
				this.editAbility = false;
				this.$refs["editAbilityForm"].resetFields();
                this.getAbilityList();
            }
            else{
                this.$Message.error(res.Message);
            }
        });
  },
    // 查询学科能力点
    getAbilityList: function() {

      var params = 
      { 
        Name : this.findAbilityForm.Name,
        Describe : this.findAbilityForm.Describe,
        SubjectId : this.$route.params.SubjectId
      }
      Http.getSubjectAbility(params).then(res => {
        if(res.StatusCode==1){
            this.tableModule.tableContent = res.Data.List;
            this.tableModule.count = res.Data.Total;
        }
      });
    },
    // 删除能力点
    deleteAbilityAction:function(id){
        var params = {
            id:id
        }
        Http.deleteAbility(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("删除成功");
                this.getAbilityList();
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
@import "./AbilityPage.scss";
</style>
