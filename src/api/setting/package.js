import { request } from '@/utils/request.js'

export const getPackageApi = () => {
  return request({
    url: '/autoCode/getPackage',
    method: 'post'
  })
}
