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
            <el-select v-model="select" placeholder="筛选" style="width: 115px">
              <el-option label="所有游戏" value="all"></el-option>
              <el-option label="免费游戏" value="freeGames"></el-option>
              <el-option label="积分游戏" value="payGames"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </template>
        </el-input>
      </el-row>
    </div>

    <el-button type="primary" style="margin: 15px auto">新增游戏</el-button>

      <!-- 表格 -->
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column type="index" label="序号" width="100%"></el-table-column>
    <el-table-column prop="" label="游戏图" >
      <img src="https://ys.mihoyo.com/main/_nuxt/img/37207c1.jpg" style="height: 100px">
    </el-table-column>
    <el-table-column prop="tittle" label="游戏名" ></el-table-column>
    <el-table-column prop="descript" label="游戏描述" >xxxxx.....</el-table-column>
    <el-table-column prop="prince" label="积分价格" ></el-table-column>
    <el-table-column prop="addTime" label="游戏添加时间">2000-00-00 00:00:00</el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary">修改</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
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
</template>

<script>
import axios from "axios";
import {Edit} from "@element-plus/icons";

export default {
  data() {
    return {
      searchText: '',
      select:'',
      pageSize: 20,
      tableData: [],
      currentPage: 1,
      total: 0
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
  margin-left: 4px;
  width: 500px;
}

</style>
