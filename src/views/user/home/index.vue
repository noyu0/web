<template>
    <div class="userBody">
      <div class="header">
        <header-page></header-page>
      </div>
      <div class="main-container">
        <user-nav @conveyIsShow="updateIsShow"></user-nav>
        <div v-show="show1">
            <my-goods
            :tableData="mygoods"></my-goods>
        </div>
        <div v-show="show2">
            <my-cart
            @updateCart="updateCart"
            @updateMyGoods="updateMyGoods"
            :tableData="cart"></my-cart>
        </div>
        <div v-show="show3">
            <goods-mall
            @updateCart="updateCart"
            :tableData="goods"></goods-mall>
        </div>
      </div>
    </div>
</template>

<script>
import UserNav from 'components/nav/userNav'
import HeaderPage from 'components/header/headerPage'
import MyGoods from '../mine/myGoods'
import MyCart from '../cart/myCart'
import GoodsMall from '../mall/goods'

export default {
  name: 'UserHome',
  components: {
    UserNav,
    HeaderPage,
    MyGoods,
    MyCart,
    GoodsMall
  },
  data () {
    return {
      isShow: '',
      goods: [],
      mygoods: [],
      cart: [],
      show1: false,
      show2: false,
      show3: false,
      Values: ['1-1', '2-1', '3-1']
    }
  },
  methods: {
    // 从数据库获取数据
    getData () {
      this.$http.get('/api/mall/getGoods')
        .then((res) => {
          this.goods = res.data.data
        })
    },
    updateCart () {
      this.$http.get('/api/mall/getCart')
        .then((res) => {
          this.cart = res.data.data
        })
    },
    updateMyGoods () {
      this.$http.get('/api/mall/getmyGoods')
        .then((res) => {
          this.mygoods = res.data.data
        })
    },
    updateIsShow (key) {
      this.isShow = key
    }
  },
  watch: {
    isShow: {
      handler (newValue, oldValue) {
        // 将原页面内容隐藏，新页面内容显示
        if (oldValue === '1-1') {
          this.show1 = false
        } else if (oldValue === '2-1') {
          this.show2 = false
        } else if (oldValue === '3-1') {
          this.show3 = false
        }

        if (newValue === '1-1') {
          this.show1 = true
        } else if (newValue === '2-1') {
          this.show2 = true
        } else if (newValue === '3-1') {
          this.show3 = true
        }
      }
    }
  },
  mounted () {
    // 利用vuex获取上一页的index
    this.isShow = this.$store.state.index
    // 每次重新渲染都获取一次数据库信息
    this.getData()
    this.updateCart()
    this.updateMyGoods()
  }
}
</script>

<style scoped>
    .userBody {
      height: 100%;
    }
    .main-container {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .header {
      width: 100%;
    }
    .content {
      height: 100%;
      width: 100%;
    }
</style>
