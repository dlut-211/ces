<template>
    <Tabs v-model="tabIndex">
        <TabPane label="详情">
            <div>
                <Row>
                    <Col v-for="(value,key) in data" :span="value.col" :key="key">
                    <div class="showMoreCol" v-if="value.name != undefined">
                        <Row>
                            <Col span="8">
                            <div class="name" >
                                {{value.name}}:
                            </div>
                            </Col>
                            <Col span="16">
                            <div class="value">
                                {{value.value?value.value:'暂无'}}
                            </div>
                            </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
            </div>
        </TabPane>
        <TabPane label="车辆轨迹" v-if="waitSubmit">
            <div id="amap-main" style="height:500px" :hidden="haveMap">
                
            </div>
            <div v-if="haveMap == true">
                    暂无车辆轨迹信息！
            </div>
        </TabPane>
        <TabPane label="北斗数据" v-if="waitSubmit">
                <div>
                    <Row :gutter="10">
                        <Col span="4">
                            <div style="height:32px;line-height:32px;display: inline-block;">车牌号：</div><div style="height:32px;line-height:32px;display: inline-block;">{{data.Vehicle_VehicleNumber}}</div>
                        </Col>
                        <Col span="2"><div style="height:32px;line-height:32px;">发运日期时间</div></Col>
                        <Col span="4">
                            <DatePicker type="datetime" placeholder="请选择发运日期时间" v-model="data.BeidouStart" style="width:100%"></DatePicker>
                        </Col>
                        <Col span="2"><div style="height:32px;line-height:32px;">收货日期时间</div></Col>
                        <Col span="4">
                            <DatePicker type="datetime" placeholder="请选择收货日期时间" v-model="data.BeidouEnd" style="width:100%"></DatePicker>  
                        </Col>
                        <Col span="2">
                            <Button type="success" size="small" style="float:right;margin-top:6px;margin-right:25px;" @click="beidouSearch()">查询</Button>
                        </Col>
                    </Row>    
                </div>
                <div id="amap-main-bd" :hidden="data.IsHaveWithBeidouData == false" style="height:500px;margin-top:10px;" >
                    
                </div>
                <div v-if="data.IsHaveWithBeidouData == false" style="margin-top:10px;margin-left:10px;">
                        {{bdErrorMsg}}
                </div>
        </TabPane>
        <TabPane label="回单照片" v-if="waitSubmit">
                <div v-if="data.ReceiptPhoto != null && data.ReceiptPhoto != ''">
                        <img :src="data.ReceiptPhoto" width="500px" height="500px" :style="'transform: rotate('+roll+'deg)'"/>
                        <div style="margin-left: 170px">
                          <Button type="primary" shape="circle" icon="ios-undo-outline" @click="turnPhoto('left')"></Button>
                          <Button type="primary" shape="circle" icon="ios-redo-outline" @click="turnPhoto('right')"></Button>
                        </div>
                 </div>       
            <img v-else src="../../assets/notpic.png" width="500px" height="500px"/>
        </TabPane>
        <TabPane label="回单照片" v-if="!waitSubmit">
                <div v-if="data.ReceiptPhoto != null && data.ReceiptPhoto != ''">
                        <img :src="data.ReceiptPhoto" width="500px" height="500px" :style="'transform: rotate('+roll1+'deg)'"/>
                        <div style="margin-left: 170px">
                          <Button type="primary" shape="circle" icon="ios-undo-outline" @click="turnPhoto('left')"></Button>
                          <Button type="primary" shape="circle" icon="ios-redo-outline" @click="turnPhoto('right')"></Button>
                        </div>
                 </div>       
            <img v-else src="../../assets/notpic.png" width="500px" height="500px"/>
        </TabPane>
    </Tabs>
    
