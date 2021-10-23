import axios from 'axios'

export const state = () => ({
  brands: null,
})

export const getters = {
  getBrands(state) {
    return state.brands
  },
}

export const mutations = {
  ADD_BRANDS_DATA(state, value) {
    state.brands = value
  },
}

export const actions = {
  async getBrandsDataAct({ commit }) {
    try {
      const responseBrands = await axios.get(
        process.env.urlApi + '/brands.json'
      )
      const dataBrands = responseBrands.data.data

      if (dataBrands) {
        commit('ADD_BRANDS_DATA', dataBrands)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
}
