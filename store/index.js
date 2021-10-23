import axios from 'axios'

export const state = () => ({
  globalData: null,
})

export const getters = {
  getGlobalData(state) {
    return state.globalData
  },
}

export const mutations = {
  ADD_GLOBAL_DATA(state, value) {
    state.globalData = value
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const responseGlobal = await axios.get(
        process.env.urlApi + '/global.json'
      )
      const dataGlobal = responseGlobal.data.data

      if (dataGlobal) {
        commit('ADD_GLOBAL_DATA', dataGlobal)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
}
