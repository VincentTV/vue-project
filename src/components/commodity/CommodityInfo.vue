<template>
  <div class="commodity-info">
    <el-card class="box-card">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in banner" :key="item.id">
            <img :src="item.src">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="">
        <span>{{ commodityInfo.title }}</span>
      </div>
      <div class="box-body">
        <p>市场价：<del>¥{{ commodityInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="sell-price">¥{{ commodityInfo.sell_price }}</span></p>
        <p>
          购买数量：<el-input-number v-model="selectedCount" ref="ballStart" :min="1" :max="commodityInfo.stock_quantity" label="购买数量"></el-input-number>
        </p>
        <el-button type="primary">立即购买</el-button>
        <el-button type="danger" @click="addShopCart">加入购物车</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="">
        <span>商品参数</span>
      </div>
      <div class="box-body">
        <p>商品货号：{{ commodityInfo.goods_no }}</p>
        <p>库存情况：{{ commodityInfo.stock_quantity }}</p>
        <p>上架时间：{{ commodityInfo.add_time | dateFormat }}</p>
      </div>
      <div class="box-footer">
        <el-button type="primary" plain @click="goCommodityDetails">图文介绍</el-button>
        <el-button type="danger" plain @click="goCommodityComments">商品评论</el-button>
      </div>
    </el-card>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="numball" v-show="ballFlag" ref="numball"></div>
    </transition>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      aid: this.$route.params.id,
      banner: [],
      commodityInfo: {},
      selectedCount: 1,
      ballFlag: false
    }
  },
  methods: {
    getBanner() {
      this.$http.get('api/getthumimages/' + this.aid).then(item => {
        if(item.body.status == 0) {
          this.banner = item.body.message;
        } else {
          Toast('加载 Banner 失败');
        }
      })
    },
    getCommodityInfo() {
      this.$http.get('api/goods/getinfo/' + this.aid).then(item => {
        if(item.body.status == 0) {
          this.commodityInfo = item.body.message[0];
        } else {
          Toast('加载商品信息失败');
        }
      })
    },
    goCommodityDetails() {
      this.$router.push({name: 'commoditydetails', params: {id: this.aid}});
    },
    goCommodityComments() {
      this.$router.push({name: 'commoditycomments', params: {id: this.aid}});
    },
    addShopCart() {
      this.ballFlag = !this.ballFlag;
      let commodityObj = {
        id: this.aid,
        count: this.selectedCount,
        price: this.commodityInfo.sell_price,
        isSelected: true
      };
      this.$store.commit('addToCart', commodityObj);
    },
    beforeEnter(el) {
      const ballStartEl = this.$refs.ballStart.$el;
      el.style.left = ballStartEl.offsetLeft + ballStartEl.offsetWidth/2 - 7 + 'px';
      el.style.top = ballStartEl.offsetTop + ballStartEl.offsetHeight/2 - 7 + 'px';
      el.style.transform = 'translate(0,0)';
      // el.style.transform = `translate(${}px, ${}px)`;
      
    },
    enter(el, done) {
      const ballPosition = this.$refs.numball.getBoundingClientRect();
      const badgePosition = document.querySelector('#cartBadge').getBoundingClientRect();
      el.style.transform = `translate(${badgePosition.left - ballPosition.left}px, ${badgePosition.top - ballPosition.top}px)`;
      el.style.transition = 'transform 1s cubic-bezier(.52,0,.88,.3)'
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  created() {
    this.getBanner();
    this.getCommodityInfo();
  }
}
</script>

<style lang="scss">
.commodity-info {
  .el-card__body {
    padding: 0;
  }
  .box-card {
    margin: 10px;
  }
  .banner {
    height: 40vh;
    text-align: center;
    img {
      height: 100%;
    }
  }
  .sell-price {
    font-size: 18px;
    color: red;
  }
  .box-body {
    padding: 20px;
  }
  .box-footer {
    padding: 18px 20px;
    border-top: 1px solid #EBEEF5;
    box-sizing: border-box;
    .el-button {
      width: 100%;
      margin: 10px 0;
    }
  }
  .numball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
  }
}
</style>
