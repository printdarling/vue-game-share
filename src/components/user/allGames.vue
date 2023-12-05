<script>
import axios from "axios";

export default {
  data(){
    return{
      games:[]
    }
  },
  methods:{

  },
  mounted() {
    axios({
      method: 'post',
      url: '/getAllGamesByPage',
      data: {}
    }).then(res => {
      this.games = res.data.data
    })
  }
}
</script>

<template>
  <div class="main">
    <a class="small-box" href="" v-for="game in games" :key="game.id">
      <div class="box-left">
        <img src="https://ys.mihoyo.com/main/_nuxt/img/37207c1.jpg" alt="">
      </div>
      <div class="box-right">
        <p class="title">{{game.tittle}}</p>
        <p class="description">描述：45545454cbdbcjscbdsbccksdncndskcndnncjsdn5454545454......</p>
        <p class="prince">积分：{{game.prince}}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.main{
  margin-top: 75px;
}
a.small-box {
  display: block;
  border: 1px solid rgb(210, 210, 210);
  width: 70%;
  height: 150px;
  margin: 20px auto auto 0;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 18px 18px 30px rgba(0,0,0, 0.2),
  -18px -18px 30px rgba(255,255,255, 1);
  /* 过渡 */
  transition: all .2s ease-out;
}

a.small-box:hover{
  cursor: pointer;
  box-shadow: 0 0 0 rgba(0,0,0, 0.2),
  0 0 0 rgba(255,255,255, 0.8),
  inset 18px 18px 30px rgba(0,0,0,0.1),
  inset 18px -18px 30px rgba(255,255,255, 1);
}

.box-left {
  float: left;
  width: 26%;
  height: 150px;
  border-radius: 5px;
}
.box-left img {
  width: 200px;
  height: 120px;
  line-height: 120px;
  margin-top: 14px;
  border: 2px solid rgb(220, 156, 133);
  margin-left: 20px;
}

.box-right {
  float: right;
  height: 150px;
  margin-right: 10px;
  width: 65%;
  border-radius: 5px;
}

.box-right p.title {
  margin-top: 15px;
  color: black;
  font-size: 28px;
  font-weight: 600;
}
.box-right p.description {
  margin-top: 15px;
  color: black;
}

.box-right p.prince {
  color: black;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 16px;
  text-align: right;
  font-weight: 600;
}
</style>