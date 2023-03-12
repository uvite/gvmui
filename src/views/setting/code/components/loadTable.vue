<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://gitee.com/xmo/mineadmin-vue
-->
<template>
  <a-modal width="1000px" v-model:visible="visible" :on-before-ok="loadTable" :align-center="false" top="50px">
    <template #title>装载数据表</template>

    <a-form :model="dbform" :style="{ width: '600px' }">
      <a-form-item field="name" tooltip="Please enter username" label="选择库">
        <a-select v-model="dbform.dbName" :style="{width:'320px'}" placeholder="Please select ..."
                  @change="getTableFunc">
          <a-option v-for="item in dbOptions"
                    :key="item.database"
                    :label="item.database"
                    :value="item.database">
          </a-option>
        </a-select>

      </a-form-item>
    </a-form>

    <a-table
        :columns="columns"
        :data="form.noData ? [] : tableData"
        :bordered="form.border"
        :hoverable="form.hover"
        :stripe="form.stripe"
        :loading="form.loading"
        :show-header="form.tableHeader"

        row-key="table_name"
        row-selection="rowSelection"
        @selection-change="setSelecteds"
    />

    <!-- CRUD 组件 -->
    <!--    <ma-crud :options="crud"  :tableData="tableData" :columns="columns" ref="crudRef" @selection-change="handlerSelection"></ma-crud>-->
  </a-modal>
</template>

<script setup>
import {ref, reactive} from 'vue'
import dataMaintain from '@/api/system/dataMaintain'
import generate from '@/api/setting/generate'
import {Message} from '@arco-design/web-vue'
import {getDB, getTable} from "@/api/autoCode";

const crudRef = ref()
const selecteds = ref([])
const visible = ref(false)
const emit = defineEmits(['success'])
const dbform = ref({
  businessDB: '',
  dbName: '',
  table_name: ''
})

const form = reactive({
  border: true,
  borderCell: false,
  hover: true,
  stripe: false,
  checkbox: true,
  loading: false,
  tableHeader: true,
  noData: false
});


const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});


const setSelecteds = (key) => {
  selecteds.value = key
}
const loadTable = async (done) => {

  if (selecteds.value.length < 1) {
    Message.info('至少要选择一条数据')
    done(false)
    return
  }
  let names = []
  console.log("selecteds.value",selecteds.value)
  tableData.value.filter(item => {
    console.log(item)
    if (selecteds.value.includes(item.table_name)) {
      names.push({table_name: item.table_name, table_comment: item.table_comment})
    }
  })


  const response = await generate.saveTable({
    database:dbform.value.dbName,
    tables:names,
  })

  emit('success', response.success)
  selecteds.value = []
  done(true)
}

const handlerSelection = (name) => selecteds.value = name

const open = () => {
  visible.value = true

}

const columns = reactive([
  {title: '表名称', dataIndex: 'table_name', search: true, width: 200},
  {title: '表注释', dataIndex: 'table_comment', width: 180},
  {title: '创建时间', dataIndex: 'create_time', width: 180},
])


const dbList = ref([])
const dbOptions = ref([])
const tableData = ref([])

const getDbFunc = async () => {
  dbform.value.dbName = ''
  dbform.value.table_name = ''
  const res = await getDB({businessDB: dbform.value.businessDB})
  if (res.code === 0) {
    dbOptions.value = res.data.dbs
    dbList.value = res.data.dbList
  }
}
const getTableFunc = async () => {
  const res = await getTable({businessDB: dbform.value.businessDB, dbName: dbform.value.dbName})
  if (res.code === 0) {
    let data = res.data?.tables

    for (var i = 0; i < data.length, i++;) {
      data[i]["key"] = String(i)
    }

    tableData.value = data
  }
  dbform.value.table_name = ''
}
const init = () => {
  getDbFunc()
  // setFdMap()
  // getPkgs()
  // const id = route.params.id
  // if (id) {
  //   getAutoCodeJson(id)
  // }
}
init()
defineExpose({open})
</script>
