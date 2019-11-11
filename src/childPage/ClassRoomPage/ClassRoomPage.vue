<template>
  <div class="ClassRoomPage">
    <selectModule :object="selectModule" @submit="find"></selectModule>
    <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize"
                 @addClassRoom="addClassRoom=true;$refs['addClassRoomForm'].resetFields();"></tableModule>
    <Modal
      v-model="addClassRoom"
      title="添加课堂"
      width="800px"
      :mask-closable="false">
      <Form :model="addClassRoomForm" label-position="left" :label-width="100" :rules="rules" ref="addClassRoomForm">
        <Row>
          <Col span="12">
            <FormItem label="课程编号" class="forms" prop="CourseCode">
              <Input v-model="addClassRoomForm.CourseCode" disabled style="width:180px;" placeholder="请选择课程"></Input>
              <Button type="info" @click="courseModalVisible=true">点击选择</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="课程名称" class="forms" prop="CourseName">
              <Input v-model="addClassRoomForm.CourseName" disabled></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="课堂名称" class="forms" prop="name">
              <Input v-model="addClassRoomForm.name"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="学期类型" class="forms" prop="TermType">
              <Select v-model="addClassRoomForm.TermType" :placeholder="'请选择学期类型'">
                <Option v-for="item in termTypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="上课起始日期" class="forms" prop="BeginDate">
              <DatePicker type="date" placeholder="请选择起始日期" style="width: 265px"
                          v-model="addClassRoomForm.BeginDate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="上课截止日期" class="forms" prop="EndDate">
              <DatePicker type="date" placeholder="请选择截止日期" style="width: 265px"
                          v-model="addClassRoomForm.EndDate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="平时成绩权重" class="forms" prop="dailyPerformanceWeight">
              <InputNumber :min="0.0" :max="1" style="width: 100%"
                           v-model="addClassRoomForm.dailyPerformanceWeight"></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="考试成绩权重" class="forms" prop="testPerformanceWeight">
              <InputNumber :min="0.0" :max="1" style="width: 100%"
                           v-model="addClassRoomForm.testPerformanceWeight"></InputNumber>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="addClassRoom=false">取消</Button>
        <Button type="primary" size="large" @click="addClassRoomHandleSubmit('addClassRoomForm')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="editClassRoom"
      title="编辑课堂"
      width="800px"
      :mask-closable="false">
      <Form :model="editClassRoomForm" label-position="left" :label-width="100" :rules="rules" ref="editClassRoomForm">
        <Row>
          <Col span="12">
            <FormItem label="课程编号" class="forms" prop="CourseCode">
              <Input v-model="editClassRoomForm.CourseCode" disabled style="width:180px;" placeholder="请选择课程"></Input>
              <Button type="info" @click="courseModalVisible=true">点击选择</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="课程名称" class="forms" prop="CourseName">
              <Input v-model="editClassRoomForm.CourseName" disabled></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="课堂名称" class="forms" prop="name">
              <Input v-model="editClassRoomForm.name"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="学期类型" class="forms" prop="TermType">
              <Select v-model="editClassRoomForm.TermType" :placeholder="'请选择学期类型'">
                <Option v-for="item in termTypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="上课起始日期" class="forms" prop="BeginDate">
              <DatePicker type="date" placeholder="请选择起始日期" style="width: 265px"
                          v-model="editClassRoomForm.BeginDate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="上课截止日期" class="forms" prop="EndDate">
              <DatePicker type="date" placeholder="请选择截止日期" style="width: 265px"
                          v-model="editClassRoomForm.EndDate"></DatePicker>
            </FormItem>
          </Col>
          <!--平时成绩 :rules="{required: true, message: '平时成绩权重不能为空', trigger: 'change', type: 'number'}"-->
          <Col span="12">
            <FormItem label="平时成绩权重" class="forms" prop="dailyPerformanceWeight">
              <InputNumber :min="0.0" :max="1" style="width: 100%"
                           v-model="editClassRoomForm.dailyPerformanceWeight"></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="考试成绩权重" class="forms" prop="testPerformanceWeight">
              <InputNumber :min="0.0" :max="1" style="width: 100%"
                           v-model="editClassRoomForm.testPerformanceWeight "></InputNumber>
            </FormItem>
          </Col>

        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="editClassRoom=false">取消</Button>
        <Button type="primary" size="large" @click="editClassRoomHandleSubmit('editClassRoomForm')">确定</Button>
      </div>
    </Modal>
    <!-- 课堂内容 -->
    <Modal v-model="classRoomInfoVisible" title="课堂内容" width="1200px" :mask-closable="false" :footer-hide="true">
      <classRoomInfo
        @importStudent="importStudentModal"
        @openWorkDetail="studentWorkDetailModal"
        @addTestPaper="addTestPaperModal"
        @editTestPaper="editTestPaperModal"
        @detailTestPaper="detailTestPaperModal"
        @showResultAnalysisModal="showResultAnalysisModal"
        ref="classRoomDetail">
      </classRoomInfo>
    </Modal>
    <!-- 课程 -->
    <courseModal :visible="courseModalVisible" @submit="courseModalSubmit"
                 @cancel="courseModalVisible=false"></courseModal>
    <!-- 导入学生 -->
    <Modal v-model="importStudentVisible" title="导入学生" width="300px" :mask-closable="false" :footer-hide="true">
      <Row style="margin-bottom:20px;">
        <a :href='url' download="muban"
           style="color:white;display:inline-block;width:100px;height:35px;background-color:rgb(45,140,240);line-height:35px;text-align:center">下载模板</a>
      </Row>
      <Row>
        <Col span="24">
          <Upload :action="uploadFile + nowClassRoomId" :headers="{Authorization:$store.state.token}"
                  style="float: left; margin-right: 20px;" :show-upload-list="false"
                  :on-success="handleImportStudentSuccess" :on-format-error="handleFormatError">
            <Button type="success">点击导入学生</Button>
          </Upload>
        </Col>
      </Row>
    </Modal>
    <!-- 作业情况 -->
    <Modal v-model="studentWorkVisible" title="学生作业情况" width="1100px" :mask-closable="false" :footer-hide="true"
           @on-cancel="studentWorkClose">
      <div>
        <Row>
          <Col span="19"><b>作业名称:</b> {{workName}}</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">{{scoreCount}}</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">{{submitCount}}</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">{{layoutCount}}</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">{{completionRate}}%</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">{{avgScore}}</Col>
        </Row>
        <Row>
          <Col span="19"><b>作业描述:</b> {{description}}</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">已评分</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">已提交</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">已布置</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">完成率</Col>
          <Col span="1" style="background-color:#E0E6F8;font-weight:bold;text-align:center;">平均分</Col>
        </Row>
        <Row style="margin-bottom:10px;">
          <Col span="24"><b>布置作业时间:</b> {{layoutTime}}</Col>
        </Row>
      </div>
      <tableModule :object="studentWorkTableModule" @changePage="swChangePage" @changeSize="swChangeSize"></tableModule>
    </Modal>
    <!-- 打分 -->
    <Modal
      v-model="StudentGrade"
      title="评分"
      width="600px"
      :mask-closable="false">

      <InputNumber :min="0" :max="100" :precision="0" style="width: 100%"
                   v-model="editStudentWorkForm.score"></InputNumber>

      <div slot="footer">
        <Button type="ghost" size="large" @click="StudentGrade=false">取消</Button>
        <Button type="primary" size="large" @click="editStudentWork()">确定</Button>
      </div>

    </Modal>
    <!-- 提交作业 -->
    <Modal
      v-model="addStudentWorkDetail"
      title="提交作业"
      width="600px"
      :mask-closable="false">
      <Form :model="addStudentWorkDetailForm" label-position="left" :label-width="100" :rules="studentWorkDetailRules"
            ref="addStudentWorkDetailForm">
        <Row>
          <Col span="24">
            <FormItem label="作业" class="forms" prop="workPath">
              <Upload :action="uploadWorkFile" :headers="{Authorization:$store.state.token}"
                      style="float: left; margin-right: 20px;" :show-upload-list="false"
                      :on-success="handleWorkSuccess"
                      :on-format-error="handleFormatError">
                <div>
                  <Button type="ghost" icon="ios-cloud-upload-outline">点击上传作业</Button>
                </div>
              </Upload>
              <div v-if="!addStudentWorkDetailForm.workPath" v-model="addStudentWorkDetailForm.workPath">
                <div>如果作业文件过多，请先压缩成一个文件再上传</div>
              </div>
              <div v-if="addStudentWorkDetailForm.workPath" v-model="addStudentWorkDetailForm.workPath">
                <a :href="addStudentWorkDetailForm.workPath" target="blank">查看作业</a>
              </div>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="分数" class="forms" prop="studentWorkScore">
              <InputNumber :min="0" :max="100" :precision="0" style="width: 100%"
                           v-model="addStudentWorkDetailForm.studentWorkScore"></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="代码行数" class="forms" prop="lineOfCode">
              <InputNumber :min="1" :precision="0" style="width: 100%"
                           v-model="addStudentWorkDetailForm.lineOfCode"></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="用例通过数" class="forms" prop="casePassedCount">
              <InputNumber :min="1" :precision="0" style="width: 100%"
                           v-model="addStudentWorkDetailForm.casePassedCount"></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="圈复杂度" class="forms" prop="complexity">
              <InputNumber :min="0.1" :max="10" style="width: 100%" :step="0.1"
                           v-model="addStudentWorkDetailForm.complexity"></InputNumber>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="addStudentWorkDetail=false">取消</Button>
        <Button type="primary" size="large" @click="addStudentWorkDetailHandleSubmit('addStudentWorkDetailForm')">确定
        </Button>
      </div>
    </Modal>
    <!-- 学生作业明细 -->
    <Modal v-model="studentWorkDetailVisible" title="学生作业明细" width="1000px" :mask-closable="false" :footer-hide="true"
           @on-cancel="studentWorkDetailClose">
      <tableModule :object="studentWorkDetailTableModule" @changePage="swdChangePage"
                   @changeSize="swdChangeSize"></tableModule>
    </Modal>

    <!-- 课堂试卷 -->
    <Modal v-model="addTestPaper" title="添加试卷" width="700px" :mask-closable="false">
      <Form :model="addTestPaperForm" label-position="left" :label-width="100" :rules="testPaperRule"
            ref="addTestPaperForm">
        <Row>
          <Col span="12">
            <FormItem label="试卷名称" class="forms" prop="name">
              <Input v-model="addTestPaperForm.name"></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="试卷类型" class="forms" prop="testPaperType">
              <Select v-model="addTestPaperForm.testPaperType" :placeholder="'请选择试卷类型'"
                      @on-change="testPaperTypeChange">
                <Option v-for="item in testPaperTypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem class="forms" prop="a">
              <div v-model="addTestPaperForm.a" style="height:64px;">
                <!-- 添加A卷 -->
                <Card class="paperCardDefault" v-if="addTestPaperForm.a.length === 0"
                      @click.native="addPaperDetail(1, 'addTestPaperForm', addTestPaperForm)">
                  <div style="color:#A4A4A4">
                    <Icon type="plus"></Icon>
                    A卷
                  </div>
                </Card>
                <!-- 编辑A卷 -->
                <Card class="paperCardA" v-else
                      @click.native="editPaperDetail(1, 'addTestPaperForm', this.addTestPaperForm.a)">
                  <div> A卷</div>
                </Card>
              </div>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem class="forms" prop="b">
              <div v-model="addTestPaperForm.b" style="height:64px;">
                <!-- 添加B卷 -->
                <Card class="paperCardDefault"
                      v-if="addTestPaperForm.testPaperType === 2 && addTestPaperForm.b.length === 0"
                      @click.native="addPaperDetail(2, 'addTestPaperForm', addTestPaperForm)">
                  <div style="color:#A4A4A4">
                    <Icon type="plus"></Icon>
                    B卷
                  </div>
                </Card>
                <!-- 编辑B卷 -->
                <Card class="paperCardB" v-if="addTestPaperForm.testPaperType === 2 && addTestPaperForm.b.length > 0"
                      @click.native="editPaperDetail(2, 'addTestPaperForm', addTestPaperForm)">
                  <div> B卷</div>
                </Card>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="addTestPaper=false">取消</Button>
        <Button type="primary" size="large" @click="addTestPaperHandleSubmit('addTestPaperForm')">确定</Button>
      </div>
    </Modal>

    <Modal v-model="editTestPaper" title="编辑试卷" width="700px" :mask-closable="false">
      <Form :model="editTestPaperForm" label-position="left" :label-width="100" :rules="testPaperRule"
            ref="editTestPaperForm">
        <Row>
          <Col span="12">
            <FormItem label="试卷名称" class="forms" prop="name">
              <Input v-model="editTestPaperForm.name"></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="试卷类型" class="forms" prop="testPaperType">
              <Select v-model="editTestPaperForm.testPaperType" :placeholder="'请选择试卷类型'"
                      @on-change="testPaperTypeChange">
                <Option v-for="item in testPaperTypeArr" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem class="forms" prop="a">
              <div v-model="editTestPaperForm.a" style="height:64px;">
                <Card class="paperCardDefault" v-if="editTestPaperForm.a.length===0"
                      @click.native="addPaperDetail(1, 'editTestPaperForm', editTestPaperForm)">
                  <div style="color:#A4A4A4">
                    <Icon type="plus"></Icon>
                    A卷
                  </div>
                </Card>
                <Card class="paperCardA" v-else
                      @click.native="editPaperDetail(1, 'editTestPaperForm', editTestPaperForm)">
                  <div> A卷</div>
                </Card>
              </div>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem class="forms" prop="b">
              <div v-model="editTestPaperForm.b" style="height:64px;">
                <Card class="paperCardDefault"
                      v-if="editTestPaperForm.testPaperType === 2 && editTestPaperForm.b.length === 0"
                      @click.native="addPaperDetail(2, 'editTestPaperForm', editTestPaperForm)">
                  <div style="color:#A4A4A4">
                    <Icon type="plus"></Icon>
                    B卷
                  </div>
                </Card>
                <Card class="paperCardB" v-if="editTestPaperForm.testPaperType === 2 && editTestPaperForm.b.length > 0"
                      @click.native="editPaperDetail(2, 'editTestPaperForm',editTestPaperForm)">
                  <div> B卷</div>
                </Card>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" size="large" @click="editTestPaper=false">取消</Button>
        <Button type="primary" size="large" @click="editTestPaperHandleSubmit('editTestPaperForm')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="detailTestPaper"
      title="试卷详情"
      width="700px"
      :mask-closable="false"
      :footer-hide="true">
      <Tabs v-model="detailTabIndex">
        <TabPane label="试卷信息">
          <Row style="margin-left:10px;font-weight:bold;font-size:14px;margin-bottom:10px;">
            <Col span="20" style="margin-bottom:5px;">试卷名称：{{detailTestPaperForm.name}}</Col>
            <Col span="24">试卷类型：{{detailTestPaperForm.TestPaperTypeName}}</Col>
          </Row>
          <Tabs v-model="detailTPDTabIndex">
            <TabPane label="A卷">
              <Table height="400" :columns="testPaperDetailColumn" :data="detailTestPaperForm.a"></Table>
            </TabPane>
            <TabPane v-if="detailTestPaperForm.testPaperType == 2" label="B卷">
              <Table height="400" :columns="testPaperDetailColumn" :data="detailTestPaperForm.b"></Table>
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane v-if="detailTestPaperForm.status == 2" label="考试详情">
          <Row style="margin-bottom:10px;">
            <Col span="4">
              <a  :href='downloadStudentTestPaperTemplateUrl'  download="muban"
              style="color:white;display:inline-block;width:100px;
              height:35px;background-color:rgb(45,140,240);line-height:35px;text-align:center">下载导入模板</a>
            </Col>
            <Upload :action="uploadStudentTestPaperFileUrl" :headers="{Authorization:$store.state.token}"
                    style="float: left; margin-right: 20px;" :show-upload-list="false"
                    :on-success="handleImportStudentTestPaperSuccess" :on-format-error="handleFormatError">
              <Button type="success">点击导入成绩</Button>
            </Upload>
          </Row>
          <Row>
            <Col span="12" style="font-weight:bold;">导入说明：</Col>
          </Row>
          <Row>
            <Col span="12" style="color:red;font-weight:bold;">1.每个试卷的导入模板不同，导入前请先下载对应试卷模板</Col>
          </Row>
          <Row>
            <Col span="12" style="color:red;font-weight:bold;">2.如果未填试题得分或填写错误，则视为0分</Col>
          </Row>
          <Row style="margin-bottom:10px;">
            <Col span="12" style="color:red;font-weight:bold;">3.多次上传成绩时，系统将对成绩进行覆盖</Col>
          </Row>
          <Table height="400" :columns="studentTestPaperColumn" :data="studentTestPaperList"></Table>
        </TabPane>
      </Tabs>
    </Modal>
    <!-- 试题 -->
    <Modal
      v-model="testPaperDetail"
      title="编辑试题"
      width="600px"
      :mask-closable="false">
      <Row style="margin-bottom:10px;">
        <Col span="24">
          <Button type="dashed" @click="addNewDetail" v-if="nowEditTestPaperType === 1">添加试题</Button>
        </Col>
      </Row>
      <Form :model="testPaperDetailForm" label-position="left" :label-width="100" ref="testPaperDetailForm">
        <div v-for="(item,index) in testPaperDetailForm.testPaperDetailList" :key="index">
          <Row style="margin-bottom:5px;background-color:#EFF5FB;height:35px;line-height:36px;vertical-align:middle;">
            <Col span="12" style="font-size:14px;font-weight:bold;padding-left:10px;float:left;">
              第{{NumberToChinese(item.detailNumber)}}题
            </Col>
            <Col span="12">
              <Button type="error" style="float:right;height:30px;margin-top:3px;" @click="delTestPaperDetail(index)"
                      v-if="nowEditTestPaperType === 1">删除
              </Button>
              <Button type="info" style="float:right;height:30px;margin-top:3px;margin-right:5px;"
                      @click="downTestPaperDetail(index)">下移
              </Button>
              <Button type="success" style="float:right;height:30px;margin-top:3px;margin-right:5px;"
                      @click="upTestPaperDetail(index)">上移
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem
                label="试题标题"
                class="forms"
                :prop="'testPaperDetailList.' + index + '.title'"
                :rules="{required: true, message: '试题标题不能为空', trigger: 'blur'}">
                <Input :disabled="nowEditTestPaperType === 2" v-model="item.title"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="分数"
                class="forms"
                :prop="'testPaperDetailList.' + index + '.score'"
                :rules="{required: true, message: '分数不能为空', trigger: 'change', type:'number'}">
                <InputNumber :disabled="nowEditTestPaperType === 2" :min="1" :max="100" :precision="0"
                             style="width: 100%" v-model="item.score"></InputNumber>
              </FormItem>
            </Col>
          </Row>
          <Row v-for="(kitem, kindex) in item.knowledgeList" :key="kindex">
            <Col span="12">
              <FormItem
                :label="'知识点'+(kindex+1)"
                class="forms"
                :prop="'testPaperDetailList.' + index + '.knowledgeList.' + kindex + '.knowledgeId'"
                :rules="{required: true, message: '知识点不能为空', trigger: 'change', type: 'number'}">
                <Select :disabled="nowEditTestPaperType === 2" v-model="kitem.knowledgeId" :placeholder="'请选择知识点'">
                  <Option v-for="ckitem in courseKnowledgeList" :value="ckitem.id" :key="ckitem.id">{{ ckitem.name }}
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                :label="'权重'+(kindex+1)"
                class="forms"
                :prop="'testPaperDetailList.' + index + '.knowledgeList.' + kindex + '.weight'"
                :rules="{required: true, message: '权重不能为空', trigger: 'change', type: 'number'}">
                <InputNumber :disabled="nowEditTestPaperType === 2" :min="0.1" :max="1" style="width: 100%"
                             v-model="kitem.weight"></InputNumber>
              </FormItem>
            </Col>
            <Col span="4">
              <Button type="error" @click="delTestPaperDetailKnowledge(index,kindex)"
                      v-if="nowEditTestPaperType === 1 && kindex != 0">删除
              </Button>
            </Col>
          </Row>
          <FormItem
            class="forms"
            :prop="'testPaperDetailList.' + index + '.knowledgeList'"
            :rules="knowledgeRule">
            <Row>
              <Col span="12">
                <Button v-if="nowEditTestPaperType === 1" v-model="item.knowledgeList" type="dashed"
                        @click="handleAddKnowledge(index)" icon="android-add">添加知识点
                </Button>
              </Col>
            </Row>
          </FormItem>
        </div>
      </Form>

      <div slot="footer">
        <Button type="ghost" size="large" @click="testPaperDetail=false">取消</Button>
        <Button type="primary" size="large" @click="testPaperDetailHandleSubmit('testPaperDetailForm')">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showResultAnalysis" title="试卷结果分析" @on-ok="ok" @on-cancel="cancel" width="1000px">
      <div>
        <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
      </div>
      <div>
        <div id="myChart2" :style="{width: '600px', height: '400px'}"></div>
      </div>
    </Modal>
  </div>
