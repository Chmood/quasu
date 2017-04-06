import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules,
  plugins: [createPersistedState(
    // key <String>: The key to store the persisted state under. (default: vuex)
    // paths <Array>: An array of any paths to partially persist the state. If no paths are given, the complete state is persisted. (default: [])
    // reducer <Function>: A function that will be called to reduce the state to persist based on the given paths. Defaults to include the values.
    // subscriber <Function>: A function called to setup mutation subscription. Defaults to store => handler => store.subscribe(handler)
    //
    // storage <Storage>: Instead for (or in combination with) getState and setState. Defaults to localStorage (or internal storage for Server Side Rendering).
    //
    // getState <Function>: A function that will be called to rehydrate a previously persisted state. Defaults to using storage.
    // setState <Function>: A function that will be called to persist the given state. Defaults to using storage.
  )],
  strict: process.env.NODE_ENV !== 'production'
})
