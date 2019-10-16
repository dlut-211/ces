<template>
    <div class="LoginPage" @keyup="keydown($event)" tabindex="2" v-focus="true">
        <div class="loginDiv">
            <div class="loginTitle">
                <div>大学生学习能力模型系统(管理员登录)</div>
            </div>
            <div class="loginContent">
                <Form>
                    <FormItem prop="account">
                        <Input type="text" v-model="form.account" placeholder="账号/用户名" size="large">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem  prop="password">
                        <Input type="password" v-model="form.password" placeholder="密码" size="large">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long @click="login()">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    // 引入Api接口
    import * as Http from "@/api/HttpService.js";
    export default {
        data: function() {
            return {
                form: {
                    account: "",
                    password: ""
                },
                rememberPassword: false,
            }
        },
        methods: {
            keydown: function(e) {
                if (e.keyCode === 13) {
                    if (this.form.account.length === 0) {
                        this.$Message.error("用户名不能为空!");
                    } else if (this.form.password.length === 0) {
                        this.$Message.error("密码不能为空!");
                    } else {
                        this.login()
                    }
                }
            },
            login: function() {
                var params = {
                    number: this.form.account,
                    password: this.form.password
                };
                Http.adminLogin(params).then(res => {
                    if (res.data != null) {
                        this.$Message.success('登录成功');
                        this.$store.state.username = res.data.username;
                        this.$store.state.token = res.data.token;
                        this.$store.state.id = res.data.id;
                        this.$store.state.role = 3;
                        localStorage.setItem('username', this.$store.getters.username);
                        localStorage.setItem('token', this.$store.getters.token);
                        localStorage.setItem('id', this.$store.state.id);
                      
                        this.$router.replace({
                            name: 'AdminHomePage'
                        })
                    } else {
                        this.$Message.error('账号或密码不存在');
                    }
                })
            }
        },
        mounted: function() {

        },
        directives: { 
            focus: {   
                inserted: function(el, {
                    value
                }) {     
                    el.focus();    
                } 
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "./AdminLoginPage.scss";
</style>