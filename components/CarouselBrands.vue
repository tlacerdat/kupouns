<template>
  <div v-if="items.length > 0" class="carouselBrands">
    <VueSlickCarousel v-bind="slickOptions">
      <div
        v-for="(item, index) in items"
        :key="'carouselBrandXItem' + index"
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

          <h6>
            <template v-if="item.cupons.length === 0"
              >Sem cupons cadastrados</template
            >
            <template v-else>
              {{ item.cupons.length }}
              {{ item.cupons.length > 1 ? 'cupons' : 'cupom' }}
            </template>
          </h6>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
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
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
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
}
</script>

<style lang="scss">
.carouselBrands {
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
      left: 12.5%;
      height: 22%;
      width: 75%;
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
    margin-bottom: 1.5rem;
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

  h6 {
    font-weight: 400;
    font-size: 0.875rem;
    margin-bottom: 0;
  }

  .slick-list {
    overflow-x: hidden;
    margin: 0 -0.5rem;
  }

  .slick-slide > div {
    padding: 0 0.5rem;
  }

  .slick-slide {
    opacity: 0.3;
    transition: opacity 0.3s;

    &.slick-active {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 767px) {
  .carouselBrands {
    .slick-slider {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
