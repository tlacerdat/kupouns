<template>
  <div id="homePage">
    <section id="banner">
      <div class="container">
        <div class="content">
          <h1>Find amazing cupouns here</h1>

          <template
            v-if="
              globalData !== null &&
              globalData.categories &&
              globalData.categories.length > 0
            "
          >
            <ul>
              <li
                v-for="(item, index) in globalData.categories"
                :key="'categoryItemBanner' + index"
                class="categoryItem"
              >
                <font-awesome-icon :icon="['fas', 'tag']" />
                {{ item.name }}
              </li>
            </ul>
          </template>
        </div>
      </div>
    </section>

    <div id="bannerAds">
      <div class="container">
        <img src="/ads.png" alt="Banner ads" class="img-fluid" />
      </div>
    </div>

    <section v-if="topDailyOffersItems().length > 0" id="dailyOffers">
      <div class="container">
        <div class="separator"></div>

        <h2>Top daily offers</h2>
        <h4>Everyday updated, our today’s best offers for you</h4>

        <CarouselCupom :items="dailyOffersItems" />
      </div>
    </section>

    <section v-if="topBrandsItems().length > 0" id="topBrands">
      <div class="container">
        <h2>Top brands</h2>

        <CarouselBrands :items="brandsItems" />
      </div>
    </section>

    <section id="formSection">
      <div class="container">
        <h2>Don't miss a deal! <br />Sign Up</h2>
        <form @submit.prevent="signUpForm($event)">
          <div class="group">
            <div class="icon-wrapper">
              <font-awesome-icon :icon="['fas', 'envelope']" />
            </div>

            <input
              v-model="formSignUp.email"
              type="email"
              name="email"
              class="form-control"
              placeholder="E-mail"
              required
            />
          </div>
          <button type="submit" class="btn btn-orange">Sign Up</button>
        </form>
      </div>
    </section>

    <section v-if="topCuponsItemsFunc().length > 0" id="topCupons">
      <div class="container">
        <div class="separator"></div>

        <h2>Top coupouns</h2>
        <h4>Our best coupouns selected specially for you</h4>

        <CarouselCupom :items="topCuponsItems" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CarouselCupom from '@/components/CarouselCupom.vue'
import CarouselBrands from '@/components/CarouselBrands.vue'

export default {
  components: {
    CarouselCupom,
    CarouselBrands,
  },
  data() {
    return {
      dailyOffersItems: null,
      brandsItems: null,
      topCuponsItems: null,
      formSignUp: {
        email: '',
      },
    }
  },
  async fetch({ store }) {
    try {
      if (store.getters['home/getBrands'] === null)
        await store.dispatch('home/getBrandsDataAct')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  computed: {
    ...mapGetters({
      globalData: 'getGlobalData',
      brands: 'home/getBrands',
    }),
  },
  created() {
    this.handleMarcaPage(false)
  },
  methods: {
    ...mapMutations({
      handleMarcaPage: 'global/handleMarcaPage',
    }),
    topDailyOffersItems() {
      const today = new Date()
      const topDailyItems = this.brands
        .reduce((acc, curr) => {
          curr.cupons.forEach((cupom) => {
            const cupomDate = new Date(cupom.created_at)
            if (cupomDate.toDateString() === new Date(today).toDateString()) {
              cupom.brand_thumbnail = curr.brand_thumbnail
              cupom.brand_name = curr.brand_name
              cupom.brand_slug = curr.brand_slug
              acc.push(cupom)
            }
          })
          return acc
        }, [])
        .sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at)
        })
      this.dailyOffersItems = topDailyItems
      return topDailyItems
    },
    topBrandsItems() {
      const brands = this.brands
        .map((item) => item)
        .sort((a, b) => {
          if (!b.brand_top && a.brand_top) {
            return -1
          } else if (a.brand_top && b.brand_top) {
            return new Date(b.created_at) - new Date(a.created_at)
          } else if (!a.brand_top && !b.brand_top) {
            return new Date(b.created_at) - new Date(a.created_at)
          } else {
            return 1
          }
        })
      this.brandsItems = brands
      return brands
    },
    topCuponsItemsFunc() {
      const topCupons = this.brands
        .reduce((acc, curr) => {
          curr.cupons.forEach((cupom) => {
            if (cupom.best_cupom) {
              cupom.brand_thumbnail = curr.brand_thumbnail
              cupom.brand_name = curr.brand_name
              cupom.brand_slug = curr.brand_slug
              acc.push(cupom)
            }
          })
          return acc
        }, [])
        .sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at)
        })
      this.topCuponsItems = topCupons
      return topCupons
    },
    signUpForm(event) {
      const btn = event.target.querySelector('button')
      btn.disabled = true
      btn.innerHTML = `<div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>`

      setTimeout(() => {
        btn.innerHTML = 'Enviado!'
      }, 2000)
    },
  },
}
</script>

