import Vue from 'vue'
import Vuex from 'vuex'

const types = {
  FETCHED_USERS: 'FETCHED_USERS'
}

const mockUsers = [
  {
    userId: '100',
    username: 'jonSnow1',
    isFake: true
  },
  {
    userId: '200',
    username: 'TallMan344',
    isFake: true
  },
  {
    userId: '300',
    username: 'QueenBee2',
    isFake: true
  },
  {
    userId: '400',
    username: 'eddieFart$',
    isFake: true
  }
]

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    [types.FETCHED_USERS] (state, { users }) {
      console.log('FETCHED_USERS')
      console.log('users', users)
      state.users = users
    }
  },
  actions: {
    getUsers ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit(types.FETCHED_USERS, { users: mockUsers })
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    users: (state) => {
      return state.users
    }
  }
})
