
<template>
  <div class="SubjectManagePage">
    <div>
      <Row>
        <Col span="6">
          <Table
            height="500"
            highlight-row
            :columns="SubjectColumn"
            :data="SubjectList"
            @on-current-change="selectChapter"
          ></Table>
        </Col>
        <Col span="18">
          <Table height="500" :columns="AbilityColumn" :data="AbilityList"></Table>
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
import { SubjectManageSelectModuleJS } from "./SubjectManageSelectModuleJS.js";
// 引入表格模块配置项
import { SubjectManageTableModuleJS } from "./SubjectManageTableModuleJS.js";
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
      selectModule: SubjectManageSelectModuleJS.bind(this)(),
      tableModule: SubjectManageTableModuleJS.bind(this)(),
      addSubjectManage: false,
      SubjectColumn: [
        {
          title: "学科代码",
          key: "OptionCode",
          align: "center",
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
                params.row.OptionCode
              )
            ]);
          }
        },
        {
          title: "学科",
          key: "OptionValue",
          align: "center",
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
                params.row.OptionValue
              )
            ]);
          }
        }
      ],
      SubjectList: [],
      AbilityList: [],
      AbilityColumn: [
        {
          title: "能力点",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    //color: params.row.Status == 1 ? "#495060" : "#2d8cf0",
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
                params.row.Name
              )
            ]);
          }
        },
        {
          title: "能力点描述",
          key: "description",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    //color: params.row.Status == 1 ? "#495060" : "#2d8cf0",
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
                params.row.Describe
              )
            ]);
          }
        },
      ]
    };
  },
  mounted: function() {
    this.$store.commit("changeBreadCrumb", ["首页", "", "学科"]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getSubject();
    this.getAblilty();
  },

  methods: {
    getAblilty: function() {
      var params = {
        SubjectId: this.$store.state.subjectId
      };
      Http.getAbilityList(params).then(res => {
        if (res.StatusCode == 1) {
          this.AbilityCount = res.Data.Total;
          console.log(res.Data.List)
        }
      });
    },

    // 改变页码
    changePage: function(page) {
      this.nowPage = page;
      this.getAllSubjectList();
    },
    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getAllSubjectList();
    },
    getSubject: function() {
      this.chooseChapter = false;
      this.SubjectList = [];
      this.AbilityList = [];
      var params = {
        id:1
      };
      Http.getAllSubjectList(params).then(res => {
        if (res.StatusCode == 1) {
          this.SubjectList = res.Data.List;
          console.log(res.Data.List)
        }
      });
    },

    selectChapter: function(now, old) {
      if (now) {
        this.chooseSubject = true;
        this.chooseSubjectId = now.Id;
        this.getAbilityBySubject();
      }
    },

    getAbilityBySubject: function() {
      var params = {
        SubjectId: this.chooseSubjectId,
      };

      Http.getAbilityList(params).then(res => {
        if (res.StatusCode == 1) {
          this.AbilityCount = res.Data.Total;

          this.AbilityList = res.Data.List;
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./SubjectManagePage.scss";
</style>
