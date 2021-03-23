
<template>
<div>
    <div class="layout2">
            <div style="background-color:#bacde0;height:5%">
            
        </div>
                    <div style="background-color:white;height:2%">
            
        </div>
    <div style="padding-top:10%">
        <span style="font-size:50px">软件工程学习能力分析评价系统</span>
    </div>
    <Row>
        <i-col span="7">
        </br> 
        </i-col>
      
        <i-col span="10">
          <div class="buttonreign">
            <Row>
             <i-col span="8">
             <i-button @click="AdminRoute()"  shape="circle" size="large" icon="settings">管理员入口</i-button> 
            </i-col>
             <i-col span="8">
             <i-button @click="TeacherRoute()" shape="circle" size="large" icon="ios-book">教师入口</i-button> 
            </i-col>
             <i-col span="8">
             <i-button @click="StudentRoute()" shape="circle" size="large" icon="ios-body">学生入口</i-button> 
            </i-col>
             </Row>
          </div>
        </i-col>
       <i-col span="7">
         </br>
        </i-col>
    </Row>
    </div>
    <div class="bottom1" style="height:10%;background-color:#bacde0;border-top:15px solid white;">
    </div>
</div>
</template>
<script>
    // 引入Api接口
    import * as Http from "@/api/HttpService.js";
    export default {
        data: function() {
            return {
            }
        },
        methods: {
            NewPageRoute:function(){
                this.$router.push({
                    name:"NewPage"
                })
            },
            AdminRoute:function(){
                this.$router.push({
                    name:"AdminLoginPage"
                })
            },
            TeacherRoute:function(){
                this.$router.push({
                    name:"TeacherLoginPage"
                })
            },
             StudentRoute:function(){
                this.$router.push({
                    name:"StudentLoginPage"
                })
            },
            login: function() {
                var params = {
                    number: this.form.account,
                    password: this.form.password
                };
                Http.login(params).then(res => {
                    if (res.statusCode == 1) {
                        this.$Message.success('登录成功');
                        this.$store.state.username = res.data.name;
                        this.$store.state.token = res.data.token;
                        this.$store.state.id = res.data.id;
                        this.$store.state.role = 3;
                        if(res.data.UserRole === 1){
                            this.$store.state.home = 'AdminHomePage';
                        }
                        if (res.data.UserRole == 2){
                            this.$store.state.home = 'TeacherHomePage';
                        }
                        if (res.data.UserRole == 3){
                            this.$store.state.home = 'StudentHomePage';
                        }
                        localStorage.setItem('username', this.$store.getters.username);
                        localStorage.setItem('token', this.$store.getters.token);
                        localStorage.setItem('id', this.$store.state.id);
                        // this.$router.replace({
                        //     name: 'TestPage'
                        // })
                    } else {
                        this.$Message.error(res.Message);
                    }
                })
            }
        },
        mounted: function() {
        },
    };
</script>
<style lang="scss" scoped>
    
    .layout{
    background-color:#bacde0;
    padding-top:35px;
    border-bottom:15px solid white;
}

.layout2{
    // padding:300px;
    // border:200px;
    height: 100vh;
    background-image:url('../../assets/bckgr.png');
    background-size: 100% 100%;
    font-family:"Times New Roman", Times, serif;
    font-size:100px;
    text-align:center;
    color:#0c1428;
}
</style>
