<template>
  <div>
    <NuxtLayout v-if="!config.underMaintenance">
      <NuxtPage />
    </NuxtLayout>
    <div v-else>
      <ComingSoon />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from "./store/Menu";
import { useSettingStore } from "./store/Settings";
import { useCartStore } from "./store/Cart";
import { useAuthStore } from "./store/Auth";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const config = useAppConfig();

// register firebase service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/firebase-messaging-sw.js");
}

// initialize firebase
const fbase = initializeApp({
  apiKey: "AIzaSyC5GGjkWnEAR-eEeKJGMRurz51S-nlpWZg",
  authDomain: "irestaurant-11.firebaseapp.com",
  projectId: "irestaurant-11",
  storageBucket: "irestaurant-11.appspot.com",
  messagingSenderId: "79775623261",
  appId: "1:79775623261:web:160c493dbdd288ca9405b4",
  measurementId: "G-MBCDSC33WV",
});

// get firebase messaging
const messaging = getMessaging(fbase);

// get firebase token
getToken(messaging, {
  vapidKey:
    "BLDPXXHNgWd0623pp1dslltTtekiqYv97rG9cTSscN0fuM5WO6lYymCXkLxXORzQO4Oo97xNLvYXwspfksZNMVg",
}).then((token) => {
  fetch(`${config.apiRoot}/v1/auth/firebase-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("__token")}`,
      "X-User": JSON.parse(window.localStorage.getItem("__user") || "{}").id,
    },
    body: JSON.stringify({ token: token }),
  });
});

// listen to service worker messages
navigator.serviceWorker.addEventListener("message", (event: any) => {
  console.log(`serviceWorker message`, { event });
});

const menus = useMenuStore();
const settings = useSettingStore();
const cart = useCartStore();
const auth = useAuthStore();

menus.fetchMenus();
menus.fetchCategories();
menus.fetchProducts();
menus.fetchOptions();
settings.fetchSettings();
cart.fetchOffers();

onMounted(() => {
  let old_cart = window.localStorage.getItem("_cart");
  let last_time = new Date(window.localStorage.getItem("_last_time"));
  let now_time = new Date();

  if (old_cart && old_cart.startsWith("[") && old_cart.endsWith("]")) {
    if (last_time.getDate() == now_time.getDate()) {
      cart._cart = JSON.parse(old_cart);
    }
  }

  let token = window.localStorage.getItem("__token");
  let user = window.localStorage.getItem("__user");

  if (token && user) {
    auth.login(JSON.parse(user), token);
  }

  // if _location is not set, set it to the current location
  if (window.localStorage.getItem("_location") == null) {
    if (settings?.settings?.locations?.length > 0) {
      window.localStorage.setItem(
        "_location",
        settings?.settings?.locations[0]?.id
      );
    }
  }

  cart.updateCart();
});
</script>

<style lang="scss" scoped>
// animate nuxt 3 page transitions
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
