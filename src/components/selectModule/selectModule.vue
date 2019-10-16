<template>
  <div class="selectModule">
      <div class="topTitle">
          <Icon :type="object.icon"></Icon>
          &nbsp;
          {{object.title}}
      </div>
      <div class="content">
          <div v-for="(value,key) in object.input" class="inputs">
              <DatePicker v-model="form[value.name]" :placeholder="value.placeholder" v-if="value.type=='date'" style="width: 140px" format="yyyy-MM-dd"></DatePicker>
              <DatePicker split-panels @on-change="form[value.name]=$event" v-model="form[value.name]" :placeholder="value.placeholder" type="daterange" v-if="value.type=='daterange'"  style="width: 175px"></DatePicker>
              <Input v-model="form[value.name]" :placeholder="value.placeholder" v-if="value.type=='input'" style="width: 140px"></Input>
              <Select v-model="form[value.name]" v-if="value.type=='select'" :placeholder="value.placeholder" :clearable="true" style="width: 140px" >
                <Option v-for="(value2,key2) in value.selected" :value="value2.name" :key="key2">{{value2.value}}</Option>
              </Select>
              <Select v-model="form[value.name]" v-if="value.type=='selectAjax'" :placeholder="value.placeholder" :clearable="true" style="width: 140px">
                <Option v-for="(value2,key2) in value.selected" :value="value2.name" :key="key2">{{value2.value}}</Option>
              </Select>
              <Select v-model="form[value.name]" v-if="value.type=='selectParam'" :placeholder="value.placeholder" :clearable="true" style="width: 140px" :style="value.style">
                <Option v-for="(value2,key2) in value.selected" :value="value2.name" :key="key2">{{value2.value}}</Option>
              </Select>
              <Select v-model="form[value.name]" v-if="value.type=='selectParamOnce'" :placeholder="value.placeholder" :clearable="true" style="width: 140px" :style="value.style">
                <Option v-for="(value2,key2) in value.selected" :value="value2.name" :key="key2">{{value2.value}}</Option>
              </Select>
              <!--<cascaderModule v-if="value.type=='cascader'"  :placeholder="value.placeholder" @submit="form[value.name]=$event" :change-on-select="true"></cascaderModule>-->
              <Button :type="value.theme" v-if="value.type=='button'" @click="highFunc(value.click)">{{value.placeholder}}</Button>
          </div>
      </div>
  </div>
</template>
<script>
import * as Http from "@/api/HttpService.js";
// import cascaderModule from "@/components/cascaderModule/cascaderModule.vue";
export default {
  props: ["object"],
  data: function() {
    return {
      //这个是将要向父级组件传递的表单
      form: {}
    };
  },
  components: {
    // cascaderModule: cascaderModule
  },
  methods: {
    //高阶函数 将this作用域指向至本组件
    highFunc: function(a) {
      a.bind(this)();
    }
  },
  mounted: function() {
    let list = this.object.input;
    for (let i = 0; i < list.length; i++) {
      //   调用类别为selectAjax
      if (list[i].type == "selectAjax") {
        Http[list[i].url]().then(res => {
          if (res.StatusCode == 1) {
            for (let j = 0; j < res.Data.List.length; j++) {
              list[i].selected.push({
                name: res.Data.List[j].Id,
                value: res.Data.List[j].Name
              });
            }
          }
        });
      }
      if (list[i].type == "selectParam") {
        Http[list[i].url](list[i].param).then(res => {
          if (res.StatusCode == 1) {
            for (let j = 0; j < res.Data.List.length; j++) {
              list[i].selected.push({
                name: res.Data.List[j].Id,
                value: res.Data.List[j].Value
              });
            }
          }
        });
      }
      if (list[i].type == "selectParamOnce") {
        if (
          this.object.apiParams.indexOf(list[i].param.SystemOptionTypeCode) ==
          -1
        ) {
          this.object.apiParams.push(list[i].param.SystemOptionTypeCode);
          Http[list[i].url](list[i].param).then(res => {
            if (res.StatusCode == 1) {
              for (let j = 0; j < res.Data.List.length; j++) {
                list[i].selected.push({
                  name: res.Data.List[j].Id,
                  value: res.Data.List[j].Value
                });
              }
            }
          });
        }
        else{
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./selectModule.scss";
</style>
