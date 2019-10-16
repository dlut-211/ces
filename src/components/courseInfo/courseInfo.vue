<template>
    <div>
    <Tabs v-model="tabIndex">
        <TabPane label="课程信息">
            <div class="courseInfo">
                <div class="title">{{courseData.Name}} ({{courseData.Code}})</div>
                <div class="info">课程学科： {{courseData.SubjectName}}</div>
                <div class="info">建课老师： {{courseData.CreatedByName}}</div>
                <div class="info" v-if="courseData.SyllabusPath">
                    <a :href="courseData.SyllabusPath" :download="courseData.SyllabusPath" target="blank">查看教学大纲</a>
                </div>
                
                <div style="font-size:14px;font-weight:bold;margin-top:10px;margin-left: 30px;">课程简介：</div>
                <div class="describe"><p>{{courseData.Describe}}</p></div>
            </div>
        </TabPane>
        <TabPane label="课程章节">
            <div>
                <Scroll height="500">
                    <Tree :data="chapters" :render="renderContent"></Tree>
                </Scroll>
            </div>
        </TabPane>
        <TabPane label="课程知识点">
            <div>
                <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addKnowledge="addKnowledgeTo();"></tableModule>
            </div>
        </TabPane>
        <TabPane label="课程作业">
            <div>
                <Row>
                    <Col span="6">
                        <Table height="500" highlight-row :columns="chapterColumn" :data="mainChapters" @on-current-change=selectChapter></Table>
                    </Col>
                    <Col span="18">
                        <div v-if="chooseChapter" class="workdiv">
                            <Card class="card" v-for="(value,key) in workList" :key="key" @mouseenter.native="showOption(key)" @mouseleave.native="hideOption(key)">
                                <div class="content" style="position:absolute;">
                                    <div class="title">
                                        <Icon type="ios-book-outline" class="icon"></Icon>
                                        <span class="span">{{value.Name}}</span>
                                    </div>
                                    <div style="height:100%;position:absolute;bottom:-25px;left:130px;display:none;" :ref="`workRefList${key}`">
                                        <Icon type="trash-b" size="15" style="float:right;cursor:pointer;" @click.native="deleteWork(value.Id)"></Icon>
                                        <Icon type="edit" size="15" style="float:right;margin-right:10px;cursor:pointer;" @click.native="editWork(value)"></Icon>
                                    </div>
                                </div>
                            </Card>
                            <Card class="card">
                                <div style="text-align:center">
                                    <Icon size="30" type="plus" style="cursor:pointer" @click.native="addWork()"></Icon>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </TabPane>
    </Tabs>
    </div>
