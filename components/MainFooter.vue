<template>
  <!-- footer start  -->
  <div class="container p-footer">
    <div class="row pb-4 p-footer__container">
      <div class="col-xl-3 p-footer__logo__section">
        <h3 class="p-footer__logo__section__logo p-0">
          <img src="~/assets/logo.png" alt="Sushi N Poke" height="50" />
        </h3>
        <p class="p-footer__logo__section__title">
          Les plats japonais traditionnels, sushis faits maison... Découvrez
          notre cuisine japonaise authentique, préparée avec des ingrédients
          frais et de qualité.
        </p>
      </div>
      <div class="col-xl-3 p-footer__opening__houres">
        <h3 class="">Heures d'ouverture</h3>
        <p class="">
          Lundi jusqu’à Jeudi: <strong>11h-14h30, 18h-22h30</strong> <br />
          Vendredi <strong>11h-13h30, 18h-22h30</strong> <br />
          Samedi <strong>11h-14h30, 18h-22h30</strong> <br />
          Dimanche <strong>18h00-22h00</strong> <br />
        </p>
      </div>
      <div class="col-xl-3 p-footer__location">
        <h1 class="p-footer__location__heading">Adresse</h1>
        <p class="p-footer__location__location__name">
          4 Quai du Pont Neuf <br />
          56700 Hennebont, France
        </p>
      </div>
      <div class="col-xl-3 p-footer__map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.8475440035863!2d-3.279145599999999!3d47.803791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48105b7addc89407%3A0xdefce6860c5b21f!2s4%20Quai%20du%20Pont%20Neuf%2C%2056700%20Hennebont%2C%20France!5e0!3m2!1sen!2sbd!4v1699363674905!5m2!1sen!2sbd"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div class="p-footer__bottom">
      <div class="p-footer__bottom__copyright">
        © {{ new Date().getFullYear() }} Sushi N Poke. Tous droits réservés.
      </div>
      <div class="p-footer__bottom__devloped_by">
        Développé avec ❤️ par
        <a href="https://wetechpro.com/" target="_blank">WeTechPro</a>
      </div>
      <div class="p-footer__bottom__payment__image">
        <img src="~/assets/img/image46.png" alt="" />
      </div>
    </div>
  </div>

  <div class="footer-mobile-navs">
    <a
      href="#"
      class="footer-mobile-navs-item"
      @click.prevent="$router.push('/')"
      :class="{ active: $route.path == '/' }"
    >
      <span class="icon">
        <svg width="24px" height="24px" viewBox="0 0 24 24">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M3.95709826,8.41510662 L11.47855,3.81866389 C11.7986624,3.62303967 12.2013376,3.62303967 12.52145,3.81866389 L20.0429,8.41510557 C20.6374094,8.77841684 21,9.42493654 21,10.1216692 L21,19.0000642 C21,20.1046337 20.1045695,21.0000642 19,21.0000642 L4.99998155,21.0000673 C3.89541205,21.0000673 2.99998155,20.1046368 2.99998155,19.0000673 L2.99999828,10.1216672 C2.99999935,9.42493561 3.36258984,8.77841732 3.95709826,8.41510662 Z M10,13 C9.44771525,13 9,13.4477153 9,14 L9,17 C9,17.5522847 9.44771525,18 10,18 L14,18 C14.5522847,18 15,17.5522847 15,17 L15,14 C15,13.4477153 14.5522847,13 14,13 L10,13 Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </span>
      <span class="name"> Home </span>
    </a>
    <a
      href="#"
      class="footer-mobile-navs-item"
      @click.prevent="$router.push('/order')"
      :class="{ active: $route.path == '/order' }"
    >
      <span class="icon">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M15,15 L15.9974233,16.1399123 C16.3611054,16.555549 16.992868,16.5976665 17.4085046,16.2339844 C17.4419154,16.20475 17.4733423,16.1733231 17.5025767,16.1399123 L18.5,15 L21,15 C20.4185426,17.9072868 17.865843,20 14.9009805,20 L9.09901951,20 C6.13415704,20 3.58145737,17.9072868 3,15 L15,15 Z"
              fill="currentColor"
            />
            <path
              d="M21,9 L3,9 L3,9 C3.58145737,6.09271316 6.13415704,4 9.09901951,4 L14.9009805,4 C17.865843,4 20.4185426,6.09271316 21,9 Z"
              fill="currentColor"
            />
            <rect
              fill="currentColor"
              opacity="0.3"
              x="2"
              y="11"
              width="20"
              height="2"
              rx="1"
            />
          </g>
        </svg>
      </span>
      <span class="name"> Menu </span>
    </a>
    <a
      href="#"
      class="footer-mobile-navs-item"
      @click.prevent="
        auth.isAuthenticated ? (showProfile = true) : (auth._showLogin = true)
      "
    >
      <span class="icon">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
              fill="currentColor"
              fill-rule="nonzero"
              opacity="0.3"
            />
            <path
              d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
              fill="currentColor"
              fill-rule="nonzero"
            />
          </g>
        </svg>
      </span>
      <span class="name"> Profile </span>
    </a>
    <a href="#" class="footer-mobile-navs-item" @click.prevent="show = true">
      <span class="icon">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z"
              fill="currentColor"
              fill-rule="nonzero"
              opacity="0.3"
            />
            <path
              d="M3.28077641,9 L20.7192236,9 C21.2715083,9 21.7192236,9.44771525 21.7192236,10 C21.7192236,10.0817618 21.7091962,10.163215 21.6893661,10.2425356 L19.5680983,18.7276069 C19.234223,20.0631079 18.0342737,21 16.6576708,21 L7.34232922,21 C5.96572629,21 4.76577697,20.0631079 4.43190172,18.7276069 L2.31063391,10.2425356 C2.17668518,9.70674072 2.50244587,9.16380623 3.03824078,9.0298575 C3.11756139,9.01002735 3.1990146,9 3.28077641,9 Z M12,12 C11.4477153,12 11,12.4477153 11,13 L11,17 C11,17.5522847 11.4477153,18 12,18 C12.5522847,18 13,17.5522847 13,17 L13,13 C13,12.4477153 12.5522847,12 12,12 Z M6.96472382,12.1362967 C6.43125772,12.2792385 6.11467523,12.8275755 6.25761704,13.3610416 L7.29289322,17.2247449 C7.43583503,17.758211 7.98417199,18.0747935 8.51763809,17.9318517 C9.05110419,17.7889098 9.36768668,17.2405729 9.22474487,16.7071068 L8.18946869,12.8434035 C8.04652688,12.3099374 7.49818992,11.9933549 6.96472382,12.1362967 Z M17.0352762,12.1362967 C16.5018101,11.9933549 15.9534731,12.3099374 15.8105313,12.8434035 L14.7752551,16.7071068 C14.6323133,17.2405729 14.9488958,17.7889098 15.4823619,17.9318517 C16.015828,18.0747935 16.564165,17.758211 16.7071068,17.2247449 L17.742383,13.3610416 C17.8853248,12.8275755 17.5687423,12.2792385 17.0352762,12.1362967 Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </span>
      <span class="name"> Cart </span>
    </a>
    <a
      href="#"
      class="footer-mobile-navs-item"
      @click.prevent="$router.push('/contact')"
      :class="{ active: $route.path == '/contact' }"
    >
      <span class="icon">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M13.0799676,14.7839934 L15.2839934,12.5799676 C15.8927139,11.9712471 16.0436229,11.0413042 15.6586342,10.2713269 L15.5337539,10.0215663 C15.1487653,9.25158901 15.2996742,8.3216461 15.9083948,7.71292558 L18.6411989,4.98012149 C18.836461,4.78485934 19.1530435,4.78485934 19.3483056,4.98012149 C19.3863063,5.01812215 19.4179321,5.06200062 19.4419658,5.11006808 L20.5459415,7.31801948 C21.3904962,9.0071287 21.0594452,11.0471565 19.7240871,12.3825146 L13.7252616,18.3813401 C12.2717221,19.8348796 10.1217008,20.3424308 8.17157288,19.6923882 L5.75709327,18.8875616 C5.49512161,18.8002377 5.35354162,18.5170777 5.4408655,18.2551061 C5.46541191,18.1814669 5.50676633,18.114554 5.56165376,18.0596666 L8.21292558,15.4083948 C8.8216461,14.7996742 9.75158901,14.6487653 10.5215663,15.0337539 L10.7713269,15.1586342 C11.5413042,15.5436229 12.4712471,15.3927139 13.0799676,14.7839934 Z"
              fill="currentColor"
            />
            <path
              d="M14.1480759,6.00715131 L13.9566988,7.99797396 C12.4781389,7.8558405 11.0097207,8.36895892 9.93933983,9.43933983 C8.8724631,10.5062166 8.35911588,11.9685602 8.49664195,13.4426352 L6.50528978,13.6284215 C6.31304559,11.5678496 7.03283934,9.51741319 8.52512627,8.02512627 C10.0223249,6.52792766 12.0812426,5.80846733 14.1480759,6.00715131 Z M14.4980938,2.02230302 L14.313049,4.01372424 C11.6618299,3.76737046 9.03000738,4.69181803 7.1109127,6.6109127 C5.19447112,8.52735429 4.26985715,11.1545872 4.51274152,13.802405 L2.52110319,13.985098 C2.22450978,10.7517681 3.35562581,7.53777247 5.69669914,5.19669914 C8.04101739,2.85238089 11.2606138,1.72147333 14.4980938,2.02230302 Z"
              fill="currentColor"
              fill-rule="nonzero"
              opacity="0.3"
            />
          </g>
        </svg>
      </span>
      <span class="name"> Contact </span>
    </a>
  </div>
  <div>
    <CartItems v-model="show" @confirm="show = false" @cancel="show = false" />
    <LoginModal v-model="auth._showLogin" />
    <ProfileModal
      v-model="showProfile"
      @close="showProfile = false"
      v-if="showProfile"
    />
  </div>
  <!-- footer end  -->
