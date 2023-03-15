import { request } from '@/utils/request.js'

export default {
  /**
   * 获取角色分页列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: 'systemRole/getSystemRoleList',
      method: 'get',
      params
    })
  },

  /**
   * 获取角色列表
   * @returns
   */
  getList(params = {}) {
    return request({
      url: 'systemRole/getSystemRoleList',
      method: 'get',
      params
    })
  },

  /**
   * 通过角色获取菜单
   * @returns
   */
  getMenuByRole(data = {}) {

    return request({
      url: 'systemRole/getMenuAuthority' ,
      method: 'post',
      data
    })
  },

  /**
   * 通过角色获取部门
   * @returns
   */
  getDeptByRole(id) {
    return request({
      url: 'system/role/getDeptByRole/' + id,
      method: 'get'
    })
  },

  /**
   * 从回收站获取角色
   * @returns
   */
  getRecyclePageList(params = {}) {
    return request({
      url: 'system/role/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 添加角色
   * @returns
   */
  save(data = {}) {
    return request({
      url: 'systemRole/createSystemRole',
      method: 'post',
      data
    })
  },

  /**
   * 移到回收站
   * @returns
   */
  deletes(data) {
    return request({
      url: 'systemRole/deleteSystemRoleByIds',
      method: 'delete',
      data
    })
  },

  /**
   * 恢复数据
   * @returns
   */
  recoverys(data) {
    return request({
      url: 'system/role/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除
   * @returns
   */
  realDeletes(data) {
    return request({
      url: 'system/role/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更新数据
   * @returns
   */
  update(id, data = {}) {
    return request({
      url: 'systemRole/updateSystemRole',
      method: 'put',
      data
    })
  },

  updateMenuPermission( data) {
    return request({
      url: 'systemRole/addMenuAuthority',
      method: 'post',
      data
    })
  },

  /**
   * 数字运算操作
   * @returns
   */
  numberOperation(data = {}) {
    return request({
      url: 'systemRole/role/numberOperation',
      method: 'put',
      data
    })
  },

  updateDataPermission(id, data) {
    return request({
      url: 'system/role/dataPermission/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 更改角色状态
   * @returns
   */
  changeStatus(params = {}) {
    return request({
      url: 'systemRole/role/changeStatus',
      method: 'put',
      data: params
    })
  }

}
