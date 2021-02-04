import request from '@/utils/http'


export function saveOrUpdateBoke (oper, data) {
  return request({
    url: '/boke/data/' + oper,
    method: 'post',
    data
  })
}

export function queryBokeById (id) {
  return request({
    url: '/boke/queryById/' + id,
    method: 'post'
  })
}


export function queryBokes (data) {
  return request({
    url: '/boke/queryData',
    method: 'post',
    data
  })
}