<template>
  <div>
<!--    <Search></Search>-->
<!--    <GoodsListNav></GoodsListNav>-->
    <div class="order-header">
      <span style="display: inline-block;width: 100px;height: 50px;background-color: #eaeaea"><h3>待付款</h3></span>
    </div>
    <div class="goods-list-container">
<!--      <Alert show-icon class="tips-box">-->
<!--        小提示-->
<!--        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>-->
<!--        <template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击付款即可。</template>-->
<!--      </Alert>-->
<!--      <Table border ref="selection" :columns="columns" :data="shoppingCart" size="large" @on-selection-change="select" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>-->
      <Card style="height: 330px">
        <div style="height: 40px;border-bottom: 1px solid lightgray;" >
          <Col :span="2"><Icon type="ios-location-outline" size="30" style="margin-left: 30px"></Icon></Col>
          <Col :span="18"><span style="display: inline-block;width: 99%;height: 30px;border: 1px solid lightgray"></span></Col>
          <Col :span="2"><Icon type="edit"  size="20" style="margin-top: 5px"></Icon></Col>
        </div>
        <div style="height: 220px;border-bottom: 1px solid lightgray">
          <Col :span="8">
            <div ><img src="../../static/img/goodsList/1.jpg" width="200px" height="200px" style="margin-top: 10px;border: 1px solid lightgray">
              <span style="display: inline-block;margin-left: 5px" >x1</span>
            </div>
          </Col>
         <Col :span="7">
           <div style="height: 200px;margin-top: 15px;" >
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">商&nbsp&nbsp品&nbsp&nbsp名:</h4><span>xixi</span></span>
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">商品详情:</h4><span>sxhsuhsikz爱是苦瓜卡四季度是按时UI是否慈善法我我发按实际开除你</span></span>
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">商品价格:</h4><Icon type="social-yen-outline" style="padding: 0 5px"></Icon><span>8</span></span>
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">运&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp费:</h4><Icon type="social-yen-outline" style="padding: 0 5px"></Icon><span>8</span></span>
           </div>
         </Col>
        </div>
        <div style="height: auto">
          <span style="display: block;width: 150px;height: 50px;position:relative;left: 70%;line-height: 50px">
            <span><h4 style="display: inline">总金额:</h4></span><span style="font-size: 1.5em"><Icon type="social-yen-outline" style="padding: 0 5px" size="22"></Icon>16</span>
          </span>
        </div>
      </Card>
      <Card style="height: 120px;margin-top: 20px">
        <span style="display: inline-block"><h2>订单信息</h2></span>
        <div style="height: 50px;margin-top: 10px">
          <span style="display: block;margin-bottom: 10px"><h4 style="display: inline">订单编号</h4><span style="margin-left: 50px">684215643</span></span>
          <span style="display: block"><h4 style="display: inline">创建时间</h4><span style="margin-left: 50px">xxx-x--x-x-</span></span>
        </div>
      </Card>
<!--      <div class="address-container">-->
<!--        <h3>订单信息</h3>-->
<!--        <div class="address-box">-->
<!--          <div class="address-check">-->
<!--            <div class="address-check-name">-->
<!--              <span><Icon type="ios-checkmark-outline"></Icon> {{checkAddress.name}}</span>-->
<!--            </div>-->
<!--            <div class="address-detail">-->
<!--              <p>{{checkAddress.address}}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <Collapse>-->
<!--            <Panel>-->
<!--                选择地址-->
<!--                <p slot="content">-->
<!--                  <RadioGroup vertical size="large" @on-change="changeAddress">-->
<!--                    <Radio :label="item.addressId" v-for="(item, index) in address" :key="index">-->
<!--                      <span>{{item.name}} {{item.province}} {{item.city}} {{item.address}} {{item.phone}} {{item.postalcode}}</span>-->
<!--                    </Radio>-->
<!--                  </RadioGroup>-->
<!--                </p>-->
<!--            </Panel>-->
<!--          </Collapse>-->
<!--        </div>-->
<!--      </div>-->


      <div class="pay-container">
        <div class="pay-box">
          <p><span>订单总额：</span> <span class="money" style="color: darksalmon"><Icon type="social-yen"></Icon> {{totalPrice.toFixed(2)}}</span></p>
          <div class="pay-btn">
            <router-link to="/pay"><Button type="ghost" size="large" style="background-color: lightblue">支付订单</Button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsListNav from '@/components/nav/GoodsListNav';
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Order',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  created () {
    this.loadAddress();
  },
  data () {
    return {
      goodsCheckList: [],
      columns: [
        {
          type: 'selection',
          width: 58,
          align: 'center'
        },
        {
          title: '图片',
          key: 'img',
          width: 86,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '套餐',
          width: 198,
          key: 'package',
          align: 'center'
        },
        {
          title: '数量',
          key: 'count',
          width: 68,
          align: 'center'
        },
        {
          title: '价格',
          width: 68,
          key: 'price',
          align: 'center'
        }
      ],
      checkAddress: {
        name: '未选择',
        address: '请选择地址'
      },
      remarks: ''
    };
  },
  computed: {
    ...mapState(['address', 'shoppingCart']),
    totalPrice () {
      let price = 0;
      this.goodsCheckList.forEach(item => {
        price += item.price * item.count;
      });
      return price;
    }
  },
  methods: {
    ...mapActions(['loadAddress']),
    select (selection, row) {
      console.log(selection);
      this.goodsCheckList = selection;
    },
    changeAddress (data) {
      const father = this;
      this.address.forEach(item => {
        if (item.addressId === data) {
          father.checkAddress.name = item.name;
          father.checkAddress.address = `${item.name} ${item.province} ${item.city} ${item.address} ${item.phone} ${item.postalcode}`;
        }
      });
    }
  },
  mounted () {
    setTimeout(() => {
      // this.$refs.selection.selectAll(true);
    }, 500);
  },
  components: {
    Search,
    GoodsListNav
  },
  store
};
</script>

<style scoped>
.order-header{
  position: relative;
  left: 10%;
  width: 80%;
  height: 72px;
  border-bottom: 3px solid lightslategray;
}
.order-header span{
  position: absolute;
  line-height: 50px;
  text-align: center;
  margin-top: 20px;
}
.goods-list-container {
  margin: 15px auto;
  width: 80%;
}
.tips-box {
  margin-bottom: 15px;
}
.address-container {
  margin-top: 15px;
}
.address-box {
  margin-top: 15px;
  padding: 15px;
  border: 1px #ccc dotted;
}
.address-check {
  margin: 15px 0px;
  height: 36px;
  display: flex;
  align-items: center;
}
.address-check-name {
  width: 120px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #ccc;
}
.address-check-name span {
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background-color: darksalmon;
}
.address-detail {
  padding-left: 15px;
  font-size: 14px;
  color: #999999;
}
.remarks-container {
  margin: 15px 0px;
}
.remarks-input {
  margin-top: 15px;
}
.invoices-container p{
  font-size: 12px;
  line-height: 30px;
  color: #999;
}
.pay-container {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
.pay-box {
  font-size: 18px;
  font-weight: bolder;
  color: #495060;
}
.money {
  font-size: 26px;
  color: #f90013;
}
.pay-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
