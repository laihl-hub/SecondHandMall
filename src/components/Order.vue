<template>
  <div class="container">
<!--    <Search></Search>-->
<!--    <GoodsListNav></GoodsListNav>-->
    <div class="order-header">
      <span style="display: inline-block;width: 100px;height: 50px;background-color: #eaeaea"><h3>待付款</h3></span>
    </div>
    <div class="goods-list-container">
<!--      <Alert show-icon class="tips-box">-->
<!--        小提示-->
<!--        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>-->
<!--        <template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击付款即可。</template>-->
<!--      </Alert>-->
<!--      <Table border ref="selection" :columns="columns" :data="shoppingCart" size="large" @on-selection-change="select" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>-->
      <Card style="height: 330px;background-color: rgba(223, 237, 245, 0.73);">
        <div style="height: 40px;border-bottom: 1px solid lightgray;" >
          <Col :span="2">
            <Dropdown  placement="bottom-start" style="width: 250px">
              <a href="javascript:void(0)" style="color: #495060">
                <Icon type="ios-location-outline" size="30" style="margin-left: 30px"></Icon>
              </a>
              <DropdownMenu slot="list">
                <div  v-if="address==null">
                  <span>你还没有收获地址噢</span><br>
                  <span>快去添加一个地址叭</span>
                </div>
                <div class="address-list" v-show="address.length>0">
                  <div class="address-box" v-for="(item, index) in address" :key="index">
                    <div class="address-content" @click="selected(index)" style="cursor: default">
                      <p><span class="address-content-title"> 收 货 人 :</span> {{item.rreceivername}}</p>
                      <p><span class="address-content-title">收货地区:</span>{{item.rprovince}} {{item.rcity}} {{item.rarea}}</p>
                      <p><span class="address-content-title">详细地址:</span>{{item.rreciveraddress}}</p>
                      <p><span class="address-content-title">联系电话:</span> {{item.rreceiverphone}}</p>
                    </div>
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col :span="18"><span style="display: inline-block;width: 99%;height: 30px;border: 1px solid lightgray;line-height: 30px;">&nbsp&nbsp{{selectedAdd}}
<!--          {{selectedAdd.rreceiverphone}}-->
          </span></Col>
          <Col :span="2"><Icon type="ios-plus-outline" size="22" style="margin-top: 5px" @click="addAddress"></Icon>
            <Modal v-model="isAdd" width="530">
              <p slot="header">
                <Icon type="edit"></Icon>
                <span>添加地址</span>
              </p>
              <div>
                <Form :model="formData" label-position="left" :label-width="100" >
                  <FormItem label="收件人" >
                    <i-input v-model="formData.rreceivername" size="large"></i-input>
                  </FormItem>
                  <FormItem label="收件地区" >
                    <Distpicker :province="formData.province" :city="formData.rcity" :area="formData.rarea" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
                  </FormItem >
                  <FormItem label="详细地址" >
                    <i-input v-model="formData.rreciveraddress" size="large"></i-input>
                  </FormItem>
                  <FormItem label="手机号码" >
                    <i-input v-model="formData.rreceiverphone" size="large"></i-input>
                  </FormItem>
                </Form>
              </div>
              <div slot="footer">
                <Button type="primary" size="large" long @click="submitAddr">确认添加</Button>
              </div>
            </Modal>
          </Col>
        </div>
        <div style="height: 220px;border-bottom: 1px solid lightgray">
          <Col :span="8">
            <div ><img :src="'../../static/img/goodsList/'+goodInfo.pimg" width="200px" height="200px" style="margin-top: 10px;border: 1px solid lightgray">
              <span style="display: inline-block;margin-left: 5px" >x1</span>
            </div>
          </Col>
         <Col :span="7">
           <div style="height: 200px;margin-top: 15px;" >
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">商&nbsp&nbsp品&nbsp&nbsp名:</h4><span>{{goodInfo.pname}}</span></span>
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">商品详情:</h4><span>{{goodInfo.pintro}}</span></span>
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">商品价格:</h4><Icon type="social-yen-outline" style="padding: 0 5px"></Icon><span>{{goodInfo.pprice}}</span></span>
             <span style="display: inline-block;width: 100%;margin: 5px 10px"><h4 style="display: inline;padding-right: 5px">运&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp费:</h4><Icon type="social-yen-outline" style="padding: 0 5px"></Icon><span>0</span></span>
           </div>
         </Col>
        </div>
        <div style="height: auto">
          <span style="display: block;width: 150px;height: 50px;position:relative;left: 70%;line-height: 50px">
            <span><h4 style="display: inline">总金额:</h4></span><span style="font-size: 1.5em"><Icon type="social-yen-outline" style="padding: 0 5px" size="22"></Icon>
            {{goodInfo.pprice}}</span>
          </span>
        </div>
      </Card>
      <Card style="height: 120px;margin-top: 20px;background-color: rgba(223, 237, 245, 0.73);">
        <span style="display: inline-block"><h2>订单信息</h2></span>
        <div style="height: 50px;margin-top: 10px">
          <span style="display: block;margin-bottom: 10px"><h4 style="display: inline">订单编号</h4>
            <span v-if="selectedAddrId==null" style="margin-left: 45px;color: darksalmon">请选择地址，之后自动生成订单编号</span>
            <span style="margin-left: 50px">{{orderNum}}</span></span>
          <span style="display: block"><h4 style="display: inline">创建时间</h4>
            <span v-if="selectedAddrId==null" style="margin-left: 45px;color: darksalmon">请选择地址，之后生成时间</span>
            <span style="margin-left: 50px">{{time}}</span></span>
        </div>
      </Card>
      <div class="pay-container">
        <div class="pay-box">
          <p><span>订单总额：</span> <span class="money" style="color: darksalmon"><Icon type="social-yen"></Icon>{{goodInfo.pprice}}</span></p>
          <div class="pay-btn">
            <Button type="ghost" size="large" style="background-color: lightblue" @click="submitOrder">订单支付</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsListNav from '@/components/nav/GoodsListNav';
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from "axios";
import api from "../../static/js/api";
import Moment from "moment";
import Distpicker from 'v-distpicker';

