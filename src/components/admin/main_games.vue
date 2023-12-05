<template>
    <!-- 搜索框 -->
    <div class="mt-4 search-input">
      <el-row :gutter="10">
        <el-input
            v-model="input3"
            placeholder="Please input"
            class="input-with-select"
        >
          <!-- 筛选框 -->
          <template #prepend>
            <el-select class="filter-select" v-model="select" placeholder="请选择用户类型" style="width: 115px">
              <el-option label="所有用户" value="all"></el-option>
              <el-option label="普通用户" value="normal"></el-option>
              <el-option label="管理员用户" value="admin"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-icon :size="20">
              <Edit />
            </el-icon>
          </template>
        </el-input>
      </el-row>
    </div>

    <el-button type="primary" >新增用户</el-button>

    <div>
    <!-- 表格 -->
    <el-table
        :data="tableData"
        style="width: 100%" >
      <el-table-column fixed type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="password" label="密码" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="score" label="积分" width="180"></el-table-column>
      <el-table-column prop="role" label="权限" width="180"></el-table-column>
      <el-table-column prop="markTime" label="签到时间" width="180"></el-table-column>
      <el-table-column prop="registerTime" label="注册时间" width="180"></el-table-column>
    </el-table>

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
import {Edit} from "@element-plus/icons";

export default {
  components: {Edit},
  data() {
    return {
      searchText: '',
      userType: 'all',
      pageSize: 20,
      users: [],
      tableData: [],
      currentPage: 1,
      total: 0
    };
  },
  methods: {
    filteredUsers() {
      // 根据搜索框和筛选框进行过滤
      return this.users.filter(user => {
        const matchSearch = user.userName.includes(this.searchText) || user.email.includes(this.searchText);
        const matchType = this.userType === 'all' || user.role === this.userType; // 假设 "role" 表示用户类型
        return matchSearch && matchType;
      });
    },
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
  },
  created() {
    axios({
      url:'/getAllGamesByPage',
      method:'post',
      data:{}
    }).then(res => {
      console.log(res.data.data)
      this.tableData = res.data.data
    });
  }
};
</script>
<style scoped>
/* 样式可以根据需要进行调整 */
.search-input {
  width: 500px;
}

</style>
