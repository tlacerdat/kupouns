<template>
  <div v-if="brandData" id="marcaPage">
    <section id="bannerMarca">
      <div class="container">
        <div class="content">
          <template v-if="categories && categories.length > 0">
            <ul>
              <li
                v-for="(item, index) in categories"
                :key="'categoryItemBanner' + index"
                class="categoryItem"
              >
                <font-awesome-icon :icon="['fas', 'tag']" />
                {{ item.name }}
              </li>
            </ul>
          </template>

          <div class="brandInfos">
            <div
              v-if="brandCupons && brandCupons.length > 0"
              class="cupomDestaque"
            >
              <div class="container-image">
                <img
                  :src="brandData.brand_thumbnail"
                  :alt="brandData.brand_name"
                />
              </div>
              <div class="brandCuponsInfoMobile">
                <h2>
                  <span>{{ brandData.cupons.length }}</span>
                  <template v-if="brandData.cupons.length === 0">
                    0 cupons encontrados
                  </template>
                  <template v-else>
                    {{
                      brandData.cupons.length > 1
                        ? 'cupons encontrados'
                        : 'cupom encontrado'
                    }}
                  </template>
                </h2>
              </div>

              <div class="cupomDetail">
                <h1>{{ brandCupons[0].descricao }}</h1>
                <h6>
                  Atualizado em {{ cupomDate(brandCupons[0].created_at) }}.
                </h6>
              </div>
            </div>
            <div class="brandCuponsInfo">
              <h2>
                <span>{{ brandData.cupons.length }}</span>
                <template v-if="brandData.cupons.length === 0">
                  0 cupons encontrados
                </template>
                <template v-else>
                  {{
                    brandData.cupons.length > 1
                      ? 'cupons encontrados'
                      : 'cupom encontrado'
                  }}
                </template>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div id="contentMarca">
      <div class="container">
        <div class="inner">
          <div v-if="brandCupons && brandCupons.length > 0" id="cuponsList">
            <ul>
              <li
                v-for="(item, index) in getCupons()"
                :key="'cupomListItem' + index"
                class="item"
              >
                <div class="container-image">
                  <img
                    :src="brandData.brand_thumbnail"
                    :alt="brandData.brand_name"
                  />
                </div>

                <div class="cupomDetail">
                  <h2>{{ item.descricao }}</h2>
                  <h6>
                    <template v-if="item.usage === 0">
                      Ainda não foi usado
                    </template>
                    <template v-else>
                      {{ item.usage }}
                      {{ item.usage > 1 ? 'usados' : 'usado' }} hoje
                    </template>
                  </h6>
                </div>

                <div class="button">
                  <a
                    href=""
                    class="btn btn-orange"
                    @click.prevent="openModalCupom(item)"
                    >Show coupon</a
                  >
                </div>
              </li>
            </ul>

            <div
              v-if="brandCupons.length > cuponsToShow"
              class="buttonLoadMore"
            >
              <button class="btn btn-copy" @click.prevent="loadMore()">
                Carregar mais
              </button>
            </div>
          </div>
          <aside>
            <h4>Disclaimer brand</h4>
            <p>{{ brandData.brand_disclaimer }}</p>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      categories: null,
      brandCupons: null,
      cuponsToShow: 1,
    }
  },
  async fetch({ store, route }) {
    try {
      await store.dispatch('marca/getBrandDataAct', {
        slug: route.params.slug,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  computed: {
    ...mapGetters({
      brandData: 'marca/getBrand',
    }),
    cuponsItensList() {
      // `this` points to the vm instance
      return this.brandCupons.slice(0, this.cuponsToShow)
    },
  },
  created() {
    this.handleMarcaPage(true)
    this.manipulateCupons()
  },
  methods: {
    ...mapMutations({
      handleMarcaPage: 'global/handleMarcaPage',
      openModal: 'global/openModalCupom',
    }),
    manipulateCupons() {
      if (this.brandData.cupons.length > 0) {
        const currentCategories = []
        const categories = []
        const cupons = this.brandData.cupons
          .reduce((acc, current) => {
            if (!currentCategories.includes(current.category)) {
              currentCategories.push(current.category)
              categories.push({ name: current.category })
            }
            current.brand_thumbnail = this.brandData.brand_thumbnail
            current.brand_slug = this.brandData.brand_slug
            acc.push(current)
            return acc
          }, [])
          .sort((a, b) => {
            if (!b.best_cupom && a.best_cupom) {
              return -1
            } else if (a.best_cupom && b.best_cupom) {
              return new Date(b.created_at) - new Date(a.created_at)
            } else if (!a.best_cupom && !b.best_cupom) {
              return new Date(b.created_at) - new Date(a.created_at)
            } else {
              return 1
            }
          })

        this.categories = categories
        this.brandCupons = cupons

        return cupons
      }
      return []
    },
    cupomDate(date) {
      const newDate = new Date(date)
      let dia = newDate.getDate().toString()
      let mes = (newDate.getMonth() + 1).toString()
      if (dia.length === 1) dia = '0' + dia
      if (mes.length === 1) mes = '0' + mes
      return dia + '/' + mes + '/' + newDate.getFullYear()
    },
    openModalCupom(cupom) {
      this.openModal(cupom)
    },
    loadMore() {
      this.cuponsToShow += 2
    },
    getCupons() {
      const cuponsReturn = []
      for (let index = 0; index < this.brandCupons.length; index++) {
        const element = this.brandCupons[index]
        if (!element) break
        if (index + 1 > this.cuponsToShow) continue

        cuponsReturn.push(element)
      }

      return cuponsReturn
    },
  },
}
</script>

<style lang="scss">
#bannerMarca {
  margin-bottom: 2.75rem;
  padding-top: $headerHeight;
  min-height: 28.5rem;
  background-image: url('/bg-mobile.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  .content {
    min-height: calc(28.5rem - $headerHeight);
    padding-top: 0.5rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: left;
    margin-bottom: 1.5rem;
    color: $grey1;
  }

  h2 {
    font-size: 1.5rem;
    color: $grey1;
    font-weight: 700;
    line-height: 2.5rem;
    margin: 0;

    span {
      font-size: 6.25rem;
      display: block;
      margin-bottom: 1.5rem;
    }
  }

  h6 {
    font-size: 1rem;
    margin: 0;
  }

  ul {
    margin: 0 0 2rem 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .categoryItem {
    margin: 0 0.25rem 0.5rem 0.25rem;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: $radiusBox;
    min-width: 8.75rem;
    height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;

    svg {
      width: 1rem !important;
      color: $orange;
      margin-right: 0.5rem;
    }
  }

  .brandCuponsInfo {
    width: 18rem;
    text-align: center;
  }

  .brandCuponsInfoMobile {
    display: none;
  }

  .brandInfos {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
  }

  .cupomDestaque {
    display: flex;
    align-items: center;
    text-align: left;
    width: calc(100% - 18rem);
  }

  .container-image {
    height: 12.5rem;
    width: 12.5rem;
    border-radius: 1.563rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }

  .cupomDetail {
    width: calc(100% - 14.5rem);
    margin-left: 2rem;
  }
}

#contentMarca {
  .inner {
    display: flex;
  }

  #cuponsList {
    width: calc(79% - 1.75rem);
    margin-right: 1.75rem;
  }

  aside {
    width: 21%;
    margin-bottom: 4rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 1rem;
  }

  h4 {
    color: $grey1;
    font-size: 1.875rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0;
  }

  p {
    font-size: 1rem;
    font-family: $lato;
    margin: 0;
    line-height: 1.5rem;
  }

  ul {
    margin: 0 0 4rem 0;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .container-image {
    height: 9.375rem;
    width: 9.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }

  .item {
    // background: rgba(255, 255, 255, 0.7);
    // box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    // backdrop-filter: blur(3.125rem);
    // border-radius: $radiusBox;
    margin: 0 0 1rem 0;
    padding: 1.5rem;
    position: relative;
    &::after {
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(3.125rem);
      border-radius: $radiusBox;

      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
    }

    &::before {
      content: '';
      border-radius: $radiusBox;
      position: absolute;
      top: 23%;
      left: 0;
      height: 54%;
      width: 14%;
      background: linear-gradient(90deg, #e93107 0%, #fbad3a 100%);
      z-index: -2;
    }

    // &::before,
    // &::after {
    //   content: unset;
    // }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .btn-orange {
    width: 13.5rem;
    font-size: 1.125rem;
    font-weight: 700;
    height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .buttonLoadMore {
    text-align: center;
    margin-bottom: 4rem;
  }

  .btn-copy {
    background-color: #eee;
    border-radius: $radiusBox;
    color: $grey1;
    height: 2.875rem;
    width: 13.75rem;
    font-size: 1.05rem;
    transition: background-color 0.3s;

    &:hover,
    &:active {
      background-color: darken($color: #eee, $amount: 5%);
    }
  }

  .cupomDetail {
    width: calc(100% - 25rem);
  }
}

@media only screen and (max-width: 767px) {
  #bannerMarca {
    padding-top: $headerHeightMobile;

    ul {
      justify-content: center;
      margin: 0 0 1rem 0;
    }

    h2 {
      font-size: 1.125rem;
      line-height: 1.3;
      span {
        font-size: 4.375rem;
        margin-bottom: 0;
        line-height: 1.05;
      }
    }

    .brandCuponsInfo {
      display: none;
    }

    .brandCuponsInfoMobile {
      display: block;
      width: 8.5rem;
      margin-left: auto;
      text-align: center;
      display: flex;
      align-items: center;
    }

    .container-image {
      width: 11.25rem;
      height: 11.25rem;
    }

    .cupomDestaque {
      flex-wrap: wrap;
      width: 100%;
    }

    .cupomDetail {
      margin: 1.5rem 0;
      width: 100%;
    }
  }

  #contentMarca {
    .inner {
      flex-direction: column;
    }

    aside {
      width: 100%;
    }

    #cuponsList {
      width: 100%;
      margin-right: 0;
    }

    li {
      flex-wrap: wrap;
      align-items: flex-start;
    }

    h2 {
      font-size: 1.1rem;
      min-height: 3.75rem;
    }

    .cupomDetail,
    .button {
      width: calc(100% - 6rem);
    }

    .button {
      margin-left: auto;
      margin: 1rem 0 0 auto;
    }

    .btn-orange {
      width: 100%;
    }

    .container-image {
      width: 5rem;
      height: 5rem;
    }

    .item {
      padding: 1.25rem;
    }
  }
}
</style>
