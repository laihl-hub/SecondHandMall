<template>
  <div>
    <div class="address-box" v-for="(item, index) in goods" :key="index">
      <div class="address-header">
        <span>{{item.name}}</span>
        <div class="address-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>

      <div class="address-content" >
        <el-row>
          <el-col :span="5" style="margin-left: 100px"><img :src="'../../../static/img/goodsList/'+item.pimg" width="100px" max-height="130px;"></el-col>
          <el-col :span="9"><div style="display:inline-block">
          <p><span class="address-content-title"> 商品名称 :</span> {{item.pname}}</p>
<!--        <p><span class="address-content-title">商品分类:</span> {{item.cname}}</p>-->
        <p><span class="address-content-title">标价:</span> {{item.pprice}}元</p>
        <p><span class="address-content-title">简介:</span> {{item.pintro}}</p>
            <p><span class="address-content-title">发布时间:</span> {{convertTime(item.ptime,'YYYY-MM-DD')}}</p>
        </div></el-col>
        </el-row>
      </div>
    </div>
    <Modal v-model="modal" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改商品</span>
        </p>
        <div>
          <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
            <FormItem label="商品名称" prop="pname" >
              <i-input v-model="formData.pname" size="large" placeholder="请输入商品名称"></i-input>
            </FormItem>
            <FormItem label="简介" prop="pintro">
              <i-input v-model="formData.pintro" size="large" placeholder="请介绍介绍你的商品吧"></i-input>
            </FormItem>
            <FormItem label="商品分类" >
              <el-select v-model="value" placeholder="请选择"  v-on:change="select">
                <el-option
                  v-for="(item,index) in options"
                  :key="item.cid"
                  :label="item.cname"
                  :value="index">
                </el-option>
              </el-select>
            </FormItem>
            <FormItem label="标价" prop="pprice">
              <i-input v-model="formData.pprice" size="large"></i-input>
            </FormItem>
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
import axios from 'axios';
import api from '../../../static/js/api';
import Moment from "moment";
export default {
  name: 'MyAddress',
  data () {
    return {
      modal: false,
      formData: {
        pid:null,
        pname: '',
        pintro: '',
        pprice: '',
        cid:null,
      },
      value:'',
      options:null,
      selectedIndex:null,
      ruleInline: {
        pname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        pintro: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        pprice: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        value: [
          { required: true }
        ],
      }
    };
  },

  async created() {
    this.loadmyGood();

    const _this = this
    await axios.get(api.path + 'productManage/lookUpAllCatogory').then(function (response) {
      _this.options = response.data.data;
    })
    _this.formData.uid=Cookies.get('userid')
  },

  computed: {
    ...mapState(['goods'])
  },
  methods: {
    ...mapActions(['loadmyGood']),
    select(id){
      // console.log(id)
      this.selectedIndex=id
    },

    edit (index) {
      this.modal = true;
      this.editId=index;
      // this.address1=JSON.parse(JSON.stringify(this.address[index]))
      this.formData.cid=this.goods[index].cid;
      this.formData.pid=this.goods[index].pid;
      // this.formData.cname=this.goods[index].cname;
      this.formData.pname = this.goods[index].pname;
      this.formData.pprice = this.goods[index].pprice;
      this.formData.pintro = this.goods[index].pintro;
    },

    editAction(){
      let _this=this
      this.modal = false;
      _this.formData.cid=_this.options[_this.selectedIndex].cid
      axios.post(api.path+'/releaseProductManage/changeProductInfo',_this.formData)
        .then(function (response){
          if(response.data.code==200){
            _this.$Message.success('修改成功');
            // _this.$router.push('/home/viewMyGood')
            window.location.reload()
          }
        })
    },
    convertTime: function (data, format) {
      return Moment(data).utcOffset(0).format(format)
    },
    del (index) {
      const  _this=this;
      // console.log(_this.address[index].rid)
      _this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个该商品？',
        onOk: () => {
          axios.get(api.path+'releaseProductManage/deleteReleasedProductByPid/'+_this.goods[index].pid)
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
    // handleRemove(file, fileList) {
    //     console.log(file, fileList);
    // },
    // handlePreview(file) {
    //     console.log(file);
    // },
    //   handleExceed(files, fileList) {
    //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    //   },
    //   beforeRemove(file, fileList) {
    //     return this.$confirm(`确定移除${file.name}?`);
    //   }
  },
  components: {
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
  font-size: 15px;
  /*font-family: "楷体";*/
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
