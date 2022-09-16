/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-02-15 10:21:24
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 14:08:57
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";

const routes = [{
    path: '/login',
    name: 'login',
    meta: {
      cName: '登录',
    },
    component: () => import("../views/login/index.vue"),
  },
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'dashboard'
    },
    meta: {
      cName: '首页',
    },
    component: () => import("../views/index/index.vue"),
    children: [{
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          cName: '主页',
        },
        component: () => import("../views/dashboard/index.vue"),
        children: [],
      },
      {
        path: '/table',
        name: 'table',
        meta: {
          cName: '表格',
        },
        component: () => import("../views/table/index.vue"),
        children: [],
      },
      {
        path: '/form',
        name: 'form',
        meta: {
          cName: '表单',
        },
        component: () => import("../views/form/index.vue"),
        children: [],
      },
    ],
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: {
  //     name: 'dashboard'
  //   },
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;