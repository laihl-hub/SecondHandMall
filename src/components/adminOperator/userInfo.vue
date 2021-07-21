<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">用户管理</Breadcrumb-item>
        <Breadcrumb-item>用户信息</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="layout-content">
      <div style="margin-bottom: 20px">
        <el-input type="text" clearable v-model="input" style="width: 300px" placeholder="请输入用户名"></el-input>
        <el-button icon="el-icon-search" circle @click="searchUser"></el-button>
      </div>
      <div class="layout-content-main">
        <el-table stripe style="width: 100%;border: 1px solid lightgray" :data="tableData">
          <el-table-column label="ID" width="auto" prop="uid"> </el-table-column>
          <el-table-column label="用户名" width="auto" prop="uname">
          </el-table-column>
          <el-table-column label="登录密码" width="auto" prop="upassword">
          </el-table-column>
          <el-table-column label="手机号" width="auto" prop="uphonenum">
          </el-table-column>
          <el-table-column label="邮箱" width="auto" prop="uemail">
          </el-table-column>
          <el-table-column label="头像" width="auto" prop="uhead"> </el-table-column>
          <el-table-column
            label="学校"
            width="auto"
            prop="uschool"
          ></el-table-column>
          <el-table-column label="操作">
            <!-- 可执行修改和删除操作 -->
            <template>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button></template
            ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../../../static/js/api";

export default {
  data () {
    return {
      testData: [{
        password: "123",
        name: "小",
        uid: 11,
        uphonenum: "1235",
        uemail: "j",

        uschool: "kjgiu"
      }
      ],//会把这里定义的东西给覆盖掉
      tableData:null,
      input: ''
    };
  },
  created() {
    const _this=this;
    axios.get(api.path+'userInfoManage/lookUpAllUser')
    .then((response)=>{
      _this.tableData=response.data.data;
      _this.testData=response.data.data
      console.log(_this.testData)
      // console.log(response);
    })
  },
  methods:{
    searchUser(){
      // console.log(1)
      // const _this=this
      // axios.get(api.path+'userInfoManage/lookUpUserInfoByUserId/'+_this.input)
      // .then((response)=>{
      //   // _this.tableData=response.data.data
      //   // console.log(this.tableData)
      //   // console.log(_this.tableData)
      //   console.log(response.data)
      // })
    }
  }
};
</script>

<style scoped>
.layout-content{
  position: relative;
  top: 30px;
}
</style>
