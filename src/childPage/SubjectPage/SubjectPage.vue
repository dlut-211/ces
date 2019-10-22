
<template>
  <div class="SubjectPage">
    <!-- 获取学科能力点 -->
    <Modal v-model="showAbilityList" title="学科能力点" width="800px" :mask-closable="false">
      <div style="text-align:right">
        <Button type="primary" size="small" @click="addAbility=true">添加能力点</Button>
      </div>
      <Table height="500" :columns="workColumn" :data="AbilityList"></Table>
      <div slot="footer">
        <Button type="ghost" size="large" @click="showAbilityList=false">取消</Button>
        <Button type="primary" size="large" @click="showAbilityList=false">确定</Button>
      </div>
    </Modal>
    <!-- 添加能力点 -->
    <Modal v-model="addAbility" title="添加能力点" width="500px" :mask-closable="false">
      <Form
        :model="addAbilityForm"
        label-position="left"
        :label-width="100"
        :rules="rules"
        ref="addAbilityForm"
      >
        <Row>
          <Col span="12">
            <FormItem label="能力点名称‎" class="forms" prop="name">
              <Input v-model="addAbilityForm.name"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="能力点描述" class="forms" prop="description">
              <Input
                type="textarea"
                v-model="addAbilityForm.description"
                :autosize="{minRows: 5,maxRows: 5}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="addAbility=false">取消</Button>
        <Button type="primary" size="large" @click="addAbilityHandleSubmit('addAbilityForm')">确定</Button>
      </div>
    </Modal>
    <!-- 编辑能力点 -->
    <Modal v-model="editAbility" title="编辑能力点" width="800px" :mask-closable="false">
      <Form
        :model="editAbilityForm"
        label-position="left"
        :label-width="100"
        :rules="rules"
        ref="editAbilityForm"
      >
        <Row>
          <Col span="12">
            <FormItem label="能力点名称‎" class="forms" prop="name">
              <Input v-model="editAbilityForm.name"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="能力点描述" class="forms" prop="description">
              <Input
                type="textarea"
                v-model="editAbilityForm.description"
                :autosize="{minRows: 5,maxRows: 5}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="editAbility=false">取消</Button>
        <Button type="primary" size="large" @click="editAbilityHandleSubmit('editAbilityForm')">确定</Button>
      </div>
    </Modal>

    <selectModule :object="selectModule" @submit="find"></selectModule>
    <tableModule
      :object="tableModule"
      @changePage="changePage"
      @changeSize="changeSize"
      @addSubject="addSubject=true;$refs['addSubjectForm'].resetFields();"
    ></tableModule>
    <Modal v-model="addSubject" title="添加学科" width="800px" :mask-closable="false">
      <Form
        :model="addSubjectForm"
        label-position="left"
        :label-width="100"
        :rules="rules"
        ref="addSubjectForm"
      >
        <Row>
          <Col span="12">
            <FormItem label="学科代码‎" class="forms" prop="optionCode">
              <Input v-model="addSubjectForm.optionCode"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="学科名称" class="forms" prop="optionValue">
              <Input v-model="addSubjectForm.optionValue"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="addSubject=false">取消</Button>
        <Button type="primary" size="large" @click="addSubjectHandleSubmit('addSubjectForm')">确定</Button>
      </div>
    </Modal>
    <Modal v-model="editSubject" title="编辑学科" width="800px" :mask-closable="false">
      <Form
        :model="editSubjectForm"
        label-position="left"
        :label-width="100"
        :rules="rules"
        ref="editSubjectForm"
      >
        <Row>
          <Col span="12">
            <FormItem label="学科代码‎" class="forms" prop="optionCode">
              <Input v-model="editSubjectForm.optionCode"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="学科名称" class="forms" prop="optionValue">
              <Input v-model="editSubjectForm.optionValue"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="editSubject=false">取消</Button>
        <Button type="primary" size="large" @click="editSubjectHandleSubmit('editSubjectForm')">确定</Button>
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
import { SubjectSelectModuleJS } from "./SubjectSelectModuleJS.js";
// 引入表格模块配置项
import { SubjectTableModuleJS } from "./SubjectTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      selectModule: SubjectSelectModuleJS.bind(this)(),
      tableModule: SubjectTableModuleJS.bind(this)(),
      addSubject: false,
      addSubjectForm: {
        optionCode: "",
        optionValue: "",
        optionType: "Subject",
        optionTypeName: "学科"
      },
      editSubject: false,
      showAbilityList: false,
      AbilityList: [],
      findAbilityList: {
        subjectId: ""
      },
      findAbilityForm: {
        name: "",
        subjectId: "",
        description: "",
        subject_optionValue: ""
      },
      addAbility: false,
      addAbilityForm: {
        name: "",
        description: "",
        subjectId: null
      },
      editAbility: false,
      editAbilityForm: {
        id: null,
        name: "",
        description: "",
        subjectId: this.$route.params.subjectId,
        versionNumber: null
      },
      editSubjectForm: {
        id: null,
        optionCode: "",
        optionValue: "",
        optionType: "Subject",
        optionTypeName: "学科",
        versionnumber: null
      },
      nowPage: 1,
      pageSize: 10,
      findSubjectForm: {
        optionCode: "",
        optionValue: ""
      },
      rules: {
        optionCode: [
          { required: true, message: "学科代码‎不能为空", trigger: "blur" }
        ],
        optionValue: [
          { required: true, message: "学科名称不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "‎不能为空", trigger: "blur" }
        ],
        subjectId: [
          { required: true, message: "学科编号不能为空", trigger: "blur" }
        ]
      },
      workColumn: [
        { title: "学科名称", key: "subject_optionValue", align: "center" },
        { title: "能力点名称‎", key: "name", align: "center" },
        { title: "能力点描述", key: "description", align: "center" },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    margin: "0 5px"
                  },
                  on: {
                    click: () => {
                      this.editAbilityForm = {
                        id: params.row.id,
                        name: params.row.name,
                        description: params.row.description,
                        subjectId: params.row.subjectId,
                        // versionNumber: this.stringToByte(
                        //   params.row.versionNumber
                        // )
                      };
                      this.editAbility = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#ed3f14",
                    cursor: "pointer",
                    margin: "0 5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "<span style='color:red'><b>提示</b></span>",
                        content: "确定要删除信息吗？",
                        onOk: () => {
                          this.deleteAbilityAction(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted: function() {
    this.$store.commit("changeBreadCrumb", ["首页", "学科管理", "学科"]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    
    this.getSubjectList();
    
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
    //   添加货源表单验证方法
    addSubjectHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addSubjectAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
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
    editSubjectHandleSubmit: async function(name) {
      var result = await this.$refs.editSubjectForm.validate(valid => {});
      console.log(result)
      if (result) {
        console.log(this);
        this.editSubjectAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
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
      (this.findSubjectForm.optionCode = a.optionCode ? a.optionCode : ""),
        (this.findSubjectForm.optionValue = a.optionValue ? a.optionValue : ""),
        (this.findAbilityForm.subject_optionValue = a.subject_optionValue
          ? a.subject_optionValue
          : ""),
        (this.findAbilityForm.name = a.name ? a.name : "");
      this.findAbilityForm.subjectId = a.subjectId ? a.subjectId : "";
      (this.findAbilityForm.description = a.description ? a.description : ""),
        this.getSubjectList();
      this.getSubjectAbility();
    },
    // 改变页码
    changePage: function(page) {
      this.nowPage = page;
      this.getSubjectList();
      this.getSubjectAbility();
    },
    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getSubjectList();
      this.getSubjectAbility();
    },
    // 添加学科
    addSubjectAction: function() {
      var params = this.addSubjectForm;
      var params1 = {
        optionCode: this.addSubjectForm.optionCode,
        optionValue: "",
      };
      console.log(params1)
      Http.getSubjectList(params1).then(res => {
        console.log(res)
        if (res.statusCode == 1) {
          if (res.data.totalElements == 0) {
            Http.postSubject(params).then(res => {
              console.log(res)
              if (res.statusCode == 1) {
                this.$Message.success(res.message);
                this.addSubjectForm = {
                  optionCode: "",
                  optionValue: "",
                  optionType: "Subject",
                  optionTypeName: "学科"

                };
                this.addSubject = false;
                this.$refs["addSubjectForm"].resetFields();
                this.getSubjectList();
              } else {
                this.$Message.error(res.message);
              }
            });
          } else {
            this.$Message.error("学科已存在！");
          }
        }
      });
    },
    // 添加能力点
    addAbilityAction: function() {
      this.addAbilityForm.subjectId = this.findAbilityList.subjectId;
      var params = this.addAbilityForm;
      Http.getSubjectAbility(params).then(res => {
        if (res.statusCode == 1) {
          if (res.data.totalElements == 0) {
            Http.postAbility(params).then(res => {
              if (res.statusCode == 1) {
                this.$Message.success(res.message);
                this.addAbilityForm = {
                  name: "",
                  description: "",
                  subjectId: this.findAbilityList.subjectId
                };
                this.addAbility = false;
                this.$refs["addAbilityForm"].resetFields();
                this.getSubjectAbility1();
              } else {
                this.$Message.error(res.message);
              }
            });
          } else {
            this.$Message.error("能力点已存在！");
          }
        }
      });
    },
    // 编辑学科
    editSubjectAction: function() {
      var params = this.editSubjectForm;
      var params1 = {
        optionCode: this.editSubjectForm.optionCode,
        optionValue: "",
      };
      Http.getSubjectList(params1).then(res => {
        if (res.statusCode == 1) {
          if(res.data.totalElements != 0){
            if(res.data.content[0].id == this.editSubjectForm.id){
              Http.putSubject(params).then(res => {
              console.log(res)
              if (res.statusCode == 1) {
                this.$Message.success(res.message);
                this.editSubjectForm = {
                  id: null,
                  optionCode: "",
                  optionValue: "",
                  optionType: "Subject",
                  optionTypeName: "学科",
                  versionnumber: null
                };
                this.editSubject = false;
                this.$refs["editSubjectForm"].resetFields();
                this.getSubjectList();
              } else {
                this.$Message.error(res.message);
              }
            })}
            else{
              this.$Message.error("学科代码已存在！");
            }
          }

          else if (res.data.totalElements == 0) {
            Http.putSubject(params).then(res => {
              console.log(res)
              if (res.statusCode == 1) {
                this.$Message.success(res.message);
                this.editSubjectForm = {
                  id: null,
                  optionCode: "",
                  optionValue: "",
                  optionType: "Subject",
                  optionTypeName: "学科",
                  versionnumber: null
                };
                this.editSubject = false;
                this.$refs["editSubjectForm"].resetFields();
                this.getSubjectList();
              } else {
                this.$Message.error(res.message);
              }
            });
          } else {
            this.$Message.error("学科代码已存在！");
          }
        }
      });
    },
    // 编辑能力点
    editAbilityAction: function() {
      var params = this.editAbilityForm;
      Http.putAbility(params).then(res => {
        if (res.statusCode == 1) {
          console.log(res)
          this.$Message.success(res.message);
          this.editAbilityForm = {
            id: null,
            name: "",
            description: "",
            subjectId: this.findAbilityList.subjectId,
            versionNumber: null
          };
          this.editAbility = false;
          this.$refs["editAbilityForm"].resetFields();
          this.getSubjectAbility1();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 查询学科---------------------
    getSubjectList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        optionCode: this.findSubjectForm.optionCode,
        optionValue: this.findSubjectForm.optionValue
      };
      Http.getSubjectList(params).then(res => {
        console.log(res)
        if (res.statusCode == 1) {
          this.tableModule.tableContent = res.data.content;
          this.tableModule.count = res.data.totalElements;
        }
      });
    },
    
    // 删除学科
    deleteSubjectAction: function(id) {
      var params = {
        id: id
      };
      Http.deleteSubject(params).then(res => {
        if(res == null){
          this.$Message.error("无法删除已使用的学科");
        }
        if (res.statusCode == 1) {
          this.$Message.success("删除成功");
          if(this.tableModule.count%this.pageSize == 1){
            console.log(this.nowPage)
            this.nowPage = 1;
            this.getSubjectList();
          }else{
            this.getSubjectList();
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 删除能力点
    deleteAbilityAction: function(id) {
      var params = {
        id: id
      };
      Http.deleteAbility(params).then(res => {
        if (res.statusCode == 1) {
          this.$Message.success("删除成功");
          this.getSubjectAbility1();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //获取学科能力点
    getSubjectAbility1: function() {
      var params = this.findAbilityList;
      Http.getSubjectAbility(params).then(res => {
        console.log(res)
        if (res.statusCode == 1) {
          console.log(res)
          this.AbilityList = res.data.content;
          for(let i=0;i<this.AbilityList.length;i++){
            this.AbilityList[i].subject_optionValue = this.subject_optionValue
          }
          console.log(this.AbilityList)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./SubjectPage.scss";
</style>