</template>
<script>
    // 引入API
    import * as Http from "@/api/HttpService.js";
    import {
        API
    } from "@/api/HttpConfig";
    // 引入高德地图
    import {
        lazyAMapApiLoaderInstance
    } from 'vue-amap';

    export default {
        props: ["data", "waitSubmit", "roll"],
        data: function() {
            return {
                haveMap: true,
                tabIndex: 0,
                img: null,
                roll1: 0,
                //发货实际时间
                DespatchActualDateTime: null,
                //收货实际时间
                GoodsReceiptDateTime: null,
                bdErrorMsg: "暂无车辆北斗数据！",
                bdloading: false
            };
        },
        mounted: function() {
        },
        methods: {
            //旋转图片
            turnPhoto: function(param) {
                this.waitSubmit ? this.$emit("turnPhoto", param) : this.turnPhoto1()
            },
            turnPhoto1: function(param) {
                this.roll1 = (param == "left" ? (this.roll1 + 270) % 360 : (this.roll1 + 90) % 360)
            },
            loadMap(id) {
                this.tabIndex = 0;
                let params = {
                    id: id
                };
                Http.getVehicleTrajectory(params).then(res => {
                    if (res.StatusCode == 1) {
                        if (!this.waitSubmit) {
                            return
                        }
                        if (res.Data.Total > 0) {
                            this.haveMap = false;
                            let map = new AMap.Map('amap-main', {
                                zoom: 10,
                                center: new AMap.LngLat(res.Data.List[0].Longitude, res.Data.List[0].Latitude)
                            });
                            var style = [{
                                url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
                                anchor: new AMap.Pixel(6, 6),
                                size: new AMap.Size(11, 11)
                            }, {
                                url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                                anchor: new AMap.Pixel(4, 4),
                                size: new AMap.Size(7, 7)
                            }, {
                                url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
                                anchor: new AMap.Pixel(3, 3),
                                size: new AMap.Size(5, 5)
                            }];
                            var massMarks = [];
                            for (var i = 0; i < res.Data.List.length; i++) {
                                var point = {
                                    'lnglat': res.Data.List[i].lnglat,
                                    'name': res.Data.List[i].Address,
                                    'id': res.Data.List[i].Id
                                };
                                massMarks.push(point);
                            }

                            var mass = new AMap.MassMarks(massMarks, {
                                opacity: 0.8,
                                zIndex: 111,
                                cursor: 'pointer',
                                style: style
                            });

                            var marker = new AMap.Marker({
                                content: ' ',
                                map: map
                            });
                            mass.on('mouseover', function(e) {
                                marker.setPosition(e.data.lnglat);
                                marker.setLabel({
                                    content: e.data.name
                                })
                            })
                            mass.setMap(map);

                            lazyAMapApiLoaderInstance.load().then(() => {
                                this.map = map
                            });

                        } else {
                            this.haveMap = true;
                        }

                    }
                });
            },
            beidouSearch: function(){
                let params = {
                    Id : this.data.Id,
                    VehicleNumber: this.data.Vehicle_VehicleNumber,
                    Start:this.data.BeidouStart,
                    End:this.data.BeidouEnd
                };
                this.handleSpinShow();
                Http.beidouSearch(params).then(res => {
                    if (res.StatusCode == 1) {
                        this.data.IsHaveWithBeidouData = true;
                        this.beidouList();
                    }else{
                        this.bdErrorMsg = res.Message
                        this.handleSpinHide();
                    }
                });
            },
            beidouList:function(){
                if(this.data.IsHaveWithBeidouData == true){
                    let params = {
                        Id : this.data.Id,
                    };
                    Http.beidouList(params).then(res => {
                        if (res.StatusCode == 1) {
                            this.loadBDMap(res.Data.List);
                        }else{
                            this.handleSpinHide();
                            this.bdErrorMsg= "暂无车辆北斗数据！";
                        }
                    });
                }
            },
            initBeidouList:function(id){
                let params = {
                        Id : id,
                    };
                    Http.beidouList(params).then(res => {
                        if (res.StatusCode == 1) {
                            this.loadBDMap(res.Data.List);
                        }
                    });
            },
            loadBDMap: function(dataList){
                if(this.bdloading == false){
                    this.handleSpinShow();
                }
                if(dataList.length > 0){
                    let start = dataList[0];
                    let end = dataList[dataList.length - 1];
                    var marker,marker1, lineArr = dataList;

                    var map = new AMap.Map("amap-main-bd", {
                        resizeEnable: true,
                        center: start,
                        zoom: 17
                    });

                    // 创建一个 Icon
                    var startIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(25, 34),
                        // 图标的取图地址
                        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(135, 40),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(-9, -3)
                    });
                    // 创建一个 icon
                    var endIcon = new AMap.Icon({
                        size: new AMap.Size(25, 34),
                        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                        imageSize: new AMap.Size(135, 40),
                        imageOffset: new AMap.Pixel(-95, -3)
                    });


                    marker = new AMap.Marker({
                        map: map,
                        position: start,
                        icon: startIcon,
                        offset: new AMap.Pixel(-13, -30),
                        autoRotation: true
                    });
                    marker1 = new AMap.Marker({
                        map: map,
                        position: end,
                        icon: endIcon,
                        offset: new AMap.Pixel(-13, -30),
                        autoRotation: true
                    });

                    // 绘制轨迹
                    var polyline = new AMap.Polyline({
                        map: map,
                        path: lineArr,
                        showDir:true,
                        strokeColor: "#28F",  //线颜色
                        // strokeOpacity: 1,     //线透明度
                        strokeWeight: 6,      //线宽
                        // strokeStyle: "solid"  //线样式
                    });

                    map.setFitView();
                    this.handleSpinHide();
                }else{
                    this.data.IsHaveWithBeidouData = false;
                    this.bdErrorMsg = "暂无车辆北斗数据！";
                    this.handleSpinHide();
                }
                
            },
            changeTabState: function(state) {
                index = state;
            },
            handleSpinShow () {
                this.bdloading = true;
                this.$Spin.show();
            },
            handleSpinHide() {
                this.bdloading = false;
                this.$Spin.hide();
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "./showMoreTab.scss";
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>