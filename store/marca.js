import axios from 'axios'

export const state = () => ({
  brand: null,
})

export const getters = {
  getBrand(state) {
    return state.brand
  },
}

export const mutations = {
  ADD_BRAND_DATA(state, value) {
    state.brand = value
  },
}

export const actions = {
  async getBrandDataAct({ commit }, payload) {
    try {
      const responseBrand = await axios.get(process.env.urlApi + '/brands.json')
      const dataBrand = responseBrand.data.data

      if (dataBrand) {
        // Temporary
        const brand = dataBrand.find((item) => item.brand_slug === payload.slug)
        commit('ADD_BRAND_DATA', brand)
        // Temporary

        // commit('ADD_BRAND_DATA', dataBrand)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
}
