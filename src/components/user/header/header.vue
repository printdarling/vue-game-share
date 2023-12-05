<template>
  12366
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
  >
    <el-menu-item index="gamelist">首页</el-menu-item>
    <el-menu-item index="2">免费游戏</el-menu-item>
    <el-menu-item index="3">积分游戏</el-menu-item>

    <el-menu-item @click="logout">注销</el-menu-item>
    <el-menu-item index="/admin/main">后台管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      localStorage.removeItem("login_info")
      sessionStorage.removeItem("id")
      this.$message.success("注销成功！")
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>