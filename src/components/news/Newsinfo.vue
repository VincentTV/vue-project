<template>
  <div class="newsinfo-container">
    <div class="news-header">
      <h2>{{ title }}</h2>
      <div class="news-data">
        <span>发表时间：{{ addTime | dateFormat }}</span>
        <span>点击{{ click }}次</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="news-body" v-html="content"></div>
    <div class="news-comment">
      <comment></comment>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import comment from '../subcomponents/Comment.vue';
export default {
  data(){
    return {
      title: '',
      addTime: '',
      click: 0,
      content: ''
    }
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get('api/getnew/'+this.$route.params.id).then(res => {
        if(res.body.status == 0) {
          let data = res.body.message[0];
          this.title = data.title;
          this.addTime = data.add_time;
          this.click = data.click;
          this.content = data.content;
        }else {
          Toast('加载新闻详情失败！！')
        }
      })
    }
  },
  components: {
    comment
  }
}
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 10px;
  font-size: 14px;
  color: lightslategray;
  .news-header {
    h2 {
      font-size: 18px;
      margin: 10px;
      color: #000;
    }
    .news-data {
      display: flex;
      justify-content: space-between;
      color: #26a2ff;
    }
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>
