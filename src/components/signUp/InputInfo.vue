<template>
  <div class="info-form">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
        <FormItem label="用户名" prop="uname">
            <i-input v-model="formValidate.uname" clearable size="large" placeholder="请输入你的姓名"></i-input>
        </FormItem>
        <FormItem label="邮箱" prop="umail">
            <i-input v-model="formValidate.umail" clearable size="large" placeholder="请输入你的邮箱"></i-input>
        </FormItem>
        <FormItem label="密码" prop="upassword">
            <i-input type="password" v-model="formValidate.upassword" clearable size="large" placeholder="请输入你的密码"></i-input>
        </FormItem>
        <FormItem label="确认密码" prop="urepassword">
            <i-input type="password" v-model="formValidate.urepassword" clearable size="large" placeholder="请再次输入你的密码"></i-input>
        </FormItem>
        <Button type="ghost" size="large" long @click="handleSubmit('formValidate')" style="background-color: #a5d4e8">注册</Button>
    </Form>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'InputInfo',
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formValidate.upassword) {
        callback(new Error('两次输入的密码不一样'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        uname: '',
        umail: '',
        upassword: '',
        urepassword: ''
      },
      ruleValidate: {
        uname: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        umail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        upassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur' }
        ],
        urepassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_SIGN_UP_SETP']),
    ...mapActions(['addSignUpUser']),
    handleSubmit (name) {
      const father = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('注册成功');
          const userinfo = {
            uname: this.formValidate.uname,
            upassword: this.formValidate.upassword,
            uemail: this.formValidate.umail,
            uphonenum: this.$route.query.phone
          };
          this.addSignUpUser(userinfo);
          father.SET_SIGN_UP_SETP(2);
          this.$router.push({ path: '/SignUp/signUpDone' });
        } else {
          this.$Message.error('注册失败');
        }
      });
    }
  },
  store
};
</script>

<style scoped>
.info-form {
  width: 90% !important;
}
</style>
