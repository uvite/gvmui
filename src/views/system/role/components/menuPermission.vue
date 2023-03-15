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
  <a-modal v-model:visible="visible" @cancel="close" @before-ok="submit">
    <template #title>菜单权限</template>
    <a-form :model="form">
      <a-form-item label="角色名称" field="name">
        <a-input disabled v-model="form.name" />
      </a-form-item>
      <a-form-item label="角色标识" field="code">
        <a-input disabled v-model="form.code" />
      </a-form-item>
      <a-form-item label="菜单列表" field="menu_ids">
        <a-spin :loading="loading" tip="菜单加载中..." class="w-full">
          <div class="w-full">
            <a-space class="mt-1.5" size="large">
              <a-checkbox @change="handlerExpand">展开/折叠</a-checkbox>
              <a-checkbox @change="handlerSelect">全选/全不选</a-checkbox>
              <a-checkbox v-model="cancelLinkage" @change="handlerLinkage">关闭父子级联动</a-checkbox>
            </a-space>
            <div class="tree-container p-2">
              <ma-tree-slider
                ref="tree"
                v-model="menuList"
                checkable
                :fieldNames="{ title: 'label', key: 'id' }"
                searchPlaceholder="过滤菜单"
                v-model:checked-keys="selectKeys"
                :check-strictly="cancelLinkage"
                :virtual-list-props="{ height: 300 }"
                @click="handlerClick"
              />
            </div>
          </div>
        </a-spin>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
  import { ref } from 'vue'
  import MaTreeSlider from '@cps/ma-treeSlider/index.vue'
  import role from '@/api/system/role'
  import menu from '@/api/system/menu'
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false)
  const loading = ref(true)
  const menuList = ref([])
  const selectKeys = ref([])
  const cancelLinkage = ref(false)
  const tree = ref()
  const form = ref({ name: undefined, code: undefined })

  const emit = defineEmits(['success'])

  const open = (row) => {
    form.value = { id: row.ID, name: row.name, code: row.code }
    handlerExpand(false)
    handlerSelect(false)
    handlerLinkage(false)
    setData(row.ID)
    visible.value = true
  }

  const handlerExpand = (value) => {
    tree.value.maTree.expandAll(value)
  }

  const handlerSelect = (value) => {
    tree.value.maTree.checkAll(value)
  }

  const handlerLinkage = (value) => {
    cancelLinkage.value = value
  }

  const handlerClick = (value) => {
    const t = tree.value.maTree
    const nodes = t.getExpandedNodes().map(item => item.id )
    t.expandNode(value, nodes.includes(value[0]) ? false : true)
  }

  const setData = async (roleId) => {
    const menuResponse = await menu.tree({ scope: true })
    let Menus=menuResponse.data.menus
    console.log(menuResponse)
    let data=[]
    for(var i=0;i<Menus.length;i++){
      let childrens=Menus[i].children
      let ccs=[]
      for(var j=0;j<childrens.length;j++){
        let item={
          label:childrens[j].name,
          value:childrens[j].ID,
          id:childrens[j].ID,
          parent_id:childrens[j].parent_id,
        }
        ccs.push(item)
      }
      let item1={
        label:Menus[i].name,
        value:Menus[i].ID,
        id:Menus[i].ID,
        parent_id:Menus[i].parent_id,
        children:ccs

      }
      data.push(item1)
    }
    menuList.value = data

    const roleResponse = await role.getMenuByRole({authorityId:roleId})
    let roleMenus=roleResponse.data.menus||[]
    selectKeys.value = roleMenus?.map( item => parseInt(item.menuId))
    selectKeys.value.length > 0 && handlerLinkage(true)
    loading.value = false
  }

  const submit = async (done) => {
    const nodes = tree.value.maTree.getCheckedNodes()
    // console.log(nodes)
    // const ids = nodes.map( item => item.id )
    const response = await role.updateMenuPermission( { role_id:form.value.id,menus: nodes })
    response.success && Message.success(response.message)
    emit('success')
    done(true)
  }

  const close = () => visible.value = false

  defineExpose({ open })
</script>

<style scoped>
.tree-container {
  border: 1px solid var(--color-fill-2);
  max-height: 350px;
  padding-bottom: 8px;
  margin-top: 5px;
}
</style>
