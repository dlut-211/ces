<template>
<div class="bg" @keyup="keydown($event)" tabindex="2" v-focus="true">
   <div class="left">
      <img src="../../assets/iconleft1.png" alt="" class="img">
    </div>
      <div class="right"  @keyup="keydown($event)"  v-focus="true">
    <p style="font-size:12px">教师注册</p><br/>
          <div class="loginContent">
           <Form>
              <FormItem label="账号">
                 <Input type="text" v-model="form.account" placeholder="请输入职工号"></Input>
             </FormItem>
            <FormItem label="姓名">
                 <Input class="inp" size="large" type="text" v-model="form.name" placeholder="请输入真实姓名"></Input>
                    
                     
             </FormItem>
              <FormItem label="密码">
          <Input class="inp" size="large" type="password" v-model="form.password" placeholder="请输入密码"> </Input>
        </FormItem>

        <FormItem label="确认密码">
                 <Input class="inp" size="large" type="password" v-model="form.password2" placeholder="请再次输入密码"> </Input>
                    
                     
             </FormItem>
            <FormItem label="学校">
                 <Select class="inp" size="large" type="text" v-model="form.school" placeholder="请选择学校"> 
                    <Option v-for="item in schoolTypeArr" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                    
                     
             </FormItem>
            <FormItem label="学科">
                 <Select class="inp" size="large" type="text" v-model="form.subject" placeholder="请选择学科"> 
                    <Option v-for="item in subjectTypeArr" :value="item.id" :key="item.id">{{item.optionValue}}</Option>
                    </Select>
                    
                     
             </FormItem>
         <ROW>
          <Col span="16">
            <FormItem label="验证码">
              <Input  size="large" v-model="form.inputImageCode" style="width: 70%" placeholder="Code">
              </Input>
            </FormItem>
          </Col>
                <Col span="8"><img id="img" src="/api/imagecode/createImageCode" width="90px"  height="40px" onclick="this.src='/api/imagecode/createImageCode?d='+new Date()*1"></Col>
        </ROW>
        </br></br></br></br></br>
                   
                   <FormItem>
                        <Button type="primary" long @click="verification()">注册</Button>
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
          password: "",
          name: "",
          password2: "",
          school: 0,
          subject: 0,
          inputImageCode:""
        },
              subjectTypeArr:[],
      schoolTypeArr:[],
        rememberPassword: false,
      }
      
    },
    methods: {
        getAllSubjects:function(){
     Http.getAllSubjectList().then(res => {
        if(res.statusCode==1){
          console.log(res.data);
            this.subjectTypeArr = res.data;
             console.log("进来了");
              console.log(this.subjectTypeArr);
          }
      });
    },
    //添加教师时获取学校列表
    getAllSchools:function(){
      Http.getAllSchoolList().then(res =>{
        if(res.statusCode==1){
          this.schoolTypeArr = res.data;
        }
      })
    },
      keydown: function(e) {

        if (e.keyCode === 13) {
          if (this.form.account.length === 0) {
            this.$Message.error("用户名不能为空!");
          } else if (this.form.password.length === 0) {
            this.$Message.error("密码不能为空!");
          } else if (this.form.password2.length === 0) {
            this.$Message.error("密码不能为空!");
          } else if (this.form.password != this.form.password2) {
            this.$Message.error("两次输入的密码不一致!");
          } else if (this.form.name.length === 0) {
            this.$Message.error("姓名不能为空!");
          } else if (this.form.school.length === 0) {
            this.$Message.error("请选择学校!");
          } else if (this.form.subject.length === 0) {
            this.$Message.error("请选择学科!");
          } else{
            this.register()
          }
        }
      },
      verification:function(){
          if (this.form.account.length === 0) {
            this.$Message.error("用户名不能为空!");
          } else if (this.form.password.length === 0) {
            this.$Message.error("密码不能为空!");
          } else if (this.form.password2.length === 0) {
            this.$Message.error("密码不能为空!");
          } else if (this.form.password != this.form.password2) {
            this.$Message.error("两次输入的密码不一致!");
          } else if (this.form.name.length === 0) {
            this.$Message.error("姓名不能为空!");
          } else if (this.form.school.length === 0) {
            this.$Message.error("请选择学校!");
          } else if (this.form.subject.length === 0) {
            this.$Message.error("请选择学科!");
          } else{
            this.register()
          }
      },
   
              register: function() {
                  var params = {
                      number: this.form.account,
                      password: this.form.password,
                      name: this.form.name,
                      subjectId: this.form.subject,
                      schoolId: this.form.school,
                      inputImageCode:this.form.inputImageCode
                  };
                 Http.checkImageCode(params).then(res=>{
                    console.log('教师js第一个进来了')
                    console.log(res)
                 if(res.code==='200'){
                     // console.log('教师js第二个进来了')
                      Http.postTeacher(params).then(res => {
                        console.log(res)
                      if (res.statusCode == 1) {
                          this.$Message.success('注册成功');
                          this.$router.replace({
                              name: 'TeacherLoginPage'
                          })
                      } else {
                          this.$Message.error('注册失败');
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
        this.getAllSubjects();
        this.getAllSchools();
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
