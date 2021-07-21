<template>
<!-- 登录页面 -->
  <div>
    <Row class="container">
      <i-col span="13" offset="2" class="login-img-box">
        <img src="static/img/1.jpg" alt="">
        <Modal v-model="isVisible" width="530">
          <p slot="header">
            <Icon type="edit"></Icon>
            <span>找回密码</span>
          </p>
          <div>
            <Form :model="changeData" label-position="left" :label-width="100" :rules="changeRuleInline">
              <FormItem label="用户名" prop="name">
                <i-input v-model="changeData.name" size="large"></i-input>
              </FormItem>
              <FormItem label="手机号" prop="phone">
                <i-input v-model="changeData.phone" size="large"></i-input>
              </FormItem>
              <FormItem label="验证码" prop="VerificationCode">
                <i-input v-model="changeData.VerificationCode" size="large"><Button slot="append" @click="getcheckNum">获取验证码</Button>
                </i-input>
              </FormItem>
              <FormItem label="新密码" prop="password">
                <i-input v-model="changeData.password" size="large"></i-input>
              </FormItem>
              <FormItem label="确认密码" prop="repassword">
                <i-input v-model="changeData.repassword" size="large"></i-input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
            <Button type="primary" size="large" long @click="submit">修改</Button>
          </div>
        </Modal>
      </i-col>
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>欢迎登录</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="username">
                  <i-input type="text" v-model="formDate.username" clearable size="large" placeholder="用户名">
                      <Icon type="person" slot="prepend"></Icon>
                  </i-input>
              </FormItem>
              <FormItem prop="password">
                  <i-input type="password" v-model="formDate.password" clearable size="large" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                  </i-input>
              </FormItem>
              <FormItem>
                  <Button type="primary"  @click="handleSubmit('formInline')" style="background-color: #6da6be;margin-left: 50px;width: 70px">登录</Button>
                <Button type="ghost" style="margin-left: 30px" @click="find">找回密码</Button>
              </FormItem>
          </Form>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';
import '../../static/js/cookie_utils.js'
import axios from "axios";
import api from "../../static/js/api";

export default {
  name: 'Login',
  data () {
    return {
      formDate: {
        username: '',
        password: ''
      },
      changeData:{
        name: '',
        phone: '',
        VerificationCode:'',
        password:'',
        repassword: ''
      },
      isVisible:false,
      isTrue:false,
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      },
      changeRuleInline:{
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone:[{ required: true, message: '手机号不能为空', trigger: 'blur' },
          // { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        VerificationCode:[{ required: true, message: '必须填写验证码', trigger: 'blur' },
          { type: 'string', min: 4, max: 4, message: '验证码长度错误', trigger: 'blur' }],
        password:[{ required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }],
        repassword: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }]
      }
    };
  },
  methods: {
      ...mapMutations(['SET_USER_LOGIN_INFO']),
      ...mapActions(['login']),
      handleSubmit (name) {
        const father = this;
        console.log(this.formDate.username);
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login(father.formDate).then(result => {
              if (result) {
                this.$Message.success('登录成功');
                father.$router.push('/');
                window.location.reload()
              } else {
                this.$Message.error('用户名或密码错误');
              }
            });
          } else {
            this.$Message.error('请填写正确的用户名或密码');
          }
        });
      },
    find(){
        this.isVisible=true
    },
    getcheckNum() {
        const _this=this;
        axios.post(api.path+'userLogin/checkUserPhone',{"uname":this.changeData.name,"uphonenum":this.changeData.phone})
      .then(function (response){
        if(response.data.code===200){
          _this.$message.success('1234')
          _this.isTrue=true
        }else {
          _this.$message.error('用户名或手机号不正确')
        }
      })

    },
    submit(){
        const _this=this;
        if(_this.isTrue){
          axios.post(api.path+'userLogin/changePasswordByUserName',{"uname":_this.changeData.name,"upassword":_this.changeData.password})
          .then(function (response){
            if(response.data.code===200){
              _this.$message.success('修改密码成功')
              _this.isVisible=false
            }else {
              _this.$message.error('修改密码失败')
            }
          })
        }else {
          _this.$message.error('请检查信息是否正确')
        }
    }
    },
    store
    // handleSubmit () {
    //   axios.get('http://192.168.203.189:8182/userLogin/login/' + this.formDate.username + '/' + this.formDate.password)
    //     // eslint-disable-next-line no-undef
    //   .then((response)=>{
    //     // console.log(response)
    //     if(response.data.data==null){
    //       this.$Message.error('用户名或密码不正确');
    //     }else{
    //       this.$Message.success('登录成功');
    //       // setCookieValue('token',response.msg)
    //       // console.log(response)
    //       setCookieValue('name', response.data.data[0].uname);
    //       setCookieValue('token', response.data.msg);
    //       console.log(getCookieValue('name'));
    //       // console.log(window.document.cookie)
    //       this.$router.push('/');
    //     }
    //   })
    // }

};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}
.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-img-box>img {
  width: 68%;
}
.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: 280px;
  border: 1px solid lightslategrey;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: lightslategrey;
  background-color: lavender;
}
.form-box {
  width: 80%;
  margin: 30px auto;
}

</style>
