<template>
  <div>
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
                call me:<span class="seckill-price text-danger">{{item.buyPhone}}</span>
              </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import store from '@/vuex/store';

export default {
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  computed:{
    ...mapState(['wantsList','isLoading'])
  },
  methods:{
    ...mapActions(['loadAllWants']),
  },
  created() {
    this.loadAllWants()
  },
  store
}
</script>

<style scoped>
.as-box {
  width: 280px;
  border: 1px solid #ccc;
  height: 1000px;
  overflow: scroll;
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
</style>
