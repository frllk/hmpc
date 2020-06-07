/**
 * vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser (state, userinfo) {
      state.user = userinfo
    },
    updateUsername (state, username) {
      state.user.name = username
    },
    updateUserphoto (state, userphoto) {
      state.user.photo = userphoto
    }
  }
})

export default store
