<template>
  <infoModule :object="infoModule" @changePattern="changePattern" @toSave="toSave" ref="infoModule"></infoModule>
</template>
<script>
// 引入信息模块组件
import infoModule from "@/components/infoModule/infoModule.vue";
// 引入查询模块配置项
import {EnterpriseModuleJS} from "./enterpriseModule.js";
// 引入Api接口
import * as Http from "@/api/HttpService.js";

export default {
  props:["type","title"],
  data: function() {
    return {
      infoModule: (EnterpriseModuleJS.bind(this))(),
      Id:"",
      detailContent:""
    };
  },
  components: {
    infoModule: infoModule
  },
  methods: {
    // 页面查询数据列表
    getInfo:function () {
      var params = {
        type: this.type
      }
      Http.getEnterpriseInfo(params).then(res => {
        var result = res;
        if (res.StatusCode == 1) {
          this.Id = res.Data.Id;
          this.detailContent = this.infoModule.detailContent = res.Data.Content;
        }
      });
    },
    changePattern:function(){
      this.infoModule.showDetail = !this.infoModule.showDetail;
      this.infoModule.titleBtn.title = this.infoModule.showDetail ? "编辑" : "返回";
      this.setContent()
    },
    toSave:function(){
      var params = {
        Id: this.Id,
        Content: this.$refs.infoModule.getContent()
      };
      Http.setEnterpriseInfo(params).then(res =>{
        if(res.StatusCode == 1){
          this.$Message.success('修改成功');
          this.getInfo()
          this.changePattern()
        }else{
          this.$Message.error(res.Message);
        }
      })
    },
    setContent:function(){
      this.$refs.infoModule.setContent(this.detailContent)
    }
  },
  mounted:function(){
      this.infoModule.title = this.title
      this.getInfo();
  }
}
</script>
