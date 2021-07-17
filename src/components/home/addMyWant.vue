<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>发布求购</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="商品名称" prop="name">
            <i-input v-model="formData.name" size="large" placeholder="这很重要，让别人对你的需求一目了然"></i-input>
          </FormItem>
          <FormItem label="商品分类" prop="category">
                <el-select v-model="formData.options.value" placeholder="请选择">
                    <el-option
                      v-for="item in formData.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
          </FormItem>
          <FormItem label="简介（可选）" prop="intro">

            <i-input type="textarea" :autosize="{minRows:2,maxRows:6}" v-model="formData.intro" size="large" placeholder="详细描述你的需求"></i-input>
          </FormItem>
          <FormItem label="可接受价格" prop="price">
            <i-input v-model="formData.price" size="large" placeholder="数字或文字，可以接受的价格，如“100-150之间"></i-input>
          </FormItem>
          <FormItem label="联系方式" prop="phone" >
            <i-input v-model="formData.phone" size="large" placeholder="留下你的联系方式"></i-input>
          </FormItem>
          <FormItem label="图片" prop="img">
            <div>
              <div slot="tip" class="el-upload__tip">请上传jpg/png文件</div>
              <!-- action: 图片上传的API接口地址 -->
              <el-upload 
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
            </div>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary">发布</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addMyWant',
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        price: '',
        phone: '',
        img: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
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
  
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        intro: [
          { required: false, message: '请输入简介', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格范围', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        img: [
          { required: true }
        ]
      }
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  components: {
    
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
