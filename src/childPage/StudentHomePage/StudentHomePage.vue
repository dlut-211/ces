
<template>
  <div class="StudentHomePage" style="" >
  <!-- 显示作业全称模态框 -->
    <Modal
    v-model="showWorkName"
    width="350px"
    
    >
    <div style="font-size:15px"><p>{{workAllName}}</p></div>
    <div slot="footer"></div>
    </Modal>
     <!-- <div style="display:table" >
        
        <div id="StudentClassRoomAvgScoreEcharts" style="width:800px;height:500px;display:table-cell"></div>
      </div>
        <h3>待办事项：</h3>
        <Scroll>
        <ul>
          <li v-for="(item, index) in DoingWorkInfo" :key="index" style="margin:0.5cm 0.5cm 0.5cm 0.5cm"> 
           
            课堂《{{item.classroomName}}》{{item.ChapterName}}中作业："{{item.workname}}"待提交;截止日期：{{dateFormatFinal(item.EndTime)}}
          
          </li>
        </ul>
        </Scroll> -->
       <div class="frontdiv"> 
       <Row>
         <Col span="5">
        <Card style="border-color:#2c2d5b">
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              课程管理
          </p>
          <Row>
            <Col span="20">
                <p>"你有新的课程任务"</p>
            </Col>
            <Col span="4">
                <Badge :count="noSubmitCount">
                    <Icon id="icon1" type="ios-bell-outline" size="26" @click="changerouter()" @mouseenter.native="changestyle()" @mouseleave.native="leavestyle()" style="cursor: pointer;"></Icon>
                </Badge>
                
            </Col>
          </Row>
        </Card>
        </Col>
        <Col span="1">
        <div><p>&nbsp</p></div>
        </Col>
        <Col span="5">
        <Card style="border-color:#2c2d5b">
          <p slot="title" >
            <Icon type="document"></Icon>
            文件管理
          </p>
          <p>
            暂无
          </p>
        </Card>
        </Col>
        <Col span="1">
        <div><p>&nbsp</p></div>
        </Col>
        <Col span="5">
        <Card style="border-color:#2c2d5b">
          <p slot="title" >
            <Icon type="speakerphone"></Icon>
            公告
          </p>
          <p>
            暂无
          </p>
        </Card>
        </Col>
        <Col span="1">
        <div><p>&nbsp</p></div>
        </Col>
        <Col span="5">
        <Card style="border-color:#2c2d5b">
          <p slot="title" >
            <Icon type="ios-chatboxes"></Icon>
            讨论
          </p>
          <p>
            暂无
          </p>
        </Card>
        </Col>
        </Row>
        </div>
        <div class="centerdiv" style="margin-top:45px">
          <Row>
            <Col span="12">
              <Card style="background-color:#f8f8f9">
                <p slot="title" >
                  <Icon type="ios-book"></Icon>
                  所选课程列表
                </p>
                <div>
                  <Row style="background-color:#2c2d5b;color:white;height:40px;line-height:40px;text-align:center">
                  <Col span="6">
                    <div><p>课堂名称</p></div>
                  </Col>
                  <Col span="6">
                    <div><p>学期</p></div>
                  </Col>
                  <Col span="8">
                    <div><p>上课日期</p></div>
                  </Col>
                  <Col span="4">
                    <div><p>课程状态</p></div>
                  </Col>
                </Row>
                <div style="text-align:center;background-color:#f8f8f9">
              <Row v-for="(item, index) in courseList" :key="index" style="margin-top:10px">
                <Col span="6">
                    <div><p>{{item.classroomName}}</p></div>
                </Col>
                <Col span="6">
                <div style="text-align:center"><p>{{item.TermTypeName}}</p></div>
                    
                </Col>
                <Col span="8">
                    <div><p>{{dateFormatFirst(item.BeginDate)}}-{{dateFormatFirst(item.EndDate)}}</p></div>
                </Col>
                <Col span="4">
                    <div v-if="item.StatusName=='未开课'" style="color:red"><p>{{item.StatusName}}</p></div>
                    <div v-if="item.StatusName!='未开课'">{{item.StatusName}}</div>
                </Col>
              </Row>
              </div>
                </div>
                <div style="text-align:right;margin-top:10px">
                <Button v-if="nowPage==1" disabled  @click="lastPage()">上一页</Button>
                <Button v-if="nowPage!=1"  style="background-color:#2c2d5b;color:white" @click="lastPage()">上一页</Button>
                当前页:{{nowPage}}/{{courseListPages}};共{{TotalList}}条
                <Button v-if="nowPage==courseListPages" disabled type="primary" @click="nextPage()">下一页</Button>
                <Button v-if="nowPage!=courseListPages"  style="background-color:#2c2d5b;color:white" @click="nextPage()">下一页</Button>
                </div>
              </Card>
            </Col>
            <Col span="1">
            &nbsp
            </Col>
            <Col span="10">
              <Card style="background-color:#f8f8f9"> 
                <p slot="title">
                  <Icon type="calendar"></Icon>
                  作业完成情况
                </p>
                <Row style="background-color:#2c2d5b;color:white;height:40px;line-height:40px;text-align:center">
                  <Col span="6">
                    <div><p>课堂名称</p></div>
                  </Col>
                  <Col span="6">
                    <div><p>作业名称</p></div>
                  </Col>
                  <Col span="6">
                    <div><p>提交人数</p></div>
                  </Col>
                  <Col span="6">
                    <div style="text-align:center"><p>提交名次</p></div>
                  </Col>
              </Row>
              <div style="text-align:center;background-color:#f8f8f9">
              <Row v-for="(item, index) in workinfo" :key="index" style="margin-top:10px">
                <Col span="6">
                    <div><p>{{item.classroomName}}</p></div>
                </Col>
                <Col span="6">
                    <div class="summary" @click="showWorkAllName(item.workname)"><p>{{item.workname}}</p></div>
                </Col>
                <Col span="6">
                    <Row>
                      <Col span="18">
                      <div><p><Progress style="color:#b3e900" :percent=(item.submitcount/item.studenttotalcount)*100 hide-info></Progress> </p></div>
                      </Col >
                      <Col span="6">
                      <p>{{item.submitcount}}/{{item.studenttotalcount}}</p>
                      </Col>
                    </Row>
                </Col>
                <Col span="6">
                    <div v-if="item.rank!=0" style="text-align:center"><p>{{item.rank}}</p></div>
                    <div v-if="item.rank==0" style="color:red;text-align:center"><p>未提交</p></div>
                </Col>
              </Row>
              </div>
              <div style="text-align:right;margin-top:10px">
                <Button v-if="workInfoPageLimit.page==1" disabled type="primary" @click="WorkInfoLastPage()">上一页</Button>
                <Button v-if="workInfoPageLimit.page!=1"  style="background-color:#2c2d5b;color:white" @click="WorkInfoLastPage()">上一页</Button>
                当前页:{{workInfoPageLimit.page}}/{{workInfoPageLimit.pages}};共{{workInfoPageLimit.count}}条
                <Button v-if="workInfoPageLimit.page==workInfoPageLimit.pages" disabled type="primary" @click="WorkInfoNextPage()">下一页</Button>
                <Button v-if="workInfoPageLimit.page!=workInfoPageLimit.pages"  style="background-color:#2c2d5b;color:white" @click="WorkInfoNextPage()">下一页</Button>
                </div>
              </Card>
            </Col>
          </Row>
          <div style="margin-top:20px">
          <Row>
            <Col span="12">
              <Card style="background-color:#f8f8f9">
                <p slot="title">
                  <Icon type="android-bulb" size="20"></Icon>
                  能力分析
                </p>
                <Row style="background-color:#2c2d5b;color:white;height:40px;line-height:40px;text-align:center">
                  <Col span="8">
                    <div><p>课堂名称</p></div>
                  </Col>
                  <Col span="8">
                    <div><p>已获得能力点</p></div>
                  </Col>
                  <Col span="8">
                    <div><p>未获得能力点</p></div>
                  </Col>
                </Row>
                <div style="text-align:center;background-color:#f8f8f9">
              <Row v-for="(item, index) in abilityArray" :key="index" style="margin-top:10px">
                <Col span="8">
                    <div><p>{{item.classroomName}}</p></div>
                </Col>
                <Col span="8">
                    <div v-if="item.nameExp5==null" style="color:#fe6323"><p>暂未获得能力点</p></div>
                    <div v-if="item.nameExp5!=null" class="nameExp4" @click="showWorkAllName(item.nameExp5)">{{item.nameExp5}}</div>
                </Col>
                <Col span="8">
                    <div class="nameExp4" style="color:red" @click="showWorkAllName(item.nameExp4)"><p>{{item.nameExp4}}</p></div>
                </Col>
              </Row>
              </div>
              <div style="text-align:right;margin-top:10px">
                <Button v-if="abilityPageLimit.page==1" disabled type="primary" @click="abilityLastPage()">上一页</Button>
                <Button v-if="abilityPageLimit.page!=1"  style="background-color:#2c2d5b;color:white" @click="abilityLastPage()">上一页</Button>
                当前页:{{abilityPageLimit.page}}/{{abilityPageLimit.pages}};共{{abilityPageLimit.count}}条
                <Button v-if="abilityPageLimit.page==abilityPageLimit.pages" disabled type="primary" @click="abilityNextPage()">下一页</Button>
                <Button v-if="abilityPageLimit.page!=abilityPageLimit.pages"  style="background-color:#2c2d5b;color:white" @click="abilityNextPage()">下一页</Button>
                </div>
              </Card>
            </Col>
            <Col span="1">
            &nbsp
            </Col>
            <Col span="11">
              <Card>
                <p slot="title">
                  <Icon type="ios-pulse-strong" size="20"></Icon>
                  图表信息
                </p >
                <Row>
                  <Col span="11">
                    <div id="EchartsSubjectAbility" style="width:300px;height:300px;"> </div>
                  </Col>
                  <Col span="11">
                    <div id="StudentClassRoomAvgScoreEcharts" style="width:400px;height:300px;"></div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          </div>
        </div>
  </div>
