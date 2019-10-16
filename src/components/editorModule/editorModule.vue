<template>
    <div class="editorModule">
		<div class="content">
			<div class="title">编辑页面</div>
			<script id="editor" type="text/plain"></script>
			<div class="buttons">
				<Button type="primary" @click="submit">提交</Button>
				<Button type="ghost" @click="cancel">取消</Button>
			</div>
		</div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      editor: null
    };
  },
  mounted: function() {
    const _this = this;
    this.editor = UE.getEditor("editor", this.config);
    setTimeout(()=>{
      this.editor.setContent(this.editorContent);
    },500)
  },
  methods: {
    submit: function() {
      this.$emit("submit", this.editor.getContent());
    },
    cancel: function() {
      this.$emit("cancel",this.editor.getContent());
    }
  },
  props: ["editorContent"],
  watch: {
    editorContent: function(newVal, oldVal) {
      this.editor.setContent(newVal);
    }
  }
};
</script>
<style lang="scss">
// 该样式需写在这里 才能生效
#edui1_iframeholder {
  height: 200px;
}
</style>
<style lang="scss" scoped>
@import "./editorModule.scss";
</style>
