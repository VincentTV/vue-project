import VueRouter from 'vue-router';
import Home from './components/tabbar/Home.vue';
import Member from './components/tabbar/Member.vue';
import ShoppingCart from './components/tabbar/ShoppingCart.vue';
import Search from './components/tabbar/Search.vue';
import NewsList from './components/news/Newslist.vue';
import NewsInfo from './components/news/Newsinfo.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';
import CommodityList from './components/commodity/CommodityList.vue';
import CommodityInfo from "./components/commodity/CommodityInfo.vue";
import CommodityDetails from "./components/commodity/CommodityDetails.vue";
import CommodityComments from "./components/commodity/CommodityComments.vue";

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/member", component: Member },
    { path: "/shopping-cart", component: ShoppingCart },
    { path: "/search", component: Search },
    { path: "/home/newslist", component: NewsList },
    { path: "/home/newsinfo/:id", component: NewsInfo },
    { path: "/home/photolist", component: PhotoList },
    { path: "/home/photoinfo/:id", component: PhotoInfo },
    { path: "/home/commoditylist", component: CommodityList },
    { path: "/home/commodityinfo/:id", component: CommodityInfo, name: "commodityinfo" },
    { path: "/home/commoditydetails/:id", component: CommodityDetails, name: "commoditydetails" },
    { path: "/home/commoditycomments/:id", component: CommodityComments, name: "commoditycomments" },
  ]
});

export default router;
