<script>

import Headers from "../components/admin/header.vue";
import Asides from "../components/admin/aside.vue";

export default {
  components:{
    Headers,Asides
  },
  created() {
    if (JSON.parse(localStorage.getItem("login_info")).role !== 1){
      this.$message.error("非管理员！！")
      this.$router.push("/allGames")
    }
  }
}
</script>

<template>
  <div class="index">
    <div class="common-layout">
      <el-container>
        <el-header style="padding: 0">
          <Headers></Headers>
        </el-header>
        <el-container>
          <el-aside width="200px" style="height: 97vh">
            <Asides></Asides>
          </el-aside>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.index{
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
Header{
  margin-bottom: 10px;
}
</style>