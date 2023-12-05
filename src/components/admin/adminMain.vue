<template>
  <div>用户总数: {{totalUser}}人</div>
  <div>游戏总数: {{totalGames}}</div>
</template>

<script>
export default {
  data() {
    return {
      totalUser: 0,
      totalGames: 0
    }
  },
  created() {
    this.totalUser = 100
    this.totalGames = 200
  }
}
</script>

<style scoped>
div{
  width: 400px;
  height: 200px;
  background-color: lawngreen;
  float: left;
  margin: 10px;
  border-radius: 10px;
}
</style>