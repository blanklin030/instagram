import Vue from 'vue';
import cookie from './cookie';

const TokenKey = 'MIAOSHA_AS_SUB_TICKET';
const UIDKey = 'MIAOSHA_AS_UID';

// 初始化信息
export const DefaultUser = {
  login: false,
  token: 'ggsdfgasfasfashfshdfgjhgfsa',
  username: 'linyu',
};

export default {
  getUserInfo() {
    let userInfo = {};
    // get user from session
    if (sessionStorage.getItem('user')) {
      try {
        const tmp = String(sessionStorage.getItem('user'));
        userInfo = { ...JSON.parse(tmp) };
      } catch (error) {
        new Vue().$message({
          showClose: true,
          message: error,
          type: 'error',
          duration: 0,
        });
      }
    }
    return userInfo;
  },
  clearStorage() {
    sessionStorage.removeItem('user');
    cookie.remove(TokenKey);
    cookie.remove(UIDKey);
  },
  getToken() {
    return cookie.get(TokenKey);
  },
  setToken(value) {
    return cookie.set(TokenKey, value);
  },
  getUID() {
    return cookie.get(UIDKey);
  },
  setUID(value) {
    return cookie.set(UIDKey, value);
  },
};
