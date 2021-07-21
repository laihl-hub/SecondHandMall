<template>
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>发布求购</h2>-->
<!--    </Header>-->
    <div class="addWant-container">
      <div class="addWant-title">
        <h1>发布求购</h1>
      </div>
      <div class="addWant-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="商品名称" prop="name">
            <i-input v-model="formData.name" size="large" placeholder="这很重要，让别人对你的需求一目了然"></i-input>
          </FormItem>
          <FormItem label="简介（可选）" prop="intro">
            <i-input type="textarea" :autosize="{minRows:2,maxRows:6}" v-model="formData.intro" size="large" placeholder="详细描述你的需求"></i-input>
          </FormItem>
          <FormItem label="联系方式" prop="phone" >
            <i-input v-model="formData.phone" size="large" placeholder="留下你的联系方式"></i-input>
          </FormItem>
<!--          <FormItem label="商品相似图片" prop="img">-->
<!--            &lt;!&ndash; 测试 &ndash;&gt;-->
<!--            <i-input v-model="formData.img" size="large" placeholder="图片"></i-input>-->
            <!-- <div>
              <div slot="tip" class="el-upload__tip">请上传jpg/png文件</div>
              action: 图片上传的API接口地址 -->
              <!-- <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-remove="handleRemove"
              >
                  <i slot="default" class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div> -->
<!--          </FormItem>-->
        </Form>
      </div>
      <div class="addWant-submit">
        <Button type="ghost" @click="addMyWant" style="background-color: #b2dfdb">发布</Button>
        <Button type="ghost" @click="cancel" style="margin-left: 30px">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker';
import axios from "axios";
import api from "../../../static/js/api";
export default {
  name: 'addMyWant',
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        phone: '',
        // img: '',

        // dialogImageUrl: '',
        // dialogVisible: false,
        // disabled: false,
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        intro: [
          { required: false, message: '请输入简介', trigger: 'blur' }
        ],
        // price: [
        //   { required: true, message: '请输入价格范围', trigger: 'blur' }
        // ],
        phone: [
          { required: false, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[2|3|4|5|7|8|9][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        img: [
          { required: true }
        ]
      }
    };
  },
  methods: {
    // 图片上传
    // handleRemove(file) {
    //   console.log(file);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    addMyWant(){
      let _this=this

      let postData={
        'buyProductName':_this.formData.name,
        'buyIntro':_this.formData.intro,
        'buyPhone':_this.formData.phone,
        // 'buyImg':_this.formData.img,
        'buyBuyerId':Cookies.get("userid")
      }
      axios.post(api.path+'/wantingInfoManage/releaseBuyInfo',postData)
        .then(function (response){
          if(response.data.code==200){
            _this.$Message.success('发布成功');
            // _this.$router.push('/home/viewMyWant')
            window.location.reload()
            // window.location.reload()
          }
        })
    },
    cancel(){
      this.$message.success('取消成功');
      window.location.reload()
    }
  },
  components: {

  }
};
</script>

<style scoped>
.addWant-container {
  margin: 15px auto;
  width: 60%;
  min-width: 600px;
}
.addWant-title {
  margin-bottom: 15px;
  text-align: center;
}
.addWant-submit {
  display: flex;
  justify-content: center;
}
</style>
