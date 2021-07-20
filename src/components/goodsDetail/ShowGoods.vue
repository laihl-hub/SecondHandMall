<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
<!--        大照片显示-->
        <div class="item-detail-big-img">
          <img :src="'../../static/img/goodsList/'+productInfo.pimg" alt="">
        </div>
<!--        -->
        <div class="item-detail-img-row">
          <div class="item-detail-img-small">
            <img :src="'../../static/img/goodsList/'+productInfo.pimg" alt="">
          </div>
        </div>
      </div>

      <div class="item-detail-right">
        <Card style="width:700px">
        <div class="item-detail-title" style="padding-bottom: 5px">
          <p>
            <span class="item-detail-express">官方担保交易</span> {{productInfo.pname}}</p>
        </div>
        <div class="item-detail-tag" style="padding-bottom: 25px">
          <p>
            <span>一口价</span>
            <span>不退款</span>
            <span>当天发货</span>
          </p>
        </div>


          <Col span="24">

            <Row style="padding-bottom: 10px">
              <Col span="10" >
                <Tooltip content="商品卖家" style="padding-right: 5px">
                  <Icon type="social-snapchat-outline" size="22"></Icon>
                </Tooltip>
                <span class=" " style="">卖家名称:</span>
                <span class=" " style="">{{productInfo.uname}}</span>
              </Col>
            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="卖家地址" style="padding-right: 5px">
              <Icon type="ios-location-outline" size="22" style="padding-left: 3px;padding-right: 5px"></Icon>
            </Tooltip>
              <span>卖家学校:</span>
              <span class=" " style="">{{productInfo.uschool}}</span>
            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="卖家联系方式" style="padding-right: 5px">
              <Icon type="iphone" size="22" style="padding-left: 5px;padding-right: 7px"></Icon>
            </Tooltip>
              <span>卖家联系方式:</span>
              <span class=" " style="">{{productInfo.uphoneNum}}</span>
            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="商品标签" style="padding-right: 5px">
              <Icon type="ios-pricetags-outline" size="22" style="padding-right:9px"></Icon>
              <el-tag type="success">标签二</el-tag>
              <el-tag type="info">标签三</el-tag>
              <el-tag type="warning">标签四</el-tag>
            </Tooltip>


            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="商品描述" style="padding-right: 5px">
              <Icon type="ios-paper-outline" size="22" style="padding-right: 5px"></Icon>
            </Tooltip>
              <span>商品描述:</span>
              <br>
              <div style="margin-top: 5px;margin-left: 7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{productInfo.pintro}}</div>
            </Row>

            <Row span="" style="padding-bottom: 10px"> <Tooltip content="商品现价" style="padding-right: 5px">
              <Icon type="social-yen-outline" size="18" style="padding-left: 5px;padding-right: 2px"></Icon>
            </Tooltip>
              <span>商品价格:</span>
              <span class="item-in-card item-detail-express" >{{productInfo.pprice}}
                <label style="font-size: small;color: #6e6568;padding-left: 2px" >RMB</label></span>
              <span style="padding-left: 50px;text-decoration:line-through">入手价1000元</span>
            </Row>
          </Col>
        </Card>
        <br>
        <div class="add-buy-car-box">

        <Row style="margin-bottom:5px ">
          <Col :span="5" >
            <span class="sp1" style="display: inline-block;margin: 10px 50px">
              <Icon type="android-favorite" size="30" @click="addStoreBtn"  v-bind:class="{change:isClicked}"></Icon>
              <!--            <Button type="error" size="large" @click="addStoreBtn()">加入收藏</Button>-->
          </span>
          </Col>
          <Col :span="15" >
            <span class="add-buy-car" style="display:inline-block;margin: 10px 10px">
              <Button-group shape="circle">
              <Button type="ghost" style="background-color: peachpuff">加入购物车</Button>
              <Button type="ghost" style="background-color: lightsteelblue" >立即购买</Button>
            </Button-group>
            </span>

          </Col>

        </Row>
