import store from '../../store';
import userApi from '@/api/user'
import cookie from './cookie';
import { Toast } from 'mint-ui'

const TokenKey = 'MIAOSHA_AS_SUB_TICKET';

// 初始化信息
export const DefaultUser = {
  login: false,
  token: '',
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
        Toast(error);
      }
    }
    return userInfo;
  },
  saveStorage() {
    userApi.getInfo().then((res) => {
      if (res.status === "success") {
        store.dispatch('SetUserInfo', res.data);
        sessionStorage.setItem('user', JSON.stringify(res.data))
      }
    })
  },
  clearStorage() {
    sessionStorage.removeItem('user');
    cookie.remove(TokenKey);
  },
  getToken() {
    return cookie.get(TokenKey);
  },
  setToken(value) {
    return cookie.set(TokenKey, value);
  },
};
