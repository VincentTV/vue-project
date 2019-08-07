<template>
  <div class="container">
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.img">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="menu-wrap">
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="/home/newslist">
            <img src="../../images/menu1.png" alt="">
            <p>新闻资讯</p>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/home/photolist">
            <img src="../../images/menu2.png" alt="">
            <p>图片分享</p>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/home/commoditylist">
            <img src="../../images/menu3.png" alt="">
            <p>商品购买</p>
          </router-link>
        </li>
        <li class="menu-item">
          <a href="#">
            <img src="../../images/menu4.png" alt="">
            <p>留言反馈</p>
          </a>
        </li>
        <li class="menu-item">
          <a href="#">
            <img src="../../images/menu5.png" alt="">
            <p>视频专区</p>
          </a>
        </li>
        <li class="menu-item">
          <a href="#">
            <img src="../../images/menu6.png" alt="">
            <p>联系我们</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      banner: []
    }
  },
  methods: {
    getBanner() {
      this.$http.get('api/getlunbo').then(item => {
        if(item.body.status == 0) {
          this.banner = item.body.message;
        } else {
          Toast('加载 Banner 失败');
        }
      })
    }
  },
  created() {
    this.getBanner();
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  margin: 0;
  padding: 0;
  color: lightslategray;
  .banner {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .menu-wrap {
    .menu-list {
      display: flex;
      flex-wrap: wrap;
      .menu-item {
        list-style: none;
        flex: 1 0 auto;
        width: 33%;
        display: flex;
        justify-content: center;
        padding: 10px 15px;
        box-sizing: border-box;
        a {
          padding: 10px 0;
          text-decoration: none;
          color: #333;
        }
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>
