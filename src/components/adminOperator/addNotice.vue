<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>发布公告</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" >
<!--          <FormItem label="公告标题" prop="name">-->
<!--            <i-input v-model="formData.name" size="large"></i-input>-->
<!--          </FormItem>-->
          <FormItem  label="公告描述" prop="boardText">
            <i-input v-model="formData.boardText" size="large" type="textarea"></i-input>
          </FormItem>
          <FormItem   label="上传图片" :label-width="100"  >
            <el-upload
              class="avatar-uploader"
              action="http://139.224.9.104:8182/uploadImage"
              methos="post"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="handleChange"
              ref="upload"
              type="file"
              name="image"
            >
              <img v-if="img_path" :src="img_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="submit" style="margin-right: 30px">发布公告</Button>
        <Button type="ghost" @click="cancel">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../../../static/js/api";
export default {
  name: 'AddAddress',
  data () {
    return {
      formData: {
        aid: '',
        boardText: "",
        boardImg: ''
        // boardTime: "",
        // img_path: ''
      },
      img_path: '',
      img_name:''
    };
  },
  components: {
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.formData.img_path = URL.createObjectURL(file.raw);
    },
    handleChange(file){
      this.img_path = URL.createObjectURL(file.raw);
      this.formData.boardImg= file.name

    },

    submit(){

      this.$refs.upload.submit()
      const _this=this;
      _this.formData.aid=Cookies.get('adminId')
      axios.post(api.path+'boardManage/addBoard',_this.formData).then(function (response){
        if(response.data.code===200){
          _this.$Message.success('添加成功')
          _this.$router.push('/adminOperator/noticeInfo')
        }else {
          _this.$Message.error('添加失败')
        }
      })
    },
    cancel(){
      this.$router.push('/adminOperator/noticeInfo')
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
.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
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
  /*width: 178px;*/
  /*height: 178px;*/
  display: block;
}
</style>
