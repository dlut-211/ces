import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index.js';
Vue.use(Vuex);
// 记录用户信息
const state = {
    username:"",    //存储用户name
    token:"",   //存储用户token
    id:"",  //存储用户id
    limit:"",   //权限
    role:"",     // 用户角色类型
    home:'',
    roles:"",
    breadCrumb:[],
    activeName:"",  //左侧导航二级页面的选中状态  固定写法 如:1-1
    openName:[''],     //左侧导航一级页面的选中状态  固定写法 格式为数组 如 ['1']
    customService:false,  //客服组件是否显示
    classroomId:"",//存储课堂的id
    actionList: {},
    visitedviews:[]
}

const getters = {
    roles:function(state){
        return state.roles;
    },
    username:function(state){
        return state.username;
    },
    breadCrumb:function(state){
        return state.breadCrumb;
    },
    activeName:function(state){
        return state.activeName;
    },
    openName:function(state){
        return state.openName;
    },
    customService:function(state){
        return state.customService;
    },
    token:function(state){
        return state.token;
    },
    id:function(state){
        return state.id;
    },
    role:function(state){
        return state.role;
    },
    home:function(state){
        return state.home;
    },
    userInfo:function(state){
        return state;
    },
    actionList:function(state){
        return state.actionList;
    },
    getPermission:function(state,page){
        for(let i=0;i<state.actionList.length;i++){
            if(state.actionList[i].Route==page){
                return true;
            }
        }
    },
    visitedviews:state => state.tagsview.visitedviews
}

const mutations = {
    changeBreadCrumb:function(state,arr){
        state.breadCrumb = arr;
    },
    changeActiveName:function(state,activeName){
        state.activeName = activeName;
    },
    changeOpenName:function(state,openName){
        state.openName = openName;
    },
    changeCustomService:function(state,isOpen){
        state.customService = isOpen;
    },
    logout:function(state){
        state.username="";
        state.token="";   //存储用户token
        state.limit="";   //权限
        state.breadCrumb=[];
        state.activeName="";  //左侧导航二级页面的选中状态  固定写法 如=1-1
        state.openName=[''];     //左侧导航一级页面的选中状态  固定写法 格式为数组 如 ['1']
        state.customService=false;  //客服组件是否显示
    },
    changeActionList:function(state,actionList){
        let arr = [];
        let obj = {};
        for(let i=0;i<actionList.length;i++){
            for(let j =0;j<actionList[i].Childs.length;j++){
                arr.push(actionList[i].Childs[j]);
            }
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i].Childs.length==0){
                obj[arr[i].Route] = {};
                for(let j=0;j<arr[i].Operations.length;j++){
                    let that = obj[arr[i].Route];
                    that[arr[i].Operations[j].Code] = true;
                }
            }
            else{
                    obj[arr[i].Route] = {};
                for(let j=0;j<arr[i].Childs.length;j++){
                    let that = obj[arr[i].Route];
                    that[arr[i].Childs[j].Code] = {};
                    for(let k=0;k<arr[i].Childs[j].Operations.length;k++){
                        let those = that[arr[i].Childs[j].Code];
                        those[arr[i].Childs[j].Operations[k].Code] = true;
                    }
                }
            } 
        }
        state.actionList = obj;
    },
    ADD_VISITED_VIEWS:(state,view)=>{//打开新页签--添加路由数据的方法      if(state.visitedviews.some(v=>v.path==view.path))return;
        let flag = state.visitedviews.some(
            item => item.path === view.path
        );//打开标签后，判断数组中是否已经存在该路由
        if (!flag) {
            state.visitedviews.push({
                name:view.name,
                path:view.path,
                title:view.meta.title || 'no-title'
            })
        }
    },
    DEL_VISITED_VIEWS:(state,view)=>{//关闭页签--删除路由数据的方法
      for(let [i,v] of state.visitedviews.entries()){
        if(v.path == view.path){
          state.visitedviews.splice(i,1)
          break
        }
      }
    }
    // 改变用户
}

const actions = {
    addVisitedViews({commit},view){//通过解构赋值得到commit方法
        commit('ADD_VISITED_VIEWS',view)//去触发ADD_VISITED_VIEWS，并传入参数
    },
    delVisitedViews({commit,state},view){
      return new Promise((resolve)=>{
        commit('DEL_VISITED_VIEWS',view);
        resolve([...state.visitedviews]);
      })
    }
}


export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})