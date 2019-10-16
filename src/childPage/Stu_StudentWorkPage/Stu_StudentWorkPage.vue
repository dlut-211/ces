
<template>
  <div class="Stu_StudentWorkPage">
    <!-- <Modal v-model="classRoomInfoVisible" title="课堂内容" width="1200px" :mask-closable="false" :footer-hide="true">
        <classRoomInfo >
        </classRoomInfo>
    </Modal>-->
    <!-- <selectModule :object="selectModule" @submit="find"></selectModule>
    <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addStu_StudentWork="addStu_StudentWork=true;$refs['addStu_StudentWorkForm'].resetFields();"></tableModule>-->

    <div>
      <Modal v-model="ShowChart" title="图表统计" width="800px" :mask-closable="false">
        <div id="EchartsTestPaper" style="width: 600px;height:400px;"></div>
        <div slot="footer"></div>
      </Modal>
      <Modal v-model="SubmitWork" title="上传作业" width="800px" :mask-closable="false">
        <Form :model="SubmitWorkForm" label-position="left" :label-width="100">
          <Row>
            <Col span="12">
              <FormItem label="作业" class="forms" prop="WorkPath">
                <Upload
                  :action="uploadFile"
                  :headers="{Authorization:$store.state.token}"
                  style="float: left; margin-right: 20px;"
                  :show-upload-list="false"
                  :on-success="handleAddSyllabusSuccess"
                  :on-format-error="handleFormatError"
                >
                  <Button type="ghost" icon="ios-cloud-upload-outline">点击上传文件</Button>
                </Upload>
                <div v-if="SubmitWorkForm.WorkPath">
                  <a :href="SubmitWorkForm.WorkPath" target="blank">{{SubmitWorkForm.Syllabus}}</a>
                </div>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="留言" class="forms" prop="WorkMessage">
                <Input v-model="editStudentWorkForm.WorkMessage"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" size="large" @click="SubmitWork=false">取消</Button>
          <Button type="primary" size="large" @click="SubmitWorkAction()">确定</Button>
        </div>
      </Modal>

      <div style="text-align:right;height:40px">
        <Button type="primary" style="height:30px;" size="large" @click="getEchartsTestPaper()">图表统计</Button>
      </div>
                <Row>
                    <!-- <Col span="6">
                        <Table height="500" highlight-row :columns="mainChpterColumn" :data="mainChapters" @on-current-change=selectChapter></Table>
                    </Col> -->
                    <Col span="18">
                        <Table height="500" :columns="workColumn" :data="workList"></Table>
                    </Col>
                </Row>
            </div>
      <Row>
        <Col span="6">
          <Table
            height="500"
            highlight-row
            :columns="mainChpterColumn"
            :data="mainChapters"
            @on-current-change="selectChapter"
          ></Table>
        </Col>
        <Col span="18">
          <Table height="500" :columns="workColumn" :data="workList"></Table>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import classRoomInfo from "@/components/classRoomInfo/classRoomInfo.vue";
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import { Stu_StudentWorkSelectModuleJS } from "./Stu_StudentWorkSelectModuleJS.js";
// 引入表格模块配置项
import { Stu_StudentWorkTableModuleJS } from "./Stu_StudentWorkTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
import { API } from "@/api/HttpConfig";
export default {
  computed: {
    uploadFile: function() {
      return API.uploadFile + "?filesname=Syllabus";
    }
  },
  data: function() {
    return {
      selectModule: Stu_StudentWorkSelectModuleJS.bind(this)(),
      tableModule: Stu_StudentWorkTableModuleJS.bind(this)(),
      addStu_StudentWork: false,
      classRoomInfoVisible: true,
      StudentWorkCount: "",
      ClassRoomWorkCount: "",
      Score: "",
      WorkMessage: "",
      nowPage: 1,
      pageSize: 10,
      TestScore: "",
      SubmitWork: false,
      ShowChart: false,
      SubmitWorkForm: {
        StudentWorkScore: 100,
        CasePassCount: "",
        CodeRowNumber: "",
        Cpmplexity: "",
        Syllabus: "",
        WorkPath: "",
        SubmitTime: "",
        UseTime: "",
        StudentWorkId: ""
      },
      layouttime: "",
      editStudentWorkForm: {
        Id: "",
        ClassRoomStudentId: "",
        ClassRoomWorkId: "",
        Score: "",
        WorkMessage: "",
        VersionNumber: ""
      },
      studentWorkInfo: [],
      VerSionNum: "",
      mainChpterColumn: [
        {
          title: "主章节",
          key: "Name",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight:
                      params.row.ChapterLevel == 1 ? "bold" : "normal",
                    paddingLeft: this.paddingValue(params.row.ChapterLevel)
                  }
                },
                params.row.Name
              )
            ]);
          }
        }
      ],
      mainChapters: [],
      workList: [],
      workColumn: [
        {
          title: "作业名称",
          key: "WorkName",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: params.row.Status == 1 ? "#495060" : "#2d8cf0",
                    cursor: params.row.Status == 1 ? "auto" : "pointer",
                    margin: "0 5px"
                  },
                  on: {
                    click: () => {
                      if (params.row.Status == 2) {
                        this.openStudentWorkDetailAction(params.row);
                      }
                    }
                  }
                },
                params.row.WorkName
              )
            ]);
          }
        },
        { title: "描述", key: "Description" },
        {
          title: "成绩",
          key: "Score",
          field: "right",
          width: 100,
          render: (h, params) => {
            if (params.row.Score == null) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#808080",
                      margin: "0 5px"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "未评分"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      click: () => {}
                    }
                  },
                  params.row.Score
                )
              ]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          field: "right",
          width: 140,
          render: (h, params) => {
            if(params.row.Score==null){
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#04B404",
                    cursor: "pointer",
                    margin: "0 5px"
                    // display: (params.row.Status == 1) ?"inline":"none"
                  },
                  on: {
                    click: () => {
                      this.editStudentWorkForm = {
                        Id: params.row.StudentWorkId,
                        ClassRoomStudentId: "",
                        ClassRoomWorkId: "",
                        Score: "",
                        WorkMessage: "",
                        VersionNumber: ""
                      };
                      this.layouttime = params.row.LayoutTime;
                      this.SubmitWorkForm = {
                        StudentWorkScore: 100,
                        CasePassCount: "",
                        CodeRowNumber: "",
                        Cpmplexity: "",
                        Syllabus: "",
                        WorkPath: "",
                        SubmitTime: "",
                        UseTime: "",
                        StudentWorkId: params.row.StudentWorkId
                      };
                      this.SubmitWork = true;
                      this.getstudentWork();
                    }
                  }
                },
                "上传作业"
              )
            ]);
            }
            else{
              return h("div", [
              h(
                "span",
                "上传作业"
              )
              ])
            }
          }
        }
      ]
    };
  },
  mounted: function() {
    this.$store.commit("changeBreadCrumb", ["首页", "", "学生作业管理"]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getWorkByChapter();
    this.getMainChaperts();
    this.getClassRoomWork();
    this.getStudentWorkCount();
  },
  // components: {
  //   selectModule: selectModule,
  //   tableModule: tableModule
  // },
  methods: {
    getClassRoomWork: function() {
      var params = {
        ClassRoomId: this.$route.params.ClassRoomId
      };
      Http.getClassRoomWork(params).then(res => {
        if (res.StatusCode == 1) {
          this.ClassRoomWorkCount = res.Data.Total;
        }
      });
    },
    getStudentWorkCount: function() {
      var params = {
        StudentId: this.$store.state.id,
        ClassRoomId: this.$route.params.ClassRoomId
      };
      Http.getStudentCompletedWork(params).then(res => {
        if (res.StatusCode == 1) {
          this.StudentWorkCount = res.Data.StudentCompletedCount;
        }
      });
    },
    getEchartsTestPaper: function() {
      this.ShowChart = true;

      let barTestPaper = this.$echarts.init(
        document.getElementById("EchartsTestPaper")
      );
      barTestPaper.setOption({
        title: {
          text: "课程作业完成进度图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        color: ["#1b5e20", "#e53935"],
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: "center",
          data: ["已完成", "未完成"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: this.StudentWorkCount, name: "已完成" },
              {
                value: this.ClassRoomWorkCount - this.StudentWorkCount,
                name: "未完成"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    handleAddSyllabusSuccess: async function(res, file) {
      if (res.StatusCode == 1) {
        this.SubmitWorkForm.WorkPath = res.Data;
        this.SubmitWorkForm.Syllabus = res.FileName;
      }
    },
    // 编辑上传成功钩子 异步方法
    handleEditSyllabusSuccess: async function(res, file) {
      console.log(res);
      if (res.StatusCode == 1) {
        this.editCourseForm.WorkPath = res.Data;
        this.editCourseForm.Syllabus = res.FileName;
        console.log(this.editCourseForm);
      }
    },
    // 文件格式验证失败钩子
    handleFormatError: function(res, file) {
      console.log(res);
      this.$Message.error("文件格式不正确");
    },
    //   添加货源表单验证方法
    addStu_StudentWorkHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addStu_StudentWorkAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    //获取StudentWork的VersionNum
    getstudentWork: function() {
      var params = {
        Id: this.editStudentWorkForm.Id
      };
      Http.getStudentWorkList(params).then(res => {
        if (res.StatusCode == 1) {
          this.Score = res.Data.List[0].Score;
          this.WorkMessage = res.Data.List[0].WorkMessage;
          console.log("this.Score" + this.Score);
          console.log("res.Data.List[0].Score" + res.Data.List[0].Score);
        }
      });
    },

    //提交作业
    SubmitWorkAction: function() {
      console.log("我在这里" + this.Score);
      this.SubmitWorkForm.SubmitTime = this.dateFormatFinal(new Date());
      var submitTime = new Date().getTime();
      var laytime = new Date(this.layouttime).getTime();
      this.SubmitWorkForm.UseTime = parseInt((submitTime - laytime) / 1000);

      var params = {
        StudentWorkScore: this.Score,
        StudentWorkMessage: this.WorkMessage,
        CasePassCount: "",
        CodeRowNumber: "",
        Cpmplexity: "",
        WorkPath: this.SubmitWorkForm.WorkPath,
        SubmitTime: this.SubmitWorkForm.SubmitTime,
        UseTime: this.SubmitWorkForm.UseTime,
        StudentWorkId: this.SubmitWorkForm.StudentWorkId
      };
      console.log("秒数：" + this.SubmitWorkForm.UseTime);
      Http.postStudentWorkDetail(params).then(res => {
        if (res.StatusCode == 1) {
          this.$Message.success(res.Message);
          this.SubmitWorkForm = {
            StudentWorkScore: 100,
            CasePassCount: "",
            CodeRowNumber: "",
            Cpmplexity: "",
            Syllabus: "",
            WorkPath: "",
            SubmitTime: "",
            UseTime: "",
            StudentWorkId: ""
          };
          this.SubmitWork = false;
          //
        }
      });
    },
    // 查询方法

    // 改变页码
    changePage: function(page) {
      this.nowPage = page;
      this.getStu_StudentWorkList();
    },
    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getStu_StudentWorkList();
    },
    getMainChaperts: function() {
      console.log("zzzzzz" + this.$route.params.Code);
      this.chooseChapter = false;
      this.mainChapters = [];
      this.workList = [];
      var params = {
        courseId: this.$route.params.Code
      };
      Http.getChapterMain(params).then(res => {
        if (res.StatusCode == 1) {
          this.mainChapters = res.Data.List;
        }
      });
    },
    // 作业==============
    selectChapter: function(now, old) {
      if (now) {
        this.chooseChapter = true;
        this.chooseChapterId = now.Id;

        this.getWorkByChapter();
      }
    },
    getWorkByChapter: function() {
      var params = {
        StudentId: this.$store.state.id,
        chapterId: this.chooseChapterId,
        ClassRoomId: this.$route.params.ClassRoomId
      };
      Http.getWorkByChapter(params).then(res => {
        if (res.StatusCode == 1) {
          this.TestScore = res.Data.List[0].Score;
          this.workList = res.Data.List;
        }
      });
    },
    // 添加学生作业

    // 编辑学生作业

    // 查询学生作业
    getStu_StudentWorkList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        ClassRoomStudentId: this.findStu_StudentWorkForm.ClassRoomStudentId,
        Score: this.findStu_StudentWorkForm.Score,
        WorkMessage: this.findStu_StudentWorkForm.WorkMessage,
        ClassRoomWorkId: this.findStu_StudentWorkForm.ClassRoomWorkId
      };
      Http.getStu_StudentWorkList(params).then(res => {
        if (res.StatusCode == 1) {
          this.tableModule.tableContent = res.Data.List;
          this.tableModule.count = res.Data.Total;
        }
      });
    }
    // 删除学生作业
  }
};
</script>
<style lang="scss" scoped>
@import "./Stu_StudentWorkPage.scss";
</style>
