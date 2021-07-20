<template>
  <div>
    <Search></Search>
    <div class="shop-item-path">
      <div class="shop-nav-container">
        <Breadcrumb separator="<b style=' color: #ff5500;padding: 0 5px;'>/</b>">
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem :to="{path:'/goodsList/',query:{
            way:1,condition:this.$route.query.cname
          }}">{{this.$route.query.cname}}</BreadcrumbItem>
          <BreadcrumbItem>{{this.$route.query.pname}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <!-- 商品信息展示 -->
    <ShowGoods></ShowGoods>
    <!-- 商品详细展示 -->
    <ShowGoodsDetail></ShowGoodsDetail>

  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsDetailNav from '@/components/nav/GoodsDetailNav';
import ShopHeader from '@/components/header/ShopHeader';
import ShowGoods from '@/components/goodsDetail/ShowGoods';
import ShowGoodsDetail from '@/components/goodsDetail/ShowGoodsDetail';
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import api from '../../static/js/api';
export default {
  name: 'GoodsDetail',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  created () {
    this.loadGoodsInfo();
  },
  data () {
    return {
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ],
      pid:0,

    };
  },
  methods: {
    ...mapActions(['loadGoodsInfo'])
  },
  computed: {
    ...mapState(['goodsInfo', 'isLoading'])
  },
  components: {
    Search,
    ShopHeader,
    GoodsDetailNav,
    ShowGoods,
    ShowGoodsDetail
  },
  store
};
</script>

<style scoped>
.shop-item-path {
  height: 38px;
  background-color: rgb(236, 235, 235);
  line-height: 38px;
  color: #2c2c2c;
}
.shop-nav-container {
  margin: 0px auto;
  width: 80%;
}


</style>
