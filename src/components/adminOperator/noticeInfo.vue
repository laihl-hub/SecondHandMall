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
          <div class="layout-content-main">
            <el-table stripe style="width: 100%" :data="tableData">
              <el-table-column label="ID" width="auto" prop="id"> </el-table-column>
              <el-table-column label="公告标题" width="auto" prop="title">
              </el-table-column>
              <el-table-column label="公告描述" width="auto" prop="description">
              </el-table-column>
              <el-table-column label="创建时间" width="auto" prop="create_time">
              </el-table-column>
              <el-table-column label="管理员ID" width="auto" prop="admin_id">
              </el-table-column>
              <el-table-column label="操作">
                <!-- 可执行修改和删除操作 -->
                <template slot-scope="scope">
                  <Button type="ghost" shape="circle" icon="ios-eye-outline"></Button>
                  <Button type="warning" shape="circle" icon="ios-trash-outline"></Button></template
                ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: 1,
        title: '..',
        description: 'x',
        create_time: 1,
        admin_id: 'x'
      }]
    };
  }
};
</script>

<style scoped>
.layout-content{
  margin-top: 30px;
}
</style>