export default {
  name: 'Order',
  async created() {
    // this.loadAddress();
    const _this=this
    // console.log(this.$route.query.pid)
    await axios.get(api.path+'productManage/lookUpProductDetailByPid/'+_this.$route.query.pid)
    .then(function (response){
      _this.goodInfo=response.data.data
    })
    // _this.time=this.getCurrentTime()
    // _this.orderNum=Math.round(Math.random()*10000000000).toString()
    await this.loadAddress();

  },
  data () {
    return {
      goodInfo:null,
      time:'',
      orderNum:'',
      isAdd:false,
      selectedAdd:'请选择收获地址',
      selectedAddrId:null,
      formData:{
        rreceivername:'',
        rreciveraddress:'',
        rprovince:'',
        rcity:'',
        rarea:'',
        rreceiverphone:'',
        // 'raddrName':_this.formData.raddrName,
        rflag:1,
        uid:Cookies.get("userid")
      }
    };
  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    ...mapActions(['loadAddress']),
    getCurrentTime() {
      //获取当前时间并打印
      // var _this = this;
      var time
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
      return time
    },
    selected(index){
      this.selectedAdd=this.address[index].rreceivername+'\xa0\xa0'+this.address[index].rprovince+'\xa0\xa0'+this.address[index].rcity
      +'\xa0\xa0'+this.address[index].rarea+'\xa0\xa0'+this.address[index].rreciveraddress+'\xa0\xa0'+this.address[index].rreceiverphone
      this.selectedAddrId=this.address[index].rid

      this.orderNum=this.goodInfo.pid+'a'+this.goodInfo.sellerId+'a'+Cookies.get("userid")+'a'+this.selectedAddrId
      this.time=this.getCurrentTime()
      console.log(this.orderNum)
      // pid=this.goodInfo.pid
      // sellerid=this.goodInfo.sellerId
      // buyerid=Cooking.get("userid")
      // buyeraddrid=this.selectedAddrId
    },
    addAddress(){
      this.isAdd=true
    },
    getProvince (data) {
      this.formData.rprovince = data.value;
    },
    getCity (data) {
      this.formData.rcity = data.value;
    },
    getArea (data) {
      this.formData.rarea = data.value;
    },
    submitAddr(){
      const _this=this
      // console.log(this.formData)
      axios.post(api.path+'userAddrManage/addUserAddr',_this.formData).then(function (response){
        if(response.data.code===200){
          _this.$Message.success('添加成功')
          _this.isAdd=false
          window.location.reload()
        }else {
          _this.$Message.error('添加失败')
        }
      })
    },

    //按照指定方式生成订单号便于后端进行解析
    //orderNum=pid+buyerid+sellerid+buyeraddrid
    //pid=this.goodInfo.pid
    //sellerid=this.goodInfo.sellerId
    //buyerid=Cooking.get("userid")
    //buyeraddrid=this.selectedAddrId
    submitOrder() {

      if (this.selectedAddrId == null) {
        this.$message.error("请先选择您的收货的地址！")
      } else {
        axios.get(api.path + 'order/alipay?outTradeNo=' + this.orderNum + "&subject=" + this.goodInfo.pname + "&totalAmount=" + this.goodInfo.pprice + "&body=" + this.goodInfo.pintro)
          .then(resp => {
            // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
            // const divForm = document.getElementsByTagName('div')
            // if (divForm.length) {
            //   document.body.removeChild(divForm[0])
            // }
            document.querySelector('body').innerHTML = resp
            const div = document.createElement('div')
            div.innerHTML = resp.data // data就是接口返回的form 表单字符串
            // document.body.appendChild(div)
            document.body.appendChild(div)
            document.forms[0].submit()
          })
      }
    }
  },
  mounted () {
  },
  components: {
    Search,
    GoodsListNav,
    Distpicker
  },
  store
};
</script>

<style scoped>
.container{
  background-color: rgba(223, 237, 245, 0.73);
  /*height: 600px;*/
}
.order-header{
  position: relative;
  left: 10%;
  width: 80%;
  height: 72px;
  border-bottom: 3px solid lightslategray;
}
.order-header span{
  position: absolute;
  line-height: 50px;
  text-align: center;
  margin-top: 20px;
}
.goods-list-container {
  margin: 15px auto;
  margin-bottom: 0;
  width: 80%;
  height: 100%;
  /*background-color: rgba(223, 237, 245, 0.73);*/
}

.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}
.address-box:hover{
  background-color: rgba(245, 239, 239, 0.64);
}
.address-check-name span {
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background-color: darksalmon;
}
.invoices-container p{
  font-size: 12px;
  line-height: 30px;
  color: #999;
}
.pay-container {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.pay-box {
  font-size: 18px;
  font-weight: bolder;
  color: #495060;
}
.money {
  font-size: 26px;
  color: #f90013;
}
.pay-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}

</style>
