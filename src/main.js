// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import store from './store/index.js'
import tools from './util/tools.js'
import AMap from 'vue-amap';
import * as echarts from 'echarts';
import VueMuuri from 'vue-muuri';
import 'vue-muuri/dist/vue-muuri.css';

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(tools);
Vue.use(AMap);
Vue.use(VueMuuri);

Vue.prototype.$echarts = echarts

AMap.initAMapApiLoader({
    key: 'bd8a2cae5048214a8f8f5c716a3e0af7', //刚刚开发者申请哪里的key
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});



// request拦截器
axios.interceptors.request.use(
        config => {
            config.headers.Authorization = `${store.state.token}`;
            return config;
        },
        error => {
            iView.Message.error({ content: "加载超时", duration: 3 });
            return Promise.reject(error);
        }
    )
    // response拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    store.commit('logout');
                    localStorage.removeItem("username");
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    router.replace({ name: "LoginPage" })
                    iView.Message.error({ content: "账号无效,请重试", duration: 3 });
                    break;
                case 403:
                    iView.Message.error({ content: "账号无权限，请重试", duration: 3 });
                    break;
            }
            // iView.Message.error({ content: "请求错误", duration: 3 });
        }
        return Promise.reject(error.response)
    }
)




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})