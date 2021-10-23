<template>
  <b-modal id="modalCupom" ref="modalCupom" hide-footer hide-header centered>
    <div class="inner">
      <div class="container-image">
        <template v-if="isMarcaPage">
          <a>
            <img
              :src="cupomSelected.brand_thumbnail"
              :alt="cupomSelected.brand_name + ' logo'"
            />
          </a>
        </template>
        <template v-else>
          <a
            :href="'/marca/' + cupomSelected.brand_slug"
            @click.prevent="closeModalButton()"
          >
            <img
              :src="cupomSelected.brand_thumbnail"
              :alt="cupomSelected.brand_name + ' logo'"
            />
          </a>
        </template>
      </div>

      <div class="content">
        <div class="closeModal" @click="hideModal()">✕</div>
        <h2>{{ cupomSelected.descricao }}</h2>

        <ul class="infoAndShare">
          <li>
            <template v-if="cupomSelected.usage === 0">
              Ainda não foi usado
            </template>
            <template v-else>
              {{ cupomSelected.usage }}
              {{ cupomSelected.usage > 1 ? 'usados' : 'usado' }}
              hoje
            </template>
          </li>
          <li>
            <b-dropdown no-caret variant="transparent">
              <template #button-content>
                <font-awesome-icon :icon="['fas', 'share-alt']" />
                <span>Compartilhar</span>
              </template>

              <b-dropdown-item @click="shareSocialMedia('WhatsApp')">
                <font-awesome-icon :icon="['fab', 'whatsapp']" />
                WhatsApp
              </b-dropdown-item>
              <b-dropdown-item @click="shareSocialMedia('Facebook')">
                <font-awesome-icon :icon="['fab', 'facebook-f']" />
                Facebook
              </b-dropdown-item>
              <b-dropdown-item @click="shareSocialMedia('Twitter')">
                <font-awesome-icon :icon="['fab', 'twitter']" />
                Twitter
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>

        <div class="buttons">
          <div class="shareCupons">
            <h3>{{ cupomSelected.hash }}</h3>
            <button class="btn btn-copy" @click.prevent="copyHash($event)">
              Copiar Cupom
            </button>
          </div>

          <a
            v-if="!isMarcaPage"
            :href="'/marca/' + cupomSelected.brand_slug"
            class="btn btn-orange"
            @click.prevent="closeModalButton()"
          >
            Ir para a loja
          </a>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      modalOpened: 'global/getModalOpenedTimes',
      cupomSelected: 'global/getCupomSelected',
      isMarcaPage: 'global/isMarcaPage',
    }),
  },
  watch: {
    modalOpened(newValue, oldValue) {
      this.$refs.modalCupom.show()
    },
  },
  methods: {
    closeModalButton() {
      this.$router.push({
        path: '/marca/' + this.cupomSelected.brand_slug,
      })
      this.hideModal()
    },
    hideModal() {
      this.$refs.modalCupom.hide()
    },
    shareSocialMedia(media) {
      let textEncoded = ''
      switch (media) {
        case 'Facebook':
          textEncoded =
            encodeURI(this.cupomSelected.descricao) +
            ': ' +
            this.cupomSelected.hash +
            '%0APara%20mais%20cupons%20clique%20no%20link.'

          window.open(
            'http://www.facebook.com/sharer.php?u=' +
              encodeURI(
                process.env.baseUrl + '/marca/' + this.cupomSelected.brand_slug
              ) +
              '&quote=' +
              textEncoded,
            'Facebook - Compartilhar',
            'toolbar=0, status=0, width=650, height=450'
          )

          break

        case 'Twitter':
          textEncoded =
            encodeURI(this.cupomSelected.descricao) +
            ': ' +
            this.cupomSelected.hash +
            '%0APara%20mais%20cupons%20clique%20no%20link.'

          window.open(
            'https://twitter.com/intent/tweet?original_referer=' +
              encodeURI(
                process.env.baseUrl + '/marca/' + this.cupomSelected.brand_slug
              ) +
              '&source=tweetbutton&text=' +
              textEncoded +
              '&url=' +
              encodeURI(
                process.env.baseUrl + '/marca/' + this.cupomSelected.brand_slug
              ),
            'Twitter - Compartilhar',
            'toolbar=0, status=0, width=650, height=450'
          )

          break

        case 'WhatsApp':
          textEncoded =
            encodeURI(this.cupomSelected.descricao) +
            ': ' +
            this.cupomSelected.hash +
            '%0APara%20mais%20cupons%20clique%20no%20link: ' +
            encodeURI(
              process.env.baseUrl + '/marca/' + this.cupomSelected.brand_slug
            )

          window.open(
            'http://wa.me/?text=' + textEncoded,
            'Compartilhar - WhatsApp',
            'toolbar=0, status=0, width=650, height=550'
          )
          break
      }
    },
    copyHash(event) {
      const btn = event.target
      const cb = navigator.clipboard

      cb.writeText(this.cupomSelected.hash).then(
        () => (btn.innerHTML = 'Copiado!')
      )

      setTimeout(() => {
        btn.innerHTML = 'Copiar Cupom'
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
#modalCupom {
  .modal-content {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(3.125rem);
    border-radius: $radiusBox;
  }

  .modal-body {
    padding: 2.5rem 1.875rem;
  }

  .inner {
    position: relative;
    display: flex;
    align-items: flex-start;
  }

  .container-image {
    // margin-bottom: 1rem;
    height: 9.5rem;
    width: 9.5rem;

    a {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: calc(97% - 11.5rem);
    margin-left: 2rem;
  }

  h2 {
    font-size: 2rem;
    color: #000000;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: $grey1;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 10rem);
  }

  .infoAndShare {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1.75rem;
  }

  li {
    margin-right: 1.25rem;
    height: 1.5rem;

    &:last-child {
      margin-right: 0;
    }
  }

  .dropdown-menu {
    padding: 0.5rem 0;

    li {
      margin-right: 0;
      height: auto;
    }

    .dropdown-item {
      padding: 0.5rem 1.25rem;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      vertical-align: sub;
    }
  }

  .btn-transparent {
    padding: 0;
  }

  svg {
    margin-right: 0.25rem;
    &.fa-share-alt {
      color: $yellow;
      height: 1rem;
      width: 1rem;
    }

    &.fa-twitter {
      color: #1da1f2;
    }

    &.fa-facebook-f {
      color: #4267b2;
    }

    &.fa-whatsapp {
      color: #25d366;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .shareCupons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 4.375rem;
    border: 2px dashed #f15d25;
    border-radius: $radiusBox;
    padding: 0.75rem;
    width: 62%;
  }

  .btn-orange {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.125rem;
    width: 27%;
    margin-left: 1.5rem;
    font-size: 1.125rem;
  }

  .btn-copy {
    background-color: #ddd;
    border-radius: $radiusBox;
    color: $grey1;
    height: 2.875rem;
    width: 10rem;
    font-size: 1.05rem;
    transition: background-color 0.3s;

    &:hover,
    &:active {
      background-color: darken($color: #ddd, $amount: 5%);
    }
  }

  .closeModal {
    position: absolute;
    right: -0.75rem;
    top: -1.75rem;
    font-size: 1.25rem;
    opacity: 0.7;
    cursor: pointer;
    transform: scale(1);
    transition: opacity 0.3s, transform 0.3s;
    &:hover,
    &:active {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}

@media only screen and (max-width: 767px) {
  #modalCupom {
    .inner {
      flex-direction: column;
      align-items: center;
    }

    .modal-body {
      padding: 1.25rem;
    }

    .container-image {
      margin-bottom: 1rem;
    }

    .content {
      margin: 0;
      width: 100%;
    }

    .closeModal {
      right: 0;
      top: -0.5rem;
    }

    .infoAndShare {
      margin-bottom: 1.25rem;
    }

    .buttons {
      flex-direction: column;
    }

    .shareCupons {
      width: 100%;
      padding: 0.5rem;
      height: 3.75rem;
    }

    h2 {
      font-size: 1.15rem;
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.1rem;
      width: calc(100% - 7.5rem);
    }

    .btn-orange {
      margin: 1rem 0 0 0;
      width: 11rem;
    }

    .btn-copy {
      font-size: 0.85rem;
      height: 2.5rem;
      width: 7.5rem;
    }
  }
}
</style>
