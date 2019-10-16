<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// 引入Api接口
import * as Http from "@/api/HttpService.js";
export default {
  name: 'App',
  beforeMount: function() {
    this.getLocalStorage();
  },
  methods: {
    // 从LocalStorage中查看是否有用户名和token
    getLocalStorage: function() {
      let username = localStorage.getItem("username");
      let token = localStorage.getItem("token");
      let id = localStorage.getItem("id");
      this.$store.state.username = username;
      
      this.$store.state.token = token;
      this.$store.state.id = id;
    }
  },
  mounted: function() {
    // console.log(this.$router)
    // if (this.$store.getters.token != "" && this.$store.getters.token != undefined) {
    //   var param = {
    //     Token: this.$store.getters.token
    //   }
    //   Http.verifyToken(param).then(res => {
    //     var result = res;
    //     if (res.StatusCode == 1) {
    //       console.log(123)
    //       this.$store.state.username = res.Data.Name;
    //       this.$store.state.token = res.Data.Token;
    //     } else {
    //       this.$store.commit("logout")
    //       this.$router.replace({ name: 'LoginPage' })
    //     }
    //   });
    // }else{
    //   this.$router.replace({ name: 'LoginPage' })
    // }
  }
}
</script>

<style>
html,
body {
  height: 100%
}

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
