<template>
  <div>
    <div class="header" >
      <img src="static/img/admin.png" width="55px" height="55px">
      <span>校园二手交易系统后台管理</span>
      <Icon type="log-out" style="float: right;margin-right: 50px;margin-top: 15px" @click="checkout"></Icon>
    </div>
    <Row type="flex">
      <i-col span="5" class="layout-menu-left">
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="selected">
          <div class="layout-logo-left"></div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-person-outline"></Icon>
              用户管理
            </template>
            <Menu-item name="userInfo">用户信息</Menu-item>

          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="bag"></Icon>
              商品管理
            </template>
            <Menu-item name="goodInfo">商品信息</Menu-item>
            <Menu-item name="goodCategory">商品类别</Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="clipboard"></Icon>
              公告管理
            </template>
            <Menu-item name="noticeInfo">公告</Menu-item>
            <Menu-item name="addNotice">发布公告</Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="layout-header"><h3>{{activeTitle}}</h3></div>
<!--        <div class="layout-breadcrumb">-->
<!--          <Breadcrumb>-->
<!--            <Breadcrumb-item href="#">首页</Breadcrumb-item>-->
<!--            <Breadcrumb-item href="#">用户管理</Breadcrumb-item>-->
<!--            <Breadcrumb-item>{{activeTitle}}</Breadcrumb-item>-->
<!--          </Breadcrumb>-->
<!--        </div>-->
        <div class="layout-content">
          <div class="layout-content-main">
            <transition mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default{
  data () {
    return {
      activeTitle: '用户信息',
      bar: {
        'userInfo': '用户信息',
        'goodInfo': '商品信息',
        'noticeInfo': '公告',
        'addNotice': '发布公告',
        'goodCategory': '商品类别'
      }
    };
  },

  methods: {
    selected (name) {
      this.activeTitle = this.bar[name];
      this.$router.push(`/adminOperator/${name}`);
      // console.log(this.$route);
    },
    checkout(){
      console.log(Cookies.get('adminId'))
      Cookies.remove('adminId')
      this.$router.push('/adminLogin')
    }
  }
};

</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
.header{
  width: 100%;
  height: 60px;
  background-color: lightgray;
  font-size: 30px;
  border: 1px solid grey;
  /*text-align: center;*/
}
.header span{
  position: absolute;
  top: 0;
  display: inline-block;
  line-height: 60px;
  height: 60px;

  /*margin:0 auto;*/
}
.layout-breadcrumb{
  padding: 10px 15px 0;
}
.layout-content{
  min-height: 500px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main{
  padding: 10px;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left{
  background: #464c5b;
}
.layout-header{
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  text-align: center;
  line-height: 60px;

}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
</style>
