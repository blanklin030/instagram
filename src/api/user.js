import Request from '../assets/utils/request';

export default {
  register(params) {
    return Request.Post('/user/register', params);
  },
  checkCode(code,telephone) {
    return Request.Post('/user/check', {captcha: code,telephone});
  },

  login(telephone, encryptPassword) {
    return Request.Put('/user/login', { telephone, encryptPassword });
  },

  logout(username) {
    return Request.Put('/user/logout', { username });
  },

  getCode(telephone) {
    return Request.Get('/user/code?telephone=' + telephone);
  },

  getInfo(username) {
    return Request.Get('/user/info', { username });
  },

};
