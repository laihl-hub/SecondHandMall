<template>
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>我的订单</h2>-->
<!--    </Header>-->
<!--    <Table border :columns="columns" :data="order" size="large" no-data-text="你还有订单，快点去购物吧"></Table>-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
<!--            <el-form-item label="图片">-->
<!--              <span>{{ props.row.img }}</span>-->
<!--            </el-form-item>-->
            <el-form-item label="价格">
              <span>{{ props.row.price}}</span>
            </el-form-item>
            <el-form-item label="卖家姓名">
              <span>{{ props.row.seller_name }}</span>
            </el-form-item>
            <el-form-item label="卖家联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ props.row.state }}</span>
            </el-form-item>
            <el-form-item >
              <Button>确认收货</Button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
<!--      <el-table-column-->
<!--        label="图片"-->
<!--        prop="desc">-->
<!--      </el-table-column>-->
      <el-table-column
        label="价格"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="购买时间"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="desc">
      </el-table-column>
    </el-table>
    <div class="page-size"  >
      <Page :total="1" show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyOrder',
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        // img:'',
        price:88,
        time:'xxx-xx',
        state:0,
        seller_name:1,
        phone:'111',
        address:'cdv'
      }]
    };
  }
};

</script>

<style scoped>
/*.page-size {*/
/*  margin: 15px 0px;*/
/*  display: flex;*/
/*  justify-content: flex-end;*/
/*  align-items: center;*/
/*}*/
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.page-size{
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
