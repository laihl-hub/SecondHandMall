<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">商品管理</Breadcrumb-item>
        <Breadcrumb-item>商品类别</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="layout-content">
      <div style="margin-bottom: 20px">
        <el-input type="text" clearable v-model="input" style="width: 300px" placeholder="添加商品类别"></el-input>
        <Button type="ghost" icon="plus-round" @click="add"></Button>
      </div>
      <div class="layout-content-main">
        <el-table stripe style="width: 50%;border: 1px solid lightgray" :data="tableData" width="200px" >
          <el-table-column label="ID" width="auto" prop="cid"> </el-table-column>
          <el-table-column label="类别名称" width="auto" prop="cname">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../../../static/js/api";

export default {
  data(){
    return{
      tableData:{
        cid:null,
        cname:''
      },
      input:''
    }
  },
  created() {
    const _this=this
    axios.get(api.path+'productManage/lookUpAllCatogory').then(function (response){
      _this.tableData=response.data.data;
    })
  },
  methods:{
    add(){
      const _this=this
      axios.get(api.path+'productManage/lookUpAllCatogory/'+_this.input).then(function (response){
        if(response.data.code===200){
          _this.$Message.success('添加成功')
          window.location.reload();
        }else {
          _this.$Message.error('添加失败')
        }
      })
      _this.input=''
    }
  }
}
</script>

<style scoped>
.layout-content{
  position: relative;
  top: 30px;
}
.layout-content-main{
  overflow: scroll;
}
</style>