</template>
<script>
    // 引入查询模块组件
    import selectModule from "@/components/selectModule/selectModule.vue";
    // 引入表格模块组件
    import tableModule from "@/components/tableModule/tableModule.vue";
    // 引入查询模块配置项
    import {ClassRoomSelectModuleJS} from "./ClassRoomSelectModuleJS.js";
    // 引入表格模块配置项
    import {ClassRoomTableModuleJS} from "./ClassRoomTableModuleJS.js";
    // 引入课程内容组件
    import classRoomInfo from "@/components/classRoomInfo/classRoomInfo.vue";
    // 引入课程选择模态框
    import courseModal from "@/modal/courseModal/courseModal.vue";
    // 引入表格模块配置项
    import {StudentWorkTableModuleJS} from "./StudentWorkTableModuleJS.js";
    // 引入表格模块配置项
    import {StudentWorkDetailTableModuleJS} from "./StudentWorkDetailTableModuleJS.js";
    // 引入API
    import * as Http from "@/api/HttpService.js";
    import {API} from "@/api/HttpConfig";
    import axios from 'axios';

    export default {
        computed: {
            uploadFile: function () {
                return API.importClassRoomStudent + '?filesname=Student&classRoomId=';
            },
            uploadWorkFile: function () {
                return API.uploadFile + '?filesname=StudentWork';
            },
            uploadStudentTestPaperFile: function () {
                return API.importStudentTestPaper + '?filesname=StudentTestPaper&testPaperId=';
            },
        },
        data: function () {
            var validateKnowledgeList = function (rule, value, callback) {
                var sumWeight = 0;
                for (let i = 0; i < value.length; i++) {
                    sumWeight += value[i].weight;
                }
                if (sumWeight != 1) {
                    callback(new Error("知识点权重之和必须为1"));
                } else {
                    callback();
                }
            };

            return {
                uploadStudentTestPaperFileUrl: '',
                detailTestPaperId: '',
                downloadStudentTestPaperTemplateUrl: '',
                url: '',
                selectModule: (ClassRoomSelectModuleJS.bind(this))(),
                tableModule: (ClassRoomTableModuleJS.bind(this))(),
                addClassRoom: false,
                addClassRoomForm: {
                    BeginDate: "",
                    CourseId: "",
                    EndDate: "",
                    TermType: "",
                    name: "",
                    CourseCode: "",
                    CourseName: "",
                    dailyPerformanceWeight: null,//添加权重
                    testPerformanceWeight: null
                },
                StudentGrade: false,
                editStudentWorkForm: {
                    id: null,
                    classroomWorkId: null,
                    ClassRoomStudentId: null,
                    isScore: "",
                    score: null,
                    WorkMessage: ""
                },
                editClassRoom: false,
                editClassRoomForm: {
                    id: null,
                    BeginDate: "",
                    CourseId: "",
                    EndDate: "",
                    TermType: "",
                    name: "",
                    CourseCode: "",
                    CourseName: "",
                    dailyPerformanceWeight: null,//添加权重
                    testPerformanceWeight: null
                },
                nowPage: 1,
                pageSize: 10,
                findClassRoomForm: {
                    TermType: null,
                    name: '',
                    status: null,
                    BeginDateStart: '',
                    BeginDateEnd: '',
                    EndDateStart: '',
                    EndDateEnd: '',
                },
                rules: {
                    BeginDate: [
                        {required: true, message: "上课起始日期不能为空", trigger: "change", type: "date"}
                    ],
                    EndDate: [
                        {required: true, message: "上课截止日期不能为空", trigger: "change", type: "date"}
                    ],
                    CourseName: [
                        {required: true, message: "课程不能为空", trigger: "blur"}
                    ],
                    TermType: [
                        {required: true, message: "学期类型不能为空", trigger: "change", type: 'number'}
                    ],
                    name: [
                        {required: true, message: "课堂名称不能为空", trigger: "blur"}
                    ],
                    //---验证
                    dailyPerformanceWeight: [{
                        required: true, message: "平时成绩权重不能为空", trigger: "change", type: 'number'
                    }],
                    testPerformanceWeight: [{
                        required: true, message: "平时成绩权重不能为空", trigger: "change", type: 'number'
                    }],

                },
                termTypeArr: [
                    {name: '春季学期', value: 1},
                    {name: '夏季学期', value: 2},
                    {name: '秋季学期', value: 3}
                ],
                // 课程选择
                courseModalVisible: false,
                // 课堂内容
                classRoomInfoVisible: false,
                showForm: {},
                // 学生 ==================================
                importStudentVisible: false,
                nowClassRoomId: null,
                // 作业============================
                studentWorkVisible: false,
                classroomWorkId: null,
                workName: "",
                description: "",
                layoutTime: "",
                studentWorkTableModule: (StudentWorkTableModuleJS.bind(this))(),
                swNowPage: 1,
                swPageSize: 10,
                scoreCount: null,
                submitCount: null,
                layoutCount: null,
                completionRate: null,
                avgScore: null,
                // 提交作业
                addStudentWorkDetail: false,
                addStudentWorkDetailForm: {
                    workName: "",
                    workPath: "",
                    casePassedCount: null,
                    complexity: null,
                    lineOfCode: null,
                    studentWorkId: "",
                    studentWorkScore: null,
                    studentWorkMessage: null
                },
                studentWorkDetailRules: {
                    workPath: [
                        {required: true, message: "作业不能为空", trigger: "blur"}
                    ],
                    studentWorkScore: [
                        {required: true, message: "分数不能为空", trigger: "change", type: 'number'}
                    ]
                },
                // 学生作业明细
                studentWorkDetailVisible: false,
                studentWorkDetailTableModule: (StudentWorkDetailTableModuleJS.bind(this))(),
                swdNowPage: 1,
                swdPageSize: 10,
                studentWorkId: null,

                /**
                 * 添加试卷
                 */
                addTestPaper: false,
                addTestPaperForm: {
                    name: "",
                    classroomId: null,
                    testPaperType: 1,
                    a: [],
                    b: []
                },

                /**
                 * 编辑试卷
                 */
                editTestPaper: false,
                editTestPaperForm: {
                    id: null,
                    name: "",
                    classroomId: null,
                    testPaperType: null,
                    status: null,
                    a: [],
                    b: []
                },

                /**
                 * 试卷验证规则
                 */
                testPaperRule: {
                    name: [
                        {required: true, message: "试卷名称不能为空", trigger: "blur"}
                    ],
                    testPaperType: [
                        {required: true, message: "试卷类型不能为空", trigger: "change", type: 'number'}
                    ],
                    a: [
                        {required: true, message: "A卷不能为空", trigger: 'blur', trigger: "change", type: 'array'}
                    ],
                    b: [
                        {
                            validator: function (rule, value, callback) {
                                callback();
                            }, trigger: 'blur', trigger: "change", type: 'array'
                        }
                    ]
                },

                /**
                 * 编辑试卷
                 */
                testPaperTypeArr: [
                    {name: 'A卷', value: 1},
                    {name: 'AB卷', value: 2}
                ],

                detailTabIndex: 0,
                detailTPDTabIndex: 0,
                detailTestPaper: false,
                detailTestPaperForm: {},
                testPaperDetailColumn: [
                    {
                        title: "题号",
                        key: "detailNumber",
                        align: "center",
                        width: 85,
                        render: (h, params) => {
                            return h("div", ['第' + this.NumberToChinese(params.row.detailNumber) + '题'])
                        }
                    },
                    {title: "试题标题", key: "title", align: "center", width: 180},
                    {title: "分数", key: "score", align: "center", width: 80},
                    {title: "知识点", key: "knowledgeName", align: "center"}
                ],
                studentTestPaperColumn: [],
                studentTestPaperList: [],

                /**
                 * 试题
                 */
                nowEditTestPaperType: 1,
                testPaperDetail: false,
                testPaperDetailForm: {
                    testPaperDetailList: []
                },
                nowFormName: '',
                nowForm: null,
                courseKnowledgeList: [],
                knowledgeRule: {validator: validateKnowledgeList, trigger: 'change', type: 'array'},
                showResultAnalysis:false
            };
        },

        mounted: function () {
            this.getClassRoomStudentTemplateUrl();
            this.$store.commit("changeBreadCrumb", [
                "首页",
                "教学管理",
                "我的课堂"
            ]);
            this.$store.commit("changeOpenName", [""]);
            this.$store.commit("changeActiveName", "NetGraphPage");
            this.getClassRoomList()
        },

        components: {
            selectModule: selectModule,
            tableModule: tableModule,
            courseModal: courseModal,
            classRoomInfo: classRoomInfo
        },

        methods: {

            handleImportStudentTestPaperSuccess: function () {
                // TODO
            },

            getClassRoomStudentTemplateUrl: function () {
                this.url = API.getClassRoomStudentTemplate;
            },

            //添加分数
            editStudentWork: function () {
                this.editStudentWorkForm.isScore = true;
                let params = this.editStudentWorkForm;
                Http.putStudentWork(params).then(res => {
                    if (res.statusCode === 1) {
                        this.editStudentWorkForm = {
                            id: null,
                            classroomWorkId: null,
                            ClassRoomStudentId: null,
                            isScore: "",
                            score: null,
                            WorkMessage: ""
                        };
                        this.StudentGrade = false;
                        this.$Message.success(res.Message);
                        this.getStudentWorkList()
                    } else {
                        this.$Message.error(res.Message);
                    }
                })
            },
            // 选择的课程后点击确定
            courseModalSubmit: function (a) {
                if (this.addClassRoom) {
                    this.addClassRoomForm.CourseId = a.id;
                    this.addClassRoomForm.CourseCode = a.code;
                    this.addClassRoomForm.CourseName = a.name;
                } else {
                    this.editClassRoomForm.CourseId = a.id;
                    this.editClassRoomForm.CourseCode = a.code;
                    this.editClassRoomForm.CourseName = a.name;
                }
                this.courseModalVisible = false;
            },

            /**
             * 处理添加课堂
             */
            addClassRoomHandleSubmit: function (name) {
                var result = this.$refs[name].validate(valid => {
                    if (valid) {
                        var sum = this.addClassRoomForm.dailyPerformanceWeight + this.addClassRoomForm.testPerformanceWeight
                        if (sum != 1) {
                            this.$Message.error("知识点权重之和为1!");
                        } else {
                            this.addClassRoomAction();
                        }
                    } else {
                        //权重必须和为1
                        var sum = this.addClassRoomForm.dailyPerformanceWeight + this.addClassRoomForm.testPerformanceWeight
                        if (sum != 1) {
                            this.$Message.error("知识点权重之和为1!");
                        } else if (sum === 1)
                            this.$Message.error("表单信息不正确!");
                    }
                });
                return result;
            },

            /**
             * 处理编辑课堂
             */
            editClassRoomHandleSubmit: async function (name) {
                var result = await this.$refs.editClassRoomForm.validate(valid => {
                });
                if (result) {
                    var sum = this.editClassRoomForm.dailyPerformanceWeight + this.editClassRoomForm.testPerformanceWeight;
                    if (sum != 1) {
                        this.$Message.error("知识点权重之和为1!");
                    } else {
                        this.editClassRoomAction();
                    }

                } else {
                    //权重必须和为1
                    var sum = this.editClassRoomForm.dailyPerformanceWeight + this.editClassRoomForm.testPerformanceWeight;
                    if (sum != 1) {
                        this.$Message.error("知识点权重之和为1!");
                    } else if (sum === 1)
                        this.$Message.error("表单信息不正确!");

                }
            },
            // 查询方法
            find: function (a) {
                this.findClassRoomForm.TermType = a.TermType ? a.TermType : null;
                this.findClassRoomForm.name = a.name ? a.name : "";
                this.findClassRoomForm.Status = a.Status ? a.Status : null;
                if (a.BeginDate.length > 0) {
                    this.findClassRoomForm.BeginDateStart = a.BeginDate[0];
                    this.findClassRoomForm.BeginDateEnd = a.BeginDate[1];
                }
                if (a.EndDate.length > 0) {
                    this.findClassRoomForm.EndDateStart = a.EndDate[0];
                    this.findClassRoomForm.EndDateEnd = a.EndDate[1];
                }
                this.getClassRoomList();
            },
            // 改变页码
            changePage: function (page) {
                this.nowPage = page;
                this.getClassRoomList();
            },

            // 改变每页显示的条数
            changeSize: function (size) {
                this.pageSize = size;
                this.getClassRoomList();
            },

            // 添加课堂
            addClassRoomAction: function () {
                var params = this.addClassRoomForm;
                Http.postClassRoom(params).then(res => {
                    if (res.statusCode === 1) {
                        this.$Message.success(res.message);
                        //清空之前保存的数据
                        this.addClassRoomForm = {
                            BeginDate: "",
                            CourseId: "",
                            EndDate: "",
                            TermType: "",
                            name: "",
                            dailyPerformanceWeight: null,
                            testPerformanceWeight: null
                        };
                        this.addClassRoom = false;
                        this.$refs["addClassRoomForm"].resetFields();
                        this.getClassRoomList();
                    } else {
                        this.$Message.error(res.Message);
                    }
                });
            },
            // 编辑课堂
            editClassRoomAction: function () {
                var params = this.editClassRoomForm;
                Http.putClassRoom(params).then(res => {
                    if (res.statusCode === 1) {
                        this.$Message.success(res.message);
                        this.editClassRoomForm = {
                            id: null,
                            BeginDate: "",
                            CourseId: "",
                            EndDate: "",
                            TermType: "",
                            name: "",
                            dailyPerformanceWeight: null,
                            testPerformanceWeight: null
                        };
                        this.editClassRoom = false;
                        this.$refs["editClassRoomForm"].resetFields();
                        this.getClassRoomList();
                    } else {
                        this.$Message.error(res.message);
                    }
                })
            },

            // 查询课堂
            getClassRoomList: function () {
                var params = {
                    page: this.nowPage,
                    limit: this.pageSize,
                    BeginDateStart: this.findClassRoomForm.BeginDateStart,
                    BeginDateEnd: this.findClassRoomForm.BeginDateEnd,
                    EndDateStart: this.findClassRoomForm.EndDateStart,
                    EndDateEnd: this.findClassRoomForm.EndDateEnd,
                    TermType: this.findClassRoomForm.TermType,
                    name: this.findClassRoomForm.name,
                    status: this.findClassRoomForm.status
                };
                Http.getClassRoomList(params).then(res => {
                    if (res.statusCode === 1) {
                        let valueList = res.data.list;
                        for (let i = 0; i < valueList.length; i++) {
                            if (valueList[i].status == 1) {
                                valueList[i].cellClassName = {
                                    StatusName: 'status-column-yellow'
                                };
                            } else if (valueList[i].status == 2) {
                                valueList[i].cellClassName = {
                                    StatusName: 'status-column-blue-new'
                                };
                            } else if (valueList[i].status == 4) {
                                valueList[i].cellClassName = {
                                    StatusName: 'status-column-orange'
                                };
                            }
                        }
                        this.tableModule.tableContent = res.data.list;
                        this.tableModule.count = res.data.total;
                    }
                });
            },

            // 删除课堂
            deleteClassRoomAction: function (id) {
                var params = {
                    id: id
                }
                Http.deleteClassRoom(params).then(res => {
                    if (res.statusCode === 1) {
                        this.$Message.success("删除成功");
                        this.getClassRoomList();
                    } else {
                        this.$Message.error(res.message);
                    }
                })
            },

            // 修改课堂状态
            editClassRoomStatusAction: function (id, status) {
                var params = {
                    id: id,
                    status: status
                }
                Http.editClassRoomStatus(params).then(res => {
                    if (res.statusCode === 1) {
                        this.$Message.success(res.message);
                        this.getClassRoomList();
                    } else {
                        this.$Message.error(res.message);
                    }
                })
            },
            // 学生============================================================
            importStudentModal: function (id) {
                this.importStudentVisible = true;
                this.nowClassRoomId = id
            },
            downloadTemplate: function () {
                var params = {}
                Http.getClassRoomStudentTemplate(params, {responseType: 'arraybuffer'}).then(res => {
                    // if(res.statusCode===1){
                    window.open(res.data);
                    // }
                    // else{
                    //     this.$Message.error("获取模板错误");
                    // }
                })

            },

            /**
             * 编辑上传成功钩子 异步方法
             */
            handleImportStudentSuccess: async function (res, file) {
                if (res.statusCode === 1) {
                    this.$Message.success(res.message)
                    this.$refs.classRoomDetail.getClassRoomStudentList()
                    this.importStudentVisible = false
                } else {
                    this.$Message.error(res.message)
                }
            },

            /**
             * 文件格式验证失败钩子
             */
            handleFormatError: function (res, file) {
                this.$Message.error("文件格式不正确")
            },

            /**
             * 打开作业详情
             */
            studentWorkDetailModal: function (row) {
                console.log("打开作业详情");
                console.log(row);
                this.classroomWorkId = row.id;
                this.workName = row.workName;
                this.description = row.description;
                this.layoutTime = this.dateFormat(row.layoutTime);
                this.getStudentWorkList();
                this.studentWorkVisible = true
            },

            /**
             * 关闭作业详情
             */
            studentWorkClose: function () {
                this.classroomWorkId = null;
                this.workName = "";
                this.description = "";
                this.layoutTime = "";
                this.swNowPage = 1;
                this.swPageSize = 10;
                this.scoreCount = null;
                this.submitCount = null;
                this.layoutCount = null;
                this.completionRate = null;
                this.avgScore = null;
                this.studentWorkTableModule.tableContent = [];
                this.studentWorkTableModule.count = 0
            },

            /**
             * StudentWork 学生作业
             * 改变页码
             */
            swChangePage: function (page) {
                this.swNowPage = page;
                this.getStudentWorkList();
            },

            /**
             * StudentWork 学生作业
             * 改变每页显示的条数
             */
            swChangeSize: function (size) {
                this.swPageSize = size;
                this.getStudentWorkList();
            },

            /**
             * 获取学生作业列表
             */
            getStudentWorkList: function () {
                const params = {
                    page: this.swNowPage,
                    limit: this.swPageSize,
                    classroomWorkId: this.classroomWorkId,
                };
                console.log(params);
                Http.getClassroomWorkDetail(params).then(res => {
                    if (res.statusCode === 1) {
                        this.studentWorkTableModule.tableContent = res.data.vstudentWorkDTOList;
                        this.studentWorkTableModule.count = res.data.total;
                        this.scoreCount = res.data.scoreCount;
                        this.submitCount = res.data.submitCount;
                        this.layoutCount = res.data.total;
                        this.completionRate = res.data.completionRate.toFixed(1);
                        this.avgScore = res.data.avgScore.toFixed(1)
                    }
                })
            },

            /**
             * 提交作业
             */
            addStudentWorkDetailHandleSubmit: function (name) {
                const result = this.$refs[name].validate(valid => {
                    if (valid) {
                        this.addStudentWorkDetailAction()
                    } else {
                        this.$Message.error("表单信息不正确!")
                    }
                });
                return result
            },

            /**
             * 提交学生作业
             */
            addStudentWorkDetailAction: function () {
                const params = this.addStudentWorkDetailForm;
                Http.postStudentWorkDetail(params).then(res => {
                    if (res.statusCode === 1) {
                        this.$Message.success(res.Message);
                        this.addStudentWorkDetailForm = {
                            workName: "",
                            workPath: "",
                            casePassedCount: null,
                            complexity: null,
                            lineOfCode: null,
                            studentWorkId: "",
                            studentWorkScore: null,
                            studentWorkMessage: null
                        };
                        this.addStudentWorkDetail = false;
                        this.$refs["addStudentWorkDetailForm"].resetFields();
                        this.getStudentWorkList();
                    } else {
                        this.$Message.error(res.Message)
                    }
                })
            },

            /**
             * 上传成功钩子 异步方法
             */
            handleWorkSuccess: async function (res, file) {
                if (res.statusCode === 1) {
                    this.addStudentWorkDetailForm.workPath = res.data;
                    this.addStudentWorkDetailForm.workName = res.FileName;
                }
            },

            /**
             * 文件格式验证失败钩子
             */
            handleFormatError: function (res, file) {
                this.$Message.error("文件格式不正确")
            },

            /**
             * 关闭学生作业
             */
            studentWorkDetailClose: function () {
                this.studentWorkId = null;
                this.swdNowPage = 1;
                this.swdPageSize = 10;
                this.studentWorkDetailTableModule.tableContent = [];
                this.studentWorkDetailTableModule.count = 0;
            },

            /**
             * StudentWorkDetail 学生作业详情
             * 改变当前页面
             */
            swdChangePage: function (page) {
                this.swdNowPage = page;
                this.getStudentWorkDetailList();
            },

            /**
             * StudentWorkDetail 学生作业详情
             * 改变每页显示的条数
             */
            swdChangeSize: function (size) {
                this.swdPageSize = size;
                this.getStudentWorkDetailList();
            },

            /**
             * 获取学生作业详情列表
             */
            getStudentWorkDetailList: function () {
                const params = {
                    page: this.swNowPage,
                    limit: this.swPageSize,
                    studentWorkId: this.studentWorkId
                };
                Http.getStudentWorkDetailList(params).then(res => {
                    if (res.statusCode === 1) {
                        this.studentWorkDetailTableModule.tableContent = res.data.content
                    }
                })
            },

            /**
             * 查看试卷详情
             */
            detailTestPaperModal: function (form) {
                this.detailTestPaperForm = {
                    id: form.id,
                    name: form.name,
                    classRoomId: form.classRoomId,
                    testPaperType: form.testPaperType,
                    // 缺少此字段 未显示试卷类型 A卷 / AB卷
                    testPaperTypeName: form.testPaperTypeName,
                    status: form.status
                };
                this.getDetailTestPaperDetailList(this.detailTestPaperForm.id)
            },

            /**
             * 单纯地查试卷详情
             */
            getDetailTestPaperDetailList: function (id) {
                console.log("单纯地查试卷详情");
                const params = {testPaperId: id};
                Http.TestPaperDetailList(params).then(res => {
                    if (res.statusCode === 1) {
                        this.detailTestPaperForm.a = res.data.a;
                        this.detailTestPaperForm.b = res.data.b;
                        this.detailTabIndex = 0;
                        this.detailTPDTabIndex = 0;

                        if (this.detailTestPaperForm.status === 2) {
                            this.studentTestPaperColumn = [
                                {title: "学号", key: "studentNumber", align: "center", width: 100, fixed: 'left'},
                                {title: "姓名", key: "studentName", align: "center", width: 100, fixed: 'left'}
                            ];

                            if (this.detailTestPaperForm.testPaperType === 2) {
                                this.studentTestPaperColumn.push({
                                        title: "试卷类型",
                                        key: "detailType",
                                        align: "center",
                                        width: 85,
                                        fixed: 'left',
                                        render: (h, params) => {
                                            return h("div", [params.row.detailType === 1 ? 'A卷' : 'B卷'])
                                        }
                                    }
                                )
                            }
                            const totalScoreColumn = {
                                title: "总分",
                                key: "totalScore",
                                align: "center",
                                fixed: 'left',
                                width: 80
                            };
                            this.studentTestPaperColumn.push(totalScoreColumn);
                            for (let i = 1; i <= this.detailTestPaperForm.a.length; i++) {
                                const column = {
                                    title: '第' + this.NumberToChinese(i) + '题',
                                    key: i.toString(),
                                    align: "center",
                                    width: 85
                                };
                                this.studentTestPaperColumn.push(column)
                            }
                            this.getStudentTestPaperList()
                        }
                        this.uploadStudentTestPaperFileUrl = API.importStudentTestPaper + '?filesname=StudentTestPaper&testPaperId=' + id;
                        this.downloadStudentTestPaperTemplateUrl = API.getStudentTestPaperTemplate + "?testPaperId=" + id;
                        this.detailTestPaper = true
                    }
                })
            },

            /**
             * 获取学生试卷列表
             */
            getStudentTestPaperList: function () {
                const params = {testPaperId: this.detailTestPaperForm.id};
                Http.studentTestPaperList(params).then(res => {
                    if (res.statusCode === 1) {
                        this.studentTestPaperList = res.data.list;
                        for (let i = 0; i < this.studentTestPaperList.length; i++) {
                            let detailTotalScore = 0;
                            for (let k = 0; k < this.detailTestPaperForm.a.length; k++) {
                                if (this.studentTestPaperList[i].detailType === 1) {
                                    this.studentTestPaperList[i][k + 1] = this.studentTestPaperList[i][k + 1] + '/' + this.detailTestPaperForm.a[k].score
                                } else {
                                    this.studentTestPaperList[i][k + 1] = this.studentTestPaperList[i][k + 1] + '/' + this.detailTestPaperForm.b[k].score
                                }
                                detailTotalScore = detailTotalScore + this.detailTestPaperForm.a[k].score
                            }
                            this.studentTestPaperList[i].totalScore = this.studentTestPaperList[i].totalScore + '/' + detailTotalScore
                        }
                    }
                })
            },

            /**
             * 添加试卷表单验证方法
             */
            addTestPaperHandleSubmit: function (name) {
                const result = this.$refs[name].validate(valid => {
                    if (valid) {
                        this.addTestPaperAction()
                    } else {
                        this.$Message.error("表单信息不正确!")
                    }
                });
                return result
            },

            /**
             * 修改试卷表单验证方法
             */
            editTestPaperHandleSubmit: async function (name) {
                const result = await this.$refs.editTestPaperForm.validate(valid => {
                });
                if (result) {
                    this.editTestPaperAction()
                } else {
                    this.$Message.error("表单信息不正确!")
                }
            },

            /**
             * 添加试卷模态框
             */
            addTestPaperModal: function (classRoomId, knowledgeList) {
                this.addTestPaperForm.classroomId = classRoomId;
                this.courseKnowledgeList = knowledgeList;
                this.addTestPaper = true;
                this.$refs["addTestPaperForm"].resetFields()
            },

            /**
             * 编辑试卷模态框
             */
            editTestPaperModal: function (form, knowledgeList) {
                this.courseKnowledgeList = knowledgeList;
                this.editTestPaperForm = {
                    id: form.id,
                    name: form.name,
                    classroomId: form.classroomId,
                    testPaperType: form.testPaperType,
                    status: form.status,
                    a: form.a,
                    b: form.b
                };
                if (form.testPaperType === 1) {
                    this.testPaperRule.a = [
                        {
                            validator: function (rule, value, callback) {
                                callback()
                            }, trigger: 'blur', trigger: "change", type: 'array'
                        }
                    ]
                }
                if (form.testPaperType === 2) {
                    this.testPaperRule.b = [
                        {
                            validator: function (rule, value, callback) {
                                if (value.length === 0) {
                                    callback(new Error("B卷不能为空"));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur', trigger: "change", type: 'array'
                        }
                    ]
                }
                this.editTestPaper = true
            },

            /**
             * 添加试卷方法
             * 因为后端接收参数需要 '@RequestBody' 注解 只能接收'Content-Type':'application/json;charset=UTF-8' 此处重写headers
             * 如果传输数据不含有 数组 则可以利用默认的 URL 编码
             */
            addTestPaperAction: function () {
                const params = this.addTestPaperForm;
                axios.post('/api/test_paper/add', params, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(res.data.data.message);
                        this.addTestPaperForm = {
                            name: "",
                            classroomId: null,
                            testPaperType: 1,
                            a: [],
                            b: []
                        };
                        this.addTestPaper = false;
                        this.testPaperRule.b = [
                            {
                                validator: function (rule, value, callback) {
                                    callback()
                                },
                                trigger: 'blur',
                                trigger: "change",
                                type: 'array'
                            }
                        ];
                        this.$refs["addTestPaperForm"].resetFields();
                        this.$refs.classRoomDetail.getTestPaperList()
                    } else {
                        this.$Message.error(res.data.data.message)
                    }
                })
            },


            /**
             * 编辑试题
             */
            editPaperDetail: function (type, formName, form) {
                console.log("编辑试题");
                console.log(form);
                this.nowEditTestPaperType = type;
                this.nowFormName = formName;
                this.nowForm = form;
                if (type === 1) {
                    this.testPaperDetailForm = {
                        testPaperDetailList: JSON.parse(JSON.stringify(form.a))
                    }
                }
                if (type === 2) {
                    this.testPaperDetailForm = {
                        testPaperDetailList: JSON.parse(JSON.stringify(form.b))
                    }
                }
                this.testPaperDetail = true
            },

            /**
             * 编辑试卷Action
             */
            editTestPaperAction: function () {
                console.log("编辑试卷Action");
                const params = this.editTestPaperForm;
                axios.post('/api/test_paper/edit', params, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    if (res.data.statusCode === 1) {
                        this.$Message.success(res.data.message);
                        this.editTestPaperForm = {
                            id: null,
                            name: "",
                            classroomId: null,
                            testPaperType: null,
                            status: null,
                            a: [],
                            b: []
                        };
                        this.editTestPaper = false;
                        this.$refs["editTestPaperForm"].resetFields();
                        this.$refs.classRoomDetail.getTestPaperList()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            },

            /**
             * 添加试题
             */
            addPaperDetail: function (type, formName, form) {
                this.nowEditTestPaperType = type;
                this.nowFormName = formName;
                this.nowForm = form;
                this.testPaperDetailForm = {
                    testPaperDetailList: JSON.parse(JSON.stringify(form.a))
                };
                if (type === 2) {
                    if (this.addTestPaperForm.a.length === 0) {
                        this.$Message.error("请先添加A卷试题!");
                        return
                    } else {
                        for (let i = 0; i < this.testPaperDetailForm.testPaperDetailList.length; i++) {
                            this.testPaperDetailForm.testPaperDetailList[i].detailType = 2
                        }
                    }
                }
                this.testPaperDetail = true
            },


            /**
             * 选择试卷类型 A卷 B卷
             */
            testPaperTypeChange: function (value) {
                if (value === 1) {
                    this.testPaperRule.b = [
                        {
                            validator: function (rule, value, callback) {
                                callback()
                            }, trigger: 'blur', trigger: "change", type: 'array'
                        }
                    ]
                } else {
                    this.testPaperRule.b = [
                        {
                            validator: function (rule, value, callback) {
                                if (value.length === 0) {
                                    callback(new Error("B卷不能为空"));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur', trigger: "change", type: 'array'
                        }
                    ]
                }
            },

            /**
             * 添加试卷新试题
             */
            addNewDetail: function () {
                let newDetail = {
                    title: "",
                    detailNumber: this.testPaperDetailForm.testPaperDetailList.length + 1,
                    detailType: 1,
                    score: null,
                    knowledgeList: [
                        {
                            knowledgeId: null,
                            weight: null
                        }
                    ],
                };
                this.testPaperDetailForm.testPaperDetailList.push(newDetail);
            },

            /**
             * 添加试题表单验证方法
             */
            testPaperDetailHandleSubmit: function (name) {
                const result = this.$refs[name].validate(valid => {
                    if (valid) {
                        if (this.nowEditTestPaperType === 1) {
                            this.nowForm.a = JSON.parse(JSON.stringify(this.testPaperDetailForm.testPaperDetailList))
                            this.nowForm.b = []
                        } else {
                            this.nowForm.b = JSON.parse(JSON.stringify(this.testPaperDetailForm.testPaperDetailList))
                        }
                        this.$refs[this.nowFormName].validate()
                        this.testPaperDetailForm.testPaperDetailList = []
                        this.testPaperDetail = false
                    } else {
                        this.$Message.error("表单信息不正确!")
                    }
                });
                return result
            },

            /**
             * 删除试题详情
             */
            delTestPaperDetail: function (index) {
                this.testPaperDetailForm.testPaperDetailList.splice(index, 1);
                for (let i = index; i < this.testPaperDetailForm.testPaperDetailList.length; i++) {
                    this.testPaperDetailForm.testPaperDetailList[i].detailNumber--;
                }
            },

            /**
             * 上移试题
             */
            upTestPaperDetail: function (index) {
                if (index != 0) {
                    let now = this.testPaperDetailForm.testPaperDetailList[index];
                    let old = this.testPaperDetailForm.testPaperDetailList[index - 1];
                    now.detailNumber = now.detailNumber - 1;
                    old.detailNumber = old.detailNumber + 1;
                    this.testPaperDetailForm.testPaperDetailList[index] = old;
                    this.testPaperDetailForm.testPaperDetailList[index - 1] = now;
                }
            },

            /**
             * 下移试题
             */
            downTestPaperDetail: function (index) {
                if (index != this.testPaperDetailForm.testPaperDetailList.length - 1) {
                    let now = this.testPaperDetailForm.testPaperDetailList[index];
                    let old = this.testPaperDetailForm.testPaperDetailList[index + 1];
                    now.detailNumber = now.detailNumber + 1;
                    old.detailNumber = old.detailNumber - 1;
                    this.testPaperDetailForm.testPaperDetailList[index] = old;
                    this.testPaperDetailForm.testPaperDetailList[index + 1] = now;
                }
            },

            /**
             * 添加知识点
             */
            handleAddKnowledge: function (index) {
                this.testPaperDetailForm.testPaperDetailList[index].knowledgeList.push({
                    knowledgeId: null,
                    weight: null
                });
            },

            /**
             * 删除知识点
             */
            delTestPaperDetailKnowledge: function (index, kindex) {
                this.testPaperDetailForm.testPaperDetailList[index].knowledgeList.splice(kindex, 1);
            },

            /**
             * 下载学生试卷模板
             */
            downloadStudentTestPaperTemplate: function () {
                const params = {
                    testPaperId: this.detailTestPaperForm.id
                };
                Http.getStudentTestPaperTemplate(params).then(res => {
                    if (res.statusCode === 1) {
                        window.open(res.data)
                    } else {
                        this.$Message.error("获取模板错误")
                    }
                })
            },

            showResultAnalysisModal(showtmp, paperId) {
                this.showResultAnalysis = showtmp;
                this.loadDataOfResAnalysis(paperId);
            },

            loadDataOfResAnalysis(paperId) {
                let myChart = this.$echarts.init(
                    document.getElementById("myChart")
                );
                let myChart2 = this.$echarts.init(
                    document.getElementById("myChart2")
                );
                let resAnalysisKnowledge = [];
                let resAnalysisLv1 = [];
                let resAnalysisLv2 = [];
                let resAnalysisLv3 = [];
                let resAnalysisScore = [];
                var params = new URLSearchParams();

                params.append("paperId", paperId);

                axios.post("http://localhost:8443/resultanalysis/analysis", params)
                    .then(res => {
                        if (res.data === null || res.data === '') {
                            this.showResultAnalysis = false;
                            alert("暂时未导入成绩")
                            return;
                        }
                        res.data.forEach(element => {
                            resAnalysisKnowledge.push(element.knowledgeName),
                                resAnalysisLv1.push(element.level_1);
                            resAnalysisLv2.push(element.level_2);
                            resAnalysisLv3.push(element.level_3);
                            resAnalysisScore.push(element.score_sum);

                            myChart.setOption({
                                tooltip: {
                                    trigger: "axis",
                                    axisPointer: {
                                        // 坐标轴指示器，坐标轴触发有效
                                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                color: ["#FF0000", "	#FFFF00", "#008000"],
                                legend: {
                                    data: ["得分大于等于80%", "得分在40%到80%之间", "得分小于40%"]
                                },
                                xAxis: [
                                    {
                                        name: "知识点",
                                        nameLocation: "end",
                                        axisLabel: {
                                            interval: 0,
                                            rotate: -30
                                        },
                                        type: "category",
                                        data: resAnalysisKnowledge
                                    }
                                ],
                                yAxis: [
                                    {
                                        name: "百分比",
                                        type: "value",
                                        minInterval: 1
                                    }
                                ],
                                series: [
                                    {
                                        name: "得分大于等于80%",
                                        type: "bar",
                                        barMaxWidth: '100',
                                        stack: "广告",
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'inside'
                                            }
                                        },
                                        data: resAnalysisLv1
                                    },
                                    {
                                        name: "得分在40%到80%之间",
                                        type: "bar",
                                        barMaxWidth: '100',
                                        stack: "广告",
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'inside'
                                            }
                                        },
                                        data: resAnalysisLv2
                                    },
                                    {
                                        name: "得分小于40%",
                                        type: "bar",
                                        barMaxWidth: '100',
                                        stack: "广告",
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'inside'
                                            }
                                        },
                                        data: resAnalysisLv3
                                    }
                                ]
                            });
                            myChart2.setOption({
                                title: {text: ''},
                                tooltip: {},
                                xAxis: {
                                    name: "知识点",
                                    data: resAnalysisKnowledge
                                },
                                yAxis: {name: "分数",},
                                series: [{
                                    name: '分数',
                                    type: 'bar',
                                    barMaxWidth: '100',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'outside'
                                        }
                                    },
                                    data: resAnalysisScore
                                }]
                            });
                        });
                    });
            },
            ok() {

            },
            cancel() {

            }
        }
    };

</script>
<style lang="scss" scoped>
  @import "./ClassRoomPage.scss";
</style>
