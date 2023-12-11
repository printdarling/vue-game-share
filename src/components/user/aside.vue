<script>
import axios from "axios";

export default {
  data(){
    return{
      user:'',
      markStatus:true
    }
  },
  props: ['newScore'],
  watch:{

  },
  methods:{
    mark(id){
      console.log("当前签到用户id: "+id)
      axios({
        url:'/mark',
        method:'post',
        params:{id:id}
      }).then(res =>{
        switch (res.data.code){
          case 20000:
            this.markStatus = false
            this.$message.success(res.data.message)
            // 更新本地存储
              localStorage.setItem("login_info",JSON.stringify(res.data.data))
              // 同步更新用户数据
              this.user = JSON.parse(localStorage.getItem("login_info"))
            break;
          case 10001:
            this.$message.error(res.data.message)
            break;
          default:
            alert("未知错误")
            break;
        }
      })
    },
  },
  created() {

    this.user = JSON.parse(localStorage.getItem("login_info"))

    const today = new Date()
    // 解析获取的markTime
    const markedDate = new Date(this.user.markTime);
    if (today.getDate() !== markedDate.getDate() ||
        today.getMonth() !== markedDate.getMonth() ||
        today.getFullYear() !== markedDate.getFullYear()) {
      // 如果不为同一天
      this.markStatus = true; // 待签到状态
    } else {
      this.markStatus = false; // 已签到状态
    }
  },
  mounted() {

  }
}
</script>

<template>
  <div class="aside-continer">
    <div class="userInfo">
      <p class="nickName">昵称: {{user.userName}}</p>
      <p class="email">邮箱: {{user.email}}</p>
      <p class="prince">积分: {{user.score !== this.$props.newScore ? this.$props.newScore : user.score}}</p>
      <el-button v-show="markStatus" @click="mark(user.id)" class="mark-btn">签到</el-button>
    </div>

    <div class="tips">
      <h3>公告:</h3>
      <p>欢迎来到繁星游戏分享站点! <br><br> <span>本站所有游戏均免费分享, 请勿商用! 如果有侵权或者其他任何问题, 请联系管理员!</span><br><br><span>为保证站点流量活跃度，部分游戏为积分游戏，用户每日签到即可获得积分，积分可用于兑换游戏！</span></p>
    </div>
  </div>
</template>

<style scoped>
div.userInfo {
  display: block;
  height: 40%;
  border: 1px solid rgb(210, 210, 210);
  padding-top: 19px;
  padding-left: 8px;
  margin: 20px auto auto 0;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 18px 18px 30px rgba(0,0,0, 0.2),
  -18px -18px 30px rgba(255,255,255, 1);
  /* 过渡 */
  transition: all .2s ease-out;
}

div.userInfo:hover{
  cursor: pointer;
  box-shadow: 0 0 0 rgba(0,0,0, 0.2),
  0 0 0 rgba(255,255,255, 0.8),
  inset 18px 18px 30px rgba(0,0,0,0.1),
  inset 18px -18px 30px rgba(255,255,255, 1);
}
div.userInfo p {
  font-size: 27px;
  padding-left: 10px;
  border-radius: 14px;
}

div.userInfo p.prince {
  width: 50%;
}

div.userInfo .mark-btn{
  margin-top: -50px;
  float: right;
  margin-right: 20px;
  border: 1px solid gray;
  width: 80px;
}

div.tips {
  padding-top: 10px;
  padding-bottom: 20px;
  height: 70%;
  margin-top: 50px;
  border-radius: 14px;

  box-shadow: 0 0 0 rgba(0,0,0, 0.2),
  0 0 0 rgba(255,255,255, 0.8),
  inset 18px 18px 30px rgba(0,0,0,0.1),
  inset 18px -18px 30px rgba(255,255,255, 1);
  /* 过渡 */
  transition: all .2s ease-out;
}

div.tips:hover{
  cursor: pointer;
  box-shadow: 18px 18px 30px rgba(0,0,0, 0.2),
  -18px -18px 30px rgba(255,255,255, 1);
}

div.tips h3 {
  text-align: center;
  font-size: 33px;
  border-radius: 14px;
}

div.tips p {
  text-indent: 2em;
  padding: 21px 21px 0;
  font-size: 22px;
  border-radius: 14px;
}
</style>
