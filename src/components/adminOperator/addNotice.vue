<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>发布公告</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="公告标题" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem  label="公告描述" prop="content">
            <i-input v-model="formData.postalcode" size="large" type="textarea"></i-input>
          </FormItem>
          <FormItem   prop="img_path">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.img_path" :src="formData.img_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary">发布公告</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker';
export default {
  name: 'AddAddress',
  data () {
    return {
      formData: {
        name: '',
        content: '',
        img_path: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入公告描述', trigger: 'blur' }
        ],
        img_path: [
          { required: true, message: '请插入图片', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    Distpicker
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.formData.img_path = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
