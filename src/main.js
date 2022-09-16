/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-09-16 10:15:58
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:14:37
 */

import {
    createApp
} from 'vue'
import router from "./router";
import App from './App.vue'
import ElementPlus from 'element-plus'
import "assets/css/common.scss";
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
// import {
//     scrollX,
//     debounce
// } from 'utils/direction'
const app = createApp(App)
app.use(router).use(ElementPlus, {
    locale
}).mount('#app')

import * as echarts from 'echarts'
import api from 'api/apiList.js'
app.provide('$api', api)
app.provide('$echarts', echarts)

// element 全局变量修改
app.component('ElDialog').props.closeOnClickModal.default = false // 点击蒙版不关闭
app.component('ElDialog').props.destroyOnClose.default = true // 关闭时销毁弹窗内容
app.component('ElDialog').props.draggable.default = true // 弹窗可以移动
app.component('ElTable').TableColumn.props.resizable.default = false // 表格列宽不允许用户调整

// 自定义指令
// app.directive('scrollX', scrollX)
// app.directive('debounce', debounce)
