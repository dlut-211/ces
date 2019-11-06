<!--<template>-->
<!--    <div class="LoginPage" @keyup="keydown($event)" tabindex="2" v-focus="true">-->
<!--        <div class="loginDiv">-->
<!--            <div class="loginTitle">-->
<!--                <div>大学生学习能力模型系统(教师登录)</div>-->
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
<!--                Http.teacherLogin(params).then(res => {-->
<!--                    if (res.data != null) {-->
<!--                        this.$Message.success('登录成功');-->
<!--                        this.$store.state.username = res.data.name;-->
<!--                        this.$store.state.token = res.data.token;-->
<!--                        this.$store.state.id = res.data.id;-->
<!--                        this.$store.state.roles = 2;-->
<!--                        this.$store.state.home = 'TeacherHomePage';-->
<!--                        localStorage.setItem('username', this.$store.getters.username);-->
<!--                        localStorage.setItem('token', this.$store.getters.token);-->
<!--                        localStorage.setItem('id', this.$store.state.id);-->
<!--                        localStorage.setItem("roles",this.$store.state.roles);-->
<!--                      -->
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
<!--    @import "./TeacherLoginPage.scss";-->
<!--</style>-->





<template>
  <div class="bg">
    <div class="left">
      <img src="../../assets/iconleft1.png" alt="" class="img">
    </div>
    <div class="right"  @keyup="keydown($event)"  v-focus="true">
      <Form :model="formLeft">
        <FormItem>
          <p style="font-size:30px">软件工程综合能力培养体系平台</p><br/>
        </FormItem>
        <FormItem>
          <Input class="inp" size="large" type="text" v-model="form.account" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend" size="22"></Icon></Input>
        </FormItem>
        <FormItem>
          <Input class="inp" size="large" type="password" v-model="form.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend" size="22"></Icon>
          </Input>
        </FormItem>
        <ROW>
          <Col span="16">
            <FormItem label="验证码">
              <Input  size="large" v-model="form.inputImageCode" style="width: 70%" placeholder="Code">
              </Input>
            </FormItem>
          </Col>
                <Col span="8"><img id="img" src="/api/imagecode/createImageCode" width="90px"  height="40px" onclick="this.src='/api/imagecode/createImageCode?d='+new Date()*1"></Col>
        </ROW>
        </br></br></br></br></br>
        <FormItem>
          <button   class="btn" @click="login()">登录</button>
        </FormItem>
      </Form>
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
                      Http.teacherLogin(params).then(res => {
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

                          this.$router.replace({
                              name: 'DashboardPage'
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
<style >
  .bg{
    background-image:url('../../assets/background2.jpg');
    height:100vh;
    width:100%;
    background-size:cover;
    padding: 10%;
    display: flex;
  }
  .img{
    width: 500px;
    height: 500px;
  }
  .left{
    width: 50%;

  }
  .right{
    width: 50%;
    max-width: 550px;
    height: 480px;
    padding: 60px;
    border-radius: 10px;
    background-color: #fff;
  }
  .btn{
    color:#fff;
    border:none;
    width:100%;
    height:50px;
    font-size:18px;
    background-color: rgb(71,54,88);
    cursor:pointer
  }

</style>
