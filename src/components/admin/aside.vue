<template>
  <div class="aside-container" >
    <el-radio-group v-model="isCollapse" >
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
    <el-menu
        default-active="/admin/main"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        router
    >
      <el-menu-item index="/admin/main">
        <el-icon><icon-menu /></el-icon>
        <template #title>后台首页</template>
      </el-menu-item>
      <el-menu-item index="/admin/users">
        <el-icon><document /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="/admin/games">
        <el-icon><setting /></el-icon>
        <template #title>游戏管理</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 97vh;
}
.aside-container{
  width: 100%;
}
</style>
