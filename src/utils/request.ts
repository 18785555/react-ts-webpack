import axios from 'axios'
import {AXIOSTIMEOUT,AXIOSURL} from './index'

const service = axios.create({
    baseURL: AXIOSURL,
    timeout: AXIOSTIMEOUT,
  });


  //请求拦截
  service.interceptors.request.use(
    (config: any) => {
     const token = localStorage.getItem('token')
      if(token){
        config.headers={
          ...config.headers,
          // token:token
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  //响应拦截
  service.interceptors.response.use(
    // 请求成功返回数据
    res => res,
    // 请求失败
    error => {
      //网络请求出错 判断状态码做出相应的操作
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            console.error("错误请求");
            break;
          case 401:
            console.error("未授权，请重新登录");
            break;
          case 403:
            console.error("拒绝访问");
            break;
          case 404:
            console.error("请求错误，未找到该资源");
            break;
          case 405:
            console.error("请求方法未允许");
            break;
          case 408:
            console.error("请求超时");
            break;
          case 500:
            console.error("服务器端出错");
            break;
          case 501:
            console.error("网络未实现");
            break;
          case 502:
            console.error("网络错误");
            break;
          case 503:
            console.error("服务不可用");
            break;
          case 504:
            console.error("网络超时");
            break;
          case 505:
            console.error("http版本不支持");
            break;
          default:
            console.error(`连接错误${error.response.status}`);
        }
      } else {
        // 超时处理
        if (JSON.stringify(error).includes("timeout")) {
          console.error("服务器响应超时时，请刷新当前页");
        }
        console.error("连接服务器失败:",error);
      }
      // 处理结束
      return Promise.reject(error);
    }
  );

export default service