<!--            <Row>-->
<!--          <span class="add-buy-car">-->
<!--            <Button type="error" size="large" @click="addStoreBtn()">加入收藏</Button>-->
<!--          </span>-->
<!--          <span class="add-buy-car">-->
<!--            <Button type="error" size="large" @click="addShoppingCartBtn()">加入购物车</Button>-->
<!--          </span>-->
<!--            </Row>-->

        </div>
      </div>
    </div>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import api from '../../../static/js/api';
export default {
  name: 'ShowGoods',
  data () {
    return {
      isClicked:false,
      imgIndex: 0,
      isLoading:true,
      productInfo:{
        cname: "",
        pimg: "",
        pintro: "",
        pname: "",
        pprice: 0,
        pviewNum: 0,
        uname:'',
        uphoneNum: '',
        pid:0,
        uid:0
      }
    };
  },
  created () {
    if(this.$route.query.pid) {
      const _this=this
      axios.get(api.path + 'productManage/lookUpProductDetailByPid/' + _this.$route.query.pid).
      then(function (resp){
        _this.productInfo=resp.data.data
        _this.isLoading=false;
      })
    }

  },

  computed: {
    ...mapState(['goodsInfo']),

  },
  methods: {
    ...mapActions(['addShoppingCart']),
    addShoppingCartBtn () {
    let postData={
      pid:this.productInfo.pid,
      uid:Cookies.get('userid')
    }
    const _this=this
    axios.post(api.path+"userShoppingManage/addProductToShoppingCar",postData).then(
      function (resp){
        if(resp.data.code==200){
          _this.$Message.success('加入购物车成功，你可以在你的个人中心查看你的购物车');
        }
        else{
          _this.$Message.error('添加购物车失败，请检查网络连接');
        }
      }
    )


    },
    addStoreBtn () {
      // const index1 = parseInt(this.selectBoxIndex / 3);
      // const index2 = this.selectBoxIndex % 3;
      // const date = new Date();
      // const goodsId = date.getTime();
      // const data = {
      //   goods_id: goodsId,
      //   title: this.goodsInfo.title,
      //   count: this.count,
      //   package: this.goodsInfo.setMeal[index1][index2]
      // };
      if(this.isClicked){
        this.$message.warning('取消收藏成功')
      }else {
        this.$Message.success('收藏成功，你可以在你的个人中心查看你收藏的商品');
      }
      this.isClicked=!this.isClicked

      // this.addShoppingCart(data);
      // this.$router.push('/shoppingCart');
    },
    buyProductBtn () {
      // const index1 = parseInt(this.selectBoxIndex / 3);
      // const index2 = this.selectBoxIndex % 3;
      // const date = new Date();
      // const goodsId = date.getTime();
      // const data = {
      //   goods_id: goodsId,
      //   title: this.goodsInfo.title,
      //   count: this.count,
      //   package: this.goodsInfo.setMeal[index1][index2]
      // };
      this.$Message.success('正在跳转支付页面');
      // this.addShoppingCart(data);
      // this.$router.push('/shoppingCart');
    }
  },
  mounted () {
    const father = this;
    setTimeout(() => {
      father.price = father.goodsInfo.setMeal[0][0].price || 0;
    }, 300);
  },
  store
};
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 350px;
  margin-right: 30px;
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  overflow: hidden;
}
.item-detail-big-img img {
  width: 100%;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 5px 5px;
  border-radius: 3px;
  background-color: lavender;
  color: black;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: lightslategray;
}



.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}

.item-select-img img {
  width: 100%;
}
.item-select-intro p {
  margin: 0px;
  padding: 5px;
}
.item-in-card{
  font-size: 25px;
  background-color: white;
  color: red;
}

.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}
.add-buy-car {
  margin-top: 15px;
}
.change{
  color: lightpink;
}
.sp1{
  color: #cccccc;
}
/******************商品图片及购买详情结束******************/
</style>
