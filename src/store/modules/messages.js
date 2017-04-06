import APIMessages from '../../api/messages'
import * as types from '../mutation-types'

// Initial state
const state = {
  messages: []
}

// Mutations
const mutations = {
  [types.DELETE_MESSAGE] (state, { message }) {
    state.messages.splice(state.messages.indexOf(message), 1)
  },
  [types.TOGGLE_MESSAGE] (state, { message }) {
    message.read = !message.read
  },
  [types.TOGGLE_ALL_MESSAGES] (state, { read }) {
    state.messages.forEach((message) => {
      message.read = read
    })
  },
  [types.FETCH_MESSAGES] (state, { messages }) {
    state.messages = messages
  }
}

// Getters
const getters = {
  messages: state => state.messages
}

// Actions
const actions = {
  fetchMessages ({ commit }) {
    APIMessages.getMessages(messages => {
      commit(types.FETCH_MESSAGES, { messages })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
