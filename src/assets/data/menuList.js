/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-08-15 15:32:25
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 14:10:45
 */
const menuData = [{
  id: "home",
  name: "Dashboard",
  img: '/videoCloud/vc_logo',
  children: [{
    id: "dashboard",
    name: "主页",
    img: '/videoCloud/device_management',
    route: '/dashboard',
  }, ],
}, {
  id: "tablePage",
  name: "表格",
  img: '/videoCloud/vc_logo',
  children: [{
    id: "table",
    name: "表格页面",
    img: '/videoCloud/device_management',
    route: '/table',
  }, ],
}, {
  id: "formPage",
  name: "表单",
  img: '/videoCloud/vc_logo',
  children: [{
    id: "form",
    name: "表单页面",
    img: '/videoCloud/device_management',
    route: '/form',
  }, ],
}]
export {
  menuData,
}