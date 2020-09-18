import Request from '../assets/utils/request';
import userTool from '../assets/utils/user';
import { Toast } from 'mint-ui';

export default {
  register(params) {
    return Request.Post('/user/register', params);
  },

  checkCode(code,telephone) {
    return Request.Post('/user/check', {captcha: code,telephone});
  },

  login(name, password) {
    return Request.Put('/user/login?name=' + name + '&password=' + password );
  },

  logout(username) {
    return Request.Put('/user/logout', { username });
  },

  getCode(telephone) {
    return Request.Get('/user/code?telephone=' + telephone);
  },

  getInfo() {
    const token = userTool.getToken() || null
    if (!token) {
      Toast({
        message: '非法操作！请先登陆！',
      })
      window.location.href = '/#/account/login'
      return false
    }
    return Request.Get('/user/info');
  },

  edit(params) {
    return Request.Put('/user/edit', params);
  },

  getList(page, size) {
    return Request.Get(`/user/list?page=${page}&size=${size}`);
  },

};
