<template>
   <div>
       <Button type="primary" @click="AdminRoute()">管理员入口</Button>
       <Button type="primary" @click="TeacherRoute()">教师入口</Button>
       <Button type="primary" @click="StudentRoute()">学生入口</Button>

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
                      
                        this.$router.replace({
                            name: 'TestPage'
                        })
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
    @import "./LoginPage.scss";
</style>