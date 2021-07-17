<template>
  <div>
    <div class="address-box" v-for="(item, index) in address" :key="index">
      <div class="address-header">
        <span>{{item.name}}</span>
        <div class="address-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>
      <div class="address-content">
        <el-row>
          <el-col :span="6"><img src='static/img/珍珠奶茶.jpg' width="300px" height="300px"></el-col>
          <el-col :span="6"><div style="display:inline-block">
          <p><span class="address-content-title"> 商品名称 :</span> {{item.name}}</p>
        <p><span class="address-content-title">商品分类:</span> {{item.province}} {{item.city}} {{item.area}}</p>
        <p><span class="address-content-title">标价:</span> {{item.address}}</p>
        <p><span class="address-content-title">简介:</span> {{item.postalcode}}</p>
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
          <FormItem label="商品名称" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem label="简介" prop="surname">
            <i-input v-model="formData.postalcode" size="large"></i-input>
          </FormItem>
          <!-- <FormItem label="商品分类" prop="address">
            <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
          </FormItem> -->
           <FormItem label="商品分类" prop="address">
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
          <FormItem label="标价" prop="address">
            <i-input v-model="formData.address" size="large"></i-input>
          </FormItem>
          <!-- <FormItem label="邮费" prop="postalcode">
            <i-input v-model="formData.postalcode" size="large"></i-input>
          </FormItem> -->
          <FormItem label="联系方式" prop="postalcode">
            <i-input v-model="formData.phone" size="large"></i-input>
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
import Distpicker from 'v-distpicker';
export default {
  name: 'MyAddress',
  data () {
    return {
      modal: false,
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
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        postalcode: '',
        province: '重庆市',
        city: '重庆市',
        area: '高新区',
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        postalcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.loadfavorite();
  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    ...mapActions(['loadfavorite']),
    edit (index) {
      this.modal = true;
      this.formData.province = this.address[index].province;
      this.formData.city = this.address[index].city;
      this.formData.area = this.address[index].area;
      this.formData.address = this.address[index].address;
      this.formData.name = this.address[index].name;
      this.formData.phone = this.address[index].phone;
      this.formData.postalcode = this.address[index].postalcode;
    },
    editAction () {
      this.modal = false;
      this.$Message.success('修改成功');
    },
    del (index) {
      this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个收货地址',
        onOk: () => {
          this.$Message.success('删除成功');
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      });
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
  font-size: 20px;
  font-family: "楷体";
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
