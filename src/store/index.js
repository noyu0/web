import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index: '',
    userid: ''
  },
  getters: {

  },
  mutations: {
    changeIndex (state, index) {
      state.index = index
    },
    changeID (state, userid) {
      state.userid = userid
    }
  },
  actions: {

  },
  modules: {
  },
  plugins: [createPersistedState()]
})
