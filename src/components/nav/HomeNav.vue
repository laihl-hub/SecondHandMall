<template>
  <div>
    <div class="nav-item">
    </div>
    <div class="nav-body">
      <!-- 侧边导航 -->
      <div class="nav-side" ref="navSide">

        <ul>
          <li v-for="(item, index) in catogory":key="item.cid" >
            <router-link :to="{path:'/goodsList',query:{ way:1,
            condition:item.cname
            }}">
            <span class="nav-side-item" >{{item.cname}}
                 <Icon type="arrow-right-b" style=" float:right;padding-left: 50px  "></Icon>
            </span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="nav-content">
        <!-- 幻灯片 -->
        <div>
          <Carousel autoplay loop>
              <CarouselItem  v-for="(item, index) in marketing.CarouselItems" :key="index">
                <router-link :to="{path:'/goodsList',query:{ way:0
            }}">
                  <img :src="item"  display="block" width="100%" height="450">
                </router-link>
              </CarouselItem>
          </Carousel>
        </div>
<!--        <div class="nav-show">-->
<!--          <div class="nav-show-img" v-for="(item, index) in marketing.activity" :key="index">-->
<!--            <router-link :to="{path:'/goodsList',query:{ way:0-->
<!--            }}">-->
<!--              <img :src="item" display="block" width="100%" height="450">-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState } from 'vuex';
import axios from 'axios';
import api from '../../../static/js/api';
export default {
  name: 'HomeNav',
  data () {
    return {
      panel1: false,
      panel2: false,
      catogory:[]
    };
  },
  computed: {
    ...mapState(['marketing'])
  },
  methods: {
    //获取分类信息
    loadCatogory(){
      let _this=this
      axios.get(api.path+"productManage/lookUpAllCatogory").then(function (resp){
        _this.catogory=resp.data.data
      })
    }
  },
  created () {
    this.loadCatogory()
  },
  store
};
</script>

<style scoped>
.nav-item {
  width: 680px;
  height: 36px;
  margin: 0px auto;
}
.nav-item ul {
  list-style: none;
  margin-left: 15px;
}
.nav-item li {
  float: left;
  font-size: 16px;
  font-weight: bold;
  margin-left: 30px;
}
.nav-item a {
  text-decoration: none;
  color: #555555;
}
.nav-item a:hover {
  color: #d9534f;
}
/*大的导航信息，包含导航，幻灯片等*/
.nav-body {
  width: 1070px;
  height: 485px;
  margin: 0px auto;
}
.nav-side {
  width: 240px;
  height: 94%;
  padding: 0px;
  color: hsla(0,0%,100%,.6);
  float: left;
  background-color: #2B333B;
  border-radius: 15px;
  overflow: scroll;
  overflow-x: hidden;

}
.nav-side::-webkit-scrollbar { width: 0 !important }
.nav-side ul {
  width: 100%;
  padding: 0px;
  padding-top: 15px;
  list-style: none;
}
.nav-side li {
  padding: 7.5px;
  padding-left: 15px;
  font-size: 15px;
  line-height: 18px;
  padding-top: 25px;
  padding-bottom: 20px;
}
.nav-side li:hover {
  background: #999395;
}

.nav-side-item{
  color: hsla(0,0%,100%,.6);
}
.nav-side-item:hover {
  cursor: pointer;
  color: #c81623;
}

/*导航内容*/
.nav-content {
  width: 792px;
  margin-left: 10px;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
.nav-detail-item span {
  padding: 6px;
  padding-left: 12px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6e6568;
}
.nav-detail-item span:hover {
  margin-left: 15px;
  background-color: #f44336;
}
.detail-item-panel ul {
  list-style: none;
}
.detail-item-panel li {
  line-height: 38px;
  margin-left: 40px;
}
</style>
