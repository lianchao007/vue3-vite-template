/*
 * @Descripttion: 基础方法
 * @version: 
 * @Author: lc
 * @Date: 2022-02-15 16:11:20
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:02:30
 */

const weeklist = ['周日','周一','周二','周三','周四','周五','周六']
const addZero = (num) => {
    return num < 10 ? '0' + num : num
}
const formatDate = (time, format) => {
    let date = new Date(time)
    let newDate = format
    let year = date.getFullYear()
    let month = addZero(date.getMonth() + 1)
    let day = addZero(date.getDate())
    let hour = addZero(date.getHours())
    let min = addZero(date.getMinutes())
    let sec = addZero(date.getSeconds())
    let week = date.getDay()
    newDate = newDate.replace('yyyy', year)
    newDate = newDate.replace('MM', month)
    newDate = newDate.replace('dd', day)
    newDate = newDate.replace('hh', hour)
    newDate = newDate.replace('mm', min)
    newDate = newDate.replace('ss', sec)
    newDate = newDate.replace('ww', weeklist[week])
    return newDate
}
export default {
    weeklist,
    addZero,
    formatDate
}