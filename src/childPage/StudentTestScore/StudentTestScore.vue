<template>
    <div>
    <Tabs v-model="tabIndex">
        <TabPane label="课堂作业展示">
            <div>
                <Row align="middle">
                    <Col span="24">
                        <div id="courseAKTree" style="width:800px;height:500px;"></div> 
                    </Col>
                </Row>
            </div>
        </TabPane>
    </Tabs>
    </div>
</template>
<script>

    // 引入API
    import * as Http from "@/api/HttpService.js";
    import {
        API
    } from "@/api/HttpConfig";

    export default {
        props: ["courseData"],
        data: function() {
            return {
                 greenColer:{
                     color: "green",
		            borderColor:"green"
                },
                 blueColer:{
                     color: "blue",
		            borderColor:"blue"
                },
                 redColer:{
                     color: "red",
		            borderColor:"red"
                }
            };
        },
        components: {
            
        },
        mounted: function() {
            this.courseAKTree();
        },
        methods: {
            child: function (param){//递归循环节点
                param.forEach(obj => {
                this.changeColor(obj);//根据状态设置不同的颜色
		        if(obj.children!=null && obj.children.length!=0){
			    this.child(obj.children);//递归循环
		        }
                });
            },
           changeColor:  function (obj){//设置节点颜色
	        if(obj.score <= 20){
                console.log(obj)
                console.log("red");
		        obj.itemStyle=this.redColer;
                obj.lineStyle = this.redColer;
                console.log("颜色1",obj.itemStyle)	
	        }
	        if(20 < obj.score && obj.score <= 60){
                console.log(obj)
                console.log("blue");
		        obj.itemStyle=this.blueColer;
                obj.lineStyle = this.blueColer
                console.log("颜色2",obj.itemStyle)
	        }
	        if(60 < obj.score && obj.score <= 100){
                console.log(obj)
                console.log("green");
		        obj.itemStyle=this.greenColer;
                obj.lineStyle = this.greenColer	
                console.log("颜色3", obj.itemStyle)
	        }
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
                    classroomId: this.$store.state.classroomId,
                    studentId: this.$store.state.number
                }

                Http.studentAKTree(params).then(res=>{
                    if(res.statusCode == 1) {
                        var courseAKTreeEchart = this.$echarts.init(document.getElementById('courseAKTree'));
                        var resData = [{
                            "name" : res.data.name,
                            "children" : res.data.children
                        }];
                        resData.forEach(obj => {
                            this.changeColor(obj);//根据返回数据的状态设置不同的颜色
				        if(obj.children!=null && obj.children.length!=0){//如果有子节点
					        this.child(obj.children);//调用递归循环
				            }
                        });
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
