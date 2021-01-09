import request from '@/utils/http'


export function login (data) {
  return request({
    url: '/sso/login',
    method: 'post',
    data
  })
}

export function findPass (code, data) {
  return request({
    url: '/user/findPass/' + code,
    method: 'post',
    data
  })
}

export function userMail (data) {
  return request({
    url: '/mail/userMail',
    method: 'post',
    data
  })
}


export function register (code, data) {
  return request({
    url: '/user/register/' + code,
    method: 'post',
    data
  })
}

export function modPass (data) {
  return request({
    url: '/user/modPass',
    method: 'post',
    data
  })
}

export function updInfo (data) {
  return request({
    url: '/user/data/upd',
    method: 'post',
    data
  })
}

export function queryById (id) {
  return request({
    url: '/user/queryById/' + id,
    method: 'post'
  })
}

export function queryData (data) {
  return request({
    url: '/user/queryData',
    method: 'post',
    data
  })
}