<template>
  <div class="infoModule">
    <div class="topTitle">
      <Icon :type="object.icon"></Icon>
          &nbsp;
          {{object.title}}
          <Button v-if="object.titleBtn" type="primary" size="small" style="float:right;margin-top:6px;margin-right:25px;" :class="{'cancel':!object.showDetail}" @click="highFunc(object.titleBtn.click)">{{object.titleBtn.title}}</Button>
    </div>
    <div class="infoContent">
        <div v-show="object.showDetail" v-html="object.detailContent" class="html"></div>
        <div v-show="!object.showDetail">
            <weditorModule :editorContent="object.detailContent" ref="weditor"></weditorModule>
            <Button type="primary" size="small" style="float:right;margin-top:6px;margin-right:25px;" @click="highFunc(object.titleBtn.click)">取消</Button>
            <Button type="primary" size="small" style="float:right;margin-top:6px;margin-right:25px;" @click="highFunc(object.submitClick)">保存</Button>
        </div>
    </div>
  </div>
</template>
<script>
// 引入富文本编辑器模块组件
import weditorModule from "@/components/weditorModule/weditorModule.vue";
export default {
    props:["object"],
    components:{
        weditorModule: weditorModule
    },
    methods:{
      //高阶函数 将this作用域指向至本组件
      highFunc:function(a){
          (a.bind(this))();
      },
      setContent:function(content){
        this.$refs.weditor.setContent(content);
      },
      getContent:function(){
        return this.$refs.weditor.getContent();
      }
    }
};
</script>
<style lang="scss" scoped>
@import "./infoModule.scss";
</style>
