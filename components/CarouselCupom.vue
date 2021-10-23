<template>
  <div v-if="items.length > 0" class="carouselCupons">
    <VueSlickCarousel v-bind="slickOptions">
      <div
        v-for="(item, index) in items"
        :key="'carouselCupomXItem' + index"
        class="item"
      >
        <div class="inner">
          <div class="container-image">
            <NuxtLink :to="'/marca/' + item.brand_slug">
              <img
                :src="item.brand_thumbnail"
                :alt="item.brand_name + ' logo'"
              />
            </NuxtLink>
          </div>

          <h3>{{ item.descricao }}</h3>

          <h6>
            <template v-if="item.usage === 0"> Ainda não foi usado </template>
            <template v-else>
              {{ item.usage }} {{ item.usage > 1 ? 'usados' : 'usado' }} hoje
            </template>
          </h6>

          <div class="button">
            <a
              href=""
              class="btn btn-orange"
              @click.prevent="openModalCupom(item)"
              >Show coupon</a
            >
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    VueSlickCarousel,
  },
  props: {
    items: {
      type: Array,
      default: (Array) => ['No items to show'],
    },
  },
  data() {
    return {
      slickOptions: {
        arrows: true,
        dots: false,
        dotsClass: 'slick-dots crslDots',
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991.99,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    }
  },
  methods: {
    ...mapMutations({
      openModal: 'global/openModalCupom',
    }),
    openModalCupom(cupom) {
      this.openModal(cupom)
    },
  },
}
</script>

<style lang="scss">
.carouselCupons {
  text-align: center;

  .item {
    // background: rgba(255, 255, 255, 0.7);
    // box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    // backdrop-filter: blur(3.125rem);
    // border-radius: $radiusBox;
    margin: 1.5rem 0;
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
      bottom: 0;
      left: 10%;
      height: calc(4.625rem);
      width: 80%;
      background: linear-gradient(90deg, #e93107 0%, #fbad3a 100%);
      z-index: -2;
    }

    // &::before,
    // &::after {
    //   content: unset;
    // }
  }

  .inner {
    padding: 1.25rem;
  }

  .container-image {
    // margin-bottom: 1rem;
    height: 9.5rem;

    a {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }

  .button {
    position: relative;
  }

  h3 {
    font-weight: 700;
    color: #000;
    font-size: 1.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    min-height: 4.1rem;
    margin-bottom: 1.5rem;
  }

  h6 {
    font-weight: 400;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }

  .slick-list {
    overflow-x: hidden;
    margin: 0 -0.5rem;
  }

  .slick-slide > div {
    padding: 0 0.5rem;
  }

  .slick-slide {
    opacity: 0.5;
    transition: opacity 0.3s;

    &.slick-active {
      opacity: 1;
    }
  }

  .btn-orange {
    width: 100%;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
    height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media only screen and (max-width: 767px) {
  .carouselCupons {
    .slick-slider {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
