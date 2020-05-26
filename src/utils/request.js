/**
 * 基于 axios 封装 请求模块
 */
// 创建axios的实例
// 可以写自己的配置项  http://www.axios-js.com/docs/#axios-create-config
import axios from 'axios'
import JSONbig from 'json-bigint'

import { getUser } from './storage'

const instance = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net/'
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 如果没有遇到错误，就返回 JSONbig处理之后的数据
      return JSONbig.parse(data)
    } catch (err) {
      console.log('JSONbig转换出错', err)
      return data
    }
  }]
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

/**
 * 在请求发出去之前做一些事情---使用axios拦截器统一设置token
 * 本次请求才有统一配置：添加一个headers，设置token
 */
// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  // console.log(config)
  const userInfo = getUser()
  // console.log(userInfo)
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

export default instance
