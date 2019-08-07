<template>
  <div class="newslist-container">
    <el-card class="box-card" v-loading="loading">
      <ul>
        <router-link v-for="item in newsList" :key="item.id" :to="'newsinfo/'+item.id" tag="li">
          <div class="news-item">
            <el-avatar class="news-avatar" shape="square" :size="50" :src="item.img_url"></el-avatar>
            <div class="news-info">
              <div class="news-title">{{ item.title }}</div>
              <div class="news-data"><span>发表时间：{{ item.add_time | dateFormat }}</span><span>点击：{{ item.click }}次</span></div>
            </div>
          </div>
          <el-divider></el-divider>
        </router-link>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      newsList: [],
      loading: true
    }
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get('api/getnewslist').then(res => {
        if(res.body.status == 0) {
          this.newsList = res.body.message;
          this.loading = false;
        } else {
          Toast('返回新闻列表失败！！');
        }
      })
    }
  }
}
</script>

<style lang="scss">
.newslist-container {
  width: 100%;
  color: lightslategray;
  ul {
    padding: 0;
    list-style: none;
  }
  .el-card__body {
    padding: 0 10px;
  }
  .news-item {
    display: flex;
    .news-avatar {
      margin-right: 10px;
      flex: 0 0 auto;
    }
    .news-info {
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      overflow: hidden;
      .news-title {
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      .news-data {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #26a2ff;
        white-space: nowrap;
      }
    }
  }
}
</style>
