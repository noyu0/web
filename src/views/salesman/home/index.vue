<template>
    <div class="salesmanBody">
      <div class="header">
        <header-page></header-page>
      </div>
      <div class="main-container">
        <salesman-nav @conveyIsShow="updateIsShow"></salesman-nav>
        <div v-show="show1">
            <goods-manage
            @getData="getData"
            :tableData="goods"></goods-manage>
        </div>
        <div v-show="show2">
            <goods-record
            :tableData="goods"></goods-record>
        </div>
      </div>
    </div>
</template>

<script>
import SalesmanNav from 'components/nav/salesmanNav'
import HeaderPage from 'components/header/headerPage'
import GoodsManage from 'views/salesman/manage/goods'
import GoodsRecord from 'views/salesman/record/goods'

export default {
  name: 'SalesmanHome',
  components: {
    SalesmanNav,
    HeaderPage,
    GoodsManage,
    GoodsRecord
  },
  data () {
    return {
      isShow: '',
      goods: [],
      show1: false,
      show2: false,
      Values: ['1-1', '2-1']
    }
  },
  methods: {
    getData () {
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
        }

        if (newValue === '1-1') {
          this.show1 = true
        } else if (newValue === '2-1') {
          this.show2 = true
        }
      }
    }
  },
  mounted () {
    this.isShow = this.$store.state.index
    this.getData()
  }
}
</script>

<style scoped>
    .salesmanBody {
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
