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
    <el-button @click="this.dialogVisible = true" v-show="!isShow" type="primary">获取链接</el-button>

    <!--  删除弹窗-->
    <el-dialog v-model="dialogVisible" title="购买确认" width="30%" draggable>
      <span>你确定要使用{{this.game.prince}}积分购买此游戏吗？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="getGameLink">
          确认购买
        </el-button>
      </span>
      </template>
    </el-dialog>


    <br><br><hr><br>
    <div v-if="isShow">
      <p>下载地址:</p>
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
      isShow:false,
      dialogVisible:false,
      game:{},
    }
  },
  methods:{
    getGameLink(){
      console.log("购买游戏id: "+this.game.id)
      const user = JSON.parse(localStorage.getItem("login_info"))
      if (user.score < this.game.prince){
        this.$message.error("您的积分不足，无法购买此游戏")
      }else {

        axios({
          method: 'post',
          url: '/buyGame',
          params:{
            gameId:this.game.id,
            userId:user.id
          }
        }).then(res => {
          this.$message.success(res.data.message)
          localStorage.setItem("login_info",JSON.stringify(res.data.data))
          //如何做让aside里面的积分刷新？
          this.$emit('force-update', JSON.parse(localStorage.getItem("login_info")).score);
          this.dialogVisible = false
          this.isShow = true
        })

      }
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
      if (this.game.prince === 0){
        this.isShow = true
      }
    })
  },
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
