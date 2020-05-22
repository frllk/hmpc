/**
 * 封装用户相关操作
 *
 * 按需导入导出
 */
import ajax from '../utils/request'
export const userLogin = ({ mobile, code }, resolve, reject) => {
  return ajax({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: { mobile, code }
  }).then(resolve).catch(reject)
}
