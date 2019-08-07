<template>
  <div class="commodity-details">
    <el-card class="box-card">
      <div slot="header">
        <span>{{ commodityDetails.title }}</span>
      </div>
      <div class="box-body" v-html="commodityDetails.content"></div>
    </el-card>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      aid: this.$route.params.id,
      commodityDetails: {}
    }
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.$http.get('api/goods/getdesc/' + this.aid).then(res => {
        if(res.body.status == 0) {
          this.commodityDetails = res.body.message[0];
        } else {
          Toast('加载商品详情失败');
        }
      })
    }
  }
}
</script>

<style lang="scss">
.commodity-details {
  img {
    width: 100%;
  }
}
</style>
