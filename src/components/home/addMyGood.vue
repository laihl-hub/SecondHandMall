<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>发布商品</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="商品名称" prop="name" >
            <i-input v-model="formData.name" size="large" placeholder="请输入商品名称"></i-input>
          </FormItem>
          <FormItem label="简介" prop="surname">
            <i-input v-model="formData.name" size="large" placeholder="请介绍介绍你的商品吧"></i-input>
          </FormItem>
          <!-- <FormItem label="商品分类" prop="address">
            <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
          </FormItem> -->
           <FormItem label="商品分类" prop="value" >
                <el-select v-model="formData.options.value" placeholder="请选择">
                    <el-option
                      v-for="item in formData.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
          </FormItem>
          <FormItem label="上传商品" prop="img">
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
          </FormItem>
          <!-- <FormItem label="原价" prop="address">
            <i-input v-model="formData.address" size="large"></i-input>
          </FormItem> -->
          <FormItem label="标价" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
          <!-- <FormItem label="邮费" prop="postalcode">
            <i-input v-model="formData.postalcode" size="large"></i-input>
          </FormItem> -->
          <FormItem label="联系方式" prop="postalcode">
            <i-input v-model="formData.postalcode" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary">修改</Button>
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
        address: '',
        phone: '',
        options: [{
          value: '选项1',
          label: '数码产品'
        }, {
          value: '选项2',
          label: '书籍教材'
        }, {
          value: '选项3',
          label: '日用品'
        }, {
          value: '选项4',
          label: '零食小吃'
        }, {
          value: '选项5',
          label: '家用电器'
        }],
        value:'',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        postalcode: '000000',
        province: '重庆市',
        city: '重庆市',
        area: '高新区'
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        surname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        postalcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        img: [
          { required: true }
        ],
         value: [
          { required: true }
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
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除${file.name}?`);
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
