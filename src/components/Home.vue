<template>
  <div class="container">
    <Layout class="layout">
      <Sider class="side-bar" :style="{height: 'calc(100vh - 35px)', background: '#fff', overflow: 'auto'}" ref="side" :collapsed-width="78">
        <Menu active-name="1-2" theme="light" width="auto" @on-select="onSelect" accordion>
          <div class="user-icon">
            <div class="user-img">
              <img src="static/img/head.jpeg" @click="changeHead">
            </div>
            <p>{{username}}</p>
          </div>
          <Modal
            v-model="isClickHeader"
            width="400px"
          >
          <p slot="header">
            <Icon type="edit"></Icon>
            <span>上传头像</span>
          </p>
            <div>
              <el-upload
                class="avatar-uploader"
                action=""
                ref="upload"
                :show-file-list="false"
                method="post"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :auto-upload="false"
                name="image"
                type="file"
                style="border: 1px dotted lightgray;width: 300px;height: 300px;margin-left: 30px;margin-top: 20px"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" >
                <i v-else class="el-icon-plus avatar-uploader-icon" style="margin:auto auto;size: 100px" ></i>
              </el-upload>
            </div>
            <div slot="footer">
              <Button type="ghost" @click="submit">确认上传</Button>
              <Button type="ghost" @click="cancel">取消</Button>
            </div>
          </Modal>
          <Submenu name="1">
            <template slot="title">
              <Icon type="document-text"></Icon>
              <span>个人信息</span>
            </template>
            <MenuItem name="viewMyInfo">查看信息</MenuItem>
          </Submenu>
          <Submenu name="2">


            <template slot="title">
              <Icon type="location"></Icon>
              <span>收货地址</span>
            </template>
            <MenuItem name="myAddress">我的收货地址</MenuItem>
            <MenuItem name="addAddress">添加收货地址</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
                <Icon type="ios-cart"></Icon>
                <span>购物车</span>
            </template>
            <MenuItem name="myShoppingCart">我的购物车</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="clipboard"></Icon>
              <span>订单管理</span>
            </template>
            <MenuItem name="myBuyOrder">我的购买订单</MenuItem>
            <MenuItem name="mySellOrder">我的售出订单</MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="bag"></Icon>
              <span>个人商品</span>
            </template>
            <MenuItem name="addMyGood">发布商品</MenuItem>
            <MenuItem name="viewMyGood">查看已发布商品</MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="ios-star-outline"></Icon>
              <span>求购商品</span>
            </template>
            <MenuItem name="viewMyWant">查看求购信息</MenuItem>
            <MenuItem name="addMyWant">发布求购信息</MenuItem>
          </Submenu>
          <Submenu name="7">
            <template slot="title">
              <Icon type="ios-heart-outline"></Icon>
              <span>收藏</span>
            </template>
            <MenuItem name="myFavorite">查看收藏</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="layout">
        <Header :style="{background: '#fff'}">
          <h2>{{activeTitle}}</h2>
        </Header>
        <Content class="content">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </Content>
        <Footer class="layout-footer-center">2021 &copy; {{username}}</Footer>
      </Layout>
    </Layout>

  </div>
</template>

<script>
import GoodsListNav from './nav/GoodsListNav';
export default {
  name: 'Home',
  components: {GoodsListNav},
  data () {
    return {
      username:'',
      activeTitle:'我的订单' ,
      bar: {
        'myAddress': '我的收货地址',
        'addAddress': '添加收货地址',
        'myOrder': '订单管理',
        'myShoppingCart': '我的购物车',
        'viewMyInfo': '查看信息',
        'addMyGood': '发布商品',
        'viewMyGood': '查看已发布商品',
        'viewMyWant': '查看求购信息',
        'addMyWant': '发布求购信息',
        'myFavorite': '查看收藏',
        'mySellOrder':'我的售出订单',
        'myBuyOrder':'我的购买订单',
      },
      isClickHeader:false,
      imageUrl:'',
    };
  },
  created() {
    let str=this.$route.path
    let index=str.lastIndexOf('/')
    let name=str.slice(index+1)
    this.activeTitle=this.bar[name]
    this.username=Cookies.get('username')
  },
  methods: {
    onSelect (name) {
      this.activeTitle = this.bar[name];
      // console.log(name)
      this.$router.push(`/home/${name}`);
    },
    changeHead(){
      this.isClickHeader=true
    },
    handleChange (file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.formData.pimg= file.name
    },
    beforeUpload(file) {
      return true;
    },
    submit(){
      this.isClickHeader=false
    },
    cancel(){
      this.isClickHeader=false
    }
  }
};
</script>

<style scoped>
.side-bar a{
  color: #232323;
}
.user-icon {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-icon span {
  font-size: 96px;
}
.user-img {
  margin-bottom: 15px;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
}
.user-img img{
  width: 100%;
}
.content {
  margin: 15px;
  background-color: #fff;
  padding: 15px;
}
.layout-footer-center {
  padding: 0px 15px;
  padding-bottom: 15px;
  text-align: center;
}
.avatar-uploader{
  text-align: center;
  line-height: 300px;
}
</style>
