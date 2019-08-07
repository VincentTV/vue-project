<template>
  <div class="photolist-container">
    <div class="tap-wrap">
      <ul>
        <li v-for="item in photoListClass" :key="item.id" :class="[activeId == item.id ? 'active' : '']" @click="getPhotoListById(item.id)">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <ul class="photolist">
      <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="photo-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.zhaiyao }}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      activeId: 0,
      photoListClass: [],
      photoList: []
    }
  },
  created() {
    this.getPhotoList();
    this.getPhotoListById(0);
  },
  methods: {
    getPhotoList() {
      this.$http.get('api/getimgcategory').then(res => {
        if(res.body.status == 0) {
          this.photoListClass = res.body.message;
          this.photoListClass.splice(0, 3);
          this.photoListClass.unshift({id:0, title: '全部'});
        } else {
          Toast('获取图片列表失败');
        }
      })
    },
    getPhotoListById(id) {
      this.activeId = id;
      this.$http.get('api/getimages/'+id).then(res => {
        if(res.body.status == 0) {
          this.photoList = res.body.message;
        } else {
          Toast('获取图片失败');
        }
      })
    }
  }
}
</script>

<style lang="scss">
.photolist-container {
  font-size: 16px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .tap-wrap {
    margin: 20px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      display: flex;
      li {
        // display: inline-flex; 
        margin: 0 15px;
        flex: 1 0 auto; 
      }
      .active {
        color: #26a2ff;
      }
    }
  }
  .photolist {
    padding: 0 10px;
    li {
      background-color: #ccc;
      margin-bottom: 10px;
      text-align: center;
      box-shadow: 0 0 10px #333;
      position: relative;
      img {
        width: 100%;
        vertical-align: middle;
      }
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .photo-info {
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,.4);
        color: #fff;
        text-align: left;
        h3 {
          font-size: 14px;
          font-weight: normal;
          margin: 5px;
        }
        p {
          font-size: 12px;
          margin: 5px;
        }
      }
    }
  }
}
</style>
