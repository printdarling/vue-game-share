<script >

import Header from "../components/user/header.vue";
import Aside from "../components/user/aside.vue";
import GameInfo from "../components/user/gameInfo.vue";
import axios from "axios";

export default {
  components:{
    Header,
    Aside,
    GameInfo
  },
  emits: ['forceUpdate'],
  data() {
    return {
      score: JSON.parse(localStorage.getItem("login_info")).score
    }
  },
  methods: {
    update(score) {
      this.score = score;
    },
    getIpInfo(){
      axios({
        url:'https://api.vvhan.com/api/getIpInfo',
        method:'get',
      }).then(res => {
        console.log(res.data)
        this.$notify({title:'欢迎您！',
          message:('来自'+res.data.info.city+'的朋友~'),
          position: 'bottom-left'
        })
      })
    }
  },
  created() {
    this.getIpInfo()
    if (JSON.parse(localStorage.getItem("login_info")) == null){
      this.$message.error("未登录！！")
      this.$router.push("/")
    }
  }
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
          <el-main class="main" style="overflow: hidden">
            <router-view @force-update="update"></router-view>
          </el-main>
          <el-aside width="20%" style="height: 97vh">
            <Aside :new-score="score"></Aside>
          </el-aside>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
Header{
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
}
Aside{
  position: fixed;
  right: 10px;
  top: 70px;
}
</style>
