<template>
  <div>
    <Search></Search>
    <div class="container">
      <div class="bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 首页
          </BreadcrumbItem>
          <BreadcrumbItem :to="{path:'/goodsList/',query:{
            way:0
          }}">

            {{breadcrumbItem1}}
          </BreadcrumbItem>
          <BreadcrumbItem>{{breadcrumbItem2}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <!-- 商品标签导航 -->
      <GoodsClassNav></GoodsClassNav>
      <!-- 商品展示容器 -->
      <div class="goods-box">
        <div class="as-box">
          <div class="item-as-title">
            <span>求购信息</span>
            <span>求购</span>
          </div>
          <div class="item-as" v-for="(item,index) in wantsList" :key="index">
            <div class="item-as-img">
              <img src="static/img/want.jpg" style="width: 250px;height: 130px" alt="">
            </div>
            <div class="item-as-intro" style="font-size: 15px">
              求购物品:<span style="color: #6da6be;">{{item.buyProductName}}</span>
            </div>
            <div class="item-as-selled" style="font-size: 15px">
              学校:<span>{{item.buyBuyerSchool}}</span>
            </div>
            <div class="item-as-price" style="font-size: 15px">
              <span>
<!--                <Icon type="social-yen text-danger"></Icon>-->
                call me:<span class="seckill-price text-danger">{{item.buyPhone}}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="goods-list-box">
          <div class="goods-list-tool">
            <ul>
              <li v-for="(item,index) in goodsTool" :key="index" @click="orderBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{item.title}} <Icon :type="icon[index]"></Icon></span></li>
            </ul>
          </div>
          <div class="goods-list">

            <div class="goods-show-info" v-for="(item, index) in productInfo " :key="index" style="margin-left: 20px">
              <div class="goods-show-img"  >
                <router-link :to="{path:'/goodsDetail',query:{
                  pid:item.pid,
                  cname:item.cname,
                  pname:item.pname
                }
                }">
                  <img :src="'../../static/img/goodsList/'+item.pimg" style="width: 100%"/>

                </router-link>
              </div>
              <div class="goods-show-name">
                <span>
                  <span class="goods-show-pname">{{item.pname}}</span>
                </span>
              </div>
              <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">{{item.pprice}}</span>
                </span>
              </div>
              <div class="goods-show-detail">
                <span>{{item.pintro}}</span>
              </div>
              <div class="goods-show-num">
                已有<span>{{item.pviewNum}}</span>人浏览
              </div>
              <div class="goods-show-seller">
                <span>{{item.uname}}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div class="goods-page">
        <Page :total="100" show-sizer></Page>
      </div>
    </div>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsListNav from '@/components/nav/GoodsListNav';
import GoodsClassNav from '@/components/nav/GoodsClassNav';
import store from '@/vuex/store';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
import api from '../../static/js/api';
export default {
  name: 'GoodsList',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data () {
    return {
      searchItem: '',
      isAction: [ true, false, false ],
      icon: [ 'arrow-up-a', 'arrow-down-a', 'arrow-down-a' ],
      goodsTool: [
        {title: '综合', en: 'sale'},
        {title: '评论数', en: 'remarks'},
        {title: '价格', en: 'price'}
      ],
      productInfo:[
        {
          cname: "",
          pid: 0,
          pintro: "",
          pname: "",
          pprice: 0,
          pstate: 0,
          ptime: "0",
          pviewNum: 0,
          sellerId: 0,
          uname:''
        }
      ],
      query: {
        way:0,
        condition:''
      },
      breadcrumbItem1:'',
      breadcrumbItem2:'',
      wayData: {
        '0': {
          label: '全部商品'
        },
        '1': {
          label: '按类别查询商品'
        },
        '2': {
          label: '按价格范围查询商品'
        },
        '3':{
          label:'按浏览量查询商品'
        }
      }



    };
  },
computed:{
    // ...mapState(['asItems','isLoading'])
  ...mapState(['wantsList','isLoading'])
},
  methods: {
    // ...mapActions(['loadGoodsList']),
    ...mapActions(['loadAllWants']),
    ...mapMutations(['SET_GOODS_ORDER_BY']),
    orderBy (data, index) {
      this.icon = [ 'arrow-down-a', 'arrow-down-a', 'arrow-down-a' ];
      this.isAction = [ false, false, false ];
      this.isAction[index] = true;
      this.icon[index] = 'arrow-up-a';
      this.SET_GOODS_ORDER_BY(data);
    },
    loadProductList(){
      const _this=this
      //way=0:查询全部，way=1按类别，way=2按价格，way=3按浏览量
      if(this.query.way==0)
        axios.get(api.path+"productManage/lookUpProductDetail").then(function (resp){
          console.log(_this.productInfo)
            _this.productInfo=resp.data.data

        })
      else if(this.query.way==1){
        axios.get(api.path+"productManage/listProductByCname/"+this.query.condition).then(function (resp){
          _this.productInfo=resp.data.data
        })}


      else if(this.query.way==2){
        axios.get(api.path+"productManage/listProductByPriceRange/"+this.query.condition).then(function (resp){
          console.log(resp.data.data)
          _this.productInfo=resp.data.data
        })
      }

      else if(this.query.way==3){
        axios.get(api.path+"/productManage/listProductByViewNumRange/"+this.query.condition).then(function (resp){
          _this.productInfo=resp.data.data
        })
      }


    }

  },

  created () {
    this.query.way=this.$route.query.way
    this.breadcrumbItem1=this.wayData[this.query.way].label
    this.breadcrumbItem2=this.$route.query.condition
    this.query.condition=this.$route.query.condition
    this.loadProductList()
    // this.loadGoodsList();
    this.loadAllWants()

  },
  updated () {
    this.$nextTick(function(){
      //在下次 DOM 更新循环结束之后执行这个回调。在修改数据之后立即使用这个方法，获取更新后的DOM.
      this.loadProductList()
    })

  },
  mounted () {

  },
  components: {
    Search,
    GoodsListNav,
    GoodsClassNav
  },
  store
};
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}
.text-danger {
  color: darksalmon;
}
.seckill-price{
  margin-right: 5px;
  /*font-size: 25px;*/
  font-weight: bold;
}
.goods-box {
  display: flex;
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 280px;
  border: 1px solid #ccc;
  /*background-color: #eeeeee;*/

}
.item-as-title{
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child{
  margin-left: 20px;
}
.item-as-title span:last-child{
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as{
  width: 260px;
  margin: 30px auto;
  border: 1px groove lightgray;
  background-color: #e4f4fc;
}
.item-as-img{
  width: 250px;
  height: 130px;
  margin: 0px auto;
}
.item-as-price span{
  font-size: 18px;
}
.item-as-intro{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span{
  color: #005AA0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px);
}
.goods-list-tool{
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}
.goods-list-tool ul{
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li{
  cursor: pointer;
  float: left;
}
.goods-list-tool span{
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover{
  border: 1px solid #E4393C;
}
.goods-list-tool i:hover{
  color: #E4393C;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
}

.goods-show-info{
  width: 300px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}

.goods-show-info:hover{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}

.goods-show-price{
  margin-top: 6px;
}

.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px;
}

.goods-show-num{
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}

.goods-show-num span{
  color: #005AA0;
  font-weight: bold;
}

.goods-show-seller{
  font-size: 12px;
  color:#E4393C;
}

.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.goods-show-img{
  overflow: hidden;display: block;
  height: 300px;
  cursor: pointer;
}
.goods-show-pname{
  margin-top: 5px;
  font-size: 20px;
}
/* ---------------商品栏结束------------------- */
</style>
