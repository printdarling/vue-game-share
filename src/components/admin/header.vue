<template>
<p><a href="网站首页"></a></p>
  <p>用户名: {{userName}}</p>
</template>

<script>
export default {
  data(){
    return{
      userName:''
    }
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem("login_info")).userName
  }
}
</script>


<style scoped>

</style>