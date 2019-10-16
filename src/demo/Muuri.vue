<template>
    <div>
        <muuri-grid id="example-grid" class="grid">
            <item-link class="item" id="link" text="Example Link" route="/"></item-link>

            <item-sm id="item-sm">
                <p>Small item.</p>
            </item-sm>

            <item-md id="item-md">
                <p>Medium item.</p>
            </item-md>

            <item-lg id="item-lg">
                <p>Large item.</p>
            </item-lg>
        </muuri-grid>
    </div>
</template>
<script>
    // 引入Api接口
    import * as Http from "@/api/HttpService.js";
    import { ItemLink, ItemSm, ItemMd, ItemLg } from 'vue-muuri'
    export default {
        data: function() {
            return {
                rememberPassword: false,
            }
        },
        components: {
            ItemLink: ItemLink,
            ItemSm: ItemSm,
            ItemMd: ItemMd,
            ItemLg: ItemLg
        },
        methods: {
            
        },
        mounted: function() {

        }
    };
</script>
<style>
.grid {
  position: relative;
}
.item {
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 5px;
  z-index: 1;
  background: #000;
  color: #fff;
}
.item.muuri-item-dragging {
  z-index: 3;
}
.item.muuri-item-releasing {
  z-index: 2;
}
.item.muuri-item-hidden {
  z-index: 0;
}
.item-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>