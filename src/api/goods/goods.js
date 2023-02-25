import request from '../../util/request'

export function addGoods() {
  return request({
    url: '/api/goods/addGoods',
    method: 'post'
  })
}
