<template>
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
            <el-form-item label="价格:">
              <span>{{ props.row.pprice}}</span>
            </el-form-item>
            <el-form-item label="收货地址:">
              <span>{{ props.row.receiverAddr}}</span>
            </el-form-item>
            <el-form-item label="收货人姓名:">
              <span>{{ props.row.receiverName }}</span>
            </el-form-item>
            <el-form-item label="收货人联系电话:">
              <span>{{ props.row.receiverPhone }}</span>
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
          <!--          <img :src="'../../../static/img/goodsList/'+scope.row.pimg" style="width: 100px;max-height: 150px">-->
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

          <el-button  v-if="scope.row.ostate===0" type="danger" @click="deliverProduct(scope.$index)" >商品发货</el-button>
          <el-button   disabled type="primary" v-else-if="scope.row.ostate===1" >您已发货</el-button>
          <el-button disabled  v-else size="20" type="success" >已完成交易</el-button>
          <el-dialog title="收货地址" :visible.sync="confirmVisable"style="width: 90%;">
            <el-row>
            <el-card class="box-card" style="background-image: url('../../../static/img/3.PNG');background-size: 100% 80%;
            background-position: right;background-repeat: no-repeat;margin-left: 90px" >
              <div slot="header" class="clearfix">
                <span>确认发货信息</span>
              </div>
              <div  class="text item">
                订单编号:{{scope.row.onum}}</div>
              <div  class="text item">
                收货人姓名:{{scope.row.receiverName}}</div>
              <div  class="text item">
                收货人联系方式:{{scope.row.receiverPhone}}</div>
              <div  class="text item">
                收货人地址:{{scope.row.receiverAddr}}</div>
              <el-button type="ghost" @click="deliverProductDiag" style="background-color: rgba(231,192,231,.5)">确认发货</el-button>
              <el-button @click="confirmVisable=false">取消</el-button>

            </el-card>
<!--            <img src="../../../static/img/2.jpg"  style="margin-left: 450px;width: 30%">-->
            </el-row>
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
  name: 'MySellerOrder',
  data () {
    return {
      confirmVisable:false,
      tableDataNew:[{
        onum:'',
        pimg:'',
        buyerAddrId: 0,
        buyerId: 0,
        buyPhone:0,
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
        receiverPhone:'',
        otime:'',
        //0:代表买家已购买，但卖家未发货
        //1:买家已购买，卖家已发货，但买家还未确认收货
        //2:代表订单交易已完成
        ostate:''
      }],
      confirmData:{

      },
      statusData: {
        '0': {
          label: '卖家发货中'
        },
        '1': {
          label: '等待买家确认收货'
        },
        '2': {
          label: '买家已收货'
        },
      },
      isLoading:true,
      row_index:0
    };
  },
  methods:{
    loadBuyOrder(){
      const _this=this
      axios.get(api.path+"orderManage/lookUpSellOrder/"+Cookies.get("userid")).then(function (resp){
        console.log(resp.data.data)
        _this.tableDataNew=resp.data.data
        _this.isLoading=false
      })
    },
    deliverProduct(index){
      this.row_index=index
      this.confirmVisable=true
    },
    deliverProductDiag(){
      const _this=this
      console.log(this.row_index)
      let oid_send=this.tableDataNew[this.row_index].oid
      axios.get(api.path+"orderManage/confirmDeliverProduct/"+oid_send).then(function (resp){
        if(resp.data.code==200){
          _this.$message.success("您已确认发货，消息通知卖家")
          _this.confirmVisable=false
          window.location.reload()
        }
        else {
          _this.$message.error("确认发货失败")
          _this.confirmVisable=false
        }
      })
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

</style>

