/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 09:53:05
 * @LastEditTime: 2022-09-16 10:56:29
 * @LastEditors: lc
 */
import axios from "axios"
import router from "../router"
import {
  ElMessage
} from "element-plus"
window.axiosCancel = {} // 全局定义一个存放取消请求的标识
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
let is401 = false
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  })
}
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = response => {
  const {
    status,
    data
  } = response
  console.log(data)
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      if (is401) {
        setTimeout(() => {
          is401 = false
        }, 1000)
        return false
      }
      is401 = true

      sessionStorage.removeItem("token")
      ElMessage.error(data.message || "账号token过期，请重新登录账号")
      setTimeout(() => {
        toLogin()
      }, 1000)

      break
    case 403:
      ElMessage.error(data.message || "您没有相关权限")
      break
    case 404:
      ElMessage.error(data.message || "请求的资源不存在")
      break
    case 500:
      if (data.message != "接口调用失败") {
        ElMessage.error(data.message)
      } else {
        ElMessage.error(data.message || "请求的资源不存在")
      }
      break
    default:
      ElMessage.error(data.message)
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 30,
})
instance.cacheData = {}
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=utf-8"

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    let token = sessionStorage.getItem("token")
    if (token) {
      config.headers.Authorization = "Bearer " + token
    } else {
      delete config.headers.Authorization
    }
    let province = sessionStorage.getItem("province")
    config.headers.Province = province
    // 添加取消标记
    config.cancelToken = new axios.CancelToken(cancel => {
      config.symbol = Symbol("sequence")
      window.axiosCancel[config.symbol] = cancel
    })
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  response => {
    delete window.axiosCancel[response.config.symbol]
    if (response.status === 200) {
      if (response.config.headers.cahceName) {
        instance.cacheData[response.config.headers.cahceName] =
          Promise.resolve(response)
      }
      if (response.data.code != 200) {
        errorHandle(response)
      }
      return Promise.resolve(response)
    } else {
      const code = response.status
      if (code === 201) {
        const config = response.config
        const token = response.data.data.token
        if (!isRefreshing) {
          isRefreshing = true
          sessionStorage.setItem("token", token)
          config.headers["X-Token"] = token
          config.baseURL = ""
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach(cb => cb(token))
          requests = []
          isRefreshing = false
          return instance(config)
        } else {
          // 正在刷新token，将返回一个未执行resolve的promise
          return new Promise(resolve => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push(token => {
              config.baseURL = ""
              config.headers["X-Token"] = token
              resolve(instance(config))
            })
          })
        }
      } else {
        return Promise.resolve(response)
      }
    }
    // (res.status === 200 ? Promise.resolve(res) : Promise.reject(res))
  },
  // 请求失败
  error => {
    // 判断是否因为切换路由清除请求
    if (error.message === "closeAllaxios") {
      // console.log('清除请求')
    } else if (error.message === "取消请求") {
      // 取消请求
      return Promise.reject(error)
    } else {
      const {
        response
      } = error
      if (response) {
        try {
          // 异常提示
          delete window.axiosCancel[response.config.symbol]
          errorHandle(response)
        } catch (e) {}
        const {
          data
        } = response
        return Promise.resolve(response)
        // throw new Error('12')
      }
    }
  }
)

export default instance