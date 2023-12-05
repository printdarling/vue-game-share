<script>
import Header from "../components/admin/header.vue";
import Aside from "../components/admin/aside.vue";

export default {
  components:{Header,Aside}
}
</script>

<template>
  <div class="index">
    <div class="common-layout">
      <el-container>
        <el-header style="padding: 0">
          <Header></Header>
        </el-header>
        <el-container>
          <el-aside width="200px" style="height: 97vh">
            <Aside></Aside>
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

</style>