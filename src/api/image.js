/**
 * 素材管理相关操作
 */
import ajax from '@/utils/request.js'
/**
 * 获取素材列表
 * 参数名称     是否必须 示例           备注
 * collect  否    true 或 false 是否是收藏的图片
 * page     否                 页数
 * per_page 否                 每页数量
 * @param {*} paramsObj 参数
 */
export const getImages = (paramsObj) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params: paramsObj
  })
}
