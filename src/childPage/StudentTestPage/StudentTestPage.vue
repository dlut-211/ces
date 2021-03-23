<template>
 <div>
    <tableModule :object="tableModule"></tableModule>
    <Modal title="测试详情"  v-model="ShowTestDetail">
        <Row>
            <Col span="6">
                <label>题目：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.name}}</Col>
        </Row>
        <br>
        <Row>
            <Col span="6">
                <label>选项A：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.item1}}</Col>
        </Row>
        <br>
        <Row>
            <Col span="6">
                <label>选项B：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.item2}}</Col>
        </Row>
        <br>
        <Row>
            <Col span="6">
                <label>选项C：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.item3}}</Col>
        </Row>
        <br>
        <Row>
            <Col span="6">
                <label>选项D：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.item4}}</Col>
        </Row>
        <br>
        <!-- <Row>
            <Col span="6">
                <label>正确答案：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.ans}}</Col>
        </Row> -->
        <!-- <br> -->
        <Row>
            <Col span="6">
                <label>我的答案：</label>
            </Col>
            <Col span="18">{{knowledgeTestDetail.myAns}}</Col>
        </Row>
    </Modal>
 </div>
</template>

<script>
import * as Http from "@/api/HttpService.js";
import {StudentTestTableModuleJS} from "./StudentTestTableModuleJS.js";
    // 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
 export default {
   data () {
     return {
        dataList:[],
        tableModule: (StudentTestTableModuleJS.bind(this))(),
        knowledgeTestId: "",
        knowledgeTestDetail: {
            "name": "",
            "item1": "",
            "item2": "",
            "item3": "",
            "item4": "",
            "ans": "",
            "myAns": ""
        },
        ShowTestDetail: false,
        knowledgeTestId: ""
     }
   },
   created() {
       this.getTestResults()
   },
           components: {
            tableModule: tableModule
        },
   methods: {
       // 根据课堂Id 和学生Id 来获取学生此课堂的测试信息
       getTestResults: function() {
           const classroomId = this.$store.state.classroomId
           const studentId = this.$store.state.number
           const params = {
               classroomId: classroomId,
               studentId: studentId
           }
           Http.getTestResults(params).then(res=>{
               console.log(res);
               if(res.statusCode == 1) {
                   console.log(res.data);
                   this.tableModule.tableContent = res.data;
                   this.tableModule.count = res.data.totalRecode;
               } else {
                   
               }
           })
           },
        
        //根据测试 Id 和学生 Id 来获取测试的详细信息
        getTestDetail: function() {
            console.log("hahhahahahhahahah")
            console.log("number" + this.$store.state.number)
            const params = {
                knowledgeTestId: this.knowledgeTestId,
                studentId: this.$store.state.number
            }
            Http.getTestDetail(params).then(res=>{
                console.log(res.data)
                if(res.statusCode == 1) {
                    this.ShowTestDetail = true;
                    this.knowledgeTestDetail = res.data
                    console.log(this.knowledgeTestDetail )
                } else {
                    this.$Message.error("发生错误，请重试");
                }
            })
        }
       }
   
 }
</script>

<style>

 
</style>
