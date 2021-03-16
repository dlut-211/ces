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
        <TabPane label="课堂作业">
            <div>
                <Row>
                    <Col span="6">
                        <Table height="500" highlight-row :columns="chapterColumn" :data="mainChapters" @on-current-change=selectChapter></Table>
                    </Col>
                    <Col span="18">
                        <div v-if="chooseChapter" class="workdiv">
                            <Card class="card" v-for="(value,key) in knowledgeTestList" :key="key" @mouseenter.native="showOption1(key)" @mouseleave.native="hideOption1(key)">
                                <div class="content" style="position:absolute;">
                                    <div class="title">
                                        <Icon type="ios-book-outline" class="icon"></Icon>
                                        <span class="span">{{value.name}}</span>
                                    </div>
                                    <div style="height:100%;position:absolute;bottom:-25px;left:130px;display:none;" :ref="`classWorkRefList${key}`">
                                        <Icon type="trash-b" size="15" style="float:right;cursor:pointer;" @click.native="deleteClassWork(value.id)"></Icon>
                                        <Icon type="edit" size="15" style="float:right;margin-right:10px;cursor:pointer;" @click.native="editClassWork(value)"></Icon>
                                    </div>
                                </div>
                            </Card>
                            <Card class="card">
                                <div style="text-align:center">
                                    <Icon size="30" type="plus" style="cursor:pointer" @click.native="addClassWork()"></Icon>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </TabPane>
        <TabPane label="课堂作业展示">
            <div>
                <Row align="middle">
                    <Col span="6">
                        <Table height="500" highlight-row :columns="classTestColumn" :data="classTestList" @on-current-change=selectClassTest></Table>
                    </Col>
                    <Col span="18">
                        <div id="courseAKTree" style="width:800px;height:500px;"></div> 
                    </Col>
                </Row>
            </div>
        </TabPane>
    </Tabs>
    <Modal
      v-model="viewClassWork"
      title="作业详情信息"
      width="800px"
      :transfer=false>
      <Form :model="viewClassWorkForm" label-position="left" :label-width="100" ref="viewClassWorkForm">
        <Row>
          <Col span="24">
            <FormItem label="题目名称" class="forms" prop="name">
              <Input v-model="viewClassWorkForm.name" readonly></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项A" class="forms" prop="item1">
              <Input v-model="viewClassWorkForm.item1" readonly></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项B" class="forms" prop="item2">
              <Input v-model="viewClassWorkForm.item2" readonly></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项C" class="forms" prop="item3">
              <Input v-model="viewClassWorkForm.item3" readonly></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项D" class="forms" prop="item4">
              <Input v-model="viewClassWorkForm.item4" readonly></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="正确选项" class="forms" prop="ans">
              <RadioGroup v-model="viewClassWorkForm.ans">
                <Radio label="A" border disabled></Radio>
                <Radio label="B" border disabled></Radio>
                <Radio label="C" border disabled></Radio>
                <Radio label="D" border disabled></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <!-- <Col span="24">
            <FormItem label="知识点" class="forms" prop="knowledgeId">
              <Select filterable v-model="viewClassWorkForm.knowledgeId" :placeholder="'请选择知识点'" transfer>
                <Option v-for="item in knowledgeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col> -->
        </Row>
      </Form>
      <div slot="footer">
        <!-- <Button type="ghost" size="large" @click="viewClassWork=false">关闭</Button> -->
        <Button type="primary" size="large" @click="viewClassWork=false">关闭</Button>
      </div>
    </Modal>
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
                
                treeResData:[],
                addClassWorkForm:{
                    chapterId: null,
                    name: "",
                    item1:"",
                    item2:"",
                    item3:"",
                    item4:"",
                    ans:"",
                    courseId:""
                },
                editClassWorkForm:{
                    id:null,
                    chapterId: null,
                    name: "",
                    item1:"",
                    item2:"",
                    item3:"",
                    item4:"",
                    ans:"",
                    courseId:""
                },
                knowledgeTestList:[],
                classWorkRefList:[],
                classTestList:[],
                classTestColumn:[
                    {
                        title: '题目名称',
                        key: 'name'
                    },
                ],
                viewClassWork:false,
                viewClassWorkForm: {
                    id:null,
                    chapterId: null,
                    name: "",
                    item1:"",
                    item2:"",
                    item3:"",
                    item4:"",
                    ans:"",
                    knowledgeId:"",
                    courseId:""
                },
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
                    sort:data.sort
                };
                this.$emit("editChapter", this.editChapterForm)
            },
            remove (root, node, data) {
                this.$emit("deleteChapter", data.id)
            },
            // 章节对比
            compareChapterTree:function(o,n){
                console.log(o)
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
                    if(this.chapters[0].children != null){
                        this.compareChapterTree(this.chapters[0].children,chaptersData);
                    }
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
                this.courseId = form.id;
                this.courseName = form.name;
                this.chapters = [];
                this.getChapters();
                this.getKnowledgeList();
                this.getMainChaperts();
                this.getCourseKnowledgeList();
                this.courseAKTree()
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
                    this.getKnowledgeTestListByChapter();
                }
                        
            },
            selectClassTest:function(now,old){
                this.viewClassWorkForm = now,
                this.viewClassWork = true;
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
            getKnowledgeTestListByChapter:function(){
                var params = {
                    chapterId: this.chooseChapterId,
                    courseId: this.courseId
                }
                Http.getKnowledgeTestList(params).then(res => {
                    if(res.statusCode === 1) {
                        this.knowledgeTestList = res.data;
                        for (var i = 0; i < res.data.length; i++) {
                            this.classWorkRefList.push(res.data[i].id)
                        }
                    } else {
                        this.$Message.error(res.message);
                    }
                })

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
            addClassWork:function(){
                this.addClassWorkForm = {
                    name:"",
                    chapterId:this.chooseChapterId,
                    knowledgeIdList:"",
                    courseId:this.courseId,
                };
                this.$emit("addClassWork", this.addClassWorkForm,this.KnowledgeList);
            },
            editClassWork:function(data){
                this.editClassWorkForm = {
                    id: data.id,
                    knowledgeId:data.knowledgeId,
                    chapterId: data.chapterId,
                    name: data.name,
                    item1: data.item1,
                    item2: data.item2,
                    item3: data.item3,
                    item4: data.item4,
                    ans: data.ans,
                    courseId: data.courseId
                };
                this.$emit("editClassWork", this.editClassWorkForm,this.KnowledgeList);
            },
            deleteClassWork:function(id){
                this.$emit("deleteClassWork", id)
            },
            showOption:function(i){
                this.$refs[`workRefList${i}`][0].style.display= 'inline';
            },
            hideOption:function(i){
                this.$refs[`workRefList${i}`][0].style.display= 'none';
            },
            showOption1:function(i){
                this.$refs[`classWorkRefList${i}`][0].style.display= 'inline';
            },
            hideOption1:function(i){
                this.$refs[`classWorkRefList${i}`][0].style.display= 'none';
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
            },
            courseAKTree:function(){
                var params = {
                    courseId: this.courseId,
                }
                Http.courseAKTree(params).then(res=>{
                    if(res.statusCode == 1) {
                        var courseAKTreeEchart = this.$echarts.init(document.getElementById('courseAKTree'));
                        var resData = [{
                            "name" : res.data.name,
                            "children" : res.data.children
                        }];
                        courseAKTreeEchart.hideLoading();
                        courseAKTreeEchart.setOption({
                            // backgroundColor: '#051F50',
                            tooltip: {
                                trigger: 'item',
                                triggerOn: 'mousemove'
                            },
                            series: [
                                {
                                    type: 'tree',
                                    zoom:1, //当前视角的缩放比例
                                    //roam: true, //是否开启平游或缩放
                                    scaleLimit: { //滚轮缩放的极限控制
                                        min: 1,
                                        max: 5
                                    },
                                    lineStyle: {
                                        color: "#000",
                                        width: 3,
                                        type: 'solid' //'dotted'虚线 'solid'实线
                                    },
                                    data: resData,
                                    itemStyle: {
                                        borderColor: "rgb(18, 191, 232)"
                                    },
                                    label: {
                                        normal: {
                                            textStyle: {
                                                color: 'rgba(0, 0, 0, 0.9)'
                                            }
                                        }
                                    },
                                    lineStyle: {
                                        curveness: 0.5
                                    },
                                    leaves:{
                                        itemStyle: {
                                            color: {
                                                type: 'radial',
                                                x: 0.5,
                                                y: 0.5,
                                                r: 0.5,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: 'red' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: 'blue' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            },
                                        }
                                    },
                                    top: '18%',
                                    bottom: '14%',
                                    // layout: 'radial',
                                    symbol: 'emptyCircle',
                                    symbolSize: 7,
                                    initialTreeDepth: 2,
                                    animationDurationUpdate: 750
                                }
                            ]
                        });
                        
                        courseAKTreeEchart.off('click')
                        courseAKTreeEchart.on('click',(clickParam)=>{
                            if(clickParam.data.courseId == null) {
                                this.$Message.warning('请点击知识点进行查看题目信息！');
                            }
                            var params2 = {
                                courseId: this.courseId,
                                knowledgeId: clickParam.data.id
                            }
                            Http.findByCourseIdAndKnowledgeId(params2).then(res=>{
                                this.classTestList = res.data
                            })
                        })
                    } else {
                        this.$Message.error();
                    }
                })
                
            },
            
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
