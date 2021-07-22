<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">公告管理</Breadcrumb-item>
        <Breadcrumb-item>公告</Breadcrumb-item>
      </Breadcrumb>
    </div>
        <div class="layout-content">
          <el-input type="text" style="width: 200px;margin-left: 60px" placeholder="请输入相关内容" clearable v-model="inputData"></el-input>
          <el-button icon="el-icon-search" circle @click="searchNotice" ></el-button>
          <div class="layout-content-main" style="margin-top: 30px">
            <el-table stripe style="width: 100%;border: 1px solid lightgray" :data="tableData" >
              <el-table-column label="ID" width="auto" prop="boardId"> </el-table-column>
              <el-table-column label="公告描述" width="auto" prop="boardText">
              </el-table-column>
              <el-table-column label="创建时间" width="auto" prop="boardTime">
              </el-table-column>
              <el-table-column label="管理员ID" width="auto" prop="aid">
              </el-table-column>
              <el-table-column label="操作">
                <!-- 可执行修改和删除操作 -->
                <template slot-scope="scope">
                  <Button type="ghost" shape="circle" icon="ios-eye-outline" @click="look(scope.row)"></Button>
                  <Button type="warning" shape="circle" icon="ios-trash-outline" @click="del(scope.row)" ></Button></template
                ></el-table-column>
            </el-table>
          </div>
          <Modal v-model="isVisible" width="500px" height="400px">
            <p slot="header">
              <Icon type="edit"></Icon>
              <span>公告详情</span>
            </p>
            <div style="width: 480px;height: 380px;margin-top: 10px;margin-left: 10px" >
              <Form :model="viewData" label-position="left" :label-width="80">
                <FormItem label="创建时间：" prop="boardTime">
                  <div style="width: 200px;height: 30px;border: 1px dotted lightgray">{{viewData.boardTime}}</div>
                </FormItem>
                <FormItem label="公告描述：" prop="boardText">
                  <div style="width: 300px;height: 100px;border: 1px dotted lightgray">{{viewData.boardText}}</div>
                </FormItem>
                <FormItem label="照片：" prop="boardImg">
                  <template slot-scope="scope">
                    <div style="width: 100px;height: 100px;border: 1px dotted lightgray">
                      <img slot="reference" :src="'../../../static/img/goodsList/'+viewData.boardImg" style="width: 300px;max-height: 300px">
                    </div>
                  </template>
                </FormItem>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import api from "../../../static/js/api";
import Moment from "moment";

import { mapState,mapActions } from 'vuex';
export default {
  data () {
    return {
      tableData: null,
      inputData:'',
      isVisible:false,
      viewData:{
        boardTime:'',
        boardText: '',
        boardImg:' '
      }
    };
  },
  async created() {
    const _this = this
    // this.loadCarouselItems();
    await axios.get(api.path_local + 'boardManage/listAllBoard').then(function (response) {
      _this.tableData = response.data.data;

    })
    for(let i=0;i<_this.tableData.length;i++){
      _this.tableData[i].boardTime=_this.convertTime(_this.tableData[i].boardTime,'YYYY-MM-DD HH:MM:SS')
    }



  },
  computed:{

  },
  methods:{


    searchNotice(){

    },
    look(row){
      this.isVisible=true
      this.viewData=row;
    },
    del(row){
      const _this=this;
      console.log(row.boardId)
      axios.get(api.path+'boardManage/removeBoardById/'+row.boardId).then(function (response){
        if(response.data.code===200){
          _this.$message.success('删除成功')
          window.location.reload()
        }else {
          _this.$message.error('删除失败')
        }
      })
    },
    convertTime: function (data, format) {
      return Moment(data).format(format)}
  },
  filters: {}
};
</script>

<style scoped>
.layout-content{
  margin-top: 30px;
}
</style>
