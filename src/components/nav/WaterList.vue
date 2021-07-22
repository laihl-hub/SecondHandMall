<template>
  <div>
    <div class="box" >
      <div class="waterfall" style="background-color: rgba(234,234,234,0.64)">
        <vue-waterfall-easy
          ref="waterfall"
          :imgsArr="imgsArr"
          :maxCols="4"
          @scrollReachBottom="getData"
          @click="clickFn">
          <div class="info  waterfallInfo" slot-scope="props" >
            <el-row  :gutter="20"  style="margin-top: 10px;margin-bottom: 20px;">
              <el-col :span="20" style="font-size: 22px;;color: #2c2c2c; text-align: left;margin-left: 7px">
                {{props.value.productInfo.pname|ellipsis_pname}}</el-col>
            </el-row>
            <el-row style="margin-bottom: 10px" :gutter="20">
              <el-col :span="12" style="font-size: 12px;color: #6e6568;"
              >发布于:{{props.value.productInfo.ptime|convertTime('YYYY-MM-DD')}}</el-col>
              <el-col :span="10" :offset="0" style="font-size: 12px;color: #6e6568"
              >浏览人数:{{props.value.productInfo.pviewNum}}</el-col>
            </el-row>
            <el-row style="margin-bottom:20px ">
              <el-col :span="30" :offset="1" style="font-size: 15px;color: #2c2c2c;text-align: left">
                {{props.value.productInfo.pintro |ellipsis}} </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4" :offset="1" style="font-size: 15px;color: #e01222;">
                <span style="">￥{{props.value.productInfo.pprice}}</span> </el-col>
              <el-col :span="10" :offset="5" style="font-size: 15px;color: #2d8cf0;text-align: right;white-space: nowrap">
                {{props.value.productInfo.uschool|ellipsis_uschool}} </el-col>
            </el-row>
          </div>
        </vue-waterfall-easy>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import api from "../../../static/js/api";
import vueWaterfallEasy from "vue-waterfall-easy";
import Moment from "moment";

export default {
  mounted () {
    this.getData()
  },
  data(){
    return{
      setIntervalObj: null,
      page: 0,
      imgsArr:[]
    }
  },
  methods:{
    clickFn(event, { index, value }) {
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == 'img') {
      }
      this.$router.push({name:'GoodsDetail',query: {
          pid:value.productInfo.pid,
          cname:value.productInfo.cname,
          pname:value.productInfo.pname
        }})
      // window.location.reload()
    },
    getData () {
      const _this=this
      axios.get(api.path+'productManage/lookUpWaterfallProduct').then( function (resp) {
        let waterfall = resp.data.data
        let arrnew = waterfall.map((item,index) => {
          return Object.assign({},{'src':'../../../static/img/goodsList/'+item.pimg,
              'productInfo':item
            }
          )
        })
        _this.page += 1;
        if (_this.page == 5) {
          _this.$refs.waterfall.waterfallOver();
        } else {
          _this.imgsArr = _this.imgsArr.concat(arrnew);
        }
      })}
  },
  components:{
    vueWaterfallEasy,
  },
  filters:{
    ellipsis:function (value){
      if(!value){
        return ''
      }
      if (value.length>25){
        return value.slice(0,25)+'...'
      }
      else {
        return value
      }
    },
    ellipsis_uschool(value){
      if(!value){
        return ''
      }
      if (value.length>8){
        return value.slice(0,8)+'...'
      }
      else {
        return value
      }
    },
    ellipsis_pname(value){
      if(!value){
        return ''
      }
      if (value.length>7){
        return value.slice(0,8)+'...'
      }
      else {
        return value
      }
    },
    //引入moment.js时间格式化库
    convertTime: function (data, format) {
      return Moment(data).format(format)}
  },
  destroyed () {
    clearInterval(this.setIntervalObj);
  },
  watch: {
    waterfall(newVal) {
      return newVal
    },
    '$route' (to, from) {
      // 路由发生变化页面刷新
      this.$router.go(0);
    }
  },
  // store
}
</script>

<style scoped>
.waterfall {
  height: 1000px;
}
.waterfallInfo{
  cursor: pointer;
  transition: all 0.5s; /* 所有的属性变化在0.5s的时间段内完成 */
  opacity:0.9;
}
.waterfallInfo:hover{
  transform: scale(1.02); /* 鼠标放到图片上的时候图片按比例放大1.5倍   */
  opacity:1.0;

}
</style>
