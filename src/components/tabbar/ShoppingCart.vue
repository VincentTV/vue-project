<template>
  <div class="shopping-cart">

    <div class="commodity">
      <el-card v-show="isEmpty" class="cart-empty">
        <p>购物车空空如也...</p>
        <el-button type="primary" @click="goCommodityList">前往商城</el-button>
      </el-card>

      <el-card v-for="(item, index) in commodityList" :key="item.id">
        <div class="commodity-item">
          <el-switch v-model="selectedObj[item.id]" active-color="#409eff" inactive-color="#dcdfe6" @change="selectedHandler(item.id, selectedObj[item.id])"></el-switch>
          <router-link tag="img" :to="'home/commodityinfo/' + item.id" :src="item.thumb_path"></router-link>
          <div class="info">
            <router-link tag="p" class="title" :to="'home/commodityinfo/' + item.id">{{ item.title }}</router-link>
            <div class="data">
              <span class="price">¥{{ item.sell_price }}</span>
              <el-input-number size="mini" v-model="item.cou" :min="1" @change="countHandler(item.id, $event)"></el-input-number>
              <span class="del" @click="removeItem(item.id, index)">删除</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <el-card class="settlement-wrap">
      <div class="left">
        <p>总计（不含运费）</p>
        <p>已勾选商品 <span>{{ settlement().count }}</span> 件，总价 <span>¥{{ settlement().amount }}</span></p>
      </div>
      <div class="right">
        <el-button type="danger" size="medium">去结算</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      commodityList: [],
      isEmpty: false,
      selectedObj: this.$store.getters.getSelected
    }
  },
  created() {
    this.getShopCart();
  },
  methods: {
    getShopCart() {
      let idArr = [];
      this.$store.state.cart.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        this.isEmpty = true;
        return;
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
        if (res.body.status == 0) {
          this.commodityList = res.body.message;

          let countObj = this.$store.getters.getCount;
          this.commodityList.forEach(item => {
            item.cou = countObj[item.id];
            item.isSelected = this.selectedObj[item.id];
          })
        } else {
          Toast('获取购物车失败');
        }
      })
    },
    countHandler(aid, val) {
      // console.log(val, id);
      this.$store.commit('updateCart', {
        id: aid,
        count: parseInt(val)
      })
    },
    selectedHandler(aid, val) {
      this.commodityList.some(item => {
        if (item.id == aid) {
          item.isSelected = val;
        }
      });
      this.$store.commit('updateSelected', {
        id: aid,
        isSelected: val
      })
    },
    goCommodityList() {
      this.$parent.selected = 'home';
      this.$router.push('/home/commoditylist');
    },
    removeItem(id, i) {
      this.commodityList.splice(i, 1);
      this.$store.commit('removeById', id);
      if (this.commodityList.length <= 0) {
        this.isEmpty = true;
      }
    },
    settlement() {
      let settlementAll = {
        count: 0,
        amount: 0
      };
      this.commodityList.forEach(item => {
        if (item.isSelected) {
          settlementAll.amount += parseFloat(item.sell_price) * parseInt(item.cou);
          settlementAll.count += parseInt(item.cou);
        }
      });
      return settlementAll;
    }
  }
}
</script>

<style lang="scss">
.shopping-cart {
  color: lightslategray;
  .commodity {
    background-color: darkgrey;
    padding: 0 10px;
    overflow: hidden;
    .commodity-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin: 0 10px;
      }
      .info {
        max-width: 70%;
        margin-left: auto;
        .data {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          .price {
            color: red;
          }
          .el-input-number {
            width: 100px;
          }
          .del {
            cursor: pointer;
            color: #409EFF;
          }
        }
        .title {
          cursor: pointer;
          margin: 10px 0;
        }
      }
    }
    .cart-empty {
      text-align: center;
    }
    .el-card {
      border: none;
      margin: 10px 0;
    }
    .el-card__body {
      padding: 10px;
    }
  }
  .settlement-wrap {
    margin: 10px;
    .el-card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      .left {
        color: lightslategray;
        p {
          margin: 5px 0;
          font-size: 14px;
        }
        span {
          color: red;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
