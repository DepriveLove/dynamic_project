<script setup>
import { ref } from 'vue'

const dialog = ref(false)
</script>

<template>
  <el-button type="primary" @click="dialog=true">dialog</el-button>
  <el-dialog v-model="dialog" title="穿梭框" :show-close="false">
    <template #header></template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.el-dialog) {
  padding: 100px;
}
</style>
