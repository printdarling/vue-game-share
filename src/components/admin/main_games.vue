<template>
    <!-- 搜索框 -->
    <div class="mt-4 search-input">
      <el-row :gutter="10">
        <el-input
            v-model="searchText"
            placeholder="搜索游戏名"
            class="input-with-select"
        >
          <!-- 筛选框 -->
          <template #prepend>
            <el-select v-model="select" @change="handleSelectChange" placeholder="筛选" style="width: 115px">
              <el-option label="所有游戏" value="1"></el-option>
              <el-option label="免费游戏" value="2"></el-option>
              <el-option label="积分游戏" value="3"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="handleSearch" type="primary" icon="el-icon-search">搜索</el-button>
          </template>
        </el-input>
      </el-row>
    </div>

    <el-button @click="drawer = true" type="primary" style="margin: 15px auto">新增游戏</el-button>
    <!--To do: 抽屉-->
  <el-drawer
      v-model="drawer"
      title="添加游戏">

    <el-form :model="addGameForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="游戏名称" prop="tittle">
        <el-input v-model="addGameForm.tittle"></el-input>
      </el-form-item>

      <el-form-item label="游戏图片" prop="imgUrl">
        <el-upload
            class="upload-demo"
            action="/api/upload/single"
            :on-success="handleFileUploadSuccess"
            :on-remove="handleFileRemove"
            :show-file-list="false"
            :before-upload="beforeUpload"
            accept="image/*"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-image v-if="addGameForm.imgUrl" :src="addGameForm.imgUrl" fit="contain" style="max-width: 300px;"></el-image>
      </el-form-item>

      <el-form-item label="游戏描述" prop="description">
        <el-input type="textarea" height="100" v-model="addGameForm.description"></el-input>
      </el-form-item>
      <el-form-item label="游戏价格" prop="prince">
        <el-input v-model="addGameForm.prince"></el-input>
      </el-form-item>
      <el-form-item label="百度网盘链接" prop="duLink">
        <el-input v-model="addGameForm.duLink"></el-input>
      </el-form-item>
      <el-form-item label="阿里云盘链接" prop="aliLink">
        <el-input v-model="addGameForm.aliLink"></el-input>
      </el-form-item>
      <el-form-item label="夸克网盘链接" prop="quarkLink">
        <el-input v-model="addGameForm.quarkLink"></el-input>
      </el-form-item>
      <el-form-item label="其他链接链接" prop="otherLink">
        <el-input v-model="addGameForm.otherLink"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置表单</el-button>
      </el-form-item>
    </el-form>

  </el-drawer>

      <!-- 表格 -->
  <el-table
      :data="tableData"
      border>
    <el-table-column type="index" label="序号" width="100%"></el-table-column>
    <el-table-column prop="imgUrl" label="游戏图">
      <template v-slot="{ row }">
        <img :src="row.imgUrl" style="width: 150px">
      </template>
    </el-table-column>
    <el-table-column prop="tittle" label="游戏名" ></el-table-column>
    <el-table-column prop="description" label="游戏描述" :formatter="truncateDescription"></el-table-column>
    <el-table-column prop="prince" label="积分价格" ></el-table-column>
    <el-table-column prop="duLink" label="百度网盘链接" ></el-table-column>
    <el-table-column prop="aliLink" label="阿里云盘链接" ></el-table-column>
    <el-table-column prop="quarkLink" label="夸克网盘链接" ></el-table-column>
    <el-table-column prop="otherLink" label="其他链接" ></el-table-column>
    <el-table-column prop="addTime" label="游戏添加时间">2000-00-00 00:00:00</el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <!--To do : Dialog对话框-->
        <el-button @click="handleEdit(scope.row)" type="primary">修改</el-button>
        <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<!--  修改弹窗-->
  <el-dialog v-model="modifyVisible" title="游戏修改" width="30%" draggable>
    <el-form-item label="游戏名称">
      <el-input v-model="modifyUser.tittle"></el-input>
    </el-form-item>
    <el-form-item label="游戏介绍">
      <el-input type="textarea" v-model="modifyUser.description"></el-input>
    </el-form-item>


    <el-form-item label="游戏图片">
      <el-upload
          class="upload-demo"
          action="/api/upload/single"
          :on-success="handleModifyImageSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
          accept="image/*"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-image
          v-if="modifyUser.imgUrl"
          :src="modifyUser.imgUrl"
          style="width: 200px; "
          fit="contain"
      ></el-image>
    </el-form-item>


    <el-form-item label="游戏价格">
      <el-input v-model="modifyUser.prince"></el-input>
    </el-form-item>
    <el-form-item label="百度网盘链接">
      <el-input v-model="modifyUser.duLink"></el-input>
    </el-form-item>
    <el-form-item label="阿里云盘链接">
      <el-input v-model="modifyUser.aliLink"></el-input>
    </el-form-item>
    <el-form-item label="夸克网盘链接">
      <el-input v-model="modifyUser.quarkLink"></el-input>
    </el-form-item>
    <el-form-item label="其他链接">
      <el-input v-model="modifyUser.otherLink"></el-input>
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
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      modifyVisible: false,
      drawer: false,
      searchText: '',
      select:'',
      modifyUser:{},
      pageSize: 20,
      tableData: [],
      currentPage: 1,
      total: 0,
      addGameForm:{
        tittle:'',
        description:'',
        prince:'',
        imgUrl: "", // 存储上传后的图片地址:'',
        duLink:'',
        aliLink:'',
        quarkLink:'',
        otherLink:''
      },
      rules:{
        tittle:[
          {required: true, message: '请输入游戏名称', trigger: 'blur'},
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        description:[
          {required: true, message: '请输入游戏描述', trigger: 'blur'},
          { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
        ],
        prince:[
          {required: true, message: '请输入游戏价格', trigger: 'blur'},
          { min: 1, max: 20, message: '必须是数字！', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '请输入正确的游戏价格', trigger: 'blur' }
        ],
        imgUrl:[
          {required: true, message: '请上传游戏图片', trigger: 'blur'}
        ],
        duLink:[
          {required: true, message: '请输入百度网盘链接', trigger: 'blur'},
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        aliLink:[
          {required: true, message: '请输入阿里云盘链接', trigger: 'blur'},
          { min: 1, max: 20, message: '长度在 1 到 20 个字符',trigger: 'blur'}

        ],
        quarkLink:[
          {required: false, message: '请输入夸克网盘链接', trigger: 'blur'},
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        otherLink:[
          {required: false, message: '请输入其他链接', trigger: 'blur'},
          { min: 1, max: 20, message: '长度在 1 到 20 个字符' ,trigger: 'blur'}
        ]
        }
      }
    },
  methods: {
    handleEdit(user) {
      this.modifyVisible = true;
      this.modifyUser = user;
    },
    handleDelete(game) {
      this.$confirm("确认删除？").then(() => {
        console.log("删除游戏: " + game.id);
        axios({
          url:'/deleteGameById',
          method:'post',
          params:{
            id:game.id
          }
        }).then(res => {
          console.log(res.data.code)
          switch (res.data.code) {
            case 20000:
              this.$message.success(res.data.message)
              axios({
                url:'/getAllGamesByPage',
                method:'post',
                data:{}
              }).then(res => {
                this.tableData = res.data.data
              });
              break;
            case 10001:
              this.$message.error(res.data.message)
              break;
            default:
              this.$message.error("未知错误")
          }
        })
        // 执行删除游戏的操作，例如调用删除游戏的接口
      }).catch(() => {
        console.log("取消删除:" + game.id);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log('当前页: '+ val);

      axios({
        url:'/getAllGamesByPage',
        method:'post',
        params:{pageNum:val,pageSize:10}
      }).then(res => {
        this.tableData = res.data.data
      });

      this.currentPage = val;
    },
    handleSelectChange(){
      console.log('当前选择: '+ this.select)
      switch (this.select) {
        case '1':
          axios({
            url:'/getAllGamesByPage',
            method:'post',
            data:{}
          }).then(res => {
            this.tableData = res.data.data
          })
          break;
        case '2':
          axios({
            url:'/getAllFreeGamesByPage',
            method:'post',
            data:{}
          }).then(res => {
            this.tableData = res.data.data
          })
          break;
          case '3':
          axios({
            url:'/getAllPayGamesByPage',
            method:'post',
            data:{}
          }).then(res => {
            this.tableData = res.data.data
          })
        }
    },
    handleSearch(){
      console.log('搜索: '+this.searchText)
      axios({url:'/findGamesByTitle',method:'post',params:{title:this.searchText}}).then(res => {
        this.tableData = res.data.data
      })
    },
    truncateDescription(row) {
      const maxLength = 10;
      if (row.description && row.description.length > maxLength) {
        return row.description.slice(0, maxLength) + '...';
      }
      return row.description;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url:'/addGame',
            method:'post',
            data:this.addGameForm})
              .then(res =>{
                if (res.data.code === 20000){
                  this.$message.success(res.data.message)
                  this.resetForm('ruleForm')
                  this.drawer = false
                }else {
                  this.$message.error(res.data.message)
                }
              })
        } else {
          console.log('添加失败!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('只能上传图片文件');
      }
      return isImage;
    },
    handleFileUploadSuccess(response, file) {
      this.addGameForm.imgUrl = "../src"+response.data; // 假设后端返回的是图片的URL
    },
    handleFileRemove() {
      this.$refs.upload.clearFiles(); // 清空上传组件的文件列表
      this.addGameForm.imgUrl = '';
    },
    handleModifyImageSuccess(response) {
      console.log(response)
      if (response.success) {
        this.$message.success('上传成功');
        this.modifyUser.imgUrl = response.data; // 将上传成功的图片链接保存到 modifyUser.newImgUrl
      } else {
        // 处理上传失败的情况
        this.$message.error(response.message);
      }
    },
    handleModify(){
      axios({
        url:'/modifyGame',
        method:'post',
        data:this.modifyUser
      }).then(res => {
        if (res.data.success){
          this.$message.success(res.data.message)
          this.modifyVisible = false
        }
      })
    },
    getGames(){
      axios({
        url:'/getAllGamesByPage',
        method:'post',
        data:{}
      }).then(res => {
        this.tableData = res.data.data
      });
    }
  },
  created() {
    this.getGames()
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
