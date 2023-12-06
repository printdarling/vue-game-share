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
          <el-aside style="margin-top: 20px">
            <Asides></Asides>
          </el-aside>
          <el-main style="background-color: #f5f6fa; margin-left: -100px">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.index{
  width: 100%;
  height: 100vh;
}
Header{
  margin-bottom: 10px;
}
</style>