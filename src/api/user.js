/**
 * 封装用户相关操作
 *
 * 按需导入导出
 */
import ajax from '../utils/request'

// 用户登录
export const userLogin = ({ mobile, code }, resolve, reject) => {
  return ajax({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: { mobile, code }
  }).then(resolve).catch(reject)
}
// 获取用户信息
export const getUserProfile = () => {
  const result = ajax({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // headers: {
    //   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjE2ODgyOTQsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.wlWcNQhW9eSz4SAjqyU8zi85fZlBmQ-R6u01as61Xys'
    // }
  })
  return result
}

/**
 * 编辑用户
 * name 用户名
 * intro 头条号简介
 * email 邮箱
 * @param {*} user 编辑用户修改资料
 */
export const modUserProfile = (user) => {
  return ajax({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data: user
  })
}
/**
 * 修改用户头像
 * @param {*} photo 头像图片
 */
export const modUserPhoto = (photo) => {
  return ajax({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data: { photo }
  })
}
