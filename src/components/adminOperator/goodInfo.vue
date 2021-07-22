<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">商品管理</Breadcrumb-item>
        <Breadcrumb-item>商品信息</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="layout-content">
      <div style="margin-bottom: 20px">

        <el-input type="text" clearable v-model="input" style="width: 300px" placeholder="请输入商品名"></el-input>
        <el-button icon="el-icon-search" circle @click="searchGoods"></el-button>

      </div>
      <div class="layout-content-main" style="height: 800px">
        <el-table stripe style="width: 100%" :data="tableData" >
          <el-table-column label="ID" width="70" prop="pid"> </el-table-column>
          <el-table-column label="商品名称" width="auto" prop="pname">
          </el-table-column>
          <el-table-column label="卖家ID" width="100" prop="sellerId">
          </el-table-column>
          <el-table-column label="商品描述" width="auto" prop="pintro">
          </el-table-column>
          <el-table-column label="分类" width="150" prop="cname"> </el-table-column>
          <el-table-column
            label="价格"
            width="100"
            prop="pprice"
          ></el-table-column>
          <el-table-column label="状态" width="70" prop="pstate"> </el-table-column>
          <el-table-column label="发布时间" width="auto" prop="ptime"> </el-table-column>
          <el-table-column label="操作" width="70" >
            <!-- 可执行修改和删除操作 -->
           <template slot-scope="scope">
              <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.row)"
            ></el-button></template
            ></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size=6
          :total="totalNum"
          size="large"
          @current-change="page"
          style="margin-left: 500px;margin-top: 20px">
        </el-pagination>
      </div>

    </div>

  </div>

</template>


<script>
import axios from "axios";
import api from "../../../static/js/api";
import Moment from "moment";


export default {
  data() {
    return {

      tableData: null,
      input:'',
      totalNum:null,
    };
  },
  async created() {
    const _this = this
    axios.get(api.path+"productManage/lookUpProductDetail/1/6").then(function (resp){
      _this.tableData = resp.data.data
      _this.totalNum=parseInt(resp.data.msg)
    })

    await axios.get(api.path + 'productManage/lookUpProductDetail').then(function (response) {
      _this.tableData = response.data.data
    })
    for(let i=0;i<_this.tableData.length;i++){
      _this.tableData[i].pprice+='r'
      _this.tableData[i].ptime=_this.convertTime(_this.tableData[i].ptime,'YYYY-MM-DD HH:MM:SS')
    }
  },
  methods: {
    searchGoods() {
    },
    convertTime: function (data, format) {
      return Moment(data).format(format)
    },
    del(row){
      // const _this=this
      // axios.get()
      this.$message.error('删除失败')
    },
    page(currentPage){
      const _this=this
      axios.get(api.path+"productManage/lookUpProductDetail/"+currentPage+"/"+6).then(function (resp){
        _this.tableData=resp.data.data
      })
    }
  },


};
</script>

<style scoped>
.layout-content{
  position: relative;
  top: 30px;
}
</style>
