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
      console.log(res.data.data)
    })
  }
}
</script>

<template>
  <div>
    <a class="small-box" href="" v-for="game in games" :key="game.id">
      <div class="box-left">
        <img src="" alt="">
      </div>
      <div class="box-right">
        <span>游戏名称： {{game.tittle}}</span>
        <p>游戏描述：455454545454545454</p>

        <span>积分：{{game.prince}}</span>
      </div>

      <span class="gameScore" text="444"></span>
    </a>
  </div>
</template>

<style scoped>
a.small-box {
  display: block;
  border: 1px solid rgb(210, 210, 210);
  position: relative;
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
.box-left {
  position: absolute;
  width: 26%;
  top: -55px;
  /*border: 1px solid green;*/
  border-radius: 5px;
  margin-top: 50px !important;
}
.box-left img {
  margin-top: 11px;
  border: 2px solid rgb(220, 156, 133);
  height: 138px;
  margin-left: 20px;
}

.box-right {
  position: absolute;
  top: 19px;
  width: 65%;
  border-radius: 5px;
  left: 260px;
}

.box-right span {
  color: black;
  margin-top: 10px;
  font-size: 28px;
  font-weight: 600;
}


.box-right p {
  text-indent: 2em;
  text-align: start;
  font-size: 20px !important;
  color: black;
  margin-top: 6px !important;
}

.gameScore{
  display: block;
  position: absolute;
  right: 32px;
  bottom: 18px;
  font-size: 24px;
}
</style>