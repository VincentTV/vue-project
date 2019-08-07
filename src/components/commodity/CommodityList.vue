<template>
  <div class="commodity-list">
    <ul>
      <li v-for="item in commodityList" :key="item.id" class="commodity-item" @click="goCommodityInfo(item.id)">
        <img :src="item.img_url" alt="">
        <h3 class="title">{{ item.title }}</h3>
        <div class="info">
          <div class="price">
            <span class="sell-price">¥{{ item.sell_price }}</span>
            <span class="market-price">¥{{ item.market_price }}</span>
          </div>
          <div class="quntity">
            <span>热卖中</span>
            <span>剩余{{ item.stock_quantity }}件</span>
          </div>
        </div>
      </li>
    </ul>
    <el-button plain type="danger" size="medium" icon="el-icon-refresh" @click="loadMore">加载更多</el-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      pageIndex: 1,
      commodityList: []
    }
  },
  created() {
    this.getCommodityList();
  },
  methods: {
    getCommodityList() {
      this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(res => {
        if(res.body.status == 0) {
          this.commodityList = this.commodityList.concat(res.body.message);
          res.body.message.length == 0 ? Toast('抱歉，没有更多商品了！！') : '';
        } else {
          Toast('获取商品列表失败');
        }
      })
    },
    loadMore() {
      this.pageIndex++;
      this.getCommodityList();
    },
    goCommodityInfo(id) {
      // this.$router.push('/home/commodityinfo/' + id);
      // this.$router.push({ path: '/home/commodityinfo/' + id});
      // 第三种传递命名路由方法，该方法需在 router.js 路由规则中命名路由；
      this.$router.push({ name: 'commodityinfo', params: {id} });
    }
  }
}
</script>

<style lang="scss">
.commodity-list {
  padding: 10px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .commodity-item {
    border: 1px solid #ccc;
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    box-shadow: 0 0 5px #9e9e9e;
    img {
      width: 100%;
      min-height: 50%;
    }
    .title {
      font-size: 16px;
      margin: 5px;
    }
    .info {
      background-color: #eee;
      padding: 8px;
    }
    .sell-price {
      font-size: 16px;
      color: red;
    }
    .market-price {
      margin-left: 8px;;
      font-size: 14px;
      text-decoration: line-through;
    }
    .quntity {
      font-size: 14px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
    }
  }
  .el-button {
    width: 100%; 
  }
}
</style>
