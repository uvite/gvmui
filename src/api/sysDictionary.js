import { request } from '@/utils/request.js'

// @Tags SysDictionary
// @Summary 创建SysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true "创建SysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysDictionary/createSysDictionary [post]
export const createSysDictionary = (data) => {
  return request({
    url: '/sysDictionary/createSysDictionary',
    method: 'post',
    data
  })
}

// @Tags SysDictionary
// @Summary 删除SysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true "删除SysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysDictionary/deleteSysDictionary [delete]
export const deleteSysDictionary = (data) => {
  return request({
    url: '/sysDictionary/deleteSysDictionary',
    method: 'delete',
    data
  })
}

// @Tags SysDictionary
// @Summary 更新SysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true "更新SysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysDictionary/updateSysDictionary [put]
export const updateSysDictionary = (data) => {
  return request({
    url: '/sysDictionary/updateSysDictionary',
    method: 'put',
    data
  })
}

// @Tags SysDictionary
// @Summary 用id查询SysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true "用id查询SysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysDictionary/findSysDictionary [get]
export const findSysDictionary = (params) => {
  return request({
    url: '/sysDictionary/findSysDictionary',
    method: 'get',
    params
  })
}


export const eplusDictionary = (params) => {
  return request({
    url: '/sysDictionary/eplusDictionary',
    method: 'get',
    params
  })
}



// @Tags SysDictionary
// @Summary 分页获取SysDictionary列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取SysDictionary列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysDictionary/getSysDictionaryList [get]
export const getSysDictionaryList = (params) => {
  return request({
    url: '/sysDictionary/getSysDictionaryList',
    method: 'get',
    params
  })
}