</template>
<script>
    // 引入表格模块组件
    import tableModule from "@/components/modalTableModule/modalTableModule.vue";
    // 引入表格模块配置项
    import {KnowledgeTableModuleJS} from "./KnowledgeTableModuleJS.js";
    // 引入API
    import * as Http from "@/api/HttpService.js";
    import {
        API
    } from "@/api/HttpConfig";

    export default {
        props: ["courseData"],
        data: function() {
            return {
                courseId: null,
                courseName:'',
                tabIndex: 0,
                // 章节
                chapters: [],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
                addChapterForm:{
                    ChapterLevel:null,
                    CourseId:null,
                    Name:"",
                    ParentId:null,
                    Describe:""
                },
                editChapterForm:{
                    Id:null,
                    ChapterLevel:null,
                    CourseId:null,
                    Name:"",
                    ParentId:null,
                    Sort:"",
                    Number:"",
                    Describe:"",
                    VersionNumber: null
                },
                // 知识点
                tableModule: (KnowledgeTableModuleJS.bind(this))(),
                nowPage: 1,
                pageSize: 5,
                addKnowledgeForm:{
                    Name:"",
                    CourseId:null,
                    AbilityId:null,
                    AbilityName:""
                },
                editKnowledgeForm:{
                    Id:null,
                    Name:"",
                    CourseId:null,
                    AbilityId:null,
                    AbilityName:"",
                    VersionNumber: null
                },
                // 课程作业
                // 主章节
                chapterColumn:[
                    { 
                        title: "主章节", 
                        key: "Name",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            fontSize:'14px',
                                            fontWeight: params.row.ChapterLevel == 1 ? 'bold': 'normal',
                                            paddingLeft:this.paddingValue(params.row.ChapterLevel)
                                        }
                                    },
                                    params.row.Name
                                )
                            ]);
                        }
                    }
                ],
                mainChapters:[],
                chooseChapter:false,
                chooseChapterId:null,
                workList:[],
                workRefList:[],
                addWorkForm:{
                    Describe:"",
                    ChapterId:null,
                    Name:""
                },
                editWorkForm:{
                    Id:null,
                    Describe:"",
                    ChapterId:null,
                    Name:"",
                    VersionNumber: null
                },
                KnowledgeList:[],
            };
        },
        components: {
            tableModule: tableModule
        },
        mounted: function() {
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '98%'
                    }
                }, [
                    h('span', [
                        h('tooltip', {
                            props: { 
                                content: data.title, placement: 'right' ,maxWidth: '200',theme: 'light'
                            },
                            style: {
                                fontSize:'14px',
                                cursor: "pointer",
                            },
                        }, data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon:'plus'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon:'edit'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.edit(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon:'trash-b'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                this.addChapterForm = {
                    ChapterLevel: data.level + 1,
                    CourseId:this.courseId,
                    Name:"",
                    ParentId:data.id,
                    Describe:""
                };
                this.$emit("addChapter", this.addChapterForm)
            },
            edit (data){
                this.editChapterForm = {
                    Id: data.id,
                    ChapterLevel: data.level,
                    CourseId:this.courseId,
                    Name:data.title,
                    ParentId:data.parentId,
                    Describe:data.describe,
                    VersionNumber: this.stringToByte(data.versionNumber)
                };
                this.$emit("editChapter", this.editChapterForm)
            },
            remove (root, node, data) {
                this.$emit("deleteChapter", data.id)
            },
            // 章节对比
            compareChapterTree:function(o,n){
                for(let i = 0; i < o.length; i++){
                    if(n){
                        var obj=n.find(function (obj) {
                        return obj.id === o[i].id
                        })
                        if(obj){
                            obj.expand = o[i].expand;
                            if(o[i].children){
                                this.compareChapterTree(o[i].children,obj.children);
                            }
                        }
                    }
                }
            },
            setChapters:function(chaptersData){
                // this.chapters = [];
                if(this.chapters.length > 0){
                    this.compareChapterTree(this.chapters[0].children,chaptersData);
                }
                this.chapters = [
                    {
                        id: null,
                        title: this.courseName,
                        level: 0,
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '98%'
                                }
                            }, [
                                h('span', {
                                    style: {
                                        fontSize:'16px',
                                        fontWeight:'bold'
                                    }
                                }, data.title),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '64px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    },'添加章节')
                                ])
                            ]);
                        },
                        children: chaptersData
                    }
                ];
            },
            infoInit :function(form){
                this.tabIndex = 0;
                this.courseId = form.Id;
                this.courseName = form.Name;
                this.chapters = [];
                this.getChapters();
                this.getKnowledgeList();
                this.getMainChaperts();
                this.getCourseKnowledgeList();
            },
            // 改变页码
            changePage:function(page){
                this.nowPage = page;
                this.getKnowledgeList();
            },
                // 改变每页显示的条数
            changeSize: function(size) {
                this.pageSize = size;
                this.getKnowledgeList();
            },
            // 获取课程主章节（作业用）
            getMainChaperts:function(){
                this.chooseChapter = false;
                this.mainChapters = [];
                this.workList = [];
                var params = {
                    courseId : this.courseId
                };
                Http.getChapterMain(params).then(res => {
                    if(res.StatusCode==1){
                        this.mainChapters = res.Data.List;
                    }
                });
            },
            // 获取课程章节树
            getChapters:function(){
                var params = {
                    courseId : this.courseId
                };
                Http.getChapterTree(params).then(res => {
                    if(res.StatusCode==1){
                        this.setChapters(res.Data.List);
                        this.getMainChaperts();
                    }
                });
            },
            // 获取课程知识点
            getKnowledgeList:function(){
                var params = {
                    page: this.nowPage,
                    limit: this.pageSize,
                    courseId : this.courseId
                };
                Http.getKnowledgeList(params).then(res => {
                    if(res.StatusCode==1){
                        this.tableModule.tableContent = res.Data.List;
                        this.tableModule.count = res.Data.Total;
                    }
                });
            },
            addKnowledgeTo:function(){
                this.addKnowledgeForm = {
                    Name:"",
                    CourseId:this.courseId,
                    AbilityId:null
                };
                this.$emit("addKnowledge", this.addKnowledgeForm)
            },
            editKnowledgeTo:function(){
                this.$emit("editKnowledge", this.editKnowledgeForm)
            },
            deleteKnowledgeTo:function(id){
                this.$emit("deleteKnowledge", id)
            },
            // 作业==============
            selectChapter:function(now,old){
                if(now){
                    this.chooseChapter = true;
                    this.chooseChapterId = now.Id;   
                    this.getWorkByChapter();     
                }
                        
            },
            getWorkByChapter:function(){
                var params = {
                    chapterId : this.chooseChapterId
                };
                Http.getWorkChapterList(params).then(res => {
                    if(res.StatusCode==1){
                        this.workList = res.Data.List;
                        this.workRefList = res.Data.IdList;
                    }
                });
            },
            addWork:function(){
                this.addWorkForm = {
                    Name:"",
                    ChapterId:this.chooseChapterId,
                    Describe:"",
                    Knowledges:""
                };
                this.$emit("addWork", this.addWorkForm,this.KnowledgeList);
            },
            editWork:function(data){
                this.editWorkForm = {
                    Id: data.Id,
                    Describe:data.Describe,
                    ChapterId:data.ChapterId,
                    Name:data.Name,
                    Knowledges:data.Knowledges.split(','),
                    VersionNumber: this.stringToByte(data.VersionNumber)
                };
                this.$emit("editWork", this.editWorkForm,this.KnowledgeList);
            },
            deleteWork:function(id){
                this.$emit("deleteWork", id)
            },
            showOption:function(i){
                this.$refs[`workRefList${i}`][0].style.display= 'inline';
            },
            hideOption:function(i){
                this.$refs[`workRefList${i}`][0].style.display= 'none';
            },
            getCourseKnowledgeList:function(){
                this.KnowledgeList = [];
                var params = {
                    courseId : this.courseId
                };
                Http.getKnowledgeAllList(params).then(res => {
                    if(res.StatusCode==1){
                        this.KnowledgeList = res.Data.List;
                    }
                });
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "./courseInfo.scss";
</style>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>