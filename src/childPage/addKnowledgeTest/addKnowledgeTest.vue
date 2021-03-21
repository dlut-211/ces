<template>
 <div>
   <div>
        <Form :model="addKnowledgeTest" label-position="left" :label-width="100" :rules="workRule" ref="addKnowledgeTest">
        <Row>
          <Col span="24">
            <FormItem label="所属章节" class="forms" prop="ans">
              <Input type="textarea" v-model="addKnowledgeTest.ans" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="知识点" class="forms" prop="knowledgeId">
              <Input type="textarea" v-model="addKnowledgeTest.knowledgeId" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="测试题目" class="forms" prop="name">
              <Input v-model="addKnowledgeTest.name"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项A" class="forms" prop="item1">
              <Input type="textarea" v-model="addKnowledgeTest.item1" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项B" class="forms" prop="item2">
              <Input type="textarea" v-model="addKnowledgeTest.item2" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项C" class="forms" prop="item3">
              <Input type="textarea" v-model="addKnowledgeTest.item3" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="选项D" class="forms" prop="item4">
              <Input type="textarea" v-model="addKnowledgeTest.item4" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="正确答案" class="forms" prop="ans">
              <Input type="textarea" v-model="addKnowledgeTest.ans" :autosize="{minRows: 5,maxRows: 5}"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
   </div>
   <div>
     <Button type="ghost" size="large" @click="addCourse=false">取消</Button>
     <Button type="primary" size="large" @click="addTest(addKnowledgeTest)">确定</Button>
   </div>
 </div>
 
</template>

<script>
import * as Http from "@/api/HttpService.js";
 export default {
   data () {
     return {
        addKnowledgeTest: {
          charpterId: "",
          knowledgeId: "",
          name: "",
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          ans: ""
        },
        workRule: {
            name: [
                {required: true, message: "章节不能为空", trigger: "blur"}
              ],
            name: [
                {required: true, message: "知识点不能为空", trigger: "blur"}
              ],
            name: [
                {required: true, message: "题目不能为空", trigger: "blur"}
              ],
            item1: [
                {required: true, message: "选项不能为空", trigger: "blur"}
              ],
            item2: [
                {required: true, message: "选项不能为空", trigger: "blur"}
              ],
            item3: [
                {required: true, message: "选项不能为空", trigger: "blur"}
              ],
            item4: [
                {required: true, message: "选项不能为空", trigger: "blur"}
              ],
            ans: [
                {required: true, message: "选项不能为空", trigger: "blur"}
              ]
              },
     }
   },
   created() {

   },
   methods: {
       addTest: function(e) {
         var knowledgeTest = {
           name: e.name,
          item1: e.item1,
          item2: e.item2,
          item3: e.item3,
          item4: e.item4,
          ans: e.ans,
          knowledgeId: e.knowledgeId,
          charpterId: e.charpterId
         };
         Http.addKnowledgeTest(knowledgeTest).then(res => {
           if(res.data.statusCode == 1) {
            this.$Message.success("添加成功");
           } else{
            this.$Message.success("添加失败，请重试");
           }
         })
       }
   }
 }
</script>

<style>

 
</style>
