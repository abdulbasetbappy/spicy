<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    :drag="false"
    id="main-modal"
  >
    <div class="i-order-type">
      <div class="i-button-group">
        <button
          class="i-button-delivery"
          :class="{ active: !cart.is_pickup }"
          @click="cart._is_pickup = false"
        >
          <font-awesome-icon icon="truck" />
          {{ $t("Delivery") }}
        </button>
        <button
          class="i-button-pickup"
          :class="{ active: cart.is_pickup }"
          @click="cart._is_pickup = true"
        >
          <font-awesome-icon icon="store" />
          {{ $t("Pickup") }}
        </button>
      </div>

      <div class="i-select-location" v-if="cart.is_pickup">
        <select
          class="i-select"
          name="location"
          id="location"
          ref="location"
          @change="goToLocation($event.target?.value)"
        >
          <option value="0" disabled selected>
            {{ $t("Select location") }}
          </option>
          <option
            v-for="(location, key) in settings?.settings?.locations"
            :key="key"
            :value="location.id"
          >
            {{ location.address }}, {{ location.city }} - {{ location.zip }},
            {{ location.state }}
          </option>
        </select>

        <svg
          class="i-select-icon"
          fill="currentColor"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve"
          stroke-width="2"
        >
          <path
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          ></path>
        </svg>
      </div>

      <div class="i-select-location" v-else>
        <select
          class="i-select"
          name="location"
          id="location"
          ref="location"
          @change="goToLocation($event.target?.value)"
        >
          <option value="0" disabled selected>
            {{ $t("Select location") }}
          </option>
          <option
            v-for="(location, key) in settings?.settings?.delivery_zones"
            :key="key"
            :value="location.id"
          >
            {{ location.city }} - {{ location.zip }}, {{ location.state }}
          </option>
        </select>

        <svg
          class="i-select-icon"
          fill="currentColor"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve"
          stroke-width="2"
        >
          <path
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          ></path>
        </svg>
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { useSettingStore } from "~~/store/Settings";
import { useCartStore } from "~~/store/Cart";

export default defineNuxtComponent({
  name: "LocationModal",
  data() {
    return {
      showLocation: false,
    };
  },
  methods: {
    goToLocation(location: any) {
      if (this.cart.is_pickup) {
        window.localStorage.setItem("_location", location);
      } else {
        // get the delivery zone
        const delivery_zone = this?.settings?.settings?.delivery_zones.find(
          (zone: any) => zone.id == location
        );

        window.localStorage.setItem("_location", delivery_zone.handled_by);
        window.localStorage.setItem("_delivery_zone", location);
      }

      this.$emit("confirm");
    },
    getLocation() {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem("_location") || null;
      } else {
        return null;
      }
    },
  },
  setup() {
    const settings = useSettingStore();
    const cart = useCartStore();
    return {
      settings,
      cart,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  max-height: 95vh;
  min-height: auto;
  max-width: 600px;
  margin: 0 1rem;
  padding: 0;
  border: 0;
  border-radius: 0.25rem;
  background: var(--bs-body-bg);
  overflow: hidden;
  border-radius: 1rem;
}

.i-order-type {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  .i-button-group {
    display: flex;
    width: 100%;
    gap: 1rem;
    margin-bottom: 1rem;

    .i-button-delivery,
    .i-button-pickup {
      flex: 1;
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: 0;
      background: var(--bs-white);
      color: var(--bs-body-bg);
      text-transform: uppercase;
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: var(--bs-gray-100);
      }

      &.active {
        background: var(--bs-primary);
        color: var(--bs-body-bg);
      }
    }
  }

  .i-select-location {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 0;
    background: var(--bs-white);
    color: var(--bs-body-bg);
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: var(--bs-gray-100);
    }

    .i-select {
      flex: 1;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--bs-body-bg);
      text-transform: uppercase;
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      appearance: none;
      outline: none;
    }

    .i-select-icon {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
