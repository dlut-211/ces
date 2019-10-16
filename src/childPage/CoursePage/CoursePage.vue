
<template>
  <div class="CoursePage">
      <selectModule :object="selectModule" @submit="find"></selectModule>
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addCourse="addCourse=true;$refs['addCourseForm'].resetFields();"></tableModule>
      <Modal
          v-model="addCourse"
          title="添加课程"
		  width="800px"
		  :mask-closable="false">
        <Form :model="addCourseForm" label-position="left" :label-width="100" :rules="rules" ref="addCourseForm">
		  <Row>
          <Col span="12">
					<FormItem label="课程编号" class="forms" prop="Code">
						<Input v-model="addCourseForm.Code"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="课程名称" class="forms" prop="Name">
						<Input v-model="addCourseForm.Name"></Input>
					</FormItem>
          </Col>
          <!--添加学科类型-->
           <Col span="12">
					<FormItem label="学科类型" class="forms" prop="SubjectId">
            <Select v-model="addCourseForm.SubjectId" :placeholder="'请选择学科类型'">
              <Option v-for="item in subjectTypeArr" :value="item.Id" :key="item.Id">{{item.OptionValue}}</Option>
            </Select>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="描述" class="forms" prop="Describe">
            <Input type="textarea" v-model="addCourseForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="教学大纲" class="forms" prop="SyllabusPath">
						<Upload :action="uploadFile" :headers="{Authorization:$store.state.token}" style="float: left; margin-right: 20px;" :show-upload-list="false" :on-success="handleAddSyllabusSuccess" :on-format-error="handleFormatError">
              <Button type="ghost" icon="ios-cloud-upload-outline">点击上传文件</Button>
            </Upload>
            <div v-if="addCourseForm.SyllabusPath">
              <a :href="addCourseForm.SyllabusPath" target="blank">{{addCourseForm.Syllabus}}</a>
            </div>
					</FormItem>
          </Col>
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addCourse=false">取消</Button>
            <Button type="primary" size="large" @click="addCourseHandleSubmit('addCourseForm')">确定</Button>
        </div>
      </Modal>
	  <Modal 
          v-model="editCourse" 
		  title="编辑课程"
		  width="800px"
		  :mask-closable="false">
		  <Form :model="editCourseForm" label-position="left" :label-width="100" :rules="rules" ref="editCourseForm">
		  <Row>
          <Col span="12">
					<FormItem label="课程编号" class="forms" prop="Code">
						<Input v-model="editCourseForm.Code"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="课程名称" class="forms" prop="Name">
						<Input v-model="editCourseForm.Name"></Input>
					</FormItem>
          </Col>
           <!--添加学科类型-->
           <Col span="12">
					<FormItem label="学科类型" class="forms" prop="SubjectId">
            <Select v-model="editCourseForm.SubjectId">
              <Option v-for="item in subjectTypeArr" :value="item.Id" :key="item.Id">{{item.OptionValue}}</Option>
            </Select>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="描述" class="forms" prop="Describe">
            <Input type="textarea" v-model="editCourseForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="教学大纲" class="forms" prop="SyllabusPath">
            <Upload :action="uploadFile" :headers="{Authorization:$store.state.token}" style="float: left; margin-right: 20px;" :show-upload-list="false" :on-success="handleEditSyllabusSuccess"  :on-format-error="handleFormatError">
              <Button type="ghost" icon="ios-cloud-upload-outline">点击上传文件</Button>
            </Upload>
            <div v-if="editCourseForm.SyllabusPath">
              <a :href="editCourseForm.SyllabusPath" target="blank">{{editCourseForm.Syllabus}}</a>
            </div>
					</FormItem>
          </Col>
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editCourse=false">取消</Button>
            <Button type="primary" size="large" @click="editCourseHandleSubmit('editCourseForm')">确定</Button>
        </div>
      </Modal>
      <Modal v-model="courseInfo" title="课程内容" width="1200px" :mask-closable="false" :footer-hide="true">
        <courseInfo 
          :courseData="showForm" 
          @addChapter="addChapterModal" 
          @editChapter="editChapterModal" 
          @deleteChapter="deleteChapterAction" 
          @addKnowledge="addKnowledgeModal"
          @editKnowledge="editKnowledgeModal" 
          @deleteKnowledge="deleteKnowledgeAction" 
          @addWork="addWorkModal"
          @editWork="editWorkModal" 
          @deleteWork="deleteWorkAction" 
          ref="CourseDetail">
        </courseInfo>
      </Modal>
      <!-- 章节 -->
      <Modal v-model="addChapter" title="添加章节"  width="400px" :mask-closable="false">
       <Form :model="addChapterForm" label-position="left" :label-width="100" :rules="chapterrules" ref="addChapterForm">
        <Row>
          <Col span="24">
          <FormItem label="章节名称" class="forms" prop="Name">
            <Input v-model="addChapterForm.Name"></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="章节描述" class="forms" prop="Describe">
            <Input type="textarea" v-model="addChapterForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" size="large" @click="addChapter=false">取消</Button>
          <Button type="primary" size="large" @click="addChapterHandleSubmit('addChapterForm')">确定</Button>
        </div>
      </Modal>
      <Modal v-model="editChapter" title="编辑章节"  width="400px" :mask-closable="false">
       <Form :model="editChapterForm" label-position="left" :label-width="100" :rules="chapterrules" ref="editChapterForm">
        <Row>
          <Col span="24">
          <FormItem label="章节名称" class="forms" prop="Name">
            <Input v-model="editChapterForm.Name"></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="章节描述" class="forms" prop="Describe">
            <Input type="textarea" v-model="editChapterForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" size="large" @click="editChapter=false">取消</Button>
          <Button type="primary" size="large" @click="editChapterHandleSubmit('editChapterForm')">确定</Button>
        </div>
      </Modal>
      <!-- 知识点 -->
      <Modal v-model="addKnowledge" title="添加知识点" width="800px" :mask-closable="false">
        <Form :model="addKnowledgeForm" label-position="left" :label-width="100" :rules="knowledgerules" ref="addKnowledgeForm">
          <Row>
            <Col span="12">
            <FormItem label="知识点名称" class="forms" prop="Name">
              <Input v-model="addKnowledgeForm.Name"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="能力点" class="forms" prop="AbilityName">
              <Input v-model="addKnowledgeForm.AbilityName" disabled style="width:160px;" placeholder="请选择能力点"></Input>
              <Button type="info" @click="GetData()">点击选择</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" size="large" @click="addKnowledge=false">取消</Button>
          <Button type="primary" size="large" @click="addKnowledgeHandleSubmit('addKnowledgeForm')">确定</Button>
        </div>
      </Modal>
      <Modal v-model="editKnowledge" title="编辑知识点" width="800px" :mask-closable="false">
        <Form :model="editKnowledgeForm" label-position="left" :label-width="100" :rules="knowledgerules" ref="editKnowledgeForm">
          <Row>
            <Col span="12">
            <FormItem label="知识点名称" class="forms" prop="Name">
              <Input v-model="editKnowledgeForm.Name"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="能力点" class="forms" prop="AbilityName">
              <Input v-model="editKnowledgeForm.AbilityName" disabled style="width:160px;" placeholder="请选择能力点"></Input>
              <Button type="info" @click="GetData()">点击选择</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" size="large" @click="editKnowledge=false">取消</Button>
          <Button type="primary" size="large" @click="editKnowledgeHandleSubmit('editKnowledgeForm')">确定</Button>
        </div>
      </Modal>
      <!-- 能力点 showForm :subjectData="showForm.SubjectId"-->
      <abilityModal :visible="abilityModalVisible" :subjectData="LocalSubjectId" ref="ChildAbility"  @submit="abilityModalSubmit" @cancel="abilityModalVisible=false"></abilityModal>
      <!-- 作业 -->
      <Modal
          v-model="addWork"
          title="添加作业"
		      width="800px"
		      :mask-closable="false">
        <Form :model="addWorkForm" label-position="left" :label-width="100" :rules="workrules" ref="addWorkForm">
		  <Row>
          <Col span="24">
					<FormItem label="作业名称" class="forms" prop="Name">
						<Input v-model="addWorkForm.Name"></Input>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="作业描述" class="forms" prop="Describe">
            <weditorModule ref="addEditor" :keys="1"></weditorModule>
            <!-- <Input type="textarea" v-model="addWorkForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input> -->
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="知识点" class="forms" prop="Knowledges">
            <Select v-model="addWorkForm.Knowledges" multiple :placeholder="'请选择知识点'">
                <Option v-for="item in KnowledgeList" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
            </Select>
					</FormItem>
          </Col>
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addWork=false">取消</Button>
            <Button type="primary" size="large" @click="addWorkHandleSubmit('addWorkForm')">确定</Button>
        </div>
      </Modal>
	  <Modal 
          v-model="editWork" 
		  title="编辑作业"
		  width="800px"
		  :mask-closable="false">
		  <Form :model="editWorkForm" label-position="left" :label-width="100" :rules="workrules" ref="editWorkForm">
		  <Row>
          <Col span="24">
					<FormItem label="作业名称" class="forms" prop="Name">
						<Input v-model="editWorkForm.Name"></Input>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="作业描述" class="forms" prop="Describe">
            <!-- <Input type="textarea" v-model="editWorkForm.Describe" :autosize="{minRows: 5,maxRows: 5}"></Input> -->
            <weditorModule ref="editEditor" :keys="2"></weditorModule>
					</FormItem>
          </Col>
          <Col span="24">
					<FormItem label="知识点" class="forms" prop="Knowledges">
            <Select v-model="editWorkForm.Knowledges" multiple :placeholder="'请选择知识点'">
                <Option v-for="item in KnowledgeList" :value="item.SelectId" :key="item.SelectId">{{ item.Name }}</Option>
            </Select>
					</FormItem>
          </Col>
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editWork=false">取消</Button>
            <Button type="primary" size="large" @click="editWorkHandleSubmit('editWorkForm')">确定</Button>
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
import {CourseSelectModuleJS} from "./CourseSelectModuleJS.js";
// 引入表格模块配置项
import {CourseTableModuleJS} from "./CourseTableModuleJS.js";
// 引入课程内容组件
import courseInfo from "@/components/courseInfo/courseInfo.vue";
// 引入能力点选择模态框
import abilityModal from "@/modal/abilityModal/abilityModal.vue";
// 引入富文本编辑器
import weditorModule from "@/components/weditorModule/weditorModule.vue";
// 引入API
import * as Http from "@/api/HttpService.js";
import { API } from "@/api/HttpConfig";
export default {
  computed: {
      uploadFile: function() {
        return API.uploadFile+'?filesname=Syllabus';
      }
  },
  data: function() {
    return {
      selectModule: (CourseSelectModuleJS.bind(this))(),
      tableModule: (CourseTableModuleJS.bind(this))(),
      addCourse:false,
      addCourseForm:{
        Code:"",
        Describe:"",
        Name:"",
        Syllabus:"",
        SyllabusPath:"",
        SubjectName:"",//学科名称
        SubjectId:null //学科编号
      },
      LocalSubjectId:null,
      editCourse:false,
        editCourseForm:{
          Id:null,
          SubjectName:"",
          Code:"",
          Describe:"",
          Name:"",
          Syllabus:"",
          SyllabusPath:"",
          VersionNumber: null,
          SubjectId:null //学科编号
        },
      nowPage: 1,
        pageSize: 10,
      findCourseForm:{
          Code:"",
          Name:"",
          CreatedByName:""
        },
      rules: {
          Code: [
            { required: true, message: "课程编号不能为空", trigger: "blur" }
          ],
          Describe: [
            { required: true, message: "描述不能为空", trigger: "blur" }
          ],
          Name: [
            { required: true, message: "课程名称不能为空", trigger: "blur" }
          ],
          SubjectId: [
            { required: true, message: "学期类型不能为空", trigger: "change", type: 'number' }
          ]
      },
      //课程学科类型
      subjectTypeArr:[
        // { name:'软件工程',value : 1 },
        // { name:'夏季学期',value : 2 },
        // { name:'秋季学期',value : 3 }
      ],
      // 课程内容
      courseInfo: false,
      showForm:{
        Id:null,
        Code:"",
        Name:"",
        Describe:"",
        Syllabus:"",
        SyllabusPath:"",
        CreatedByName: "",
        CreatedOn: "",
        SubjectId:null,//学科编号，
         SubjectName:""
      },
      // 章节==================================
      addChapter:false,
      addChapterForm: 
      { 
        ChapterLevel: null, 
        CourseId: null, 
        Name: "", 
        ParentId: null, 
        Describe: "" 
      },
      editChapter:false,
      editChapterForm: {
          Id: null, 
          ChapterLevel: null, 
          CourseId: null, 
          Name: "", 
          ParentId: null,  
          Describe: "", 
          VersionNumber: null
      },
      chapterrules: {
          Name: [
              { required: true, message: "章节名称不能为空", trigger: "blur" }
          ]
      },
      // 知识点===========================
      addKnowledge:false,
      addKnowledgeForm:{
           Name:"",
          CourseId:null,
          AbilityName:"",
          AbilityId:null
      },
      editKnowledge:false,
      editKnowledgeForm:{
           Id:null,
           Name:"",
           CourseId:null,
           AbilityName:"",
           AbilityId:null,
           VersionNumber: null
      },
      knowledgerules: {
           Name: [
          { required: true, message: "知识点名称不能为空", trigger: "blur" }
          ],
           AbilityName: [
           { required: true, message: "能力点不能为空", trigger: "blur" }
           ]
      },
      // 能力点=============================================================
      abilityModalVisible: false,
      // 作业===============================================================
      addWork:false,
      addWorkForm:{
        Describe:"",
        ChapterId:null,
        Name:"",
        Knowledges:""
      },
	    editWork:false,
      editWorkForm:{
			  Id:null,
        Describe:"",
        ChapterId:null,
        Name:"",
        Knowledges:"",
			  VersionNumber: null
      },
      workrules: {
        Knowledges: [
          { required: true, message: "知识点不能为空", trigger: "change",type: "array" }
        ],
        Name: [
          { required: true, message: "作业名称不能为空", trigger: "blur" }
        ]
	    },
      KnowledgeList:[],
      subjectId:null
    };
  },
  mounted:function(){
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "教学管理",
      "课程管理"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getCourseList();
       //调用获取学科列表方法
      this.getAllSubjects();
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule,
    courseInfo: courseInfo,
    abilityModal: abilityModal,
    weditorModule:weditorModule
  },
  methods: {
    //获取数据
    GetData:function(){
      this.abilityModalVisible=true;
      this.$refs.ChildAbility.getAbilityList();
    },
    handleAddSyllabusSuccess: async function(res, file) {
        if (res.StatusCode == 1) {
          this.addCourseForm.SyllabusPath = res.Data;
          this.addCourseForm.Syllabus = res.FileName;
        }
    },
    // 编辑上传成功钩子 异步方法
    handleEditSyllabusSuccess: async function(res, file) {
        console.log(res)
        if (res.StatusCode == 1) {
          this.editCourseForm.SyllabusPath = res.Data;
          this.editCourseForm.Syllabus = res.FileName;
          console.log(this.editCourseForm)
        }
    },
    // 文件格式验证失败钩子
    handleFormatError: function(res, file) {
        console.log(res)
        this.$Message.error("文件格式不正确");
    },
	  //   添加表单验证方法
    addCourseHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addCourseAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改表单验证方法
    editCourseHandleSubmit: async function(name) {
      var result = await this.$refs.editCourseForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editCourseAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 查询方法
    find: function(a) {
      console.log(a);
      this.findCourseForm.Code = a.Code ?
        a.Code : "";
      this.findCourseForm.Name = a.Name ?
        a.Name : "";
      this.findCourseForm.CreatedByName = a.CreatedByName ?
        a.CreatedByName : "";
	  this.getCourseList();
    },
	  // 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getCourseList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getCourseList();
    },
    //添加课程时获取学科列表
    getAllSubjects:function(){
      var params = {id:1,
      SubjectId: 1}
     Http.getAllSubjectList(params).then(res => {
        if(res.StatusCode==1){
            this.subjectTypeArr = res.Data.List;
             console.log("进来了");
              console.log(this.subjectTypeArr);
          }
      });
    },
    // 添加课程
    addCourseAction: function() {
   
      var params = this.addCourseForm;
      Http.postCourse(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addCourseForm = {
            Code:"",
            Describe:"",
            Name:"",
            Syllabus:"",
            SyllabusPath:"",
            SubjectId:null //学科
          };
		  this.addCourse = false;
		  this.$refs["addCourseForm"].resetFields();
          this.getCourseList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 编辑课程
    editCourseAction: function() {
        var params = this.editCourseForm;
        Http.putCourse(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
				this.editCourseForm = {
					  Id:null,
            Code:"",
            Describe:"",
            Name:"",
            Syllabus:"",
            SyllabusPath:"",
					  VersionNumber: null
				};
				this.editCourse = false;
				this.$refs["editCourseForm"].resetFields();
                this.getCourseList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 查询课程
    getCourseList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        Code: this.findCourseForm.Code,
        CreatedByName: this.findCourseForm.CreatedByName,
        Name: this.findCourseForm.Name
      };
      Http.getCourseList(params).then(res => {
        if(res.StatusCode==1){
          
            this.tableModule.tableContent = res.Data.List;
              console.log("课程");
            console.log(res.Data.List);
            if(res.Data.List.length>0){
              //this.subjectId = res.Data.List[0].SubjectId;
               console.log(12334);
               console.log(this.subjectId);
            }
            this.tableModule.count = res.Data.Total;
        }
      });
    },
    // 删除课程
    deleteCourseAction:function(id){
        var params = {
            id:id
        }
        Http.deleteCourse(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("删除成功");
                this.getCourseList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    //章节===================================================================
    // 添加章节
    addChapterModal:function(a){
      this.addChapterForm = a;
      this.$refs['addChapterForm'].resetFields();
      this.addChapter=true;
    },
    editChapterModal:function(a){
      this.editChapterForm = a;
      this.$refs['editChapterForm'].resetFields();
      this.editChapter=true;
    },
    // 添加章节表单验证方法
    addChapterHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addChapterAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改章节表单验证方法
    editChapterHandleSubmit: async function(name) {
      var result = await this.$refs.editChapterForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editChapterAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 添加章节
    addChapterAction: function() {
      var params = this.addChapterForm;
      Http.postChapter(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addChapterForm = {
            ChapterLevel:null,
            CourseId:null,
            Name:"",
            ParentId:null,
            Describe:""
          };
		  this.addChapter = false;
		  this.$refs["addChapterForm"].resetFields();
          this.$refs.CourseDetail.getChapters();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 编辑章节
    editChapterAction: function() {
        var params = this.editChapterForm;
        Http.putChapter(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
                this.editChapterForm = {
                    Id:null,
                    ChapterLevel:null,
                    CourseId:null,
                    Name:"",
                    ParentId:null,
                    Describe:"",
                    VersionNumber: null
                };
                this.editChapter = false;
                this.$refs["editChapterForm"].resetFields();
                this.$refs.CourseDetail.getChapters();
            }
            else{
                this.$Message.error(res.Message);
            }
        });
    },
    // 删除章节
    deleteChapterAction:function(id){
      this.$Modal.confirm({
        title: "<span style='color:red'><b>提示</b></span>",
        content: "确定要删除当前章节及子章节吗？",
        onOk: () => {
          var params = {
            id:id
          }
          Http.deleteChapter(params).then(res=>{
              if(res.StatusCode==1){
                  this.$Message.success("删除成功");
                  this.$refs.CourseDetail.getChapters();
              }
              else{
                  this.$Message.error(res.Message);
              }
          })
        },
        onCancel: () => {
        }
      })   
    },
    //知识点===================================================================
    // 添加知识点
    addKnowledgeModal:function(a){
      this.addKnowledgeForm = a;
      this.$refs['addKnowledgeForm'].resetFields();
      this.addKnowledge=true;
    },
    editKnowledgeModal:function(a){
      this.editKnowledgeForm = a;
      this.$refs['editKnowledgeForm'].resetFields();
      this.editKnowledge=true;
    },
    //   添加知识点表单验证方法
    addKnowledgeHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addKnowledgeAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改知识点表单验证方法
    editKnowledgeHandleSubmit: async function(name) {
      var result = await this.$refs.editKnowledgeForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editKnowledgeAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 添加知识点
    addKnowledgeAction: function() {
      var params = this.addKnowledgeForm;
      Http.getCKname(params).then(res => {
        if(res.StatusCode==1){
            if( res.Data.Total==0){
                Http.postKnowledge(params).then(res => {
                  if (res.StatusCode == 1) {
                    this.$Message.success(res.Message);
                    this.addKnowledgeForm = {
                      Name:"",
                      CourseId:"",
                      AbilityId:""
                    };
            this.addKnowledge = false;
            this.$refs["addKnowledgeForm"].resetFields();
                this.$refs.CourseDetail.getKnowledgeList();
                this.$refs.CourseDetail.getCourseKnowledgeList();
              }
              else{
                  this.$Message.error(res.Message);
              }
            });
                  }
                  else{
                    this.$Message.error('知识点已存在');
                  }
              }
            });
      
    },
    // 编辑知识点
    editKnowledgeAction: function() {
        var params = this.editKnowledgeForm;
        Http.getCKname(params).then(res => {
        if(res.StatusCode==1){
            if( res.Data.Total==0){
                Http.putKnowledge(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
				this.editKnowledgeForm = {
					Id:null,
            Name:"",
            CourseId:"",
            AbilityId:"",
					VersionNumber: null
				};
				this.editKnowledge = false;
				this.$refs["editKnowledgeForm"].resetFields();
                this.$refs.CourseDetail.getKnowledgeList();
                this.$refs.CourseDetail.getCourseKnowledgeList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
                  }
                  else{
                    this.$Message.error('知识点已存在');
                  }
              }
            });
    },
    // 删除知识点
    deleteKnowledgeAction:function(id){
        var params = {
            id:id
        }
        Http.deleteKnowledge(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("删除成功");
                this.$refs.CourseDetail.getKnowledgeList();
                this.$refs.CourseDetail.getCourseKnowledgeList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 能力点=========================================================
    // 选择的能力点后点击确定
    abilityModalSubmit: function(a) {
      console.log(a)
      if(this.addKnowledge){
        this.addKnowledgeForm.AbilityName = a.Name;
        this.addKnowledgeForm.AbilityId = a.Id;
      }else{
        this.editKnowledgeForm.AbilityName = a.Name;
        this.editKnowledgeForm.AbilityId = a.Id;
      }
      this.abilityModalVisible = false;
    },
    // 作业===========================================================
    // 添加作业
    addWorkModal:function(a,knowledges){
      this.addWorkForm = a;
      this.$refs.addEditor.setContent('');
      this.KnowledgeList = knowledges;
      this.$refs['addWorkForm'].resetFields();
      this.addWork=true;
    },
    editWorkModal:function(a,knowledges){
      this.editWorkForm = a;
      this.$refs.editEditor.setContent(this.editWorkForm.Describe);
      this.KnowledgeList = knowledges;
      this.$refs['editWorkForm'].resetFields();
      this.editWork=true;
    },
    //   添加作业表单验证方法
    addWorkHandleSubmit: function(name) {
      this.addWorkForm.Describe = this.$refs.addEditor.getContent();
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addWorkAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改作业表单验证方法
    editWorkHandleSubmit: async function(name) {
      this.editWorkForm.Describe = this.$refs.editEditor.getContent();
      var result = await this.$refs.editWorkForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editWorkAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 添加作业
    addWorkAction: function() {
      var params = this.addWorkForm;
      console.log(this.addWorkForm);
      Http.postWork(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.addWorkForm = {
            Describe:"",
            ChapterId:"",
            Name:""
          };
		  this.addWork = false;
		  this.$refs["addWorkForm"].resetFields();
          this.$refs.CourseDetail.getWorkByChapter();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 编辑作业
    editWorkAction: function() {
        var params = this.editWorkForm;
        Http.putWork(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success(res.Message);
				this.editWorkForm = {
					Id:null,
            Describe:"",
            ChapterId:"",
            Name:"",
					VersionNumber: null
				};
				this.editWork = false;
				this.$refs["editWorkForm"].resetFields();
                this.$refs.CourseDetail.getWorkByChapter();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 删除作业
    deleteWorkAction:function(id){
        var params = {
            id:id
        }
        Http.deleteWork(params).then(res=>{
            if(res.StatusCode==1){
                this.$Message.success("删除成功");
                this.$refs.CourseDetail.getWorkByChapter();
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
@import "./CoursePage.scss";
</style>