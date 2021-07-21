<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="shoppingCart"  size="large" no-data-text="您的购物车没有商品，
    请先添加商品到购物车再点击购买" @on-select="getClick" ></Table>
    <div class="go-to">
      <Button @click="del" type="ghost" style="margin-right: 20px;background-color: lightpink;" :disabled="!hasSelected">删除</Button>
      <Button @click="goTo" type="ghost" style="background-color: lightblue;" :disabled="!hasSelected">去付款</Button>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import api from '../../../static/js/api';
export default {
  name: 'MyShoppingCart',
  data () {
    return {
      selectedSpId:null,
      hasSelected:false,
      selectedPid:null,
      // tableData:null,
      columns: [
        {
          type: 'selection',
          width: 100,
          align: 'center'
        },
        {
          title: '图片',
          key: 'pimg',
          width: 270,

          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: '../../../static/img/goodsList/'+params.row.pimg,style:'height:170px'
                }
              })
            ]);
          },
          align: 'center'

        },
        {
          title: '商品名',
          width: 100,
          key: 'pname',
          align: 'center',
          // className:'goods'
          // size:"500"
        },
        {
          title: '商品简介',
          key: 'pintro',
          align: 'center'
        },
        {
          title: '价格(元)',
          width: 120,
          key: 'pprice',
          align: 'center'

        },
        {
          title: '添加时间',
          key: 'spAddTime',
          width: 300,
          align: 'center',
        }
      ]
    };
  },
  created () {
    this.loadShoppingCart()
    // this.tableData=this.shoppingCart
    // for(let i=0;i<this.tableData.length;i++){
    //   this.tableData[i].spAddTime=this.convertTime(this.tableData[i].spAddTime,'YYYY-MM-DD HH:MM:SS')
    // }
    // console.log(this.tableData)
  },
  computed: {
    ...mapState(['shoppingCart'])
  },
  methods: {
    ...mapActions(['loadShoppingCart']),
    goTo () {

      this.$router.push({name:'Order',query:{pid:this.selectedPid}});
    },
    del () {
      const  _this=this;
      // console.log(_this.address[index].rid)
      _this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个该商品？',
        onOk: () => {
          axios.get(api.path+'userShoppingManage/deleteShoppingCarProductBySpId/'+_this.selectedSpId)
            .then(function (response){
              if(response.data.code===200) {
                _this.$Message.success('删除成功')
                window.location.reload()
                // _this.$router.push('/home/myAddress')
              }else {
                _this.$Message.error('删除失败')
              }
            })
        },
        onCancel: () => {
          this.$Message.info('取消成功');
          _this.modal=false;
        }
      });
      console.log(_this.data)
    },
     convertTime: function (data, format) {
      return Moment(data).format(format)},
    getClick(selection,row){
      console.log(row)
        this.selectedSpId=row.spId
      this.selectedPid=row.pid
      // console.log(this.selectedSpId)
        this.hasSelected=true
    }
  },
  store
};
</script>

<style scoped>
.go-to {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}

</style>
