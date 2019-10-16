function EnterpriseModuleJS() {
    return {
        title: "",
        icon: "ios-book-outline",
        showDetail:true,
        titleBtn: {
            title: "编辑",
            click: function () {
                this.$emit("changePattern");
            }
        },
        submitClick: function () {
            this.$emit("toSave");
        },
        cancelClick: function () {
            this.$emit("changePattern");
        },
        detailContent:""
    }
}
export { EnterpriseModuleJS }