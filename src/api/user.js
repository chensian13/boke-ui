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

export function findPassMail (data) {
  return request({
    url: '/mail/findPassMail',
    method: 'post',
    data
  })
}