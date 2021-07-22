<template>
  <div>
    <footer class="footer">
      <div class="clearfix"></div>
      <div class="icon-row">
        <div class="footer-icon">
          <h5 class="footer-icon-child"></h5>
          <span class="footer-icon-text">品类齐全，轻松购物</span>
        </div>
        <div class="footer-icon">
          <h5 class="footer-icon-child footer-icon-child-2"></h5>
          <span class="footer-icon-text">能挑擅找，变废为宝</span>
        </div>
        <div class="footer-icon">
          <h5 class="footer-icon-child footer-icon-child-3"></h5>
          <span class="footer-icon-text">人无我有，人有我优</span>
        </div>
        <div class="footer-icon">
          <h5 class="footer-icon-child footer-icon-child-4"></h5>
          <span class="footer-icon-text">天天低价，畅选无忧</span>
        </div>
      </div>
      <div class="service-intro">
        <div class="servece-type">
          <div class="servece-type-info" v-for="(guide, index) in guideArr" :key="index">
            <ul>
              <li v-for="(item, index) in guide" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="friend-link">
          <div class="friend-link-item">
            <ul>
              <li v-for="(link, index) in moreLink" :key="index">
                <span :class="[linkItemClass, {'link-last-item': index === 9}]">{{link}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="copyright">
          <p>Copyright © 2021 by 飞虎队 <a href="https://github.com/PowerDos"><Icon type="social-github"></Icon></a> </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      linkItemClass: 'link-item',
      guideArr: [
        [ '购物指南', '购物流程', '闲置处理', '常见问题' ],
        [ '配送方式', '上门自提', '送货上门', '配送服务查询' ],
        [ '支付方式', '货到付款', '在线支付', '分期付款'],
        [ '售后服务', '售后政策', '价格保护', '退款说明', '返修/退换货', '取消订单' ]
      ],
      moreLink: [
        '关于我们', '联系我们', '合作招商', '校园社区', '风险监测', '隐私政策'
      ]
    };
  }
};
</script>

<style scoped>
/*****************************底 部 开 始*****************************/
.footer {
  /*font-family: "楷体";*/
  /*font-size: 40px;*/
  width: 100%;
  height: 390px;
  /*margin-top: 30px;*/
  background-color: #d8e3ee;
}
.icon-row {
  margin: 0 auto;
  /*margin-left: auto;*/
  padding-top: 8px;
  width: 1000px;
  height: 64px;
}
.footer-icon {
  margin-left: 17px;
  margin-right: 17px;
  float: left;
}
.footer-icon-child {
  margin-top: 10px;
  overflow: hidden;
  position: absolute;
  width: 36px;
  height: 42px;
  background-size:100% 100%;
  background-image: url("../../../static/img/footer/放大镜.png");
  text-indent: -999px;
}
.footer-icon-child-2 {
  background-position: 0 -43px;
  background-size:100% 100%;
  background-image:url("../../../static/img/footer/商店店铺.png");
}
.footer-icon-child-3 {
  background-position: 0 -86px;
  background-size:100% 100%;
  background-image:url("../../../static/img/footer/购物车.png");
}
.footer-icon-child-4 {
  background-position: 0 -129px;
  background-size:100% 100%;
  background-image:url("../../../static/img/footer/购物袋.png");
}
.footer-icon-text {
  margin-left: 45px;
  color: #444444;
  font-size: 18px;
  font-weight: bold;
  line-height: 64px;
}
.service-intro {
  width: 100%;
  border-top: 1px solid #b2dfdb;
}
.servece-type {
  margin: 15px auto;
  height: 200px;
  width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.servece-type-info {
  color: #666666;
}
.servece-type-info ul {
  list-style: none;
}
.servece-type-info li {
  font-size: 14px;
  cursor: pointer;
  line-height: 26px;
}
.servece-type-info li:first-child {
  font-size: 16px;
  line-height: 28px;
  font-weight: bold;
}
.friend-link {
  display: flex;
  align-items: center;
  width: 908px;
  height: 30px;
  margin: 0px auto;
  color: #666;
  border-top: 1px solid #b2dfdb;
}
.friend-link-item {
  margin: 0px auto;
}
.friend-link-item ul {
  list-style: none;
}
.friend-link-item li {
  padding: 5px 0px;
  float: left;
}
.copyright {
  width: 100%;
  color: #666;
  line-height: 30px;
  text-align: center;
}
.copyright a{
  color: #232323;
  font-size: 20px;
}
/*****************************底 部 结 束*****************************/
</style>
