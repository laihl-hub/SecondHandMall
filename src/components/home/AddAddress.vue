<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加收货地址</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="收件人" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem label="收件地区" prop="province,city,area">
            <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
          </FormItem>
          <FormItem label="收件地址" prop="address">
            <i-input v-model="formData.address" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>

        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="submit">添加地址</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker';
import axios from "axios";
import api from "../../../static/js/api";
export default {
  name: 'AddAddress',
  data () {
    return {
      formData: {
        name: '',
        address: '',
        phone: '',
        // postalcode: '',
        province: '重庆市',
        city: '重庆市',
        area: '高新区'
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],

        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    getProvince (data) {
      this.formData.province = data.value;
    },
    getCity (data) {
      this.formData.city = data.value;
    },
    getArea (data) {
      this.formData.area = data.value;
    },
    submit(){
      let _this=this
      let postData={
        'rreceivername':_this.formData.name,
        'rreciveraddress':_this.formData.address,
        'rprovince':_this.formData.province,
        'rcity':_this.formData.city,
        'rarea':_this.formData.area,
        'rreceiverphone':_this.formData.phone,
        // 'raddrName':_this.formData.raddrName,
        'rflag':1,
        'uid':Cookies.get("userid")
      }
      axios.post(api.path+'userAddrManage/addUserAddr',postData)
        .then(function (response){
          if(response.data.code==200){
            _this.$Message.success('添加成功成功');
            _this.$router.push('/home/myAddress')
          }
        })
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
