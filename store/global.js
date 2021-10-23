export const state = () => ({
  menuMobileDisplay: false,
  searchDivMobile: false,
  modalOpenedTimes: 0,
  cupomSelected: {},
  marcaPage: false,
})

export const getters = {
  getMenuMobileDisplay(state) {
    return state.menuMobileDisplay
  },
  getSearchDivMobile(state) {
    return state.searchDivMobile
  },
  getModalOpenedTimes(state) {
    return state.modalOpenedTimes
  },
  getCupomSelected(state) {
    return state.cupomSelected
  },
  isMarcaPage(state) {
    return state.marcaPage
  },
}

export const mutations = {
  handleMenuMobileDisplay(state, value) {
    state.menuMobileDisplay = value
    state.searchDivMobile = false
  },
  handleSearchDivMobile(state, value) {
    state.searchDivMobile = value
    state.menuMobileDisplay = false
  },
  clearDivs(state, value) {
    state.searchDivMobile = false
    state.menuMobileDisplay = false
  },
  openModalCupom(state, cupom) {
    state.modalOpenedTimes += 1
    state.cupomSelected = cupom
  },
  handleMarcaPage(state, value) {
    state.marcaPage = value
  },
}
