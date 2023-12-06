<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="0">
      <a href="/allGames">
        <img
            style="width: 100px"
            src="https://eimg.smzdm.com/201706/16/5943c6d14abe97035.jpg"
            alt="回首页"
        />
      </a>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item @click="logOut" index="6">{{userName}}</el-menu-item>

  </el-menu>
</template>

<script>
export default {
  data(){
    return{
      userName:''
    }
  },
  methods:{
    logOut(){
      localStorage.removeItem("login_info")
      this.$router.push("/")
    }
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem("login_info")).userName
  }
}
</script>


<style>
.flex-grow {
  flex-grow: 1;
}
</style>