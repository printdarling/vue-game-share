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

    <el-button @click="drawerVisible = true" type="primary" style="margin: 15px auto">新增用户</el-button>
    <!--    抽屉 新增用户-->
    <el-drawer
        title="新增用户"
        v-model="drawerVisible"
        :width="300"
    >
      <el-form ref="ruleForm" :model="addUser" label-width="100px" :rules="rules" size="medium">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addUser.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="addUser.score" placeholder="请输入积分"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select v-model="addUser.role" placeholder="请选择权限">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="管理员用户" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddUserSubmit">提交</el-button>
      </div>
    </el-drawer>

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
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--  修改弹窗-->
    <el-dialog v-model="modifyVisible" title="用户修改" width="30%" draggable>
      <el-form-item label="用户名">
        <el-input v-model="modifyUser.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="modifyUser.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="modifyUser.email"></el-input>
      </el-form-item>
      <el-form-item label="积分">
        <el-input v-model="modifyUser.score"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="modifyUser.role" placeholder="请选择权限">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="管理员用户" value="1"></el-option>
        </el-select>
      </el-form-item>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="modifyVisible = false">取消</el-button>
        <el-button type="primary" @click="handleModify">
          确认修改
        </el-button>
      </span>
      </template>
    </el-dialog>

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
      tableData: [],
      select: '',
      drawerVisible: false,
      addUser: {},
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        score: [
          {required: true, message: '请输入积分', trigger: 'blur'},
          {min: 1, max: 20, message: '必须输入！', trigger: 'blur'},
          {pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '必须是数字', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择权限', trigger: 'blur'}
        ]
      },
      modifyVisible:false,
      modifyUser:{}
    }
  },
  methods: {
    handleEdit(user) {
      this.modifyUser = user;
      this.modifyVisible = true;
    },
    handleDelete(user) {
      console.log('Delete user:', user);
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          url:'/deleteUserById',
          method:'post',
          params:{id:user.id}
        }).then(res => {
          if (res.data.success){
            this.$message.success(res.data.message)
            this.getAllUsers()
          }else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    getAllUsers(){
      axios({
        url:'/allUsers',
        method:'post',
        data:{}
      }).then(res => {
        this.tableData = res.data.data
      });
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
    },
    handleAddUserSubmit(){
      console.log(this.addUser)
      axios({
        url:'/addUser',
        method:'post',
        data:this.addUser
      }).then(res => {
        console.log(res.data)
        this.drawerVisible = false;
        this.addUser = {};
      })
      this.$message.success('添加成功');
    },
    handleModify(){
      axios({
        url:'/modifyUser',
        method:'post',
        data:this.modifyUser
      }).then(res => {
        console.log(res.data)
        if (res.data.success){
          this.$message.success(res.data.message)
          this.modifyVisible = false;
          this.modifyUser = {};
          this.getAllUsers()
        }else {
          this.$message.error(res.data.message)
        }

      })
    }
  },
  created() {
    this.handleSearch();
    this.getAllUsers();
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
