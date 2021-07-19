<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>发布商品</h1>
      </div>
      <div class="add-box">
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
          <!-- <FormItem label="上传商品" prop="img">
            <el-upload
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
            </el-upload>
          </FormItem> -->

          <FormItem label="标价" prop="pprice">
            <i-input v-model="formData.pprice" size="large"></i-input>
          </FormItem>
          <!-- <FormItem label="邮费" prop="postalcode">
            <i-input v-model="formData.postalcode" size="large"></i-input>
          </FormItem> -->
<!--          <FormItem label="联系方式" prop="phone">-->
<!--            <i-input v-model="formData.phone" size="large"></i-input>-->
<!--          </FormItem>-->

        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="submit">发布</Button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import api from "../../../static/js/api";
export default {
  name: 'addMyGood',
  data () {
    return {
      formData: {
        pname: '',
        pintro: '',
        pprice: '',
        cid:null,
        uid:null

        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        // phone: '',
        // province: '重庆市',
        // city: '重庆市',
        // area: '高新区'
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
        // phone: [
        //   { required: true, message: '手机号不能为空', trigger: 'blur' },
        //   { type: 'string', pattern: /^1[2|3|4|5|7|8|9][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        // ]
      }
    };
  },
  async created() {
    const _this = this
    await axios.get(api.path + 'productManage/lookUpAllCatogory').then(function (response) {
      _this.options = response.data.data;
      // console.log(_this.options)
    })
    _this.formData.uid=Cookies.get('userid')
  },
  methods: {
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
    //     }
    select(id){
      // console.log(id)
      this.selectedIndex=id
    },
    submit(){
      // console.log(this.value)

      // console.log(this.$refs.selRef.selectedIndex)
      let _this=this
      // let moment = required('moment')
      // let postData={
      //   'pname':_this.formData.name,
      //   'pintro':_this.formData.intro,
      //   'pprice':_this.formData.price,
      //   'cid':2,
      //   'pstate':1,
      //   'uid':Cookies.get("userid")
      // }
      _this.formData.cid=_this.options[_this.selectedIndex].cid
      axios.post(api.path+'releaseProductManage/releaseProduct',_this.formData)
        .then(function (response){
          if(response.data.code==200){
            _this.$Message.success('发布成功');
            _this.$router.push('/home/viewMyGood')
          }
        })
    }
  },

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
