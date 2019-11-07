<!--<template>-->
  <!--    <div class="LoginPage" @keyup="keydown($event)" tabindex="2" v-focus="true">-->
  <!--        <div class="loginDiv">-->
  <!--            <div class="loginTitle">-->
  <!--                <div>大学生学习能力模型系统(学生登录)</div>-->
  <!--            </div>-->
  <!--            <div class="loginContent">-->
  <!--                <Form>-->
  <!--                    <FormItem prop="account">-->
  <!--                        <Input type="text" v-model="form.account" placeholder="账号/用户名" size="large">-->
  <!--                        <Icon type="ios-person-outline" slot="prepend"></Icon>-->
  <!--                        </Input>-->
  <!--                    </FormItem>-->
  <!--                    <FormItem  prop="password">-->
  <!--                        <Input type="password" v-model="form.password" placeholder="密码" size="large">-->
  <!--                        <Icon type="ios-locked-outline" slot="prepend"></Icon>-->
  <!--                        </Input>-->
  <!--                    </FormItem>-->
  <!--                    <FormItem>-->
  <!--                        <Button type="primary" long @click="login()">登录</Button>-->
  <!--                    </FormItem>-->
  <!--                </Form>-->
  <!--            </div>-->
  <!--        </div>-->
  <!--    </div>-->
  <!--</template>-->
  <!--<script>-->
  <!--    // 引入Api接口-->
  <!--    import * as Http from "@/api/HttpService.js";-->
  <!--    export default {-->
  <!--        data: function() {-->
  <!--            return {-->
  <!--                form: {-->
  <!--                    account: "",-->
  <!--                    password: ""-->
  <!--                },-->
  <!--                rememberPassword: false,-->
  <!--            }-->
  <!--        },-->
  <!--        methods: {-->
  <!--            keydown: function(e) {-->
  <!--                if (e.keyCode === 13) {-->
  <!--                    if (this.form.account.length === 0) {-->
  <!--                        this.$Message.error("用户名不能为空!");-->
  <!--                    } else if (this.form.password.length === 0) {-->
  <!--                        this.$Message.error("密码不能为空!");-->
  <!--                    } else {-->
  <!--                        this.login()-->
  <!--                    }-->
  <!--                }-->
  <!--            },-->
  <!--            login: function() {-->
  <!--                var params = {-->
  <!--                    number: this.form.account,-->
  <!--                    password: this.form.password-->
  <!--                };-->
  <!--                Http.studentLogin(params).then(res => {-->
  <!--                    if (res.data != null) {-->
  <!--                        this.$Message.success('登录成功');-->
  <!--                        this.$store.state.username = res.data.name;-->
  <!--                        this.$store.state.token = res.data.token;-->
  <!--                        this.$store.state.id = res.data.id;-->
  <!--                        this.$store.state.roles = 3;-->
  <!--                        this.$store.state.home = 'StudentHomePage';-->
  <!--                        localStorage.setItem('username', this.$store.getters.username);-->
  <!--                        localStorage.setItem('token', this.$store.getters.token);-->
  <!--                        localStorage.setItem('id', this.$store.state.id);-->
  <!--                        localStorage.setItem("roles",this.$store.state.roles);-->

  <!--                        this.$router.replace({-->
  <!--                            name: 'DashboardPage'-->
  <!--                        })-->
  <!--                    } else {-->
  <!--                        this.$Message.error('账号或密码不存在');-->
  <!--                    }-->
  <!--                })-->
  <!--            }-->
  <!--        },-->
  <!--        mounted: function() {-->

  <!--        },-->
  <!--        directives: { -->
  <!--            focus: {   -->
  <!--                inserted: function(el, {-->
  <!--                    value-->
  <!--                }) {     -->
  <!--                    el.focus();    -->
  <!--                } -->
  <!--            }-->
  <!--        }-->
  <!--    };-->
  <!--</script>-->
  <!--<style lang="scss" scoped>-->
  <!--    @import "./StudentLoginPage.scss";-->
  <!--</style>-->

  <style scoped>
    .layout{
      /* border: 1px solid #d7dde4;
      background: #f5f7f9; */
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      height: 100vh;
      width: 100vw;
    }
    .ivu-layout-header{
      background-color:#ffffff;
      height:150px;
      padding-top:40px;
      font-size:35px;
      color:#25597d;
      border-bottom: 15px solid #808695;


    }
    .ivu-layout-content{
      background-image:url('../../assets/background1.jpg');
      width: 100%;
      max-height: 80vh;
      background-size: cover;
      background-repeat:no-repeat;
      padding-top:200px;
      padding-bottom:300px;
      padding-left:60%;

    }
    .ivu-layout-footer{
      background-color:#ffffff;
      border-top: 15px solid #808695;
    }

    .formb{
      width:400px;
      padding: 25px;

    }
    .ivu-layout{
      background: none ;
    }
    .formbsmall{
      height: auto;
      padding:37px;
      background-color:rgba(255, 255, 255, 0.6);
    }
    .btn{
      width: 100%;
      height: 40px;
      color:#fff;
      border:none;
      background-color: #337ab7;
      cursor: pointer;
    }
    .btn1{
      background-color: #337ab7;
    }
    .btn2{
      background-color: rgb(49,176,213);
    }
  </style>

  <template>
    <div class="layout">
      <Layout>
        <Header :style="{position: 'fixed', width: '100%'}">
          软件工程综合能力培养体系平台
        </Header>
        <Content>
          <Layout class="formb">
            <Layout class="formbsmall" @keyup="keydown($event)"  v-focus="true">
              <Form :model="formLeft"  label-position="left">
                <FormItem>
                  <Input class="inp" size="large" type="text" v-model="form.account" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend" size="20"></Icon></Input>
                </FormItem>
                <FormItem>
                  <Input class="inp" size="large" type="password" v-model="form.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                  </Input>
                </FormItem>
                <ROW>
                  <Col span="16">
                    <FormItem label="验证码">
                      <Input  size="large" v-model="form.inputImageCode"  style="width: 50%" placeholder="Code">
                      </Input>
                    </FormItem>
                  </Col>
                  <Col span="8"><img id="img" src="/api/imagecode/createImageCode" width="90px"  height="40px" onclick="this.src='/api/imagecode/createImageCode?d='+new Date()*1"></Col>
                </ROW>
                </br></br>
                <FormItem>
                  <button class="btn" @click="login()">登录</button>
                </FormItem>

              </Form>
            </Layout>
          </Layout>
        </Content>
        <Footer>
          <p style="text-align:center;padding-top:40px;font-size:16px">大连理工大学</p>
        </Footer>
      </Layout>
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
                      password: "",
                      inputImageCode:""
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
                      password: this.form.password,
                      inputImageCode:this.form.inputImageCode
                  };
                  Http.checkImageCode(params).then(res=>{
                    if(res.code==='200'){
                      Http.studentLogin(params).then(res => {
                      if (res.data != null) {
                          this.$Message.success('登录成功');
                          this.$store.state.username = res.data.name;
                          this.$store.state.token = res.data.token;
                          this.$store.state.id = res.data.id;
                          this.$store.state.roles = 3;
                          this.$store.state.home = 'StudentHomePage';
                          localStorage.setItem('username', this.$store.getters.username);
                          localStorage.setItem('token', this.$store.getters.token);
                          localStorage.setItem('id', this.$store.state.id);
                          localStorage.setItem("roles",this.$store.state.roles);
                          var params=
                          {studentId:res.data.id}
                        Http.selectByStudentId(params).then(res=>{
                          if(res.statusCode==1){
                            this.$store.state.subjectId=res.data;
                             this.$router.replace({
                              name: 'DashboardPage'
                          })
                          }
                          else{
                            this.$Message.error('学科不存在');
                          }
                        })
                         
                      } else {
                          this.$Message.error('账号或密码不存在');
                      }
                  })
                    }
                    else{
                        document.getElementById("img").src="/api/imagecode/createImageCode?d='+new Date()*1"; //这里的图片是更换后的图片
                        this.$Message.error("验证码错误");
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