<style lang="scss">
#banner {
  margin-bottom: 2.75rem;
  padding-top: $headerHeight;
  min-height: 30.375rem;
  background-image: url('/bg-mobile.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3.875rem;
    font-weight: 700;
    text-align: center;
    color: $grey1;
    margin: 2rem 0 2.25rem 0;
  }

  ul {
    margin: 0;
    padding: 0 0 2rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
}

#bannerAds {
  margin-bottom: 2.5rem;
  img {
    display: block;
    width: 100%;
  }
}

#dailyOffers,
#topCupons {
  margin-bottom: 3.5rem;
  .separator {
    margin-bottom: 2.5rem;
  }

  h2 {
    @include section-title();
  }

  h4 {
    @include text(0 0 0.5rem 0);
  }
}

#topBrands {
  padding: 4.5rem 0 3.5rem 0;
  background: #eeeeee;

  h2 {
    @include section-title();
    margin-bottom: 0.5rem;
  }
}

#formSection {
  padding: 5rem 0;
  text-align: center;
  background: url('/bg-form-section.png') center / cover no-repeat;
  margin-bottom: 2.5rem;

  h2 {
    @include section-title();
    margin-bottom: 1.25rem;

    br {
      display: none;
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    border: none;
    width: 23.75rem;
    max-width: 100%;
    background-color: #fff;
    border-radius: $radiusBox;
    padding-left: 3.25rem;
    height: 3.125rem;
    font-size: 1rem;
    margin-right: 0.625rem;

    &:focus {
      box-shadow: none;
    }
  }

  .icon-wrapper {
    position: absolute;
    left: 1rem;
  }

  .btn-orange {
    height: 3.125rem;
    width: 8.75rem;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .group {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      color: $grey2;
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: sub;
    }
  }
}

@media only screen and (max-width: 767px) {
  #banner {
    padding-top: $headerHeightMobile;
    min-height: 29.875rem;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin: 1rem 0 1.5rem 0;
    }

    ul {
      padding: 0 0 1rem 0;
    }

    .categoryItem {
      margin: 0 0.35rem 0.7rem 0.35rem;
    }
  }

  #dailyOffers,
  #topCupons {
    overflow: hidden;
    margin-bottom: 2.5rem;
    h2 {
      font-size: 1.875rem;
    }

    h4 {
      margin-bottom: 0;
      font-size: 0.95rem;
    }

    .separator {
      // overflow: hidden;
      &:before {
        width: 200vw;
        left: -50vw;
      }

      &:after {
        width: 50%;
        left: 25%;
      }
    }
  }

  #topBrands {
    padding: 3.5rem 0 2.5rem 0;

    h2 {
      font-size: 1.875rem;
      margin-bottom: 0;
    }
  }

  #formSection {
    padding: 4.75rem 0;
    h2 {
      font-size: 1.875rem;

      br {
        display: block;
      }
    }

    form {
      flex-direction: column;
      align-items: stretch;
    }

    input {
      width: 100%;
      margin: 0;
    }

    button {
      margin: 0.75rem auto 0 auto;
    }
  }
}
</style>
