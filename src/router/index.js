import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const baseRoute = [
  {
    path: '/account/register',
    component: () => import('@/views/account/register'),
    hidden: true,
  },

  {
    path: '/account/code',
    component: () => import('@/views/account/code'),
    hidden: true,
  },

  {
    path: '/account/login',
    component: () => import('@/views/account/login'),
    hidden: true,
  },

  {
    path: '/logout',
    component: () => import('@/views/account/logout'),
    hidden: true,
  },

  {
    path: '/index',
    component: () => import('@/layout/Index'),
    children: [
      {
        path: '',
        name: '首页',
        component: () => import('@/views/index/index'),
      }
    ],
    hidden: true,
  },
  {
    path: '/order',
    component: () => import('@/layout/Index'),
    children: [
      {
        path: '',
        name: '订单',
        component: () => import('@/views/order/index'),
      }
    ],
    hidden: true,
  },
  {
    path: '/discover',
    component: () => import('@/layout/Index'),
    children: [
      {
        path: '',
        name: '发现',
        component: () => import('@/views/discover/index'),
      }
    ],
    hidden: true,
  },
  {
    path: '/mine',
    component: () => import('@/layout/Index'),
    children: [
      {
        path: '',
        name: '我的',
        component: () => import('@/views/mine/index'),
      },
      {
        path: '/mine/item/add',
        name: '添加商品',
        component: () => import('@/views/mine/item/add'),
      },
    ],
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
  },

  {
    path: '/',
    redirect: '/index',
    hidden: true,
  },
];
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRoute,
});