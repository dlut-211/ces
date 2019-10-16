<template>
  <div :id="'editorElem'+keys" style="text-align:left"></div>
</template>
<script>
// 引用editor
import E from "wangeditor";
export default {
  props:["keys"],
  data: function() {
    return {
      editor: new E("#editorElem"+this.keys)
    };
  },
  methods: {
    setContent: function(content) {
      this.editor.txt.html(content);
    },
    getContent: function() {
      return this.editor.txt.html();
    },
    getText:function(){
      return this.editor.txt.text();
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      this.editor.customConfig.uploadImgServer =
        "http://127.0.0.1:8083/api/filedata/newspicture"; //上传URL
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      this.editor.customConfig.uploadImgMaxLength = 5;
      this.editor.customConfig.uploadFileName = "myFileName";
      this.editor.customConfig.uploadImgHooks = {
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          var url = result.Data;
          insertImg(url);
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };
      this.editor.create();
    });
  }
};
</script>
<style lang="scss" scoped>
@import "./weditorModule.scss";
</style>