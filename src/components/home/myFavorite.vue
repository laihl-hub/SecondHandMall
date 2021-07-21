<template>
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>我的收藏</h2>-->
<!--    </Header>-->
    <div class="store-box" v-for="(item, index) in store" :key="index">
      <div class="store-header">
        <span>{{ item.pname }}</span>
        <div class="store-action">
          <span @click="buy(index)"><Icon class="el-icon-shopping-bag-1"></Icon> 去购买</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除收藏</span>
        </div>
      </div>
      <div class="store-content">
        <el-row>
          <el-col :span="6"
            ><img :src="'../../../static/img/goodsList/'+item.pimg" width="150px" height="150px"
          /></el-col>
          <el-col :span="10"><div style="display: inline-block">
              <p><span class="store-content-title"> 商品名称 :</span>{{ item.pname }}</p>
              <p><span class="store-content-title">商品价格:</span>{{ item.pprice }}</p>
              <p><span class="store-content-title">联系方式:</span>{{ item.phone }}</p>
              <p><span class="store-content-title">简介:</span> {{ item.pintro }}</p>
              <p><span class="store-content-title">收藏时间:</span> {{ convertTime(item.storeTime,'YYYY-MM-DD')}}</p>
            </div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import api from "../../../static/js/api";
import Moment from "moment";
export default {
  name: "Mystore",
  data() {
    return {

    };
  },
  created() {
    this.loadStore();
  },
  computed: {
    ...mapState(["store"]),
  },
  methods: {
    ...mapActions(["loadStore"]),
    buy (index) {
      this.$router.push({name:'Order',query:{pid:this.store[index].pid}});
    },
    convertTime: function (data, format) {
      return Moment(data).utcOffset(0).format(format)
    },
    del(index) {
      const  _this=this;
      console.log(_this.store[index].storeId)
      _this.$Modal.confirm({
        title: "信息提醒",
        content: "你确定删除这个收藏？",
        onOk: () => {
          axios.get(api.path+'userStoreManage/deleteStoreByStoreId/'+_this.store[index].storeId)
          .then(function (response){
            if(response.data.code===200) {
              _this.$message.success('删除成功')
              // _this.$router.push('/home/myFavorite')
              window.location.reload()
            }else {
              _this.$message.error('删除失败')
            }
          })
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        },
      });
    },
  },
  components: {
  },
  store,
};
</script>

<style scoped>
.store-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}
.store-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.store-content {
  font-size: 20px;
  font-family: "楷体";
}

.store-content-title {
  color: #999;
}
.store-action span {
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
