<template>
  <header>
    <div class="wrapperNav">
      <div class="container">
        <div class="innerNav">
          <div class="brand">
            <NuxtLink to="/">
              <img src="/logo-kupouns.svg" alt="Logo Kupouns" />
              <h4>Kupouns</h4>
            </NuxtLink>
          </div>

          <form id="searchDiv" @submit.prevent="handleSearch($event)">
            <div class="group">
              <div class="button-wrapper">
                <button type="submit">
                  <font-awesome-icon :icon="['fas', 'search']" />
                </button>
              </div>

              <input
                id="searchHeader"
                v-model="formSearch.searchHeader"
                type="text"
                name="searchHeader"
                class="form-control"
                placeholder="Search"
                required
              />
            </div>

            <div id="mobileOpenSearch" @click="handleSearchDivDisplayFunc()">
              <font-awesome-icon :icon="['fas', 'search']" />
            </div>

            <template
              v-if="
                globalData !== null &&
                globalData.categories &&
                globalData.categories.length > 0
              "
            >
              <b-dropdown no-caret variant="orange">
                <template #button-content>
                  <span>{{ searchType }}</span>
                  <font-awesome-icon :icon="['fas', 'chevron-down']" />
                </template>

                <b-dropdown-item
                  v-for="(item, index) in globalData.categories"
                  :key="'searchTypeItem' + index"
                  @click="changeSearchType(item.name)"
                >
                  {{ item.name }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </form>

          <div
            id="nav-icon1"
            :class="menuMobileDisplay ? 'open' : ''"
            @click="menuDisplayFunc()"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <template
            v-if="
              globalData &&
              globalData.menuLinks &&
              globalData.menuLinks.length > 0
            "
          >
            <nav id="menuDesktop">
              <ul>
                <li
                  v-for="(item, index) in globalData.menuLinks"
                  :key="'navMenuItemDesk' + index"
                >
                  <NuxtLink :to="item.route">
                    {{ item.text }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </template>
        </div>
      </div>
    </div>

    <template
      v-if="
        globalData && globalData.menuLinks && globalData.menuLinks.length > 0
      "
    >
      <nav id="menuMobile" :class="menuMobileDisplay ? 'active' : ''">
        <div id="closeMenu" @click="menuDisplayFunc()">
          <span>✕</span>
        </div>
        <ul>
          <li
            v-for="(item, index) in globalData.menuLinks"
            :key="'navMenuItemMobile' + index"
            @click="menuDisplayFunc()"
          >
            <NuxtLink :to="item.route" @click="menuDisplayFunc()">
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </template>

    <form
      id="searchDivMobile"
      :class="searchDivMobile ? 'active' : ''"
      @submit.prevent="handleSearch($event)"
    >
      <div class="group">
        <div class="button-wrapper">
          <button type="submit">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>

        <input
          id="searchHeaderMobile"
          v-model="formSearch.searchHeader"
          type="text"
          name="searchHeader"
          class="form-control"
          placeholder="Search"
          required
        />

        <div id="closeSearchButton" @click="handleSearchDivDisplayFunc()">
          <span>✕</span>
        </div>
      </div>
    </form>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      searchType: '',
      formSearch: {
        searchHeader: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      menuMobileDisplay: 'global/getMenuMobileDisplay',
      searchDivMobile: 'global/getSearchDivMobile',
      globalData: 'getGlobalData',
    }),
  },
  created() {
    if (this.globalData.searchTypes) {
      this.changeSearchType(this.globalData.searchTypes[0].name)
    } else {
      this.changeSearchType('Categories')
    }
  },
  methods: {
    ...mapMutations({
      handleMenuMobileDisplay: 'global/handleMenuMobileDisplay',
      handleSearchDivMobile: 'global/handleSearchDivMobile',
    }),
    changeSearchType(type) {
      this.searchType = type
    },
    handleSearch(event) {
      // eslint-disable-next-line no-console
      console.log(event)

      this.formSearch.searchHeader = ''
      this.handleSearchDivDisplayFunc()
    },
    handleSearchDivDisplayFunc() {
      this.handleSearchDivMobile(!this.searchDivMobile)
    },
    menuDisplayFunc() {
      this.handleMenuMobileDisplay(!this.menuMobileDisplay)
    },
  },
}
</script>

