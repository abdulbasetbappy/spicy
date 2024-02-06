<template>
  <!-- header start  -->
  <header class="p-header">
    <div class="container-fluid container d-flex justify-content-center">
      <div
        class="d-flex justify-content-between md-row w-100 d-flex align-items-center"
      >
        <div class="p-header__left col-lg-8 d-flex">
          <div class="p-header__logo">
            <NuxtLink to="/">
              <img src="~/assets/logo.png" alt="Sushi N Poke" />
            </NuxtLink>
          </div>
          <div
            class="p-header__link__container d-none d-md-flex align-items-center"
          >
            <NuxtLink to="/" class="p-header__link"> Accueil </NuxtLink>
            <NuxtLink to="/order" class="p-header__link"> La Carte </NuxtLink>
            <NuxtLink to="/about" class="p-header__link"> A Propos </NuxtLink>
            <NuxtLink to="/contact" class="p-header__link"> Contact </NuxtLink>
          </div>
        </div>
        <div class="p-header__right col-lg-4 d-flex justify-content-end">
          <img
            class="p-header__user"
            src="~/assets/img/user111.png"
            alt=""
            @click="
              auth.isAuthenticated
                ? (showProfile = true)
                : (auth._showLogin = true)
            "
          />
          <div
            class="p-header__cart d-flex position-relative"
            @click="show = true"
          >
            <img src="~/assets/img/Frame31.png" alt="" />
            <span
              v-if="cart.cart.length"
              class="position-absolute d-flex align-items-center justify-content-center"
              >{{ cart.cart.length }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- header end  -->

  <CartItems
    v-model="show"
    @confirm="show = false"
    @cancel="show = false"
    v-if="show"
  />
  <LoginModal
    v-model="auth._showLogin"
    @close="auth._showLogin = false"
    v-if="auth._showLogin"
  />
  <ProfileModal
    v-model="showProfile"
    @close="showProfile = false"
    v-if="showProfile"
  />
</template>

<script lang="ts">
import { useAuthStore } from "~~/store/Auth";
import { useCartStore } from "~~/store/Cart";

export default defineNuxtComponent({
  data() {
    return {
      show: false,
      showMenu: false,
      showProfile: false,
    };
  },
  setup() {
    const cart = useCartStore();
    const auth = useAuthStore();

    return {
      cart,
      auth,
    };
  },
});
</script>

<style scoped lang="scss">
// header start
.p-header {
  display: flex;
  align-items: center;
  // height: 100px;
  padding: 0px 0px;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(5, 13, 20, 0.8);
  &__logo {
    color: #ffff;
    font-weight: 700;
    font-size: 40px;
    line-height: 56px;
    span {
      color: var(--p-primary-color);
    }
  }
  &__link__container {
    gap: 30px;
  }
  &__link {
    padding: 0;
    margin: 0;
    font-weight: 500;
    font-size: var(--p-small-font);
    list-style: none;
    text-decoration: none;
    color: var(--p-white-color);
    cursor: pointer;

    &:hover {
      color: var(--p-primary-color);
    }

    &.router-link-exact-active {
      color: var(--p-primary-color);
    }
  }
  &__left {
    gap: 90px;
    height: 100px;
  }
  &__right {
    gap: 24px;
  }
  &__logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      height: 75px;
      width: auto;
    }
  }
  &__user {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  &__cart {
    cursor: pointer;
    height: 30px;
    width: 30px;
    span {
      background-color: var(--p-primary-color);
      color: var(--p-black-color);
      width: 15px;
      height: 15px;
      border-radius: 100%;
      font-weight: 500;
      font-size: 15px;
      right: 0;
      margin-right: -3px;
    }
  }
}
// header end
</style>
