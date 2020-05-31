/**
 * 评论管理：评论相关操作
 */

import ajax from '@/utils/request'
/**
 * 获取评论
 * @param {*} page 当前页码
 * @param {*} per_page 每页显示记录
 */
export const getComments = (page, per_page) => ajax({
  method: 'GET',
  url: '/mp/v1_0/articles',
  params: {
    page,
    per_page,
    response_type: 'comment'
  }
})
/**
 * 修改评论状态   打开/关闭 评论状态
 * @param {*} article_id 文章编号
 * @param {*} allow_comment 是否允许评论
 */
export const modComment = (article_id, allow_comment) => {
  return ajax({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: { article_id },
    data: { allow_comment }
  })
}