<style lang="scss">
header {
  position: relative;
  // margin-bottom: $headerHeight;

  .wrapperNav {
    z-index: 99;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: $headerHeight;
    background: rgba(255, 255, 255, 0.75);
    -webkit-box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.15);
  }

  .innerNav {
    height: $headerHeight;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  h2 {
    color: black;
    font-family: $lato;
  }

  h4 {
    font-size: 1.3rem;
    color: $grey1;
    font-weight: 700;
    margin: 0 0 0 0.5rem;
  }

  nav {
    margin-left: auto;

    #closeMenu {
      display: none;
    }

    &#menuMobile {
      display: none;
    }
  }

  ul {
    display: flex;
    margin: 0;

    li {
      margin-right: 2rem;

      &:last-child {
        margin-right: 0;
      }
    }

    a {
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
  }

  .brand {
    margin-right: 2rem;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    img {
      width: 3.75rem;
    }
  }

  #searchDiv,
  #searchDivMobile {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    #mobileOpenSearch {
      display: none;
    }

    .group {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      svg {
        color: $grey2;
        width: 1rem !important;
      }
    }

    .button-wrapper {
      position: absolute;
      left: 0.75rem;
    }

    button {
      &[type='submit'] {
        border: none;
        background-color: unset;
        padding: 0.5rem;
      }
    }

    input {
      border: none;
      width: 28rem;
      max-width: 100%;
      background-color: #fff;
      height: 2.9rem;
      -webkit-box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.05);
      box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.05);
      border-radius: 0;
      border-top-left-radius: 0.938rem;
      border-bottom-left-radius: 0.938rem;
      padding-left: 3.5rem;
      height: 3rem;

      &:focus {
        box-shadow: none;
      }
    }

    .btn-orange {
      border-radius: 0;
      border-top-right-radius: 0.938rem;
      border-bottom-right-radius: 0.938rem;
    }

    li {
      margin-right: 0;
    }
  }

  #searchDivMobile {
    display: none;
  }

  @media only screen and (max-width: 767px) {
    & {
      // margin-bottom: $headerHeightMobile;
      .wrapperNav,
      .innerNav {
        height: $headerHeightMobile;
      }

      nav {
        position: fixed;
        z-index: 101;
        top: 0;
        left: -80%;
        opacity: 0.1;
        transition: left 0.35s, opacity 0.35s;
        width: 70%;
        // min-height: 50%;
        -webkit-box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.05);
        box-shadow: 0px 0 0.5rem 0px rgba(0, 0, 0, 0.05);
        background-color: #fff;
        border-bottom-right-radius: 0.25rem;

        &#menuDesktop {
          display: none;
        }

        &#menuMobile {
          display: block;
        }

        &.active {
          left: 0;
          opacity: 1;
        }

        #closeMenu {
          width: 3rem;
          height: 3rem;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;

          * {
            pointer-events: none;
          }
        }
        ul {
          overflow: auto;
          max-height: calc(85vh - 3rem);
          flex-direction: column;
          padding: 1rem 0;
          border-top: 1px solid rgba($color: #000000, $alpha: 0.05);

          li {
            margin-right: 0;
          }

          a {
            display: block;
            padding: 0.5rem 1.5rem;
          }
        }
      }

      h4 {
        display: none;
      }

      .brand {
        margin-right: 0;
        img {
          width: 3rem;
        }
      }

      #searchDiv,
      #searchDivMobile {
        margin: 0 1.25rem 0 auto;
        #mobileOpenSearch {
          display: block;
          margin-right: 1rem;
        }

        &.active {
          .group {
            top: 5.25rem;
          }
        }

        .group {
          position: fixed;
          transition: top 0.35s;
          left: 2.5%;
          width: 95%;
          top: -4rem;
          z-index: 101;
        }

        input,
        .btn-orange {
          border-radius: $radiusBox;
        }

        input {
          padding-left: 3rem;
          padding-right: 2.5rem;
        }

        .btn-orange {
          font-size: 0.9rem;
          height: 2.5rem;
          width: 8.5rem;

          span {
            margin-right: 0.2rem;
          }
        }

        #closeSearchButton {
          font-size: 1.1rem;
          font-weight: 700;
          position: absolute;
          right: 0.25rem;
          padding: 0.5rem;

          * {
            pointer-events: none;
          }
        }

        .button-wrapper {
          left: 0.5rem;
        }
      }

      #searchDiv {
        .group {
          display: none;
        }
      }

      #searchDivMobile {
        display: flex;

        .group {
          display: flex;
        }
      }
    }
  }
}

#nav-icon1 {
  margin: 0 0.25rem 0 0;
  display: none;
  width: 1.375rem;
  height: 1.25rem;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;

  * {
    pointer-events: none;
  }

  span {
    display: block;
    position: absolute;
    height: 0.25rem;
    width: 100%;
    background: $grey2;
    border-radius: 0.313rem;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 0.5rem;
    }
    &:nth-child(3) {
      top: 1rem;
    }
  }

  &.open {
    span {
      &:nth-child(1) {
        top: 0.5rem;
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -o-transform: rotate(135deg);
        transform: rotate(135deg);
      }

      &:nth-child(2) {
        opacity: 0;
        left: -50rem;
      }

      &:nth-child(3) {
        top: 0.5rem;
        -webkit-transform: rotate(-135deg);
        -moz-transform: rotate(-135deg);
        -o-transform: rotate(-135deg);
        transform: rotate(-135deg);
      }
    }
  }

  @media only screen and (max-width: 767px) {
    & {
      display: block;
    }
  }
}
</style>
