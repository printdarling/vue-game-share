<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div id="user-pie" style="width: 500px; height: 400px;"></div>
      </div>
      <div class="col-md-6">
        <div id="user-bar" style="width: 500px; height: 400px;"></div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <div id="game-pie" style="width: 500px; height: 400px;"></div>
      </div>
      <div class="col-md-6">
        <div id="game-bar" style="width: 500px; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
  data() {
    return {
      totalUser: 100,
      normalUsers: 80,
      adminUsers: 20,
      totalGames: 50,
      freeGames: 30,
      payGames: 20,
      userPie: null,
      userBar: null,
      gamePie: null,
      gameBar: null
    }
  },
  created() {
    this.getData();
    // 强制重新加载页面
  },
  mounted() {
    this.initCharts();
  },
  methods:{
    getData(){
      axios.post('/getGamesCount', {})
      .then(res=>{
        this.totalGames = res.data.data[0]
        this.freeGames = res.data.data[1]
        this.payGames = res.data.data[2]
        this.updateGameCharts();
      })

      axios.post('/getUsersCount', {})
      .then(res=>{
        this.totalUser = res.data.data[0]
        this.normalUsers = res.data.data[1]
        this.adminUsers = res.data.data[2]
        this.updateUserCharts();
      });

    },
    initCharts(){
      // 初始化echarts实例
      this.userPie = echarts.init(document.getElementById('user-pie'));
      this.userBar = echarts.init(document.getElementById('user-bar'));
      this.gamePie = echarts.init(document.getElementById('game-pie'));
      this.gameBar = echarts.init(document.getElementById('game-bar'));

      // 设置用户饼图的数据和配置
      let userPieOption = {
        title: {
          text: '用户统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '用户类型',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.normalUsers, name: '普通用户' },
              { value: this.adminUsers, name: '管理员' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 设置用户条形图的数据和配置
      let userBarOption = {
        title: {
          text: '用户统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['普通用户', '管理员']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '用户数量',
            type: 'bar',
            data: [this.normalUsers, this.adminUsers]
          }
        ]
      };

      // 设置游戏饼图的数据和配置
      let gamePieOption = {
        title: {
          text: '游戏统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '游戏类型',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.freeGames, name: '免费游戏' },
              { value: this.payGames, name: '付费游戏' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 设置游戏条形图的数据和配置
      let gameBarOption = {
        title: {
          text: '游戏统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['免费游戏', '付费游戏']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '游戏数量',
            type: 'bar',
            data: [this.freeGames, this.payGames]
          }
        ]
      };

      // 设置echarts实例的配置...
      this.userPie.setOption(userPieOption);
      this.userBar.setOption(userBarOption);
      this.gamePie.setOption(gamePieOption);
      this.gameBar.setOption(gameBarOption);
    },
    updateUserCharts(){
      // 在请求数据成功后更新用户饼图和条形图的配置
      this.userPie.setOption({
        series: [
          {
            data: [
              { value: this.normalUsers, name: '普通用户' },
              { value: this.adminUsers, name: '管理员' }
            ]
          }
        ]
      });
      this.userBar.setOption({
        series: [
          {
            data: [this.normalUsers, this.adminUsers]
          }
        ]
      });
    },
    updateGameCharts() {
      // 在请求数据成功后更新游戏饼图和条形图的配置
      this.gamePie.setOption({
        series: [
          {
            data: [
              { value: this.freeGames, name: '免费游戏' },
              { value: this.payGames, name: '付费游戏' }
            ]
          }
        ]
      });
      this.gameBar.setOption({
        series: [
          {
            data: [this.freeGames, this.payGames]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px;
}
.row {
  display: flex;
  justify-content: space-around;
}
</style>
