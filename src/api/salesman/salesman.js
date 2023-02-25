import request from '../../util/request'

export function addID () {
  return request({
    url: '/api/salesman/addID',
    method: 'post'
  })
}
