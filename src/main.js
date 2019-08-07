import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

import VueResourse from 'vue-resource';
Vue.use(VueResourse); 
Vue.http.options.root = "http://www.liulongbin.top:3005/";
Vue.http.options.emulateJSON = true;

import Vuex from 'vuex';
Vue.use(Vuex);

// UI
// import { Header, Tabbar, TabItem } from "mint-ui";
// import { Swipe, SwipeItem } from "mint-ui";
// Vue.component(Header.name, Header);
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// lazyload 按需引用不好使
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUI);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VuePreview from "vue-preview";
// Vue.use(VuePreview);
Vue.use(VuePreview, {
  mainClass: "pswp--minimal--dark",
  barsSize: { top: 0, bottom: 0 },
  captionEl: true,
  fullscreenEl: true,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: true
});

// 组件
import app from './App.vue';
import router from './router';

// lib
import './lib/fontawsome/css/all.min.css';

// 过滤器
// 时间处理插件，npm i -S moment
// 引入 import moment from 'moment';
import moment from 'moment';
Vue.filter('dateFormat', (dateStr, type = 'YYYY-MM-DD hh:mm:ss') => {
  // 调用moment
  return moment(dateStr).format(type);
})

// 创建 Vuex 仓库
const store = new Vuex.Store({
  state: {  // this.$store.state.***
    cart: JSON.parse(localStorage.getItem('ShoppingCart') || '[]'),   // [{ id, count, price, isSelected }]
  },
  mutations: {  // this.$store.commit('func', arg) 最多只能传递两个参数
    addToCart(state, commodityObj) {
      let isExist = state.cart.some(el => {
        if (el.id == commodityObj.id) {
          el.count += parseInt(commodityObj.count);
          return true;
        }
      });
      if (!isExist) {
        state.cart.push(commodityObj);
      };

      // 更新购物车后，存储至 localStorage
      localStorage.setItem('ShoppingCart', JSON.stringify(state.cart));
    },
    updateCart(state, countObj) {
      state.cart.some(el => {
        if (el.id == countObj.id) {
          el.count = parseInt(countObj.count);
          return true;
        }
      });
      // 更新购物车后，存储至 localStorage
      localStorage.setItem('ShoppingCart', JSON.stringify(state.cart));
    },
    updateSelected(state, info) {
      state.cart.some(el => {
        if (el.id == info.id) {
          el.isSelected = info.isSelected;
          return true;
        }
      });
      localStorage.setItem('ShoppingCart', JSON.stringify(state.cart));
    },
    removeById(state, id) {
      state.cart.some((item, index) => {
        if(item.id == id) {
          state.cart.splice(index, 1);
          return true;
        }
      })
      localStorage.setItem('ShoppingCart', JSON.stringify(state.cart));
    }
  },
  getters: {  // this.$store.getters.***
    getAll(state) {
      let c = 0;
      state.cart.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getCount(state) {
      let countObj = {};
      state.cart.forEach(item => {
        countObj[item.id] = item.count;
      });
      return countObj;
    },
    getSelected(state) {
      let selectedObj = {};
      state.cart.forEach(item => {
        selectedObj[item.id] = item.isSelected;
      });
      return selectedObj;
    }
  }
})

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})