/*
 * @Author: Gavin
 * @Date: 2018-06-11 11:27:10
 * @Last Modified by: Gavin
 * @Last Modified time: 2018-06-11 12:23:40
 * @Describe: 搜索商品导航标签
 */
<template>
  <div class="item-class-show">
    <Row class="item-class-group" v-for="(items, index) in tagsInfo" :key="index">
      <i-col class="item-class-name" span="3">{{ items.tagName }} : </i-col>
      <i-col class="item-class-select" span="21">
        <span v-for="(item, subIndex) in items.tags" :key="subIndex">{{ item }}</span>
      </i-col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../../../static/js/api';

export default {
  name: 'GoodsClassNav',
  created () {
    const  _this=this
    axios.get(api.path+"productManage/lookUpAllCatogory").then(function (resp) {
      console.log(resp.data.data)
//取对象中的某一个属性形成新数组
       let arrnew = resp.data.data.map(obj => {
            return obj.cname;
        })
      _this.tagsInfo[0].tags=arrnew

    })
  },
  data () {
    return {
      tagsInfo: [
        {
          tagName: '按类别查询',
          tags: [ ]
        },
        {
          tagName: '按价格查询',
          tags: [ '0-100', '100-500', '500-1000', '1000-5000', '5000-10000', '10000-15000', '15000以上' ]
        },
        {
          tagName: '按浏览量查询',
          tags: [ '0-100', '100-500', '500-1000', '1000-5000', '5000-10000', '10000-1500', '15000以上']
        },
      ]
    };
  }
};
</script>

<style scoped>
.item-class-show {
  margin: 15px auto;
  width: 100%;
}
.item-class-group {
  margin-top: 1px;
  height: 45px;
  border-bottom: 1px solid #ccc;
}
.item-class-group:first-child {
  border-top: 1px solid #ccc;
}
.item-class-name {
  padding-left: 15px;
  line-height: 44px;
  color: #666;
  font-weight: bold;
  background-color: #f3f3f3;
}
.item-class-name:first-child {
  line-height: 43px;
}
.item-class-select span {
  margin-left: 15px;
  width: 160px;
  color: #005aa0;
  line-height: 45px;
  cursor: pointer;
}
</style>
