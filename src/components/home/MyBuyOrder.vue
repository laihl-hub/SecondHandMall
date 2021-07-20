<template xmlns="http://www.w3.org/1999/html">
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>我的订单</h2>-->
<!--    </Header>-->
<!--    <Table border :columns="columns" :data="order" size="large" no-data-text="你还有订单，快点去购物吧"></Table>-->
    <el-table
      :data="tableDataNew"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号:">
              <span>{{ props.row.onum }}</span>
            </el-form-item>
            <el-form-item label="商品名称:">
              <span>{{ props.row.pname }}</span>
            </el-form-item>
<!--            <el-form-item label="图片">-->
<!--              <span>{{ props.row.img }}</span>-->
<!--            </el-form-item>-->
            <el-form-item label="价格:">
              <span>{{ props.row.pprice}}</span>
            </el-form-item>
            <el-form-item label="收货地址:">
              <span>{{ props.row.receiverAddr}}</span>
            </el-form-item>
            <el-form-item label="卖家姓名:">
              <span>{{ props.row.sellerName }}</span>
            </el-form-item>
            <el-form-item label="卖家联系电话:">
              <span>{{ props.row.sellerPhone }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.otime|convertTime('YYYY-MM-DD') }}</span>
            </el-form-item>

            <el-form-item label="订单状态:">
              <span> {{ props.row.ostate ? statusData[(props.row.ostate)].label : '未发货' }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="订单编号"
        prop="onum">
      </el-table-column>
      <el-table-column
        label="商品图片"
        prop="pimg">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="'../../../static/img/goodsList/'+scope.row.pimg" alt="" style="width: 200px;max-height:300px">
            <img slot="reference" :src="'../../../static/img/goodsList/'+scope.row.pimg" style="width: 100px;max-height: 150px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="pname">
      </el-table-column>
      <el-table-column
        label="价格"
        prop="pprice">
      </el-table-column>
      <el-table-column
        label="购买时间"
        prop="otime">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.otime|convertTime('YYYY-MM-DD') }}</span>
        </template>

      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="ostate">
        <template slot-scope="scope">
          {{ scope.row.ostate ? statusData[(scope.row.ostate)].label : '未发货' }}
        </template>
      </el-table-column>
      <el-table-column
        label="订单操作"
        prop="ostate">
        <template slot-scope="scope">
          <el-button  v-if="scope.row.ostate===0" type="info" disabled>等待发货</el-button>
          <el-button   type="primary" v-else-if="scope.row.ostate===1" @click="receiverProduct(scope.$index)">确认收货</el-button>
          <el-button   v-else size="20" type="success"  disabled>已完成交易</el-button>
          <el-dialog title="收货确认" :visible.sync="confirmVisable" width="30%" >
            <span >收货之前请检查货物完好再确认收货哦!</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="receiverProductDialog">确认收货</el-button>
            <el-button @click="confirmVisable=false">取消</el-button>
                   </span>
          </el-dialog>
        </template>

      </el-table-column>
    </el-table>
    <div class="page-size"  >
      <Page :total="1" show-sizer></Page>
    </div>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../../../static/js/api';
import Moment from 'moment';

export default {
  name: 'MyBuyOrder',
  data () {
    return {
      row_index:0,
      confirmVisable:false,
      tableDataNew:[{
        onum:'',
        pimg:'',
        buyerAddrId: 0,
        buyerId: 0,
        oid: 0,
        pid: 0,
        pname: "",
        pprice: "",
        pstate: 0,
        receiverAddr: "",
        receiverName: "",
        sellerId: 0,
        sellerName: "",
        sellerPhone: "",
        otime:'',
        //0:代表买家已购买，但卖家未发货
        //1:买家已购买，卖家已发货，但买家还未确认收货
        //2:代表订单交易已完成

        ostate:''
      }],
      statusData: {
        '0': {
          label: '买家发货中'
        },
        '1': {
          label: '等待确认收货'
        },
        '2': {
          label: '已收货'
        },
       },
      isLoading:true

    };
  },
  methods:{
    loadBuyOrder(){
      const _this=this
      axios.get(api.path_local+"orderManage/lookUpBuyOrder/"+Cookies.get("userid")).then(function (resp){
        _this.tableDataNew=resp.data.data
        _this.isLoading=false
        console.log(resp.data.data)
      })
    },
    receiverProductDialog(){
      const _this=this
      console.log(this.row_index)
      let oid_send=this.tableDataNew[this.row_index].oid
      axios.get(api.path_local+"orderManage/confirmReciveProduct/"+oid_send).then(function (resp){
        if(resp.data.code==200){
          console.log(resp.data)
          _this.confirmVisable=false
          window.location.reload()
          _this.$message.success("您已成功确认收货")
        }
        else {
          _this.$message.error("确认收货失败")
          _this.confirmVisable=false
        }
      })
    },
    receiverProduct(index){
     this.row_index=index
      this.confirmVisable=true
    }

  },

  created () {
    this.loadBuyOrder()
  },

  filters:{
    //引入moment.js时间格式化库
    convertTime: function (data, format) {
      return Moment(data).format(format)}
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
