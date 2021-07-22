<template>
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>我的求购</h2>-->
<!--    </Header>-->
    <div class="want-box" v-for="(item, index) in wantProduct" :key="index" >
      <div class="want-header">
        <span>&nbsp</span>
        <div class="want-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>
      <div class="want-content">
        <el-row>
          <!-- 图片 -->
          <el-col :span="5" style="margin-left: 100px"><img :src="'../../../static/img/goodsList/'+item.buyImg"  width="150px" height="150px"></el-col>
          <el-col :span="9"><div style="display:inline-block">
          <p><span class="want-content-title"> 商品名称 :</span> {{item.buyProductName}}</p>
        <!-- <p><span class="want-content-title">可接受价格:</span> {{item.address}}</p> -->
        <p><span class="want-content-title">联系方式:</span> {{item.buyPhone}}</p>
        <p><span class="want-content-title">简介:</span> {{item.buyIntro}}</p>
            <p><span class="want-content-title">发布时间:</span> {{convertTime(item.buyTime,'YYYY-MM-DD')}}</p>

          </div></el-col>

        </el-row>
      </div>
    </div>
    <!-- 修改弹框 -->
    <Modal v-model="modal" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改求购商品</span>
        </p>
        <div>
            <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="商品名称" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem label="简介" prop="intro">
            <i-input v-model="formData.intro" size="large"></i-input>
          </FormItem>

          <FormItem label="商品相似图片" prop="img">
            <i-input v-model="formData.img" size="large"></i-input>
            <!-- 上传图片 -->
            <!-- <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                    multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
          </FormItem>
          <FormItem label="联系方式" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
        </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long @click="editAction">确认修改</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from "axios";
import api from "../../../static/js/api";
import Moment from "moment";

export default {
  name: 'viewMyWant',
  inject:['reload'],
  data () {
    return {
      modal: false,
      formData: {
        name: '',
        intro: '',
        phone: '',
        img: ''
      },
      editId:null,
      buyTime:"",
      ruleInline: {
        name: [
          { required: true, message: '请输入求购商品名称', trigger: 'blur' }
        ],
        into: [
          { required: false }
        ],
        img: [
          { required: true }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  async created() {
    await this.loadWantProduct();
  },
  mounted() {
    this.loadWantProduct();
  },
  computed: {
    ...mapState(['wantProduct'])

  },
  methods: {
    ...mapActions(['loadWantProduct']),
    edit (index) {
      this.modal = true;
      this.editId = index;
      this.formData.name = this.wantProduct[index].buyProductName;
      this.formData.intro = this.wantProduct[index].buyIntro;
      this.formData.phone = this.wantProduct[index].buyPhone;
      this.formData.img = this.wantProduct[index].buyImg;
      this.formData.buytime = this.wantProduct[index].buytime;
    },
    editAction (buyid) {
      const _this=this;
      let moment = require("moment");
      buyid=_this.editId;
      var changeVo={
        "buyProductName": _this.formData.name,
        // "rflag": 0,
        "buyId": _this.wantProduct[buyid].buyId,
        "buyIntro": _this.formData.intro,
        "buyPhone": _this.formData.phone,
        "buyImg": _this.formData.img,
        "buyTime": moment,
        "buyBuyerId": Cookies.get('userid')
      }
      console.log(changeVo)
      axios.post(api.path+'wantingInfoManage/changeBuyInfo',changeVo)
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
      console.log(_this.wantProduct[index].buyId)
      _this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个求购商品？',
        onOk: () => {
          axios.get(api.path+'wantingInfoManage/deleteBuyInfoByBuyId/'+_this.wantProduct[index].buyId)
          .then(function (response){
            if(response.data.code===200) {
              _this.$message.success('删除成功')
              window.location.reload.bind(location)
              // _this.$router.push('/home/viewMyWant')
              window.location.reload()
              // _this.reload()
            }else {
              _this.$message.error('删除失败')
            }
          })
        },
        onCancel: () => {
          this.$Message.info('取消删除');
          _this.modal=false;
        }
      });

    },
    convertTime: function (data, format) {
      return Moment(data).utcOffset(0).format(format)
    }

  },
  components: {
  },
  filters: {},
  store
};
</script>

<style scoped>
.want-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}
.want-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.want-content {
  font-size: 15px;
  /*font-family: "楷体";*/
}

.want-content-title {
  color: #999;
}
.want-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
