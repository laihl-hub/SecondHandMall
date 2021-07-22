<template>
  <div>
    <div class="freeback-container">
      <div class="freeback-img-box">
        <img src="static/img/4.png">
      </div>
      <div class="freeback-box-border">
        <div class="freeback-box">
          <div class="freeback-title">
            <h1>意见反馈</h1>
            <h2>感谢你的反馈，我们会积极改善，做出更好的服务的</h2>
          </div>
          <div class="freeback-content">
            <div class="freeback-form">
              <Form :model="formItem" :label-width="80">
                <FormItem label="标题" >
                  <i-input v-model="formItem.title" placeholder="请输入标题"></i-input>
                </FormItem>
                <FormItem label="反馈信息">
                  <i-input v-model="formItem.content" type="textarea" :autosize="{minRows: 8,maxRows: 10}" placeholder="请输入反馈信息"></i-input>
                </FormItem>
                <FormItem>
                  <Button type="ghost" style="margin-right: 50px;background-color: #bedeec;margin-left: 50px">提交</Button>
                  <Button type="ghost">清空信息</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Freeback',
  data () {
    return {
      formItem: {
        title: '',
        content: ''
      }
    };
  }
};
</script>

<style scoped>
.freeback-container {
  margin: 0 auto;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
   background-color: rgba(199, 231, 241, 0.7);
  /*border: 5px outset rgba(158, 203, 222, 0.58);*/

}
.freeback-img-box {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-img-box img {
  width: 60%;
}
.freeback-box-border {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: white;*/
}
.freeback-box {
  width: 480px;
}
.freeback-content {
  margin: 15px auto;
  border: 1px #ccc dotted;
  background-color: #f1f6f8;
  border: 5px outset rgba(158, 203, 222, 0.58);
}
.freeback-form {
  margin: 30px auto;
  width: 90%;
}
</style>
