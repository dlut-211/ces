<template>
    <div>
        <div class="layout">
            <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
                <!-- <Menu :active-name="$store.getters.activeName" :open-names="openNames" theme="dark" width="auto"
                    :style="{paddingTop:'10px'}"  ref="Menu">
                    <Submenu v-for="(value,key) in actionList" :name="value.MenuCode" :key="key">
                        <template slot="title">
                            <Icon :type="value.Icon"></Icon>
                            {{value.MenuName}}
                        </template>
                        <MenuItem v-for="(value2,key2) in value.Childs" :name="value2.Route" :key="key2">{{value2.MenuName}}</MenuItem>
                    </Submenu>
                </Menu> -->
                <Menu v-if="userRole==1" :theme="theme2" :open-names="['1','2','3']" theme="dark" width="auto"
                    :style="{paddingTop:'10px'}" @on-select="changeRouter">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        用户管理
                    </template>
                    <MenuItem name="TeacherPage">教师</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        学科管理
                    </template>
                    <MenuItem name="SubjectPage">学科</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        学校管理
                    </template>
                    <MenuItem name="SchoolPage">学校</MenuItem>
                </Submenu>
            </Menu>
            <Menu v-if="userRole==2" :open-names="['1']" theme="dark" width="auto"
                    :style="{paddingTop:'10px'}" @on-select="changeRouter">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        教学管理
                    </template>
                    <MenuItem name="CoursePage">课程管理</MenuItem>
                    <MenuItem name="ClassRoomPage">我的课堂</MenuItem>
                    <MenuItem name="SubjectManagePage">学科管理</MenuItem>
                </Submenu>
            </Menu>
                <Menu v-if="userRole==3" :open-names="['1']" theme="dark" width="auto"
                    :style="{paddingTop:'10px'}" @on-select="changeRouter">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        我的信息
                    </template>
                    <MenuItem name="ClassRoomStudentPage">我的课堂</MenuItem>
                    <MenuItem name="SubjectGradePage">我的学科</MenuItem>
                </Submenu>
            </Menu>
                </Sider>
            <Layout :style="{marginLeft: '200px',paddingTop:'50px'}">
                <div class="title">
                    <div class="titleLeft">
                        大学生学习能力模型系统
                    </div>
                    <div class="titleRight">欢迎您! {{$store.getters.username}}
                        <Button type="info" size="small" class="logout" @click="openUpdatePasswordForm">
                            <Icon type="wrench"></Icon>&nbsp;&nbsp;修改密码</Button>
                        <Button type="error" size="small" class="logout" @click="logout">
                            <Icon type="android-exit"></Icon>&nbsp;&nbsp;注销</Button>
                    </div>
                </div>
                <div style="height:35px;margin-top:10px;margin-left:12px;">
                    <tags-view :homeName="homePage" ref="tabView"></tags-view>
                </div>
                <Content :style="{padding: '0 16px 16px'}">
                    <Card>
                        <div>
                            <router-view/>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </div>
        <customService v-show="$store.getters.customService"></customService>
        <Modal v-model="updatePassword" title="修改密码" width="400px" :mask-closable="false">
            <Form :model="updatePasswordForm" label-position="left" :label-width="120" :rules="rules" ref="updatePasswordForm">
                <Row>
                    <Col span="24">
                    <FormItem label="原始密码" class="forms" prop="OldPassword">
                        <Input type="password" v-model="updatePasswordForm.OldPassword"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="新密码" class="forms" prop="NewPassword">
                        <Input type="password" v-model="updatePasswordForm.NewPassword"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="确认密码" class="forms" prop="ConfirmPassword">
                        <Input type="password" v-model="updatePasswordForm.ConfirmPassword"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" size="large" @click="updatePassword=false">取消</Button>
                <Button type="primary" size="large" @click="updatePasswordHandleSubmit('updatePasswordForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import customService from "@/components/customService/customService.vue";
    // 引入课程内容组件
    import TagsView from "@/components/TagsView/TagsView.vue";
    // 引入API
    import * as Http from "@/api/HttpService.js";
    export default {
        computed:{
            homePage: function() {
                return this.$store.getters.home;
            }
        },
        methods: {
            // 改变路由
            changeRouter: function(name) {
                console.log("主页面"+this.$store.getters.home)
                this.$store.commit("changeActiveName", name);
                this.$router.push({
                    name: name
                });
            },
            logout: function() {
                this.$store.commit("logout");
                localStorage.removeItem("username");
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                this.$store.state.visitedviews=[];
                this.$Message.success("注销成功");
                this.$router.replace({
                    name: "LoginPage"
                });
            },
            updatePasswordAction: function() {
                var params = this.updatePasswordForm;
                Http.updatePassword(params).then(res => {
                    this.$Message.success(res.Message);
                        this.updatePasswordForm = {
                            Id: "",
                            OldPassword: "",
                            NewPassword: "",
                            ConfirmPassword: ""
                        };
                        this.updatePassword = false;
                    // if (res.statusCode == 1) {
                        
                    // } else {
                    //     this.$Message.error(res.Message);
                    // }
                });
            },
            updatePasswordHandleSubmit: function(name) {
                var result = this.$refs[name].validate(valid => {
                    if (valid) {
                        this.updatePasswordAction();
                    } else {
                        this.$Message.error("表单信息不正确!");
                    }
                });
                return result;
            },
            openUpdatePasswordForm: function() {
                this.updatePassword = true;
                this.updatePasswordForm = {
                    Id: this.$store.getters.id,
                    OldPassword: "",
                    NewPassword: "",
                    ConfirmPassword: ""
                };
            }
        },
        data: function() {
            var validateConfirmPassowrd = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.updatePasswordForm.NewPassword) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                userId:this.$store.state.id,
                userRole:this.$store.state.roles,
                actionList: [],
                openNames:[],
                aaa: true,
                updatePassword: false,
                updatePasswordForm: {
                    Id: "",
                    OldPassword: "",
                    NewPassword: "",
                    ConfirmPassword: ""
                },

                rules: {
                    OldPassword: [{
                        required: true,
                        message: "原始密码不能为空",
                        trigger: "blur"
                    }],
                    NewPassword: [{
                        required: true,
                        message: "新密码不能为空",
                        trigger: "blur"
                    }],
                    ConfirmPassword: [{
                        validator: validateConfirmPassowrd,
                        trigger: "blur"
                    }]
                }
            };
        },
        mounted: async function() {
            if(this.$store.getters.home != ''){
                this.$router.push({name:this.$store.getters.home});
            }
            // var result = await Http.getPermission();
            // if (result.statusCode == 1) {
            //     this.actionList = result.Data;
            //     this.openNames = [];
            //     for(let i = 0;i<this.actionList.length;i++){
            //         this.openNames.push(this.actionList[i].MenuCode);
            //     }
            //     this.$store.commit("changeActionList", result.Data);
            // } else {
            //     this.$Message.error(result.Message);
            // }
            // for (let i in this.actionList) {
            //     for (let j in this.actionList[i].Childs) {
            //         if (this.actionList[i].Childs[j].Route == this.$route.name) {
            //             this.$store.commit("changeOpenName", [this.actionList[i].Code]);
            //             this.$store.commit("changeActiveName", this.$route.name);
            //             break;
            //         }
            //     }
            // }
            // this.initLocalStorage()
            // this.$nextTick(function() {
            //     this.$refs.Menu.updateOpened();
            //     this.$refs.Menu.updateActiveName();
            // });
        },
        components: {
            customService: customService,
            TagsView: TagsView
        },
    };
</script>
<style lang="scss" scoped>
    @import "./DashboardPage.scss";
</style>
