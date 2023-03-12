import { request } from '@/utils/request.js'

export default {
  /**
   * 获取代码生成列表
   * @returns
   */
  getPageList (params = {}) {
    return request({
      url: 'settingGenerateTables/getSettingGenerateTablesList',
      method: 'post',
      params
    })
  },

  /**
   * 删除
   * @returns
   */
  deletes (data) {
    return request({
      url: 'settingGenerateTables/deleteSettingGenerateTablesByIds',
      method: 'delete',
      data
    })
  },

  /**
   * 编辑生成信息
   * @returns
   */
  update (data = {}) {
    return request({
      url: 'settingGenerateTables/updateSettingGenerateTables',
      method: 'post',
      data
    })
  },
  //读取表记录
  readTable (params = {}) {
    return request({
      url: 'settingGenerateTables/findSettingGenerateTables',
      method: 'get',
      params
    })
  },

  /**
   * 生成代码
   * @returns
   */
  generateCode (data = {}) {
    return request({
      url: 'autoCode/beforeCreateTemp',
      method: 'post',
      responseType: 'blob',
      data,
    })
  },

  /**
   * 装载数据表
   * @returns
   */
  loadTable (data = {}) {
    return request({
      url: 'settingGenerateTables/loadTable',
      method: 'post',
      data
    })
  },
  /**
   * 装载数据表
   * @returns
   */
  saveTable (data = {}) {
    return request({
      url: 'settingGenerateTables/createSettingGenerateTables',
      method: 'post',
      data
    })
  },

  /**
   * 同步数据表
   * @returns
   */
  sync (data) {
    return request({
      url: 'settingGenerateTables/sync/' + data,
      method: 'put'
    })
  },

  /**
   * 预览代码
   * @returns
   */
  preview (params = {}) {
    return request({
      url: 'settingGenerateTables/preview',
      method: 'get',
      params
    })
  },

  // 获取表中字段信息
  getTableColumns(params = {}) {
    return request({
      url: 'settingGenerateColumns/getColumnsByTableId',
      method: 'get',
      params
    })
  },

  // 获取所有模型
  getModels() {
    return request({
      url: 'settingGenerateTables/getModels',
      method: 'get',
    })
  },
  createTemp(){
    return request({
      url: '/autoCode/createTemp',
      method: 'post',
      data,
      responseType: 'blob'
    })
  }
}
