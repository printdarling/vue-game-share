<template>
  <div>
    <!-- 搜索框 -->
    <div class="mt-4 search-input">
      <el-row :gutter="10">
        <el-input
            v-model="searchText"
            placeholder="搜索用户名"
            class="input-with-select"
        >
          <!-- 筛选框 -->
          <template #prepend>
            <el-select v-model="select" @change="handleSelectChange" placeholder="筛选" style="width: 115px">
              <el-option label="所有用户" value="1"></el-option>
              <el-option label="普通用户" value="2"></el-option>
              <el-option label="管理员用户" value="3"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="handleSearch" type="primary" icon="el-icon-search">搜索</el-button>
          </template>
        </el-input>
      </el-row>
    </div>

    <el-button type="primary" style="margin: 15px auto">新增用户</el-button>

    <!-- 表格 -->
    <div class="table">
      <el-table
          border
          :data="tableData"
          style="width: 100%">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="score" label="积分"></el-table-column>
        <el-table-column prop="role" label="权限"></el-table-column>
        <el-table-column prop="markTime" label="签到时间" ></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button link type="primary" size="small" @click="OpenUpdate(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <!-- 分页 -->
    <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchText: '',
      userType: 'all',
      pageSize: 20,
      currentPage: 1,
      users: [],
      tableData:[],
      select:''
    };
  },
  methods: {
    handleEdit(user) {
      console.log('Edit user:', user);
    },
    handleDelete(user) {
      console.log('Delete user:', user);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleSelectChange(){
      console.log('当前选择: '+ this.select)
      switch (this.select) {
        case '1':
          axios({
            url:'/allUsers',
            method:'post',
            data:{}
          }).then(res => {
            this.tableData = res.data.data
          })
          break;
        case '2':
          axios({
            url:'/allNormalUsers',
            method:'post',
            data:{}
          }).then(res => {
            this.tableData = res.data.data
          })
          break;
          case '3':
          axios({
            url:'/allAminUsers',
            method:'post',
            data:{}
          }).then(res => {
            this.tableData = res.data.data
          })
        }
    },
    handleSearch(){
      console.log('搜索: '+ this.searchText)
      axios({
        url:'/searchUsersByName',
        method:'post',
        params:{
          userName:this.searchText
        }
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data
      })
    }
  },
  created() {
    axios({
      url:'/allUsers',
      method:'post',
      data:{}
    }).then(res => {
      this.tableData = res.data.data
    });
  }
};
</script>

<style scoped>
.table{
  width: 100%;
}
/* 样式可以根据需要进行调整 */
.search-input {
  width: 500px;
}

</style>
