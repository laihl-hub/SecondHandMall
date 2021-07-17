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
      <div class="layout-content-main">
        <el-table stripe style="width: 100%" :data="tableData">
          <el-table-column label="ID" width="auto" prop="id"> </el-table-column>
          <el-table-column label="商品名称" width="auto" prop="name">
          </el-table-column>
          <el-table-column label="卖家ID" width="auto" prop="seller_id">
          </el-table-column>
          <el-table-column label="商品描述" width="auto" prop="description">
          </el-table-column>
          <el-table-column label="图片" width="auto" prop="img">
          </el-table-column>
          <el-table-column label="分类" width="auto" prop="kind"> </el-table-column>
          <el-table-column
            label="价格"
            width="auto"
            prop="price"
          ></el-table-column>
          <el-table-column label="状态" width="auto" prop="state"> </el-table-column>
          <el-table-column label="发布时间" width="auto" prop="add_time"> </el-table-column>
          <el-table-column label="操作">
            <!-- 可执行修改和删除操作 -->
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button
              ><el-button
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
export default {
  data () {
    return {
      tableData: [{
        id: 1,
        name: '..',
        seller_id: 'x',
        description: 1,
        img: 'x',
        kind: 'x',
        price: 'x',
        state: '1',
        add_time: '1'
      }]
    };
  },
  methods:{
    searchGoods(){}
  }
};
</script>

<style scoped>
.layout-content{
  position: relative;
  top: 30px;
}
</style>
