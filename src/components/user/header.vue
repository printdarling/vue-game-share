<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
  >
    <el-menu-item index="allGames">首页</el-menu-item>
    <el-menu-item index="freeGames">免费游戏</el-menu-item>
    <el-menu-item index="payGames">积分游戏</el-menu-item>

    <el-menu-item style="margin-left: 20px">
      <el-input v-model="searchText"></el-input>
      <el-button @click="searchGame" type="primary">搜索</el-button>
    </el-menu-item>

    <el-menu-item class="logout" @click="logout">注销</el-menu-item>
    <el-menu-item class="goAdmin" index="/admin/main">后台管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'allGames',
      loginUser:{},
      searchText:''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    searchGame(){
      if (this.searchText === ''){
        this.$message.error("请输入搜索内容")
      }else {
        this.$router.push({
          name: 'allGames',
          query: {
            searchText: this.searchText
          }
        })
      }
    },
    logout(){
      localStorage.removeItem("login_info")
      sessionStorage.removeItem("id")
      this.$message.success("注销成功！")
      this.$router.push('/')
    }
  },
  created() {
    this.loginUser = JSON.parse(localStorage.getItem("login_info"))
  }
}
</script>

<style scoped>
.logout{
  position: absolute;
  right: 140px;
}
.goAdmin{
  position: absolute;
  right: 10px;
}
</style>