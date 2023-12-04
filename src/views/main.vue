<template>
  <div>
    <Header></Header>
    <MainGameList></MainGameList>
  </div>
</template>


<script>
  import Header from '../components/user/header/header.vue'
  import MainGameList from '../components/user/main/main_gamelist.vue'
  export default {
    data(){
      return{

      }
    },
    components:{
      Header,
      MainGameList
    }
  }
</script>

<style scoped>

</style>