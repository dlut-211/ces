<template>
    <Modal :value="visible" title="选择课程" @on-ok="submit" @on-cancel="cancel" :mask-closable="false" width="1200px">
    <selectModule :object="selectModule" @submit="find"></selectModule>
    <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" :nowPage="nowPage"></tableModule>
    <div slot="footer">
      <Button type="ghost"   @click="cancel">取消</Button>
      <Button type="primary"   @click="submit" :disabled="choose==null">确定</Button>
    </div>
  </Modal>
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
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  props: ["visible"],
  data: function() {
    return {
      selectModule: (CourseSelectModuleJS.bind(this))(),
      tableModule: (CourseTableModuleJS.bind(this))(),
	  nowPage: 1,
      pageSize: 5,
      choose: null,
	  findCourseForm:{
        Code:"",
        Name:"",
        CreatedByName:""
      },
    };
  },
  mounted:function(){
    this.getCourseList();
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
        this.getCourseList();
    },
    // 点击取消时
    cancel: function() {
      this.$emit("cancel");
              this.nowPage = 1;
        this.choose = null;
        this.getCourseList();
    },
    // 查询方法
    find: function(a) {
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
    // 查询课程
    getCourseList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        Code: this.findCourseForm.Code,
        Describe: this.findCourseForm.Describe,
        Name: this.findCourseForm.Name,
        Syllabus: this.findCourseForm.Syllabus
      };
      Http.getCourseList(params).then(res => {
        if(res.statusCode==1){
            this.tableModule.tableContent = res.data.content;
            this.tableModule.count = res.data.total;
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>

</style>
