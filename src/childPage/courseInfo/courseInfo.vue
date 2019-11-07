<template>
    <div>
    <Tabs v-model="tabIndex">
        <TabPane label="课程信息">
            <div class="courseInfo">
                <div class="title">{{courseData.name}} ({{courseData.code}})</div>
                <div class="info">课程学科： {{courseData.subjectName}}</div>
                <div class="info">建课老师： {{courseData.createdByName}}</div>
                <div class="info" v-if="courseData.syllabusPath">
                    <a :href="courseData.syllabusPath" :download="courseData.syllabusPath" target="blank">查看教学大纲</a>
                </div>
                
                <div style="font-size:14px;font-weight:bold;margin-top:10px;margin-left: 30px;">课程简介：</div>
                <div class="describe"><p>{{courseData.description}}</p></div>
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
                                        <span class="span">{{value.name}}</span>
                                    </div>
                                    <div style="height:100%;position:absolute;bottom:-25px;left:130px;display:none;" :ref="`workRefList${key}`">
                                        <Icon type="trash-b" size="15" style="float:right;cursor:pointer;" @click.native="deleteWork(value.id)"></Icon>
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
                    chapterLevel:null,
                    courseId:null,
                    name:"",
                    parentId:null,
                    description:""
                },
                editChapterForm:{
                    id:null,
                    chapterLevel:null,
                    courseId:null,
                    name:"",
                    parentId:null,
                    sort:"",
                    number:"",
                    description:"",
                },
                // 知识点
                tableModule: (KnowledgeTableModuleJS.bind(this))(),
                nowPage: 1,
                pageSize: 5,
                addKnowledgeForm:{
                    name:"",
                    courseId:null,
                    abilityId:null,
                    abilityName:""
                },
                editKnowledgeForm:{
                    id:null,
                    name:"",
                    courseId:null,
                    abilityId:null,
                    abilityName:"",
                },
                // 课程作业
                // 主章节
                chapterColumn:[
                    { 
                        title: "主章节", 
                        key: "name",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        style: {
                                            fontSize:'14px',
                                            fontWeight: params.row.chapterLevel == 1 ? 'bold': 'normal',
                                            paddingLeft:this.paddingValue(params.row.chapterLevel)
                                        }
                                    },
                                    params.row.name
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
                    description:"",
                    chapterId:null,
                    name:"",
                },
                editWorkForm:{
                    id:null,
                    description:"",
                    chapterId:null,
                    name:"",
                },
                KnowledgeList:[],
            };
        },
        components: {
            tableModule: tableModule
        },
        mounted: function() {
            this.infoInit();
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
                                content: data.description, placement: 'right' ,maxWidth: '200',theme: 'light'
                            },
                            style: {
                                fontSize:'14px',
                                cursor: "pointer",
                            },
                        }, data.name)
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
                var sort = '';
                if(data.level == 0){
                    if(this.chapters[0].children){
                        sort = this.chapters[0].children.length<9?'0'+ (this.chapters[0].children.length+1):(this.chapters[0].children.length+1)+'';
                    }
                    else{
                        sort = '01'
                    }
                }else{
                    if(data.children){
                        sort = data.children.length<9?data.sort + '0' + (data.children.length+1):sort = data.sort + (data.children.length+1)
                    }
                    else{
                        sort = data.sort + '01';
                    }
                    
                }
                this.addChapterForm = {
                    chapterLevel: data.chapterLevel == null ? data.chapterLevel : data.chapterLevel + 1,
                    courseId:this.courseId,
                    name:"",
                    parentId:data.id,
                    description:"",
                    sort:sort,
                };
                this.$emit("addChapter", this.addChapterForm)
            },
            edit (data){
                this.editChapterForm = {
                    id: data.id,
                    chapterLevel: data.chapterLevel,
                    courseId:this.courseId,
                    name:data.name,
                    parentId:data.parentId,
                    description:data.description,
                    sort: data.sort
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
            infoInit :function(){
                var form=this.$route.params.showForm;
                console.log("form"+form);
                this.tabIndex = 0;
                this.courseId = form.id;
                this.courseName = form.name;
                this.chapters = [];
                this.getChapters();
                this.getKnowledgeList();
                this.getMainChaperts();
                this.getCourseKnowledgeList();
            },
            // 获取课程主章节（作业用）
            getMainChaperts:function(){
                this.chooseChapter = false;
                this.mainChapters = [];
                this.workList = [];
                var params = {
                    id : this.courseId
                };
                Http.getChapterCourse(params).then(res => {
                    if(res.statusCode == 1){
                        this.mainChapters = res.data;
                        console.log(this.mainChapters)
                    }
                });
            },
            // 获取课程章节树
            getChapters:function(){
                var params = {
                    courseId : this.courseId
                };
                Http.getChapterTree(params).then(res => {
                    if(res.statusCode == 1){
                        this.setChapters(res.data);
                        this.getMainChaperts();
                        console.log("fdsfds")
                    }
                });
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
            // 获取课程知识点
            getKnowledgeList:function(){
                var params = {
                    page: this.nowPage,
                    limit: this.pageSize,
                    courseId : this.courseId
                };
                Http.getKnowledgeList(params).then(res => {
                    if(res.statusCode == 1){
                        this.tableModule.tableContent = res.data.content;
                        this.tableModule.count = res.data.totalElements;
                    }
                });
            },
            addKnowledgeTo:function(){
                this.addKnowledgeForm = {
                    name:"",
                    courseId:this.courseId,
                    abilityId:null
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
                if(now.parentId){
                    this.chooseChapter = true;
                    this.chooseChapterId = now.id;   
                    this.getWorkByChapter();     
                }
                        
            },
            getWorkByChapter:function(){
                var params = {
                    chapterId : this.chooseChapterId
                };
                Http.getWorkChapterList(params).then(res => {
                    console.log(res)
                    if(res.statusCode==1){
                        this.workList = res.data.workDTOList;
                        this.workRefList = res.data.workIdList;
                    }
                });
            },
            addWork:function(){
                this.addWorkForm = {
                    name:"",
                    chapterId:this.chooseChapterId,
                    description:"",
                    knowledgeIdList:""
                };
                this.$emit("addWork", this.addWorkForm,this.KnowledgeList);
            },
            editWork:function(data){
                this.editWorkForm = {
                    id: data.id,
                    description:data.description,
                    chapterId:data.chapterId,
                    name:data.name,
                    knowledgeIdList:data.knowledgeIdList
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
                    if(res.statusCode == 1){
                        this.KnowledgeList = res.data;
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