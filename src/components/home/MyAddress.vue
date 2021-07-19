<template>
  <div>
    <div class="address-box" v-for="(item, index) in address" :key="index">
      <div class="address-header">
        <span>{{item.raddrName}}</span>
        <div class="address-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title"> 收 货 人 :</span> {{item.rreceivername}}</p>
        <p><span class="address-content-title">收货地区:</span>{{item.rprovince}} {{item.rcity}} {{item.rarea}}</p>
        <p><span class="address-content-title">详细地址:</span>{{item.rreciveraddress}}</p>
        <p><span class="address-content-title">联系电话:</span> {{item.rreceiverphone}}</p>
      </div>
    </div>
    <Modal v-model="modal" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改地址</span>
        </p>
        <div>
            <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
              <FormItem label="收件人" prop="name">
                <i-input v-model="formData.name" size="large"></i-input>
              </FormItem>
              <FormItem label="收件地区" prop="province,city,area">
                <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
<!--                <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" ></Distpicker>-->
              </FormItem >
              <FormItem label="详细地址" prop="address">
                <i-input v-model="formData.address" size="large"></i-input>
              </FormItem>
              <FormItem label="手机号码" prop="phone">
                <i-input v-model="formData.phone" size="large"></i-input>
              </FormItem>
<!--              <FormItem label="邮政编码" prop="postalcode">-->
<!--                <i-input v-model="formData.postalcode" size="large"></i-input>-->
<!--              </FormItem>-->
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long @click="editAction">修改</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import Distpicker from 'v-distpicker';
import axios from "axios";
import api from "../../../static/js/api";
export default {
  name: 'MyAddress',
  data () {
    return {
      modal: false,
      formData: {
        name: '',
        address: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        // adr_id:null
      },
      address1:null,
      editId:null,
      ruleInline: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        // postalcode: [
        //   { required: true, message: '请输入邮政编码', trigger: 'blur' }
        // ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.loadAddress();

  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    ...mapActions(['loadAddress']),
    edit (index) {
      this.modal = true;
      this.editId=index;
      // this.address1=JSON.parse(JSON.stringify(this.address[index]))
      this.formData.province = this.address[index].rprovince;
      this.formData.city = this.address[index].rcity;
      this.formData.area = this.address[index].rarea;
      this.formData.address = this.address[index].rreciveraddress;
      this.formData.name = this.address[index].rreceivername;
      this.formData.phone = this.address[index].rreceiverphone;
      // this.formData.adr_id=this.address[index].rid;
      // this.formData.postalcode = this.address[index].postalcode;

      // console.log(this.address1)
      // console.log(this.address1.rreceiveraddress)
      // console.log(this.formData.phone)
      // console.log(this.formData)
      // console.log(typeof this.address1)
    },
    editAction (rid) {
      // console.log(index)
      const _this=this;
      rid=_this.editId;
      // console.log(rid)
      // console.log(_this.formData)
      // console.log(_this.address[rid].rid)
      var changeVo={"rarea": _this.formData.area,
        "rcity": _this.formData.city,
        // "rflag": 0,
        "rid": _this.address[rid].rid,
        "rprovince": _this.formData.province,
        "rreceivername": _this.formData.name,
        "rreceiverphone": _this.formData.phone,
        "rreciveraddress": _this.formData.address,
        // "uid": Cookies.get('userid')
        uid:1007
      }

      // console.log(changeVo)
      axios.post(api.path+'userAddrManage/changeUserAddr',changeVo)
      .then(function (response){
        if(response.data.code===200){
          _this.$message.success('修改成功')
          _this.modal=false
          // _this.$router.push('/home/myAddress')
          // window.location.href=window.location.href;
          window.location.reload()
        }else {
          _this.$message.error('修改失败')
        }
      })
    },
    del (index) {
      const  _this=this;
      // console.log(_this.address[index].rid)
      _this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个收货地址',
        onOk: () => {
          axios.get(api.path+'userAddrManage/deleteAddrByAddrId/'+_this.address[index].rid)
          .then(function (response){
            if(response.data.code===200) {
              _this.$message.success('删除成功')
              window.location.reload()
              // _this.$router.push('/home/myAddress')
            }else {
              _this.$message.error('删除失败')
            }
          })
        },
        onCancel: () => {
          this.$Message.info('取消成功');
          _this.modal=false;
        }
      });
    },
    getProvince (data) {
      this.formData.province = data.value;
    },
    getCity (data) {
      this.formData.city = data.value;
    },
    getArea (data) {
      this.formData.area = data.value;
    }
  },
  components: {
    Distpicker
  },
  store
};
</script>

<style scoped>
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.address-content {
  font-size: 14px;
}
.address-content-title {
  color: #999;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
