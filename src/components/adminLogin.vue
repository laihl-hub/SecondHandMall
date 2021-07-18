<template>
  <div class="loginView">
    <div class="img_box">
      <img src="static/img/adminlogin.png">
    </div>
    <div class="loginBox">
      <div class="header"><h3>管理员登录</h3></div>
      <Form ref="formInline" :model="adminData" :rules="loginRules">
        <Form-item prop="user">
          <Input type="text"  placeholder="admin" v-model="adminData.user">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password"  placeholder="password" v-model="adminData.password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button type="primary" style="background-color: #6da6be" long @click="toAdmin">登录</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../../static/js/api";

export default{
  data () {
    return {
      adminData:{
        user:'',
        password:''
      },
      loginRules:{
        user:[{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
        password:[{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    toAdmin () {
      const _this=this
      axios.get(api.path+'adminLogin/login/'+_this.adminData.user+'/'+_this.adminData.password)
      .then(function (response){
        if(response.data.code===200){
          Cookies.set('adminId',response.data.data[0].aid)
          // console.log(response)
          _this.$Message.success('登录成功')
          _this.$router.push('adminOperator');
        }else {
          _this.$Message.error('账号或密码不正确')
        }
      })

    }
  }
};
</script>
<style scoped>
html,body{
  width: 100%;
  height: 100%;
}
.loginView{
  width: 100%;
  height: 700px;
  background-color: aliceblue;
}
.img_box {
  position: absolute;
  top: 30%;
  left: 20%;
}
.loginBox{
  position: absolute;
  left: 50%;
  top: 30%;
  width: 250px;
  height: 300px;
  background-color: aliceblue;
  border:1px solid #6e6568;
}
.header{
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: #6da6be;
}
Form{
  position: absolute;
  top:100px;
  left: 10%;
}
</style>
