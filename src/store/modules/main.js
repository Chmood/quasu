import * as types from '../mutation-types'

// Initial state
const state = {
  isOnline: true
}

// Mutations
const mutations = {
  [types.SET_IS_ONLINE] (state, { online }) { state.isOnline = online }
}

// Getters
const getters = {
  isOnline: state => state.isOnline
}

// Actions
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
