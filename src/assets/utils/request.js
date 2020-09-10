import axios from 'axios';
import { Toast } from 'mint-ui';
import { encode } from 'base-64';
import userTool from './user';

const axiosObj = axios.create({
  baseURL: '/api',
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

axiosObj.interceptors.request.use(
  (config) => {
    // 登陆后统一修改请求头
    const userInfo = userTool.getUserInfo();
    if (userInfo.login) {
      const { token, name } = userInfo;
      config.headers.Authorization = `Basic ${encode(`${name}:${token}`)}`;
    }
    return config;
  }, (error) => Promise.reject(error),
);

axiosObj.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.status === "fail") {
      Toast({
        message: data.data.errorMessage,
        duration: 5000,
      });
    }
    return data;
  },
  (error) => {
    // 异常处理
    switch (error.response.status) {
      case 400:
        Toast({
          message: '参数异常',
          duration: 5000,
        });
        break;
      case 401:
        Toast({
          message: '登录失效，请重新登录',
          duration: 5000,
        });
        window.location.href = '/#/login';
        break;
      case 403:
        Toast({
          message: '我也不知道你为什么没有权限，请联系管理员吧',
          duration: 5000,
        });
        window.location.href = '/#/403';
        break;
      case 404:
        Toast({
          message: '找不到这个页面啦，你迷路了吧。。。',
          duration: 5000,
        });
        window.location.href = '/#/404';
        break;
      case 500:
        Toast({
          message: error.response.data.error.message,
          duration: 5000,
        });
        break;
      default:
        break;
    }
    return Promise.resolve(error);
  },
);

const Get = (uri, config = {}) => axiosObj.get(uri, config);

const Put = (uri, data = {}, config = {}) => axiosObj.put(uri, data, config);

const Post = (uri, data = {}, config = {}) => axiosObj.post(uri, data, config);

const Delete = (uri, data = {}, config = {}) => axiosObj.delete(uri, data, config);

export default {
  Get, Post, Put, Delete,
};
