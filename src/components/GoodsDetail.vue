<template>
  <div class="container">
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

    <div class="bottom-box" style="width: 80%;position: relative;left: 10%;margin-top: 50px;">
      <span style="display: block;width: 100%;height: 50px;background-color: #6da6be;position: absolute;line-height: 50px"><h3 style="margin-left: 50px">其他商品</h3></span>
      <div style="width: 20%;display: inline-block;position: absolute;top: 52px">
        <AllWants></AllWants>
      </div>
      <div style="width: 79%;display: inline-block;position:absolute;left:21%;top: 50px">
        <WaterList></WaterList>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import ShowGoods from '@/components/goodsDetail/ShowGoods';
import store from '@/vuex/store';
import axios from 'axios';
import api from '../../static/js/api';
import WaterList from "./nav/WaterList";
import AllWants from "./nav/AllWants";
import Footer from "./footer/Footer";
export default {
  name: 'GoodsDetail',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data () {
    return {
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ],
      pid:0,
    };
  },
  components: {
    Search,
    ShowGoods,
    WaterList,
    AllWants,
    Footer
  },
  store
};
</script>

<style scoped>
.container{
  background-color: rgba(223, 237, 245, 0.73);
  height: 1700px;
}
.shop-item-path {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 38px;
  background-color: rgba(90,140,167,0.49);
  line-height: 38px;
  color: #2c2c2c;
}
.shop-nav-container {
  margin: 0px 10px;
  width: 80%;
}
.bottom-box{
  display: flex;
}
</style>
