import router from './index';
import whitelist from './whitelist';
import userUtil from '../assets/utils/user';

router.beforeEach((to,from,next)=>{
  const token = userUtil.getToken()
  // 已经登陆
  if (token) {
    if (to.path === '/login') {
      next('/index')
    }
    // TODO 将菜单换成后端管控
    next()
  } 
  // 在白名单中则无需登陆
  else if (whitelist.indexOf(to.path) >= 0) {
    next()
  } else {
    // 否则强制去登陆
    next(`/account/login?redirect=${to.path}`)
  }
})