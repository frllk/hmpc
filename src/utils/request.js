/**
 * 基于 axios 封装 请求模块
 */
// 创建axios的实例
// 可以写自己的配置项  http://www.axios-js.com/docs/#axios-create-config
import axios from 'axios'

import { getUser } from './storage'

const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 'https://some-domain.com/api/'
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
