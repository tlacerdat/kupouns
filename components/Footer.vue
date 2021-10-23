<template>
  <div id="footerPage">
    <section
      v-if="globalData.about || globalData.howUse || globalData.offerCoupons"
      id="aboutKupouns"
    >
      <div class="container">
        <div class="line">
          <div v-if="globalData.about" class="item">
            <div class="inner">
              <h2>{{ globalData.about.title }}</h2>
              <p>{{ globalData.about.text }}</p>
              <h5 @click="readMoreAbout($event)">Leia mais...</h5>
            </div>
          </div>
          <div v-if="globalData.howUse" class="item">
            <div class="inner">
              <h2>{{ globalData.howUse.title }}</h2>
              <p>{{ globalData.howUse.text }}</p>
              <h5 @click="readMoreAbout($event)">Leia mais...</h5>
            </div>
          </div>
          <div v-if="globalData.offerCoupons" class="item">
            <div class="inner">
              <h2>{{ globalData.offerCoupons.title }}</h2>
              <p>{{ globalData.offerCoupons.text }}</p>
              <h5 @click="readMoreAbout($event)">Leia mais...</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="line">
          <div class="brand">
            <div>
              <img src="/logo-kupouns.svg" alt="Logo Kupouns" />
              <h4>Kupouns</h4>
            </div>

            <p>{{ globalData.footer.descricao }}</p>
          </div>

          <div v-if="filterLinks('our-company')" class="itemLinks">
            <h5>Our Company</h5>
            <ul>
              <li
                v-for="(item, index) in filterLinks('our-company')"
                :key="'item' + item.group + index"
              >
                <NuxtLink :to="item.route">
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  <span>{{ item.text }}</span>
                </NuxtLink>
              </li>
              <li></li>
            </ul>
          </div>

          <div v-if="filterLinks('contact-us')" class="itemLinks">
            <h5>Contact Us</h5>
            <ul>
              <li
                v-for="(item, index) in filterLinks('contact-us')"
                :key="'item' + item.group + index"
              >
                <NuxtLink :to="item.route">
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  <span>{{ item.text }}</span>
                </NuxtLink>
              </li>
              <li></li>
            </ul>
          </div>

          <div v-if="filterLinks('coupouns')" class="itemLinks">
            <h5>Coupouns</h5>
            <ul>
              <li
                v-for="(item, index) in filterLinks('coupouns')"
                :key="'item' + item.group + index"
              >
                <NuxtLink :to="item.route">
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  <span>{{ item.text }}</span>
                </NuxtLink>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        <hr />

        <h6>{{ globalData.footer.texto_legal }}</h6>
      </div>
    </footer>

    <div
      id="overPage"
      :class="menuMobileDisplay || searchDivMobile ? 'active' : ''"
      @click="hideDivs()"
    ></div>

    <ModalCupom />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ModalCupom from '@/components/ModalCupom.vue'

export default {
  components: { ModalCupom },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      menuMobileDisplay: 'global/getMenuMobileDisplay',
      searchDivMobile: 'global/getSearchDivMobile',
      globalData: 'getGlobalData',
    }),
  },
  methods: {
    ...mapMutations({
      clearDivs: 'global/clearDivs',
    }),
    hideDivs() {
      this.clearDivs()
    },
    filterLinks(group) {
      return this.globalData.footer.links.filter((item) => item.group === group)
    },
    readMoreAbout(event) {
      const readMore = event.target
      const paragraph = event.target.parentNode.querySelector('p')
      paragraph.style.cssText = 'height: auto;'
      readMore.style.cssText = 'display: none;'
    },
  },
}
</script>

<style lang="scss">
footer {
  overflow: hidden;
  .brand {
    width: 25%;
    div {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    img {
      width: 3.75rem;
    }
  }

  h4 {
    font-size: 1.3rem;
    color: $grey1;
    font-weight: 700;
    margin: 0 0 0 0.5rem;
  }

  p {
    font-family: $lato;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0;
    line-height: 1.5rem;
    width: 90%;
  }

  h5 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #000;
  }

  h6 {
    font-size: 0.75rem;
    font-family: $lato;
    margin-bottom: 1.75rem;
  }

  hr {
    position: relative;
    border: none;
    margin: 0 0 1.65rem 0;
    &::before {
      content: '';
      position: absolute;
      height: 2px;
      width: 100%;
      left: 0;
      top: 1px;
      background-color: #ddd;
    }
  }

  ul {
    margin: 0;
  }

  li {
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .line {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4rem 0;
  }

  .itemLinks {
    width: 25%;

    a {
      font-family: $lato;
      color: $grey2;
      font-size: 1rem;
      font-weight: 700;
      transition: color 0.35s;

      &:hover,
      &:active {
        color: lighten($color: $grey2, $amount: 20%);
        text-decoration: none;
      }
    }

    svg {
      color: $orange;
      width: 1.15rem !important;
      height: 1.15rem;
      margin-right: 0.5rem;
      vertical-align: sub;
    }
  }
}

#overPage {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba($color: #000000, $alpha: 0.15);
  width: 100vw;
  height: 100vh;

  @media only screen and (max-width: 767px) {
    &.active {
      display: block;
    }
  }
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 95%;
    width: 65rem;
    margin: 1.75rem auto;
  }
}

#aboutKupouns {
  background-color: #eeeeee;
  padding: 5rem 0 4rem 0;

  .line {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 -0.5rem;
  }

  .item {
    padding: 0 0.5rem;
    width: 33.3333%;
    margin-bottom: 1rem;
  }

  .inner {
    // background: rgba(255, 255, 255, 0.7);
    // box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    // backdrop-filter: blur(3.125rem);
    // border-radius: $radiusBox;
    height: 100%;
    padding: 2.5rem 1.25rem;
    position: relative;
    z-index: 1;

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
      top: 0;
      left: 15.5%;
      height: 4.75%;
      width: 69%;
      background: linear-gradient(90deg, #e93107 0%, #fbad3a 100%);
      z-index: -2;
    }

    // &::before,
    // &::after {
    //   content: unset;
    // }
  }

  h2 {
    font-weight: 700;
    font-size: 1.75rem;
    color: $grey1;
    margin-bottom: 1.5rem;
  }

  h5 {
    display: none;
  }

  p,
  h5 {
    white-space: pre-line;
    margin: 0;
    font-family: $lato;
    font-weight: 400;
    line-height: 1.5rem;
    font-size: 1rem;
  }
}

@media only screen and (max-width: 767px) {
  #aboutKupouns {
    padding: 4rem 0 3rem 0;

    .line {
      flex-direction: column;
      margin: 0;
    }

    .item {
      width: 100%;
      padding: 0;
    }

    h5 {
      display: block;
      margin-top: 2.5rem;
      text-decoration: underline;
      color: $orange;
    }

    p {
      transition: height 0.3s;
      height: 4.25rem;
      overflow: hidden;
    }
  }

  footer {
    .line {
      flex-direction: column;
      padding: 4rem 0 2rem 0;
    }

    .brand,
    .itemLinks {
      width: 100%;
      margin-bottom: 1.75rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    p {
      width: 100%;
    }

    h6 {
      line-height: 1.5rem;
    }

    hr {
      &::before {
        content: '';
        width: 200%;
        left: -50%;
      }
    }
  }
}
</style>
