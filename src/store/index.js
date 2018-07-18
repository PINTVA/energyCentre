import Vue from 'vue'
import vuex from 'vuex'
import * as types from './types'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    show: true,
    user: {
      Token: '',
      Account: '',
      CompanyId: '',
      Pid: ''
    },
    childDevice: {
      name: '',
      pId: ''
    },
    selectTab: '首页',
    userAccount: '',
    userToken: '',
    userCompanyId: '',
    userPId: '',
    workshopList: []
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.userToken = data.userToken
      localStorage.userAccount = data.userAccount
      localStorage.userCompanyId = data.userCompanyId
      localStorage.userPId = data.userPId
      state.userToken = data.userToken
      state.userAccount = data.userAccount
      state.userCompanyId = data.userCompanyId
      state.userPId = data.userPId
      state.user.Token = data.userToken
      state.user.Account = data.userAccount
      state.user.CompanyId = data.userCompanyId
      state.user.Pid = data.userPId
    },
    [types.CHILDINFO]: (state, data) => {
      state.childDevice.name = data.name
      state.childDevice.pId = data.pId
    },
    [types.LOGOUT]: (state) => {
      localStorage.clear()
      state.userToken = ''
    },
    [types.WORKSHOP]: (state, data) => {
      state.workshopList = data
    },
    [types.SELECTTAB] (state, value) {
      state.selectTab = value
    }
  },
  actions: {
    userLogin (context, {userToken, userAccount, userCompanyId, userPId}) {
      context.commit(types.LOGIN, {userToken, userAccount, userCompanyId, userPId})
    },
    childInfo (context, {name, pId}) {
      context.commit(types.CHILDINFO, {name, pId})
    },
    workshopList ({commit}, value) {
      commit(types.WORKSHOP, value)
    },
    userLogout ({commit}) {
      commit(types.LOGOUT)
    },
    selectTab ({commit}, value) {
      commit(types.SELECTTAB, value)
    }
  }
})
