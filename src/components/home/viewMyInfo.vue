<template>
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>我的信息</h2>-->
<!--    </Header>-->
    <div class="add-container">
      <div class="add-title">
        <h1>查看信息</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="姓名" prop="uname" >
            <i-input v-model="formData.uname" size="large" :disabled="true"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="uphonenum">
            <i-input v-model="formData.uphonenum" size="large"></i-input>
          </FormItem>
          <FormItem label="邮箱" prop="uemail">
            <i-input v-model="formData.uemail" size="large"></i-input>
          </FormItem>
          <FormItem label="学校" prop="uschool">
            <i-input v-model="formData.uschool" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="ghost" @click="submit" style="background-color: lightblue">修改</Button>
        <Button type="ghost" style="margin-left: 60px" @click="cancel">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker';
import axios from "axios";
import api from "../../../static/js/api";
import store from "../../vuex/store";

export default {
  name: 'AddAddress',
  data () {
    return {
      formData: {
        uid: '',
        uname: '',
        uphonenum: '',
        uemail: '',
        uschool: ''
      },
      ruleInline: {
        uname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        uphonenum: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        uemail:[
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
      }
    };
  },created() {
    const _this=this
    axios.get(api.path+'userInfoManage/lookUpUserInfoByUserId/'+Cookies.get('userid'))
    .then(function (response){
      _this.formData.uname=response.data.data[0].uname;
      _this.formData.uphonenum=response.data.data[0].uphonenum;
      _this.formData.uemail=response.data.data[0].uemail;
      _this.formData.uschool=response.data.data[0].uschool;
      console.log(response)
    })
  },
  methods: {
    submit(){
      const _this=this;
      _this.formData.uid=Cookies.get('userid')
      axios.post(api.path+'userInfoManage/changeUserInfo',_this.formData)
      .then(function (response){
        if(response.data.code===200){
          _this.$message.success('修改成功')
          this.$router.push(`/home`);
        }else {
          _this.$message.error('修改失败')
        }
      })
    },
    cancel(){
      const _this=this;
      _this.$message.success('取消成功')
      this.$router.push(`/home`);
    }
  },
  components: {
    Distpicker
  }
};
</script>

<style scoped>
.add-container {
  margin: 15px auto;
  width: 60%;
  min-width: 600px;
}
.add-title {
  margin-bottom: 15px;
  text-align: center;
}
.add-submit {
  display: flex;
  justify-content: center;
}
</style>