</template>
<script>
// 引入查询模块组件
import selectModule from "@/components/selectModule/selectModule.vue";
// 引入表格模块组件
import tableModule from "@/components/tableModule/tableModule.vue";
// 引入查询模块配置项
import {StudentHomeSelectModuleJS} from "./StudentHomeSelectModuleJS.js";
// 引入表格模块配置项
import {StudentHomeTableModuleJS} from "./StudentHomeTableModuleJS.js";
// 引入API
import * as Http from "@/api/HttpService.js";
export default {
  data: function() {
    return {
      StudentAbility:[],
      SubjectId:1,
      legendInfo:[],
      items:[3],
      ClassRoomNameList:[],
      AvgScoreList:[],
      MyAvgScoreList:[],
      DoingWorkInfo:[],
      TotalRecords:null,
      TotalList:null,
	    nowPage: 1,
      pageSize: 5,
      noSubmitCount:null,
      maxPageSize:99999,
      courseList:[],
      courseListPages:null,
      workinfo:[],
      //存储学生能力点掌握情况
      abilityArray:[],
      //存储学生能力点数据总条数
      abilityCount:null,
      //作业完成情况分页
      workInfoPageLimit:{
        page:1,
        limit:5,
        pages:null,
        count:null
      },
      //能力分析分页
      abilityPageLimit:{
        page:1,
        limit:5,
        pages:null,
        count:null
      },
      pages:{
        nowPage:1,
        pageSize:5,
        startSize:0
      },
      //作业全称
      workAllName:"",
      //控制作业模态框的显示
      showWorkName:false
    
    };
  },
  mounted:function(){
	// this.$store.commit("changeBreadCrumb", [
  //     "首页",
  //     "",
  //     "作业管理"
  //   ]);
  //   this.$store.commit("changeOpenName", [""]);
  //   this.$store.commit("changeActiveName", "NetGraphPage");
    //this.getStudentHomeList();
    //事物
    // this.OperDate();
    this.getNoSubmitWork();
 this.getAbilityScore();
 this.DrawStudentClassRoomAvgScoreEcharts();
 this.getStudentWorkInfoWithStudent();
 this.getStudentAbilityInfo();
//  this.getAllWorkInfoData();
   
   
   //this.autodivheight();
   this.getClassRoomStudentList()
  },
  components: {
    selectModule: selectModule,
    tableModule: tableModule
  },
  methods: {
    //显示作业全称
    showWorkAllName:function(e){
      this.showWorkName=true;
      this.workAllName=e;
    },
    //能力分析上一页
    abilityLastPage:function(){
      this.abilityPageLimit.page=this.abilityPageLimit.page-1;
      this.getStudentAbilityInfo();
    },
    //能力分析下一页
    abilityNextPage:function(){
      this.abilityPageLimit.page=this.abilityPageLimit.page+1;
      this.getStudentAbilityInfo();
    },
    //学生作业分页
    WorkInfoLastPage:function(){
      this.workInfoPageLimit.page=this.workInfoPageLimit.page-1;
      this.getStudentWorkInfoWithStudent();
    },
    WorkInfoNextPage:function(){
      this.workInfoPageLimit.page=this.workInfoPageLimit.page+1;
      this.getStudentWorkInfoWithStudent();
    },
    //获取学生能力点掌握情况
    getStudentAbilityInfo:function(){
      var params={
        studentId:this.$store.state.id,
        nowPage:this.abilityPageLimit.page,
        pageSize:this.abilityPageLimit.limit
      };
      Http.getStudentAbilityInfo(params).then(res=>{
        if(res.statusCode==1){
          this.abilityArray=res.data.content;
          this.abilityPageLimit.count=res.data.totalElements;
          this.abilityPageLimit.pages=Math.ceil(this.abilityPageLimit.count/this.abilityPageLimit.limit);
        }
      })
    },
    //获取总数据
    getAllWorkInfoData:function(){
        var params=
        {studentId:this.$store.state.id}
        Http.getAllWorkInfoData(params).then(res=>{
          if(res.statusCode==1){
          this.workInfoPageLimit.count=res.data;
          this.workInfoPageLimit.pages=Math.ceil(res.data/this.workInfoPageLimit.limit)
          }
        })
    },
    //获取学生作业完成情况
    getStudentWorkInfoWithStudent:function(){
      var params={
        "studentId":this.$store.state.id,
        "nowPage":this.workInfoPageLimit.page,
        "pageSize":this.workInfoPageLimit.limit,
        "startSize":0
      };
     
     // console.log("nowPage"+params.pages.nowPage)
      Http.getStudentWorkInfoWithStudent(params).then(res=>{
        if(res.statusCode==1){
          this.workinfo=res.data;
          this.getAllWorkInfoData();
          //this.workInfoPageLimit.count=res.data.Total;
          //this.workInfoPageLimit.pages=Math.ceil(res.data.Total/this.workInfoPageLimit.limit)
          //console.log("---------------------"+this.workinfo[0].classroomName)
        }
      })
    },
    //获取学生未提交的作业数量
    getNoSubmitWork:function(){
      var params={
        page: 1,
        limit: 99999,
        StudentId:this.$store.state.id
      }
      Http.getNoSubmitWork(params).then(res=>{
        if(res.statusCode==1){
          this.noSubmitCount=res.data.NoSubmitWork
        }
        else{
          this.$Message.error;
        }
      })
    },

    leavestyle:function(){
            var x=document.getElementById("icon1").style.color="grey";

    },
    //鼠标移到图标上面改变样式
    changestyle:function(){
            console.log("zzzzzzz")

      var x=document.getElementById("icon1").style.color="#5cadff";
      console.log("zzzzzzz")
    },
    //点击图标改变路由
    changerouter:function(){
      this.$router.push({
        name:'ClassRoomStudentPage'
      })
    },
    //上一页
    lastPage:function(){
      this.nowPage=this.nowPage-1; 
      this.getClassRoomStudentList();
    },
    //下一页
    nextPage:function(){
      this.nowPage=this.nowPage+1;
      this.getClassRoomStudentList()
    },
    //获取课程列表
     getClassRoomStudentList: function() {
      var params = {
        page: this.nowPage,
        limit: this.maxPageSize,
        StudentId:parseInt(this.$store.state.id),
      };
      Http.getClassRoomStudentList(params).then(res => {
        if(res.statusCode==1){
            this.courseList = res.data.List;
            this.TotalList=res.data.Total;
            this.courseListPages =Math.ceil(res.data.Total/this.pageSize);
            if(this.maxPageSize==99999){
               this.TotalList=res.data.Total;
            }
            this.maxPageSize=this.pageSize;
        }
      });
    },

	// autodivheight:function(){
  //   var winHeight=0;
  //   if(window.innerHeight){
  //     winHeight=window.innerHeight;
  //   }
  //   else if((document.body)&&(document.body.clientHeight)){
  //     winHeight=document.body.clientHeight;
  //   }
  //   if(document.documentElement&&document.documentElement.clientHeight){
  //     winHeight=document.documentElement.clientHeight;
  //   }
  //   document.getElementById("EchartsSubjectAbility").style.height=winHeight/4+"px";
  //   document.getElementById("EchartsSubjectAbility").style.width=winHeight/2+"px";
  //    document.getElementById("StudentClassRoomAvgScoreEcharts").style.height=winHeight/2+"px";
  //   document.getElementById("StudentClassRoomAvgScoreEcharts").style.width=winHeight+"px";
  // },
     OperDate:function(){
      var mydate=new Date().getTime();
      console.log("mydate"+mydate);
      var tomorrowdate=mydate-3*24*60*60*1000;
      console.log("tomorrowdate"+tomorrowdate);
      var tomodate=this.dateFormatFinal(new Date(tomorrowdate));
      
      console.log("tomodate"+tomodate);
      var params={
        StudentId:this.$store.state.id,
        nowtime:tomodate,
        page:1,
        limit:10
      }
      Http.getStudentWorkByTime(params).then(res=>{
        if(res.statusCode==1){
          this.DoingWorkInfo=res.data.List;
          this.TotalRecords=res.data.Total;
        }
        else{
          this.$Message.error();
        }
      })
    },
     getAbilityScore:function(){
     var params = {
      subjectId:this.SubjectId,
      studentId:this.$store.state.id 
      };
  
      Http.StudentAbilityScoreEcharts(params).then(res => {
        if(res.statusCode==1){
       
       //暂时没有能力点则提示
          if(res.data.studentAbilityNameAndMaxDTOS.length==0&&res.data.realStudentAbilityNameAndMaxDTOS.length==0){
            this.abilityModalVisible = false;
            //提示语
          }else if(res.data.studentAbilityNameAndMaxDTOS.length>0 || res.data.realStudentAbilityNameAndMaxDTOS.length>0){
       this.studentAbilityNameAndMaxDTOS = res.data.studentAbilityNameAndMaxDTOS;
        //  this.StudentAbility = res.data.StudentAbility;
        for(var i = 0;i<res.data.realStudentAbilityNameAndMaxDTOS.length;i++){
               this.StudentAbility.push(res.data.realStudentAbilityNameAndMaxDTOS[i].max);
            }
          }
  
           //        console.log(res.data);
          // console.log(studentAbilityNameAndMaxDTOS);
           this.DrawStudentSubjectAbilityEcharts();
           // this.tableModule.count = valueList.length;
        }
      });


    },
        //课堂平均分
    DrawStudentClassRoomAvgScoreEcharts:function(){
      var params=
      {
        studentId:this.$store.state.id
      }
      this.legendInfo.push(this.$store.state.username);
      this.legendInfo.push("平均值");
      Http.getClassRoomAvgScore(params).then(res=>{
        if(res.statusCode==1){
          for(var i=0;i<res.data.length;i++){
            this.ClassRoomNameList.push(res.data[i].classroomName);
            this.AvgScoreList.push(res.data[i].avgScore);
            this.MyAvgScoreList.push(res.data[i].myAvgScore)
          }
      let StudentClassRoomAvgScoreEcharts = this.$echarts.init(document.getElementById('StudentClassRoomAvgScoreEcharts'));
      StudentClassRoomAvgScoreEcharts.setOption({
            tooltip : {
              trigger: 'axis',
               },
           legend: {
          data:this.legendInfo
               },
    grid:{
      right:"30%"
    },
    xAxis : [
        
        {
            name:"课堂名",
            type : 'category',
            data : this.ClassRoomNameList,
            axisLabel:{
          interval:0,
          rotate:-30
        },
        }
    ],
    yAxis : [
        {
            name:"分数",
            type : 'value'
        }
    ],
    series : [
        {
            name:this.$store.state.username,
            type:'bar',
            data:this.MyAvgScoreList
        },
        
        {
            name:'平均值',
            type:'bar',
            data:this.AvgScoreList,
        
        },
    ]
      })
        }
        else{
          this.$Message.error();
        }
      })

    },
    DrawStudentSubjectAbilityEcharts:function(){

let barSubjectAbility = this.$echarts.init(document.getElementById('EchartsSubjectAbility'));
      barSubjectAbility.setOption(  {
    title: {
        text: '学科能力点雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
      indicator: this.studentAbilityNameAndMaxDTOS
     
      
         
    },
    series: [{
        name: '能力点分数',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
              
              value : this.StudentAbility,
                name : '能力点分数'
            },
             
        ]
    }]
})

window.onresize=barSubjectAbility.resize;

    },
  }
};
</script>
<style>
.summary {
    overflow: hidden;    /* 隐藏溢出内容 */
    text-overflow: clip;    /* 修剪文本 */
    display: -webkit-box;    /* 弹性布局 */
    -webkit-box-orient: vertical;    /* 从上向下垂直排列子元素 */
    -webkit-line-clamp: 1;    /* 限制文本仅显示前三行 */
    color: forestgreen;
    cursor: pointer;
}
.nameExp4{
    overflow: hidden;    /* 隐藏溢出内容 */
    text-overflow: clip;    /* 修剪文本 */
    display: -webkit-box;    /* 弹性布局 */
    -webkit-box-orient: vertical;    /* 从上向下垂直排列子元素 */
    -webkit-line-clamp: 1;    /* 限制文本仅显示前三行 */
    cursor: pointer;
    
}
.nameExp5{
  overflow: hidden;    /* 隐藏溢出内容 */
    text-overflow: clip;    /* 修剪文本 */
    display: -webkit-box;    /* 弹性布局 */
    -webkit-box-orient: vertical;    /* 从上向下垂直排列子元素 */
    -webkit-line-clamp: 1;    /* 限制文本仅显示前三行 */
    color:red;
    text-align:center;
    cursor: pointer;
}
</style>
