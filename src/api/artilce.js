/**
 * 封装文章管理模块
 * 对文章的一些操作
 */

import ajax from '../utils/request'

// 获取文章列表
export const getArticles = (queryObj) => {
  return ajax({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: queryObj
  })
}
// 删除文章
export const delArticle = target => {
  return ajax({
    method: 'delete',
    url: '/mp/v1_0/articles/' + target
  })
}
// 获取文章频道
export const getChannels = () => {
  return ajax({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}
