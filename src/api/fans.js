/**
 * 粉丝管理: 粉丝管理模块
 */

import ajax from '@/utils/request'

/**
  * 获取粉丝列表
  * @param {*} page 当前页码
  * @param {*} per_page 每页显示条数
*/
export const getFollowers = (page, per_page) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params: {
      page,
      per_page
    }
  })
}

/**
 * 获取粉丝统计数据
 * @param {*} page 当前页码
 * @param {*} per_page 每页显示条数
 */
export const getStatistics = (page, per_page) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/statistics/followers',
    params: {
      page,
      per_page
    }
  })
}
