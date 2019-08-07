<template>
  <div class="app-container">
    <!-- Header -->
    <mt-header fixed title="Header">
      <span slot="left" v-show="!isHome" @click="goBack">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- router-view -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- Footer -->
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="home" href="#/home">
        <i slot="icon" class="fas fa-home"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="member" href="#/member">
        <i slot="icon" class="far fa-user-circle"></i>
        会员
      </mt-tab-item>
      <mt-tab-item id="shopping-cart" href="#/shopping-cart">
        <mt-badge type="error" class="cart-badge" id="cartBadge">{{ $store.getters.getAll }}</mt-badge>
        <i slot="icon" class="fas fa-shopping-cart"></i>
        购物车
      </mt-tab-item>
      <mt-tab-item id="search" href="#/search">
        <i slot="icon" class="fas fa-search"></i>
        搜索
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 'home',
      isHome: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    '$route.path': function(val) {
      if (val == '/home') {
        this.isHome = true;
        this.selected = 'home';
      } else {
        this.isHome = false;
        this.selected = this.$route.path.match(/[^/]+/)[0];
      }
    }
  }
  // methods: {
  //   goNext() {
  //     this.$router.push(this.selected);
  //   }
  // }
  // watch: {
  //   // $route(to, from) {
  //   //   this.selected = to.path
  //   // },
  //   selected(val) {
  //     this.$router.push(val);
  //   }
  // }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.app-container {
  padding-top: 40px;
  padding-bottom: 55px;
  overflow-x: hidden;
  a {
    color: #929292;
  }
  .mint-tabbar {
    color: #929292;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .mint-tab-item{
      cursor: pointer;
      position: relative;
      .mint-tab-item-icon{
        font-size: 20px;
      }
      .cart-badge {
        position: absolute;
        top: 5px;
        left: 50%;
      }
    }
  }
}
.v-enter {
  transform: translateX(100%)
}
.v-leave-to {
  width: 100%;
  position: absolute;
  transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: all .5s ease;
}
</style>
