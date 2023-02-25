<template>
  <div class="adminBody">
    <div class="header">
      <header-page></header-page>
    </div>
    <div class="main-container">
      <admin-nav @conveyIsShow="updateIsShow"></admin-nav>
      <div v-show="show1">
        <id-change
        @getData="getData"
        :tableData="salesmanID"></id-change>
      </div>
      <div v-show="show2">
        <performance-query></performance-query>
      </div>
      <div v-show="show3">
        <admin-goods-manage
        @getData="getData"
        :tableData="goods"></admin-goods-manage>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from 'components/nav/adminNav'
import HeaderPage from 'components/header/headerPage'
import IdChange from 'views/admin/id/change'
import PerformanceQuery from 'views/admin/performance/query'
import AdminGoodsManage from 'views/admin/goods/goods'

export default {
  name: 'AdminHome',
  components: {
    AdminNav,
    IdChange,
    HeaderPage,
    PerformanceQuery,
    AdminGoodsManage
  },
  data () {
    return {
      isShow: '',
      salesmanID: [],
      goods: [],
      show1: false,
      show2: false,
      show3: false,
      Values: ['1-1', '2-1', '3-1']
    }
  },
  methods: {
    // 从数据库获取数据
    getData () {
      this.$http.get('/api/salesmanID/getID')
        .then((res) => {
          this.salesmanID = res.data.data
        })
      this.$http.get('/api/mall/getGoods')
        .then((res) => {
          this.goods = res.data.data
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
  }
}
</script>

<style scoped>
  .adminBody {
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
