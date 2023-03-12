<template>
  <div
    class="warning-bar"
    :class="href&&'can-click'"
    @click="open"
  >
    <el-icon>
      <warning-filled />
    </el-icon>
    <span>
      {{ title }}
    </span>
  </div>
</template>
<script setup>
import { WarningFilled } from '@element-plus/icons-vue'
const prop = defineProps({
  title: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  }
})

const open = () => {
  if (prop.href) {
    window.open(prop.href)
  }
}
</script>

