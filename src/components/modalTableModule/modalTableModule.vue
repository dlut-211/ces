<template>
    <div class="tableModule">
        <div class="topTitle">
            <Icon :type="object.icon"></Icon>
            &nbsp; {{object.title}}
            <slot name="batchDelete"></slot>
            <slot name="batchAudit"></slot>
            <slot name="upload"></slot>
            <slot name="add"></slot>
            <slot name="submitAll"></slot>
            <slot name="batchReceipt"></slot>
            <slot name="batchRateAudit"></slot>
            <Button v-if="object.titleBtn" type="primary" size="small" style="float:right;margin-top:6px;margin-right:25px;" @click="highFunc(object.titleBtn.click)">{{object.titleBtn.title}}</Button>
            <slot name="count"></slot>
            
            <div style="float:right;margin-right:25px;font-weight:800;">
                <span v-if="object.totalAmount">总金额:{{object.totalAmount}}</span>
                &nbsp;&nbsp;
                <span v-if="object.totalTonnage">总吨数:{{object.totalTonnage}}</span>
            </div>
        </div>
        <div class="tableContent">
            <Table v-if="!object.rowClick" :columns="object.tableHead" :data="object.tableContent" :loading="object.loading" style="width:100%" :no-data-text="object.loading?'加载中...':'暂无数据!'"></Table>
            <Table v-if="object.rowClick" @on-row-click="rowClick" :columns="object.tableHead" :data="object.tableContent" :loading="object.loading" style="width:100%" :no-data-text="object.loading?'加载中...':'暂无数据!'"></Table>
        </div>
        <Page :total="object.count" size="small" show-elevator show-sizer style="float:right;margin:15px 20px;" @on-change="changePage"
            @on-page-size-change="changeSize" :page-size-opts="object.pageSizeOpts?object.pageSizeOpts:[5,10,15]" :page-size="5"
            :current="object.page" placement="top"></Page>
    </div>
</template>
<script>
    export default {
        props: ["object", "nowPage"],
        methods: {
            //高阶函数 将this作用域指向至本组件
            highFunc: function(a) {
                (a.bind(this))();
            },
            //当翻页动作执行时，触发的回调函数   
            changePage: function(page, size) {
                //向父级组件报告要翻的页数   
                this.$emit("changePage", page)
            },
            changeSize: function(size) {
                //向父级组件报告要翻的页数   
                this.$emit("changeSize", size)
            },
            rowClick: function(row, index) {
                this.$emit("rowClick", row);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "./modalTableModule.scss";
</style>
<style lang="scss">
    .ivu-table-wrapper {
        border: none !important;
    }
    
    .ivu-table:after {
        width: 0px !important;
    }
    
    .ivu-table-column-center {
        // background:none !important;
    }
    
    .ivu-table-column-left {
        // background:none !important;    
    }
</style>