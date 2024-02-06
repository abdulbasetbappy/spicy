<template>
  <section class="i-loc-section py-5">
    <div class="container py-5">
      <div class="i-locs-title">
        <h2>Zones de livraison</h2>
        <h4>Faites livrer vos repas préférés à votre porte</h4>
      </div>
      <div class="i-locs">
        <div class="i-loc" v-for="zone in delivery_zones">
          <a class="w-100" @click="goToLocation(zone.id)">
            <h3 class="i-ellipsis m-0">{{ zone.city }} - {{ zone.zip }}</h3>
          </a>
        </div>

        <a class="w-100" href="#hero">
          <div class="i-loc">
            <h3 class="i-ellipsis m-0">{{ $t("More") }}</h3>
          </div>
        </a>
      </div>
    </div>

    <client-only>
      <Vue3Lottie
        :animationData="lottie"
        :height="450"
        :width="450"
        class="i-lottie"
      />
    </client-only>
  </section>
</template>

<script lang="ts">
import "vue3-lottie/dist/style.css";
import lottie from "~/assets/lottie/rider.json";
import { useSettingStore } from "~~/store/Settings";
import { useCartStore } from "~~/store/Cart";

export default defineNuxtComponent({
  name: "MainLocations",
  computed: {
    delivery_zones() {
      let length = this.store?.settings?.delivery_zones?.length;
      let delivery_zones = this.store?.settings?.delivery_zones;

      if (length > 8) {
        return delivery_zones.slice(0, 11);
      } else if (length < 8) {
        return delivery_zones.slice(0, 7);
      }
    },
  },
  methods: {
    goToLocation(location: any) {
      if (this.cart.is_pickup) {
        window.localStorage.setItem("_location", location);
        this.$router.push(`/menus/?location=${location}`);
      } else {
        // get the delivery zone
        const delivery_zone = this?.store?.settings?.delivery_zones.find(
          (zone: any) => zone.id == location
        );

        window.localStorage.setItem("_location", delivery_zone.handled_by);
        window.localStorage.setItem("_delivery_zone", location);
        this.$router.push(`/menus/?location=${delivery_zone.handled_by}`);
      }
    },
    stringToID(text: string) {
      // convert any string to kebab-case-id removing all special characters
      return (
        text
          .toLowerCase()
          // remove all special characters
          .replace(/[^a-zA-Z0-9 ]/g, "")
          // replace all spaces with -
          .replace(/\s+/g, "-")
      );
    },
  },
  setup() {
    const store = useSettingStore();
    const cart = useCartStore();
    return {
      store,
      cart,
      lottie,
    };
  },
});
</script>

<style lang="scss">
.i-loc-section {
  background-color: transparent;
  position: relative;

  .i-lottie {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    aspect-ratio: 1;
  }

  .i-locs-title {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--bs-primary);
    }

    h4 {
      font-size: 18px;
    }

    margin-bottom: 30px;
  }
}
.i-locs {
  // 4 column grid
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 991px) {
    // 3 column grid
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    // 2 column grid
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    // 1 column grid
    grid-template-columns: repeat(1, 1fr);
  }

  .i-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .i-loc {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--bs-primary);
    border-radius: 10px;
    padding: 20px;
    overflow: hidden;

    h3 {
      text-align: center;
      letter-spacing: 0px;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>
