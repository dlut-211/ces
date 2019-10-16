<template>
    <div>
        <p v-for="item in infos" :key="item.index">
            {{item}}
        </p>
    </div>
</template>
<script>
import * as Http from "@/api/HttpService.js";
export default {
    data() {
        return {
            infos:[],
        }
    },
    mounted:function(){
        //this.testPort();
    },
    methods:{
        testPort:function(){
            Http.testPort().then(res=>{
                this.infos=res.data;
            })
        }
    }
}
</script>