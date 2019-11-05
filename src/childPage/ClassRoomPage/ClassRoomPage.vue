
<template>
  <div class="ClassRoomPage">
      <selectModule :object="selectModule" @submit="find"></selectModule>
      <tableModule :object="tableModule" @changePage="changePage" @changeSize="changeSize" @addClassRoom="addClassRoom=true;$refs['addClassRoomForm'].resetFields();"></tableModule>
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
            <Input v-model="addClassRoomForm.CourseName" disabled ></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="课堂名称" class="forms" prop="Name">
						<Input v-model="addClassRoomForm.Name"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="学期类型" class="forms" prop="TermType">
            <Select v-model="addClassRoomForm.TermType" :placeholder="'请选择学期类型'">
              <Option v-for="item in termtypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
            </Select>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="上课起始日期" class="forms" prop="BeginDate">
            <DatePicker type="date" placeholder="请选择起始日期" style="width: 265px" v-model="addClassRoomForm.BeginDate"></DatePicker>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="上课截止日期" class="forms" prop="EndDate">
            <DatePicker type="date" placeholder="请选择截止日期" style="width: 265px" v-model="addClassRoomForm.EndDate"></DatePicker>
					</FormItem>
          </Col>
          <Col span="12">
           <FormItem   label="平时成绩权重"  class="forms" prop="dailyPerformanceWeight" >
            <InputNumber  :min="0.0" :max="1"  style="width: 100%" v-model="addClassRoomForm.dailyPerformanceWeight"></InputNumber>
                    </FormItem>
             </Col>
              <Col span="12">
           <FormItem  label="考试成绩权重"  class="forms"  prop="TestPerformaceWeight">
                      <InputNumber  :min="0.0" :max="1"  style="width: 100%" v-model="addClassRoomForm.TestPerformaceWeight"></InputNumber>
                    </FormItem>
             </Col>
             
         
		  </Row>
        </Form>
		<div slot="footer">
            <Button type="ghost" size="large"   @click="addClassRoom=false">取消</Button>
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
            <Input v-model="editClassRoomForm.CourseName" disabled ></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="课堂名称" class="forms" prop="Name">
						<Input v-model="editClassRoomForm.Name"></Input>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="学期类型" class="forms" prop="TermType">
            <Select v-model="editClassRoomForm.TermType" :placeholder="'请选择学期类型'">
              <Option v-for="item in termtypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
            </Select>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="上课起始日期" class="forms" prop="BeginDate">
            <DatePicker type="date" placeholder="请选择起始日期" style="width: 265px" v-model="editClassRoomForm.BeginDate"></DatePicker>
					</FormItem>
          </Col>
          <Col span="12">
					<FormItem label="上课截止日期" class="forms" prop="EndDate">
            <DatePicker type="date" placeholder="请选择截止日期" style="width: 265px" v-model="editClassRoomForm.EndDate"></DatePicker>
					</FormItem>
          </Col>
          <!--平时成绩 :rules="{required: true, message: '平时成绩权重不能为空', trigger: 'change', type: 'number'}"-->
          <Col span="12">
           <FormItem   label="平时成绩权重" class="forms"  prop="dailyPerformanceWeight" >
          <InputNumber  :min="0.0" :max="1"  style="width: 100%" v-model="editClassRoomForm.dailyPerformanceWeight"></InputNumber>
          </FormItem>
            </Col>
              <Col span="12">
           <FormItem  label="考试成绩权重"  class="forms" prop="TestPerformaceWeight" >
              <InputNumber  :min="0.0" :max="1"  style="width: 100%" v-model="editClassRoomForm.TestPerformaceWeight "></InputNumber>
              </FormItem>
             </Col>
              
		  </Row>
          </Form>
		  <div slot="footer">
            <Button type="ghost" size="large"   @click="editClassRoom=false">取消</Button>
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
          ref="classRoomDetail">
        </classRoomInfo>
      </Modal>
      <!-- 课程 -->
      <courseModal :visible="courseModalVisible" @submit="courseModalSubmit" @cancel="courseModalVisible=false"></courseModal>
      <!-- 导入学生 -->
      <Modal v-model="importStudentVisible" title="导入学生" width="300px" :mask-closable="false" :footer-hide="true">
        <Row style="margin-bottom:20px;">
          <a  :href='url'  download="muban" style="color:white;display:inline-block;width:100px;
          height:35px;background-color:rgb(45,140,240);line-height:35px;text-align:center">下载模板</a>
        </Row>
          <Row>
            <Col span="24">
              <Upload :action="uploadFile + nowClassRoomId" :headers="{Authorization:$store.state.token}" 
              style="float: left; margin-right: 20px;" :show-upload-list="false" 
              :on-success="handleImportStudentSuccess" :on-format-error="handleFormatError">
                <Button type="success" >点击导入学生</Button>
              </Upload>
            </Col>
          </Row>
      </Modal>
      <!-- 作业情况 -->
      <Modal v-model="studentWorkVisible" title="学生作业情况" width="1100px" :mask-closable="false" :footer-hide="true" @on-cancel="studentWorkClose">
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
          
                <InputNumber :min="0" :max="100" :precision="0" style="width: 100%" v-model="editStudentWorkForm.Score"></InputNumber>
        
          <div slot="footer">
            <Button type="ghost" size="large"   @click="StudentGrade=false">取消</Button>
            <Button type="primary" size="large" @click="editStudentWork()">确定</Button>
        </div>

      </Modal>
      <!-- 提交作业 -->
      <Modal
          v-model="addStudentWorkDetail"
          title="提交作业"
          width="600px"
          :mask-closable="false">
            <Form :model="addStudentWorkDetailForm" label-position="left" :label-width="100" :rules="studentWorkDetailRules" ref="addStudentWorkDetailForm">
          <Row>
              <Col span="24">
              <FormItem label="作业" class="forms" prop="workPath">
                <Upload :action="uploadWorkFile" :headers="{Authorization:$store.state.token}" style="float: left; margin-right: 20px;" :show-upload-list="false" 
                :on-success="handleWorkSuccess"  
                :on-format-error="handleFormatError">
                  <div >
                    <Button type="ghost" icon="ios-cloud-upload-outline" >点击上传作业</Button>
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
                <InputNumber :min="0" :max="100" :precision="0" style="width: 100%" v-model="addStudentWorkDetailForm.studentWorkScore"></InputNumber>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="代码行数" class="forms" prop="lineOfCode">
                <InputNumber :min="1" :precision="0" style="width: 100%" v-model="addStudentWorkDetailForm.lineOfCode"></InputNumber>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="用例通过数" class="forms" prop="casePassedCount">
                <InputNumber :min="1" :precision="0" style="width: 100%" v-model="addStudentWorkDetailForm.casePassedCount"></InputNumber>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="圈复杂度" class="forms" prop="complexity">
                <InputNumber :min="0.1" :max="10" style="width: 100%" :step="0.1"  v-model="addStudentWorkDetailForm.complexity"></InputNumber>
              </FormItem>
              </Col>
          </Row>
            </Form>
        <div slot="footer">
            <Button type="ghost" size="large"   @click="addStudentWorkDetail=false">取消</Button>
            <Button type="primary" size="large" @click="addStudentWorkDetailHandleSubmit('addStudentWorkDetailForm')">确定</Button>
        </div>
      </Modal>
      <!-- 学生作业明细 -->
      <Modal v-model="studentWorkDetailVisible" title="学生作业明细" width="1000px" :mask-closable="false" :footer-hide="true" @on-cancel="studentWorkDetailClose">
          <tableModule :object="studentWorkDetailTableModule" @changePage="swdChangePage" @changeSize="swdChangeSize"></tableModule>
      </Modal>
      <!-- 课堂试卷 -->
      <Modal
          v-model="addTestPaper"
          title="添加试卷"
          width="700px"
          :mask-closable="false">
            <Form :model="addTestPaperForm" label-position="left" :label-width="100" :rules="testPaperrules" ref="addTestPaperForm">
            <Row>
                <Col span="12">
                <FormItem label="试卷名称" class="forms" prop="Name">
                  <Input v-model="addTestPaperForm.Name"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="试卷类型" class="forms" prop="TestPaperType">
                  <Select v-model="addTestPaperForm.TestPaperType" :placeholder="'请选择试卷类型'" @on-change="testPaperTypeChange">
                    <Option v-for="item in testPaperTypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem class="forms" prop="A">
                  <div v-model="addTestPaperForm.A" style="height:64px;">
                    <Card  class="paperCardDefault" v-if="addTestPaperForm.A.length == 0" @click.native="addPaperDetail(1,'addTestPaperForm',addTestPaperForm)">
                      <div style="color:#A4A4A4"><Icon type="plus"></Icon> A卷</div>
                    </Card>
                    <Card class="paperCardA" v-else @click.native="editPaperDetail(1,'addTestPaperForm',addTestPaperForm)">
                      <div> A卷</div>
                    </Card>
                  </div>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem class="forms" prop="B">
                  <div v-model="addTestPaperForm.B" style="height:64px;">
                    <Card class="paperCardDefault" v-if="addTestPaperForm.TestPaperType == 2 && addTestPaperForm.B.length == 0" @click.native="addPaperDetail(2,'addTestPaperForm',addTestPaperForm)">
                      <div style="color:#A4A4A4"><Icon type="plus"></Icon> B卷</div>
                    </Card>
                    <Card class="paperCardB" v-if="addTestPaperForm.TestPaperType == 2 && addTestPaperForm.B.length > 0" @click.native="editPaperDetail(2,'addTestPaperForm',addTestPaperForm)">
                      <div> B卷</div>
                    </Card>
                  </div>
                </FormItem>
                </Col>
            </Row>
            </Form>
        <div slot="footer">
            <Button type="ghost" size="large"   @click="addTestPaper=false">取消</Button>
            <Button type="primary" size="large" @click="addTestPaperHandleSubmit('addTestPaperForm')">确定</Button>
        </div>
      </Modal>
	    <Modal 
          v-model="editTestPaper" 
          title="编辑试卷"
          width="700px"
          :mask-closable="false">
          <Form :model="editTestPaperForm" label-position="left" :label-width="100" :rules="testPaperrules" ref="editTestPaperForm">
          <Row>
                <Col span="12">
                <FormItem label="试卷名称" class="forms" prop="Name">
                  <Input v-model="editTestPaperForm.Name"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="试卷类型" class="forms" prop="TestPaperType">
                  <Select v-model="editTestPaperForm.TestPaperType" :placeholder="'请选择试卷类型'" @on-change="testPaperTypeChange">
                    <Option v-for="item in testPaperTypeArr" :value="item.value" :key="item.value">{{item.name}}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem class="forms" prop="A">
                  <div v-model="editTestPaperForm.A" style="height:64px;">
                    <Card  class="paperCardDefault" v-if="editTestPaperForm.A.length == 0" @click.native="addPaperDetail(1,'editTestPaperForm',editTestPaperForm)">
                      <div style="color:#A4A4A4"><Icon type="plus"></Icon> A卷</div>
                    </Card>
                    <Card class="paperCardA" v-else @click.native="editPaperDetail(1,'editTestPaperForm',editTestPaperForm)">
                      <div> A卷</div>
                    </Card>
                  </div>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem class="forms" prop="B">
                  <div v-model="editTestPaperForm.B" style="height:64px;">
                    <Card class="paperCardDefault" v-if="editTestPaperForm.TestPaperType == 2 && editTestPaperForm.B.length == 0" @click.native="addPaperDetail(2,'editTestPaperForm',editTestPaperForm)">
                      <div style="color:#A4A4A4"><Icon type="plus"></Icon> B卷</div>
                    </Card>
                    <Card class="paperCardB" v-if="editTestPaperForm.TestPaperType == 2 && editTestPaperForm.B.length > 0" @click.native="editPaperDetail(2,'editTestPaperForm',editTestPaperForm)">
                      <div> B卷</div>
                    </Card>
                  </div>
                </FormItem>
                </Col>
            </Row>
          </Form>
          <div slot="footer">
              <Button type="ghost" size="large"   @click="editTestPaper=false">取消</Button>
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
                <Col span="20" style="margin-bottom:5px;">试卷名称：{{detailTestPaperForm.Name}}</Col>
                <Col span="24">试卷类型：{{detailTestPaperForm.TestPaperTypeName}}</Col>
              </Row>
              <Tabs v-model="detailTPDTabIndex">
                <TabPane label="A卷">
                  <Table height="400" :columns="testPaperDetailColumn" :data="detailTestPaperForm.A"></Table>
                </TabPane>
                <TabPane v-if="detailTestPaperForm.TestPaperType == 2" label="B卷">
                  <Table height="400" :columns="testPaperDetailColumn" :data="detailTestPaperForm.B"></Table>
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane v-if="detailTestPaperForm.status == 2" label="考试详情">
              <Row style="margin-bottom:10px;">
                <Col span="4">
                  <a  :href='downloadStudentTestPaperTemplateUrl'  download="muban" style="color:white;display:inline-block;width:100px;
                  height:35px;background-color:rgb(45,140,240);line-height:35px;text-align:center">下载导入模板</a>
                </Col>
                <Upload :action="uploadStudentTestPaperFileUrl" :headers="{Authorization:$store.state.token}"
                  style="float: left; margin-right: 20px;" :show-upload-list="false" 
                  :on-success="handleImportStudentTestPaperSuccess" :on-format-error="handleFormatError">
                    <Button type="success" >点击导入成绩</Button>
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
                <Button type="dashed" @click="addNewDetail" v-if="nowEditTestPaperType == 1">添加试题</Button>
              </Col>
            </Row>
            <Form :model="testPaperDetailForm" label-position="left" :label-width="100" ref="testPaperDetailForm">
              <div v-for="(item,index) in testPaperDetailForm.testPaperDetailList" :key="index">
                <Row style="margin-bottom:5px;background-color:#EFF5FB;height:35px;line-height:36px;vertical-align:middle;">
                  <Col span="12" style="font-size:14px;font-weight:bold;padding-left:10px;float:left;">第{{NumberToChinese(item.DetailNumber)}}题</Col>
                  <Col span="12">
                    <Button type="error" style="float:right;height:30px;margin-top:3px;" @click="delTestPaperDetail(index)" v-if="nowEditTestPaperType == 1">删除</Button>
                    <Button type="info" style="float:right;height:30px;margin-top:3px;margin-right:5px;" @click="downTestPaperDetail(index)">下移</Button>
                    <Button type="success" style="float:right;height:30px;margin-top:3px;margin-right:5px;" @click="upTestPaperDetail(index)">上移</Button>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem 
                      label="试题标题" 
                      class="forms" 
                      :prop="'testPaperDetailList.' + index + '.Title'"
                      :rules="{required: true, message: '试题标题不能为空', trigger: 'blur'}">
                      <Input :disabled="nowEditTestPaperType == 2" v-model="item.Title"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem 
                      label="分数" 
                      class="forms"  
                      :prop="'testPaperDetailList.' + index + '.Score'"
                      :rules="{required: true, message: '分数不能为空', trigger: 'change', type:'number'}">
                      <InputNumber :disabled="nowEditTestPaperType == 2" :min="1" :max="100" :precision="0" style="width: 100%" v-model="item.Score"></InputNumber>
                    </FormItem>
                  </Col>
                </Row>
                <Row v-for="(kitem,kindex) in item.KnowledgeList" :key="kindex">
                  <Col span="12">
                    <FormItem 
                      :label="'知识点'+(kindex+1)" 
                      class="forms" 
                      :prop="'testPaperDetailList.' + index + '.KnowledgeList.' + kindex + '.KnowledgeId'"
                      :rules="{required: true, message: '知识点不能为空', trigger: 'change', type: 'number'}">
                      <Select :disabled="nowEditTestPaperType == 2" v-model="kitem.KnowledgeId" :placeholder="'请选择知识点'">
                          <Option v-for="ckitem in courseKnowledgeList" :value="ckitem.Id" :key="ckitem.Id">{{ ckitem.Name }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem 
                      :label="'权重'+(kindex+1)" 
                      class="forms" 
                      :prop="'testPaperDetailList.' + index + '.KnowledgeList.' + kindex + '.Weight'"
                      :rules="{required: true, message: '权重不能为空', trigger: 'change', type: 'number'}">
                      <InputNumber :disabled="nowEditTestPaperType == 2" :min="0.1" :max="1"  style="width: 100%" v-model="kitem.Weight"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <Button type="error" @click="delTestPaperDetailKnowledge(index,kindex)" v-if="nowEditTestPaperType == 1 && kindex != 0">删除</Button>
                  </Col>
                </Row>
                <FormItem
                  class="forms"
                  :prop="'testPaperDetailList.' + index + '.KnowledgeList'"
                  :rules="knowledgeRule">
                    <Row>
                        <Col span="12">
                            <Button v-if="nowEditTestPaperType == 1" v-model="item.KnowledgeList" type="dashed" @click="handleAddKnowledge(index)" icon="android-add">添加知识点</Button>
                        </Col>
                    </Row>
                </FormItem>
              </div>
            </Form>
            
          <div slot="footer">
              <Button type="ghost" size="large"   @click="testPaperDetail=false">取消</Button>
              <Button type="primary" size="large" @click="testPaperDetailHandleSubmit('testPaperDetailForm')">确定</Button>
          </div>
      </Modal>
    <!-- <Modal v-model="showResultAnalysis" title="试卷结果分析" @on-ok="ok" @on-cancel="cancel" width="1000px">
      <div>
        <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
      </div>
      <div>
        <div id="myChart2" :style="{width: '600px', height: '400px'}"></div>
      </div>
    </Modal> -->
  </div>
</template>
<script>
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import { ClassRoomSelectModuleJS } from "./ClassRoomSelectModuleJS.js";
// 引入表格模块配置项
import { ClassRoomTableModuleJS } from "./ClassRoomTableModuleJS.js";
// 引入课程内容组件
import classRoomInfo from "@/components/classRoomInfo/classRoomInfo.vue";
// 引入课程选择模态框
import courseModal from "@/modal/courseModal/courseModal.vue";
// 引入表格模块配置项
import { StudentWorkTableModuleJS } from "./StudentWorkTableModuleJS.js";
// 引入表格模块配置项
import { StudentWorkDetailTableModuleJS } from "./StudentWorkDetailTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
import { API } from "@/api/HttpConfig";
import axios from 'axios';

export default {
  computed: {
      uploadFile: function() {
        return API.importClassRoomStudent+'?filesname=Student&classRoomId=';
      },
      uploadWorkFile: function() {
        return API.uploadFile+'?filesname=StudentWork';
      },
      uploadStudentTestPaperFile:function(){
        return API.importStudentTestPaper+'?filesname=StudentTestPaper&testPaperId=';
      },
  },
  data: function() {
    var validateKnowledgeList = function(rule, value, callback) {
        var sumWeight = 0;
        for(let i = 0;i<value.length;i++){
          sumWeight += value[i].Weight;
        }
        if (sumWeight != 1) {
            callback(new Error("知识点权重之和必须为1"));
        }  else {
            callback();
        }
    };
    
    return {
      uploadStudentTestPaperFileUrl:'',
      detailTestPaperId:'',
      downloadStudentTestPaperTemplateUrl:'',
      url:'',
      selectModule: (ClassRoomSelectModuleJS.bind(this))(),
      tableModule: (ClassRoomTableModuleJS.bind(this))(),
      addClassRoom:false,
      addClassRoomForm:{
        BeginDate:"",
        CourseId:"",
        EndDate:"",
        TermType:"",
        Name:"",
        CourseCode:"",
        CourseName:"",
        dailyPerformanceWeight:null,//添加权重
        TestPerformaceWeight:null
      },
      StudentGrade:false,
      editStudentWorkForm:{
        Id:null,
        classroomWorkId:null,
        ClassRoomStudentId:null,
        isScore:"",
        Score:null,
        WorkMessage:"",
        VersionNumber:null
      },
      editClassRoom:false,
      editClassRoomForm:{
          Id:null,
          BeginDate:"",
          CourseId:"",
          EndDate:"",
          TermType:"",
          Name:"",
          CourseCode:"",
          CourseName:"",
           dailyPerformanceWeight:null,//添加权重
        TestPerformaceWeight:null,
          VersionNumber: null,
        },
      nowPage: 1,
      pageSize: 10,
      findClassRoomForm:{
        TermType:null,
        Name:'',
        Status:null,
        BeginDateStart:'',
        BeginDateEnd:'',
        EndDateStart:'',
        EndDateEnd:'',
      },
      rules: {
          BeginDate: [
            { required: true, message: "上课起始日期不能为空", trigger: "change",type: "date" }
          ],
          EndDate: [
            { required: true, message: "上课截止日期不能为空", trigger: "change",type: "date" }
          ],
          CourseName: [
            { required: true, message: "课程不能为空", trigger: "blur" }
          ],
          TermType: [
            { required: true, message: "学期类型不能为空", trigger: "change", type: 'number' }
          ],
          Name: [
            { required: true, message: "课堂名称不能为空", trigger: "blur" }
          ],
          //---验证
          dailyPerformanceWeight:[{
            required: true, message: "平时成绩权重不能为空", trigger: "change", type: 'number'
          }],
          TestPerformaceWeight:[{
            required: true, message: "平时成绩权重不能为空", trigger: "change", type: 'number'
          }],
          
      },
      termtypeArr:[
        { name:'春季学期',value : 1 },
        { name:'夏季学期',value : 2 },
        { name:'秋季学期',value : 3 }
      ],
      // 课程选择
      courseModalVisible: false,
      // 课堂内容
      classRoomInfoVisible: false,
      showForm: {},
      // 学生 ==================================
      importStudentVisible:false,
      nowClassRoomId:null,
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
      addStudentWorkDetail:false,
      addStudentWorkDetailForm:{
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
          { required: true, message: "作业不能为空", trigger: "blur" }
        ],
        studentWorkScore: [
          { required: true, message: "分数不能为空", trigger: "change", type:'number' }
        ]
	    },
      // 学生作业明细
      studentWorkDetailVisible:false,
      studentWorkDetailTableModule: (StudentWorkDetailTableModuleJS.bind(this))(),
      swdNowPage:1,
      swdPageSize: 10,
      studentWorkId:null,
      // 试卷===============================================================
      addTestPaper:false,
      addTestPaperForm:{
        Name:"",
        ClassRoomId:null,
        TestPaperType:1,
        A:[],
        B:[]
      },
	    editTestPaper:false,
      editTestPaperForm:{
			  Id:null,
        Name:"",
        ClassRoomId:null,
        TestPaperType:null,
        Status:null,
        A: [],
        B: [],
			  VersionNumber: null
      },
	    testPaperrules: {
          Name: [
            { required: true, message: "试卷名称不能为空", trigger: "blur" }
          ],
          TestPaperType: [
            { required: true, message: "试卷类型不能为空", trigger: "change", type: 'number' }
          ],
          A: [
            { required: true, message: "A卷不能为空", trigger: 'blur',trigger: "change", type: 'array' }
          ],
          B: [
            { validator: function(rule, value, callback) {
                              callback();
                          }, trigger: 'blur',trigger: "change", type: 'array' }
          ] 
	    },
      testPaperTypeArr:[
        { name:'A卷',value : 1 },
        { name:'AB卷',value : 2 }
      ],
      detailTabIndex:0,
      detailTPDTabIndex:0,
      detailTestPaper: false,
      detailTestPaperForm:{},
      testPaperDetailColumn:[
        {
            title: "题号",
            key: "detailNumber",
            align: "center",
            width: 85,
            render: (h, params) => {
                return h("div", ['第' + this.NumberToChinese(params.row.detailNumber) + '题'])
            }
        },
        { title: "试题标题", key: "title", align: "center",width:180 },
        { title: "分数", key: "score", align: "center",width:80 },
        { title: "知识点", key: "knowledgeName", align: "center"}
      ],
      studentTestPaperColumn:[],
      studentTestPaperList:[],
      // 试题
      nowEditTestPaperType:1,
      testPaperDetail: false,
      testPaperDetailForm: {
        testPaperDetailList:[]
      },
      nowFormName:'',
      nowForm:null,
      courseKnowledgeList:[],
      knowledgeRule:{ validator: validateKnowledgeList, trigger: 'change', type: 'array' },
     //  PerformaceWeightRule:{ validator: validatePerformaceWeightList, trigger: 'change', type: 'array' }//考试成绩规则
    };
  },
  mounted:function(){
    this.getClassRoomStudentTemplateUrl();
	this.$store.commit("changeBreadCrumb", [
      "首页",
      "教学管理",
      "我的课堂"
    ]);
    this.$store.commit("changeOpenName", [""]);
    this.$store.commit("changeActiveName", "NetGraphPage");
    this.getClassRoomList();
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule,
    courseModal: courseModal,
    classRoomInfo: classRoomInfo
  },
  methods: {
    getClassRoomStudentTemplateUrl:function(){
      this.url=API.getClassRoomStudentTemplate;
    },

    //添加分数
    editStudentWork:function(){

      this.editStudentWorkForm.isScore=true;
      let params=this.editStudentWorkForm;
      Http.putStudentWork(params).then(res=>{
        if(res.statusCode==1){
          this.editStudentWorkForm={
            Id:null,
            classroomWorkId:null,
            ClassRoomStudentId:null,
            isScore:"",
            Score:null,
            WorkMessage:"",
            VersionNumber:null
          };
          this.StudentGrade=false;
           this.$Message.success(res.Message);
           this.getStudentWorkList();
        }
        else{
          this.$Message.error(res.Message);
        }
      })
    },
    // 选择的课程后点击确定
    courseModalSubmit: function(a) {
      if(this.addClassRoom){
        this.addClassRoomForm.CourseId = a.id;
        this.addClassRoomForm.CourseCode = a.code;
        this.addClassRoomForm.CourseName = a.name;
      }else{
        this.editClassRoomForm.CourseId = a.id;
        this.editClassRoomForm.CourseCode = a.code;
        this.editClassRoomForm.CourseName = a.name;
      }
      this.courseModalVisible = false;
    },
	//   添加货源表单验证方法
    addClassRoomHandleSubmit: function(name) {
      console.log(this.addClassRoomForm)
       console.log(this.addClassRoomForm.dailyPerformanceWeight+this.addClassRoomForm.TestPerformaceWeight)
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          var sum = this.addClassRoomForm.dailyPerformanceWeight+this.addClassRoomForm.TestPerformaceWeight
          if(sum!=1){
              this.$Message.error("知识点权重之和为1!");
          }else
          {this.addClassRoomAction();}
        } else {
          //权重必须和为1
          var sum = this.addClassRoomForm.dailyPerformanceWeight+this.addClassRoomForm.TestPerformaceWeight
          if(sum!=1){
              this.$Message.error("知识点权重之和为1!");
          }else if(sum == 1)
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改货源表单验证方法
    editClassRoomHandleSubmit: async function(name) {
      console.log("编辑部分")
      console.log(this.addClassRoomForm)
      var result = await this.$refs.editClassRoomForm.validate(valid => {});
      if (result) {
        console.log(this);
         var sum = this.editClassRoomForm.dailyPerformanceWeight+this.editClassRoomForm.TestPerformaceWeight
          if(sum!=1){
              this.$Message.error("知识点权重之和为1!");
          }else
          {this.editClassRoomAction();}
        
      } else {
          //权重必须和为1
          var sum = this.editClassRoomForm.dailyPerformanceWeight+this.editClassRoomForm.TestPerformaceWeight
          if(sum!=1){
              this.$Message.error("知识点权重之和为1!");
          }else if(sum == 1)
          this.$Message.error("表单信息不正确!");
       
      }
    },
    // 查询方法
    find: function(a) {
      this.findClassRoomForm.TermType = a.TermType ?
        a.TermType : null;
      this.findClassRoomForm.Name = a.Name ?
        a.Name : "";
      this.findClassRoomForm.Status = a.Status ?
        a.Status : null;
      if(a.BeginDate.length > 0){
        this.findClassRoomForm.BeginDateStart = a.BeginDate[0];
        this.findClassRoomForm.BeginDateEnd = a.BeginDate[1];
      }
      if(a.EndDate.length > 0){
        this.findClassRoomForm.EndDateStart = a.EndDate[0];
        this.findClassRoomForm.EndDateEnd = a.EndDate[1];
      }
      console.log(5555555)
	    this.getClassRoomList();
    },
	// 改变页码
    changePage:function(page){
      this.nowPage = page;
      this.getClassRoomList();
    },
	    // 改变每页显示的条数
    changeSize: function(size) {
      this.pageSize = size;
      this.getClassRoomList();
    },
    // 添加课堂
    addClassRoomAction: function() {
      var params = this.addClassRoomForm;
      Http.postClassRoom(params).then(res => {
        if (res.statusCode == 1) {
          this.$Message.success(res.message);
          //清空之前保存的数据
          this.addClassRoomForm = {
            BeginDate:"",
            CourseId:"",
            EndDate:"",
            TermType:"",
            Name:"",//权重
            dailyPerformanceWeight:null,
            TestPerformaceWeight:null
          };
		  this.addClassRoom = false;
		  this.$refs["addClassRoomForm"].resetFields();
          this.getClassRoomList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 编辑课堂
    editClassRoomAction: function() {
        var params = this.editClassRoomForm;
       
        console.log("params.CourseId"+params.CourseId)
        Http.putClassRoom(params).then(res=>{
            if(res.statusCode==1){
                this.$Message.success(res.message);
				this.editClassRoomForm = {
					Id:null,
            BeginDate:"",
            CourseId:"",
            EndDate:"",
            TermType:"",
            Name:"",
             dailyPerformanceWeight:null,
            TestPerformaceWeight:null,
					VersionNumber: null
				};
				this.editClassRoom = false;
				this.$refs["editClassRoomForm"].resetFields();
                this.getClassRoomList();
            }
            else{
                this.$Message.error(res.message);
            }
        })
    },
    // 查询课堂
    getClassRoomList: function() {
      var params = {
        page: this.nowPage,
        limit: this.pageSize,
        BeginDateStart: this.findClassRoomForm.BeginDateStart,
        BeginDateEnd: this.findClassRoomForm.BeginDateEnd,
        EndDateStart: this.findClassRoomForm.EndDateStart,
        EndDateEnd: this.findClassRoomForm.EndDateEnd,
        TermType: this.findClassRoomForm.TermType,
        Name: this.findClassRoomForm.Name,
        Status: this.findClassRoomForm.Status
      };
      Http.getClassRoomList(params).then(res => {
        if(res.statusCode==1){
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
    deleteClassRoomAction:function(id){
        var params = {
            id:id
        }
        Http.deleteClassRoom(params).then(res=>{
            if(res.statusCode==1){
                this.$Message.success("删除成功");
                this.getClassRoomList();
            }
            else{
                this.$Message.error(res.message);
            }
        })
    },
    // 修改课堂状态
    editClassRoomStatusAction:function(id,status){
        var params = {
            Id:id,
            Status:status
        }
        Http.editClassRoomStatus(params).then(res=>{
            if(res.statusCode==1){
                this.$Message.success(res.message);
                this.getClassRoomList();
            }
            else{
                this.$Message.error(res.message);
            }
        })
    },
    // 学生============================================================
    importStudentModal:function(id){
      this.importStudentVisible = true;
      this.nowClassRoomId = id
    },
    downloadTemplate:function(){
        var params = {
        }
        Http.getClassRoomStudentTemplate(params,{responseType: 'arraybuffer'}).then(res=>{
            // if(res.statusCode==1){
                window.open(res.data);
            // }
            // else{
            //     this.$Message.error("获取模板错误");
            // }
        })
        
    },
    //test by yu 

    // 编辑上传成功钩子 异步方法
    handleImportStudentSuccess: async function(res, file) {
        if (res.statusCode == 1) {
          this.$Message.success(res.message);
          this.$refs.classRoomDetail.getClassRoomStudentList();
          this.importStudentVisible = false;
        }else{
          this.$Message.error(res.message);
        }
    },
    // 文件格式验证失败钩子
    handleFormatError: function(res, file) {
        console.log(res)
        this.$Message.error("文件格式不正确");
    },
    /**
     * 打开作业详情
     */
    studentWorkDetailModal: function(row){
      console.log("row---")
      console.log(row)
      this.classroomWorkId = row.id
      this.workName = row.workName
      this.description = row.description
      this.layoutTime = this.dateFormat(row.layoutTime)
      this.getStudentWorkList()
      this.studentWorkVisible = true
    },
    /**
     * 关闭作业详情
     */
    studentWorkClose: function(){
      this.classroomWorkId = null
      this.workName = ""
      this.description = ""
      this.layoutTime = ""
      this.swNowPage = 1
      this.swPageSize = 10
      this.scoreCount = null
      this.submitCount = null
      this.layoutCount = null
      this.completionRate = null
      this.avgScore = null
      this.studentWorkTableModule.tableContent = []
      this.studentWorkTableModule.count = 0
    },
	  // 改变页码
    swChangePage:function(page){
      this.swNowPage = page;
      this.getStudentWorkList();
    },
	    // 改变每页显示的条数
    swChangeSize: function(size) {
      this.swPageSize = size;
      this.getStudentWorkList();
    },

    /**
     * 获取学生作业列表
     */
    getStudentWorkList:function(){
      var params = {
        page: this.swNowPage,
        limit: this.swPageSize,
        classroomWorkId: this.classroomWorkId,
      }
      Http.getClassroomWorkDetail(params).then(res => {
        if (res.statusCode == 1) {
          this.studentWorkTableModule.tableContent = res.data.vstudentWorkDTOList
          this.studentWorkTableModule.count = res.data.total
          this.scoreCount = res.data.scoreCount
          this.submitCount = res.data.submitCount
          this.layoutCount = res.data.total
          this.completionRate = res.data.completionRate.toFixed(1)
          this.avgScore = res.data.avgScore.toFixed(1)
        }
      })
    },
    // 提交作业===================================================
    addStudentWorkDetailHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addStudentWorkDetailAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 提交学生作业
    addStudentWorkDetailAction: function() {
      var params = this.addStudentWorkDetailForm;
      Http.postStudentWorkDetail(params).then(res => {
        if (res.statusCode == 1) {
          this.$Message.success(res.Message);
          this.addStudentWorkDetailForm = {
            workName:"",
            workPath:"",
            casePassedCount:null,
            complexity:null,
            lineOfCode:null,
            studentWorkId:"",
            studentWorkScore:null,
            studentWorkMessage:null
          };
		      this.addStudentWorkDetail = false;
		      this.$refs["addStudentWorkDetailForm"].resetFields();
          this.getStudentWorkList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 上传成功钩子 异步方法
    handleWorkSuccess: async function(res, file) {
        if (res.statusCode == 1) {
          this.addStudentWorkDetailForm.workPath = res.Data;
          this.addStudentWorkDetailForm.workName = res.FileName;
        }
    },
    // 文件格式验证失败钩子
    handleFormatError: function(res, file) {
        this.$Message.error("文件格式不正确");
    },
    // 学生作业明细===================================================================================
    studentWorkDetailClose:function(){
      this.studentWorkId = null;
      this.swdNowPage = 1;
      this.swdPageSize = 10;
      this.studentWorkDetailTableModule.tableContent = [];
      this.studentWorkDetailTableModule.count = 0;
    },
	  // 改变页码
    swdChangePage:function(page){
      this.swdNowPage = page;
      this.getStudentWorkDetailList();
    },
	    // 改变每页显示的条数
    swdChangeSize: function(size) {
      this.swdPageSize = size;
      this.getStudentWorkDetailList();
    },
    getStudentWorkDetailList:function(){
      var params = {
        page: this.swNowPage,
        limit: this.swPageSize,
        studentWorkId: this.studentWorkId,
      };
      Http.getStudentWorkDetailList(params).then(res => {
        if(res.statusCode == 1){
            this.studentWorkDetailTableModule.tableContent = res.data.content
            // this.studentWorkDetailTableModule.count = res.Data.Total
        }
      })
    },
    // 试卷 ==============================================================================================
    addTestPaperModal:function(classRoomId,knowledgeList){
      this.addTestPaperForm.ClassRoomId = classRoomId;
      this.courseKnowledgeList = knowledgeList;
      this.addTestPaper = true;
      this.$refs["addTestPaperForm"].resetFields();
    },
    editTestPaperModal:function(form,knowledgeList){
      this.courseKnowledgeList = knowledgeList;
      this.editTestPaperForm = {
			  Id:form.id,
        Name:form.name,
        ClassRoomId:form.classroomId,
        TestPaperType:form.testPaperType,
        Status:form.status,
        // A: form.A,
        // B: form.TestPaperType == 1 ? [] : form.B,
			  // VersionNumber: this.stringToByte(form.VersionNumber)
      };
      console.log("valuevaluevalue")
      if(form.testPaperType == 1){
        console.log(this.testPaperrules.A)
        this.testPaperrules.A = [{ validator: function(rule, value, callback) {
                                                  callback();
                                              }, trigger: 'blur',trigger: "change", type: 'array' }];
        console.log(this.testPaperrules.A)
      } else{
        this.testPaperrules.B = [{ validator: function(rule, value, callback) {
                                                  if(value.length == 0){
                                                    callback(new Error("B卷不能为空"));
                                                  } else {
                                                    callback();
                                                  }
                                              }, trigger: 'blur',trigger: "change", type: 'array' }];
      }
      this.editTestPaper = true;
    },
    // 试卷详情
    detailTestPaperModal:function(form){
      this.detailTestPaperForm = {
			  id:form.id,
        name:form.name,
        vlassRoomId:form.vlassRoomId,
        testPaperType:form.testPaperType,
        testPaperTypeName: form.testPaperTypeName,
        status:form.status
      };
      this.getDetailTestPaperDetailList(this.detailTestPaperForm.id);
      
    },
    getDetailTestPaperDetailList:function(id){
      var params = {
        testPaperId:id
      };
      Http.TestPaperDetailList(params).then(res => {
        console.log(res)
        if(res.statusCode==1){
            this.detailTestPaperForm.A = res.data.a;
            console.log(res.data.a)
            this.detailTestPaperForm.B = res.data.b;
            this.detailTabIndex = 0;
            this.detailTPDTabIndex = 0;
            if(this.detailTestPaperForm.status == 2){
              this.studentTestPaperColumn = [
                { title: "学号", key: "studentNumber", align: "center",width:100, fixed: 'left'},
                { title: "姓名", key: "studentName", align: "center",width:100, fixed: 'left'}
              ];
              if(this.detailTestPaperForm.TestPaperType == 2){
                this.studentTestPaperColumn.push(
                  {
                    title: "试卷类型",
                    key: "detailType",
                    align: "center",
                    width: 85,
                    fixed: 'left',
                    render: (h, params) => {
                        return h("div", [params.row.detailType == 1 ? 'A卷' : 'B卷'])
                    }
                  }
                );
              }
              var totalScoreColumn =  {
                  title: "总分",
                  key: "totalScore",
                  align: "center",
                  fixed: 'left',
                  width:80
              };
              this.studentTestPaperColumn.push(totalScoreColumn);
              for(let i = 1;i<=this.detailTestPaperForm.A.length;i++){
                var column = { 
                  title: '第' + this.NumberToChinese(i) + '题',
                  key: i.toString(), 
                  align: "center",
                  width:85
                };
                this.studentTestPaperColumn.push(column);
              }
              this.getStudentTestPaperList();
            }

          this.uploadStudentTestPaperFileUrl = API.importStudentTestPaper+'?filesname=StudentTestPaper&testPaperId='+id;
          this.downloadStudentTestPaperTemplateUrl = API.getStudentTestPaperTemplate+"?testPaperId="+id;
          this.detailTestPaper = true;
        }
      });
    },
    getStudentTestPaperList:function(){
      var params = {
        testPaperId:this.detailTestPaperForm.id
      };
      Http.studentTestPaperList(params).then(res => {
        console.log("res")
        console.log(res)
        if(res.statusCode==1){
            this.studentTestPaperList = res.data.list;
            for(let i=0;i<this.studentTestPaperList.length;i++){
              var detailTotalScore = 0;
              console.log(this.detailTestPaperForm.A.length)
              console.log(this.detailTestPaperForm.A)
              for(let k=0;k<this.detailTestPaperForm.A.length;k++){
                //console.log(this.studentTestPaperList[i].detailType)
                if(this.studentTestPaperList[i].detailType == 1){
                  this.studentTestPaperList[i][k+1] = this.studentTestPaperList[i][k+1] + '/' + this.detailTestPaperForm.A[k].score;
                }else {
                  this.studentTestPaperList[i][k+1] = this.studentTestPaperList[i][k+1] + '/' + this.detailTestPaperForm.B[k].score;
                }
                console.log(this.detailTestPaperForm.A[k])
                detailTotalScore = detailTotalScore + this.detailTestPaperForm.A[k].score;
              }
              this.studentTestPaperList[i].totalScore = this.studentTestPaperList[i].totalScore + '/' + detailTotalScore;
            }
        }
      });
    },
    downloadStudentTestPaperTemplate:function(){
      var params = {
          testPaperId:this.detailTestPaperForm.id
        }
        Http.getStudentTestPaperTemplate(params).then(res=>{
            if(res.statusCode==1){
                window.open(res.data);
            }
            else{
                this.$Message.error("获取模板错误");
            }
        })
    },
    // 编辑上传成功钩子 异步方法
    handleImportStudentTestPaperSuccess: async function(res, file) {
        if (res.statusCode == 1) {
          this.$Message.success(res.message);
          this.getStudentTestPaperList();
        }else{
          this.$Message.error(res.message);
        }
    },
    // 添加试卷表单验证方法
    addTestPaperHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          this.addTestPaperAction();
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 修改试卷表单验证方法
    editTestPaperHandleSubmit: async function(name) {
      var result = await this.$refs.editTestPaperForm.validate(valid => {});
      if (result) {
        console.log(this);
        this.editTestPaperAction();
      } else {
        this.$Message.error("表单信息不正确!");
      }
    },
    // 添加试卷
    addTestPaperAction: function() {
      var params = this.addTestPaperForm;
      Http.postTestPaper(params).then(res => {
        if (res.statusCode == 1) {
          this.$Message.success(res.Message);
          this.addTestPaperForm = {
            Name:"",
            ClassRoomId:null,
            TestPaperType:1,
            A: [],
            B: []
          };
          this.addTestPaper = false;
          this.testPaperrules.B = [{ validator: function(rule, value, callback) {
                                                  callback();
                                              }, trigger: 'blur',trigger: "change", type: 'array' }];
          this.$refs["addTestPaperForm"].resetFields();
          this.$refs.classRoomDetail.getTestPaperList();
        }
        else{
            this.$Message.error(res.Message);
        }
      });
    },
    // 编辑试卷
    editTestPaperAction: function() {
        var params = this.editTestPaperForm;
        Http.putTestPaper(params).then(res=>{
            if(res.statusCode==1){
                this.$Message.success(res.Message);
				        this.editTestPaperForm = {
                  Id:null,
                  Name:"",
                  ClassRoomId:null,
                  TestPaperType:null,
                  Status:null,
                  A: [],
                  B: [],
                  VersionNumber: null
                };
                this.editTestPaper = false;
                this.$refs["editTestPaperForm"].resetFields();
                this.$refs.classRoomDetail.getTestPaperList();
            }
            else{
                this.$Message.error(res.Message);
            }
        })
    },
    // 添加试卷
    addPaperDetail:function(type,formName,form){
      this.nowEditTestPaperType = type;
      this.nowFormName = formName;
      this.nowForm = form;
      this.testPaperDetailForm = {
        testPaperDetailList: JSON.parse(JSON.stringify(form.A))
      };
      if (type == 2){
        if(this.addTestPaperForm.A.length == 0){
          this.$Message.error("请先添加A卷试题!");
          return;
        } else{
          for(let i = 0;i<this.testPaperDetailForm.testPaperDetailList.length; i++){
            this.testPaperDetailForm.testPaperDetailList[i].DetailType = 2;
          }
        }
      }
      this.testPaperDetail = true;
    },
    editPaperDetail:function(type,formName,form){
      this.nowEditTestPaperType = type;
      this.nowFormName = formName;
      this.nowForm = form;
      if(type == 1){
        this.testPaperDetailForm = {
          testPaperDetailList: JSON.parse(JSON.stringify(form.A))
        };
      } else{
        this.testPaperDetailForm = {
          testPaperDetailList: JSON.parse(JSON.stringify(form.B))
        };
      }
      this.testPaperDetail = true;
    },
    testPaperTypeChange: function(value){
      if(value == 1){
        this.testPaperrules.B = [{ validator: function(rule, value, callback) {
                                                  callback();
                                              }, trigger: 'blur',trigger: "change", type: 'array' }];
      } else {
        this.testPaperrules.B = [{ validator: function(rule, value, callback) {
                                                  if(value.length == 0){
                                                    callback(new Error("B卷不能为空"));
                                                  } else {
                                                    callback();
                                                  }
                                              }, trigger: 'blur',trigger: "change", type: 'array' }];
      }
    },
    // 试题==========================================================================================
    // 添加新试题
    addNewDetail:function(){
      let newDetail = {
        Title: "",
        DetailNumber: this.testPaperDetailForm.testPaperDetailList.length + 1,
        DetailType : 1,
        Score : null,
        KnowledgeList:[{ KnowledgeId: null, Weight: null}],
      };
      this.testPaperDetailForm.testPaperDetailList.push(newDetail);
    },
    // 添加试题表单验证方法
    testPaperDetailHandleSubmit: function(name) {
      var result = this.$refs[name].validate(valid => {
        if (valid) {
          if(this.nowEditTestPaperType == 1){
            this.nowForm.A = JSON.parse(JSON.stringify(this.testPaperDetailForm.testPaperDetailList));
            this.nowForm.B = [];
          }else{
            this.nowForm.B = JSON.parse(JSON.stringify(this.testPaperDetailForm.testPaperDetailList));
          }
          this.$refs[this.nowFormName].validate();
          this.testPaperDetailForm.testPaperDetailList = [];
          this.testPaperDetail = false;
        } else {
          this.$Message.error("表单信息不正确!");
        }
      });
      return result;
    },
    // 删除
    delTestPaperDetail: function(index){
      this.testPaperDetailForm.testPaperDetailList.splice(index,1);
      for(let i = index; i < this.testPaperDetailForm.testPaperDetailList.length; i++){
        this.testPaperDetailForm.testPaperDetailList[i].DetailNumber--;
      }
    },
    // 上移
    upTestPaperDetail: function(index){
      if(index != 0){
        let now = this.testPaperDetailForm.testPaperDetailList[index];
        let old = this.testPaperDetailForm.testPaperDetailList[index-1];
        now.DetailNumber = now.DetailNumber - 1;
        old.DetailNumber = old.DetailNumber + 1;
        this.testPaperDetailForm.testPaperDetailList[index] = old;
        this.testPaperDetailForm.testPaperDetailList[index - 1] = now;
      }
    },
    // 下移
    downTestPaperDetail: function(index){
      if(index != this.testPaperDetailForm.testPaperDetailList.length - 1){
        let now = this.testPaperDetailForm.testPaperDetailList[index];
        let old = this.testPaperDetailForm.testPaperDetailList[index + 1];
        now.DetailNumber = now.DetailNumber + 1;
        old.DetailNumber = old.DetailNumber - 1;
        this.testPaperDetailForm.testPaperDetailList[index] = old;
        this.testPaperDetailForm.testPaperDetailList[index + 1] = now;
      }
    },
    // 添加知识点
    handleAddKnowledge: function(index){
      this.testPaperDetailForm.testPaperDetailList[index].KnowledgeList.push({ KnowledgeId: null, Weight: null});
    },
    // 删除知识点
    delTestPaperDetailKnowledge: function(index,kindex){
      this.testPaperDetailForm.testPaperDetailList[index].KnowledgeList.splice(kindex,1);
    },
  }
};

</script>
<style lang="scss" scoped>
@import "./ClassRoomPage.scss";
</style>
