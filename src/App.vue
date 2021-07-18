<template>
  <div id="app">
    <Header v-if="adminHeader.indexOf($route.name)==-1"></Header>
    <router-view/>
    <!-- 部分路由不应该包含这个Footer -->
    <Footer v-if="excludeRoutes.indexOf($route.name) == -1"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
export default {
  name: 'App',
  data () {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart', 'AdminLogin', 'AdminHome',
        'ViewMyInfo', 'AddMyGood', 'ViewMyGood', 'ViewMyWant', 'AddMyWant', 'MyFavorite', 'MyMessage', 'UserInfo',
        'GoodInfo', 'NoticeInfo', 'AddNotice','GoodCategory'],
      adminHeader: ['AdminLogin', 'AdminHome', 'UserInfo', 'GoodInfo', 'NoticeInfo', 'AddNotice','GoodCategory']
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>
