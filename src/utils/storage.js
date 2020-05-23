/**
 * 对用户信息进行本地存储的一些操作
 * 专门用来处理用户信息本地持久化---localStorage
 */
const KEY = 'hm-tt-pc-userinfo'

/**
 * 将用户信息存到localStorage
 * @param {*} user
 */
const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

/**
 * 从localStorage中获取用户信息
 */
const getUser = () => {
  return JSON.parse(localStorage.getItem(KEY)) || {}
}

/**
 * 从localStorage中删除用户信息
 */
const delUser = () => {
  localStorage.removeItem(KEY)
}

export { setUser, getUser, delUser }