</template>

<script lang="ts" setup>
import { useAuthStore } from "~~/store/Auth";
import { useCartStore } from "~~/store/Cart";

const cart = useCartStore();
const auth = useAuthStore();
const show = ref(false);
const showProfile = ref(false);
</script>

<style lang="scss" scoped>
// footer start
.p-footer {
  margin-top: 100px;

  &__logo__section {
    padding: 0 10px;
    &__logo {
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--p-white-color);
      margin-bottom: 20px;
      padding: 0px 10px;
      span {
        color: var(--p-primary-color);
      }
    }
    &__title {
      font-weight: 500;
      font-size: var(--p-small-font);
      line-height: 24px;
      color: var(--p-light-white);
    }
  }
  &__opening__houres {
    padding: 0px 10px;
    h3 {
      font-weight: 700;
      font-size: 22px;
      line-height: 22px;
      color: var(--p-white-color);
      margin-bottom: 20px;
    }
    p {
      font-size: var(--p-small-font);
      font-weight: 500;
      line-height: 22.2px;
      color: var(--p-light-white);
    }
  }
  &__location {
    padding: 0px 10px;
    &__heading {
      font-weight: 700;
      font-size: 22px;
      line-height: 22px;
      color: var(--p-white-color);
    }
    &__location__name {
      font-size: var(--p-small-font);
      font-weight: 500;
      line-height: 27px;
      color: var(--p-primary-color);
    }
  }
  &__map {
    padding: 0px 10px;
    iframe {
      height: 241px;
      width: 100%;

      border-radius: 10px;
    }
  }
  &__bottom {
    border-top: 1px solid #656565;
    padding: 15px 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    &__copyright {
      font-weight: 700;
      font-size: var(--p-small-font);
      line-height: 27px;
      color: var(--p-white-color);
    }
    &__devloped_by {
      font-weight: 700;
      font-size: var(--p-small-font);
      line-height: 27px;
      color: var(--p-white-color);
      span {
        text-decoration: underline;
        margin-left: 4px;
      }
    }
    &__payment__image {
      height: 22px;
    }
  }
}
// footer end

.footer-mobile-navs {
  display: none;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--p-black-gray);
  padding: 0;
  z-index: 999;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--p-white-color);
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 10px 0px;
    width: 100%;

    &:first-child {
      border-top: none;
    }

    &.active {
      color: var(--p-primary-color);
    }

    .icon {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }

  &-item.active {
    color: var(--p-primary-color);
  }

  &-item .icon {
    font-size: 20px;
    margin-bottom: 5px;
  }

  &-item .name {
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &-item.active .icon {
    color: var(--p-primary-color);
  }

  &-item.active .icon {
    color: var(--p-primary-color);
  }
}
</style>
