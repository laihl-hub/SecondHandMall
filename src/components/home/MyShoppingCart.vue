<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="shoppingCart" size="large" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>
    <div class="go-to">
      <Button @click="goTo" type="primary">去付款</Button>
      
    </div>
    <!-- <Button @click="del" type="primary">删除</Button> -->

  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from "axios";
import api from "../../../static/js/api";
export default {
  name: 'MyShoppingCart',
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 58,
          align: 'center'
        },
        {
          title: '图片',
          key: 'pimg',
          width: 86,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '标题',
          key: 'pname',
          width:200,
          align: 'center'
        },
        {
          title: '简介',
          // width: 198,
          key: 'pintro',
          align: 'center'
        },
        {
          title: '时间',
          key: 'spAddTime',
          width: 200,
          align: 'center'
        },
        {
          title: '价格',
          width: 68,
          key: 'pprice',
          align: 'center'
        }
      ]
    };
  },
  created () {
    this.loadShoppingCart();
  },
  computed: {
    ...mapState(['shoppingCart'])
  },
  methods: {
    ...mapActions(['loadShoppingCart']),

    del(index) {
      const  _this=this;
      console.log(_this.shoppingCart.selection.spId)
      _this.$Modal.confirm({
        title: "信息提醒",
        content: "你确定删除这个商品？",
        onOk: () => {
          axios.get(api.path+'userShoppingManage/deleteShoppingCarProductBySpId/'+_this.shoppingCart.selection)
          .then(function (response){
            if(response.data.code===200) {
              _this.$message.success('删除成功')
              _this.$router.push('/home/myShoppingCar')
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
    goTo () {
      this.$router.push('/order');
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
