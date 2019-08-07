<template>
  <div class="photoinfo-container">
    <div class="photoinfo-header">
      <h2>{{ photoInfo.title }}</h2>
      <div class="photoinfo-data">
        <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
        <span>点击：{{ photoInfo.click }}次</span>
      </div>
    </div>

    <el-divider></el-divider>

    <div class="photo-thum">
      <vue-preview :slides="photoThum"></vue-preview>
    </div>

    <div class="photo-content" v-html="photoInfo.content"></div>
    
    <comment></comment>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import comment from '../subcomponents/Comment.vue';
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      photoThum: []
    }
  },
  created() {
    this.getPhotoInfo();
    this.getPhotoThum();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get('api/getimageInfo/'+this.id).then(res => {
        if(res.body.status == 0) {
          this.photoInfo = res.body.message[0];
        } else {
          Toast('获取信息失败');
        }
      })
    },
    getPhotoThum() {
      this.$http.get('api/getthumimages/'+this.id).then(res => {
        if(res.body.status == 0) {
          res.body.message.forEach(item => {
            item.msrc = item.src;
            item.w = 600;
            item.h = 400;
            item.title = this.photoInfo.title;
          })
          this.photoThum = res.body.message;
        } else {
          Toast('获取信息失败');
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
.photoinfo-container {
  padding: 0 10px;
  font-size: 14px;
  color: lightslategray;
  .photoinfo-header {
    h2 {
      font-size: 16px;
      margin: 10px;
      color: #000;
      text-align: center;
    }
    .photoinfo-data {
      display: flex;
      justify-content: space-between;
      color: #26a2ff;
    }
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
  .photo-content {
    margin: 20px 0;
    text-indent: 2em;
  }
  .photo-thum {
    .my-gallery {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      figure {
        width: 100px;
        margin: 0 5px;
        // display: inline-block;
        img {
          width: 100px;
        }
      }
    }
  }
}
</style>
