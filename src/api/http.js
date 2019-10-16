import axios from 'axios';
//axios配置
axios.defaults.timeout = 500000;
var qs = require('qs');

const handleStatus = ({status,data={}}) =>{
    console.log(status);
    if(status===200){
        return data
    }
    else if (status===401){
        return 
    }
    else{
        if(data.msg=='未授权'){
            return data
        }
        return Promise.reject(data.message)
    }
}

const handleResponse = (result) =>{
    return Promise.resolve(result);
}

export default {
    get(url, params = {}) {
      let queryString = []
      for (let key in params) {
        queryString.push(`${key}=${params[key]}`);
      }
      if (queryString.length > 0) {
        queryString = queryString.join('&')
        url += `?${queryString}`
      }
      console.info('GET请求地址：' + url)
      return axios
        .get(url)
        .then(handleStatus)
        .then(handleResponse)
        .catch(error => {
          console.log(error)
          return
        })
    },
  
    post(url, params = {}) {
      console.info('post请求地址：' + url, 'post请求参数' + JSON.stringify(params))
      return axios
        .post(url, qs.stringify(params))
        .then(handleStatus)
        .then(handleResponse)
        .catch(error => {
          console.log(error)
        })
    },
  
    put(url, params = {}) {
      return axios
        .put(url, qs.stringify(params))
        .then(handleStatus)
        .then(handleResponse)
        .catch(error => {
          console.log(error)
        })
    },
  
    putMatch(url,params={},header){
      console.log(header);
      console.log(url);
      console.log(params);
      return axios({
        method:'put',
        url:url,
        data:params,
        headers:{'If-Match':header}
      }).then(handleStatus).then(handleResponse).catch(error=>{
        console.log(error)
      })
    },

    delete(url, params = {}) {
      let queryString = []
      for (let key in params) {
        queryString.push(`${key}=${params[key]}`);
      }
      if (queryString.length > 0) {
        queryString = queryString.join('&')
        url += `?${queryString}`
      }
      console.info('DELETE请求地址：' + url)
      return axios
        .delete(url)
        .then(handleStatus)
        .then(handleResponse)
        .catch(error => {
          console.log(error)
          return
        })
    }
  }