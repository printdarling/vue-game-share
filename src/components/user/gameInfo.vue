<template>
  <!--主内容-->
  <div class="container">
    <div class="top-box">
      <img src="https://ys.mihoyo.com/main/_nuxt/img/37207c1.jpg" alt="">
    </div>
    <div class="bottom-box">
      <h4>游戏名称:</h4>
      <h2>{{game.tittle}}</h2>
      <h4>游戏描述：</h4>
      <p>{{game.description}}</p>
    </div>
    <el-button type="primary">获取链接</el-button>
    <br><br><hr><br>
    <div v-if="isShow">
      <el-button type="success">百度网盘</el-button>
      <el-button type="success">阿里云盘</el-button>
      <el-button type="success">夸克网盘</el-button>
      <el-button type="success">其他链接</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      id:'',
      isShow:true,
      game:{}
    }
  },
  created() {
    // this.id = JSON.parse(localStorage.getItem("gameId"));
    this.id = this.$route.query.id;
    // console.log("获取到游戏id: "+this.id)
    console.log("获取到游戏id: "+this.$route.query.id)
    axios({
      method: 'post',
      url: '/showGameById',
      params:{
        id:this.id
      }
    }).then(res => {
      // console.log(res.data.data)
      this.game = res.data.data
    })
  },
  unmounted() {
    localStorage.removeItem("gameId");
  },
  methods:{

  }
}
</script>

<style scoped>
.container{
  width: 70%;
}
.top-box img{
  width: 800px;
  height: 400px;
  margin: 0 auto;
}
</style>