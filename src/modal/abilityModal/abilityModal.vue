
<template>
  <div >
      <Modal :value="visible"  title="选择能力点" @on-ok="submit" @on-cancel="cancel" :mask-closable="false" width="800px">
            <selectModule :object="selectModule" @submit="find" ref="abilitySearch"></selectModule>
            <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" :nowPage="nowPage" @addAbility="addAbility=true;$refs['addAbilityForm'].resetFields();"></tableModule>
            <div slot="footer">
                <Button type="ghost" @click="cancel">取消</Button>
                <Button type="primary" @click="submit" :disabled="choose==null">确定</Button>
            </div>
           <div>{{subjectData}}</div> 
        </Modal>
      <!--添加能力点传学科-->
      <Modal
          v-model="addAbility"
          title="添加能力点"
		  width="400px"
		  :mask-closable="false">
        <Form :model="addAbilityForm" label-position="left" :label-width="100" :rules="rules" ref="addAbilityForm">
		  <Row>
          <Col span="24">
				<FormItem label="‎能力点名称" class="forms" prop="name">
					<Input v-model="addAbilityForm.Name"></Input> <!--给能力点form Model 赋值--->
          <!-- <Input v-model="addAbilityForm.SubjectId"></Input> 给能力点form Model 赋值- -->
				</FormItem>
          </Col>
           <Col span="24">
					<FormItem label="能力点描述" class="forms" prop="description">
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
		  width="400px"
		  :mask-closable="false">
		  <Form :model="editAbilityForm" label-position="left" :label-width="100" :rules="rules" ref="editAbilityForm">
		  <Row>
          <Col span="24">
				<FormItem label="‎" class="forms" prop="Name">
					<Input v-model="editAbilityForm.Name"></Input>
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
import tableModule from "@/components/modalTableModule/modalTableModule.vue";
// 引入查询模块配置项
import {AbilitySelectModuleJS} from "./AbilitySelectModuleJS.js";
// 引入表格模块配置项
import {AbilityTableModuleJS} from "./AbilityTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  props: ["visible","subjectData"],//可能是通过这个传值
 
  data: function() {
    return {
      selectModule: (AbilitySelectModuleJS.bind(this))(),
      tableModule: (AbilityTableModuleJS.bind(this))(),
      addAbility:false,
      addAbilityForm:{ // 添加能力点学科
        Name:"",
        SubjectId:null,
        Describe:""
      },
	  editAbility:false,
      editAbilityForm:{ // 编辑能力点学科
			Id:null,
        Name:"",
      VersionNumber: null,
       SubjectId:this.subjectData
      },
	  nowPage: 1,
      pageSize: 5,
	  findAbilityForm:{ //查找能力点
        Name:""
      },
	  rules: {
        Name: [
          { required: true, message: "‎不能为空", trigger: "blur" }
        ]
	  },
      choose: null,
    };
  },
  mounted:function(){
    //this.getAbilityList();
    
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
    
      // 点击确定时，向父级报告
    submit: function() {
      this.$emit("submit", this.choose);
        this.nowPage = 1;
        this.choose = null;
        this.getAbilityList();
    },
    // 点击取消时
    cancel: function() {
      this.$emit("cancel");
        this.nowPage = 1;
        this.choose = null;
        this.getAbilityList();
    },
	//   添加货源表单验证方法-------
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
      this.findAbilityForm.Name = a.Name ? //查询方法咋查不了
        a.Name : "";
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
      this.addAbilityForm.SubjectId = this.subjectData
      console.log("this.subjectData"+this.subjectData);
    var params = this.addAbilityForm;
    console.log( params );
      Http.postAbility(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addAbilityForm = {
            Name:"",
            SubjectId:this.subjectData //添加学科
          };
		  this.addAbility = false;
		  this.$refs["addAbilityForm"].resetFields();
          this.getAbilityList();
        }
        else{
            this.$Message.error(res.Message);
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
            Name:"",//学科编号
            SubjectId:this.subjectData,
					VersionNumber: null
				};
				this.editAbility = false; 
				this.$refs["editAbilityForm"].resetFields();
                this.getAbilityList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 查询能力点
    getAbilityList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        //Name: this.findAbilityForm.Name ,// 好像没有看见这个参数
        SubjectId:this.subjectData // 添加学科
      };
      Http.getAbilityList(params).then(res => {
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
</style>
