/**
 * 基于 axios 封装 请求模块
 */
// 创建axios的实例
// 可以写自己的配置项  http://www.axios-js.com/docs/#axios-create-config
import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
export default instance
