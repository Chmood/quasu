// GLOBAL ACTIONS

import * as types from './mutation-types'

export const globalFetchMessages = ({ commit }) => {
  commit(types.FETCH_MESSAGES)
}
