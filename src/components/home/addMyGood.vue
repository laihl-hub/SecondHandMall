<template>
  <div>
<!--    <Header :style="{background: 'lightgrey'}">-->
<!--      <h2>发布商品</h2>-->
<!--    </Header>-->
    <div class="add-container">
      <div class="add-title">
        <h1>发布商品</h1>
      </div>

      <div class="add-box">
        <el-form :model="formData" ref="ruleForm" label-position="left" :label-width="'100'" :rules="ruleInline">
          <el-form-item label="商品名称" prop="pname" >
            <el-input v-model="formData.pname"  placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="pintro">
            <el-input v-model="formData.pintro" size="large" placeholder="请介绍介绍你的商品吧"></el-input>
          </el-form-item>
           <el-form-item label="商品分类" >
                <el-select v-model="value" placeholder="请选择"  v-on:change="select">
                    <el-option
                      v-for="(item,index) in options"
                      :key="item.cid"
                      :label="item.cname"
                      :value="index">
                    </el-option>
                </el-select>
          </el-form-item>

            <el-form-item label="请上传图片" ref="uploadElement" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                method="post"
                :show-file-list="false"
                action="http://139.224.9.104:8182/uploadImage"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :auto-upload="false"
                name="image"
                type="file"
                style="border: 1px dotted lightgray;margin-left: 70px;margin-top:40px;width: 200px;height: 200px"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" >
                <i v-else class="el-icon-plus avatar-uploader-icon" style="margin:5px 5px"></i>
              </el-upload>
            </el-form-item>

          <el-form-item label="标价" prop="pprice">
            <el-input v-model="formData.pprice" size="large"></el-input>
          </el-form-item>
          <el-form-item label="入手价" prop="pprePrice">
            <el-input v-model="formData.pprePrice" size="large"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <div class="add-submit">
        <Button type="ghost" @click="submit" style="background-color: #b2dfdb">发布</Button>
        <Button type="ghost" @click="cancel" style="margin-left: 30px">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import api from "../../../static/js/api";
import vm from 'vm';
export default {
  name: 'addMyGood',
  data () {
    return {
      formData: {
        pname: '',
        pintro: '',
        pprice: '',
        cid:null,
        sellerId:null,
        pimg:null,
        pprePrice:null,
      },
      value:'',
      options:null,
      selectedIndex:null,
      maxPid:0,
      imageUrl:'',
      headerObj:{
        Authorization: window.sessionStorage.getItem('token')
      },
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
    const _this = this
    await axios.get(api.path + 'productManage/lookUpAllCatogory').then(function (response) {
      _this.options = response.data.data;
    })

    await axios.get(api.path + 'productManage/lookMaxIdInProduct').then(function (response) {
      _this.maxPid = response.data.data+1;
    })

  },
  methods: {

    handleChange (file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.formData.pimg= file.name
    },


    beforeUpload(file) {
      return true;
    },


    select(id){
      this.selectedIndex=id
    },

    submit(){
      this.$refs.upload.submit();
      let _this=this
      _this.formData.cid=_this.options[_this.selectedIndex].cid
      // 发送两次post请求，第一次存储数据库，第二次存储图片
      _this.formData.sellerId=Cookies.get('userid')
      axios.post(api.path+'releaseProductManage/releaseProduct',_this.formData)
        .then(function (response){
          if(response.data.code==200){
            window.location.reload()
            _this.$Message.success('发布成功');

          }
        })

    },
    cancel(){
      this.$message.success('取消成功')
      window.location.reload()
    }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
