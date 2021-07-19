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
                  <Icon type="ios-person" size="22"></Icon>
                </Tooltip>
                <span class=" " style="">卖家名称:</span>
                <span class=" " style="">{{productInfo.uname}}</span>
              </Col>
            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="卖家地址" style="padding-right: 5px">
              <Icon type="location" size="22" style="padding-left: 3px"></Icon>
            </Tooltip>
              <span>卖家学校:</span>
              <span class=" " style="">{{productInfo.uschool}}</span>
            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="卖家联系方式" style="padding-right: 5px">
              <Icon type="ios-chatbubble" size="20"></Icon>
            </Tooltip>
              <span>卖家联系方式:</span>
              <span class=" " style="">{{productInfo.uphoneNum}}</span>
            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="商品标签" style="padding-right: 5px">
              <Icon type="bookmark" size="22" style="padding-right: 10px;padding-left: 2px"></Icon>
              <Tag color="red">99新</Tag>
              <Tag color="red">卖家包邮</Tag>
              <Tag color="red">正品保证</Tag>
            </Tooltip>


            </Row>

            <Row style="padding-bottom: 10px"> <Tooltip content="商品描述" style="padding-right: 5px">
              <Icon type="ios-information"  size="18"></Icon>
            </Tooltip>
              <span>商品描述:</span>
              <br>
              <div style="margin-top: 5px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{productInfo.pintro}}</div>
            </Row>

            <Row span="" style="padding-bottom: 10px"> <Tooltip content="商品现价" style="padding-right: 5px">
              <Icon type="pricetags" size="18"></Icon>
            </Tooltip>
              <span>商品价格:</span>
              <span class="item-in-card item-detail-express"  >{{productInfo.pprice}}元</span>
              <span style="padding-left: 50px;text-decoration:line-through">原价1000元</span>

            </Row>


          </Col>





        </Card>
        <br>

        <div class="add-buy-car-box">
          <Col span="20">
        <Row style="margin-bottom:5px ">
          <span class="add-buy-car">
            <Button type="error" size="large" @click="buyProductBtn()">购买</Button>
          </span>
        </Row>
            <Row>
          <span class="add-buy-car">
            <Button type="error" size="large" @click="addStoreBtn()">加入收藏</Button>
          </span>

          <span class="add-buy-car">
            <Button type="error" size="large" @click="addShoppingCartBtn()">加入购物车</Button>
          </span>
            </Row>
          </Col>

        </div>
      </div>
    </div>
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
      imgIndex: 0,
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
      axios.get(api.path_local + 'productManage/lookUpProductDetailByPid/' + _this.$route.query.pid).
      then(function (resp){
        _this.productInfo=resp.data.data
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
      this.$Message.success('收藏成功，你可以在你的个人中心查看你收藏的商品');
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
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
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
/******************商品图片及购买详情结束******************/
</style>
