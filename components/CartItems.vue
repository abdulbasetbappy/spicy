<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    :drag="false"
    id="main-modal"
  >
    <div class="i-menu-right">
      <div class="i-cart-header">
        <div class="i-switch-shipping">
          <span>{{ $t("Delivery") }}</span>

          <label class="i-switch">
            <input
              type="checkbox"
              v-model="cart._is_pickup"
              @change="togglePickup()"
            />
            <span class="i-slider i-round"></span>
          </label>

          <span>{{ $t("Pickup") }}</span>
        </div>

        <div class="i-cart-time">
          <div class="i-icon">
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path
                  d="M12,22 C7.02943725,22 3,17.9705627 3,13 C3,8.02943725 7.02943725,4 12,4 C16.9705627,4 21,8.02943725 21,13 C21,17.9705627 16.9705627,22 12,22 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M11.9630156,7.5 L12.0475062,7.5 C12.3043819,7.5 12.5194647,7.69464724 12.5450248,7.95024814 L13,12.5 L16.2480695,14.3560397 C16.403857,14.4450611 16.5,14.6107328 16.5,14.7901613 L16.5,15 C16.5,15.2109164 16.3290185,15.3818979 16.1181021,15.3818979 C16.0841582,15.3818979 16.0503659,15.3773725 16.0176181,15.3684413 L11.3986612,14.1087258 C11.1672824,14.0456225 11.0132986,13.8271186 11.0316926,13.5879956 L11.4644883,7.96165175 C11.4845267,7.70115317 11.7017474,7.5 11.9630156,7.5 Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
          {{ $t("20-30 min") }}
        </div>

        <h5 class="fw-bold text-center">{{ $t("Items in your cart") }}</h5>
      </div>

      <div class="i-cart-items" v-if="cart?.cart?.length">
        <!-- [Start]: Free -->

        <div
          class="i-cart-item"
          v-for="(item, index) in cart?._freeItems"
          :key="index"
        >
          <div class="i-cart-item-info">
            <h5 class="fw-bold mb-1">
              {{ item?.quantity }} x {{ getSize(item) }}
              {{ trimText(item.name, 18) }}
            </h5>
            <!-- <p class="text-muted m-0">
              <span v-if="getOptions(item)">
                With
                {{ trimText(getOptions(item), 50) || " " }}
              </span>
            </p> -->
          </div>
          <div class="i-cart-item-action">
            <h5 class="i-cart-item-price fw-bold m-0">{{ $t("FREE") }}</h5>
          </div>

          <div
            class="i-cart-item-remove"
            style="opacity: 0.7; cursor: not-allowed"
          >
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path
                  d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z"
                  fill="currentColor"
                  fill-rule="nonzero"
                />
                <path
                  d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </g>
            </svg>
          </div>
        </div>
        <!-- [End]: Free -->

        <div
          class="i-cart-item"
          v-for="(item, index) in cart?.cart"
          :key="index"
        >
          <div class="i-cart-item-info">
            <h5 class="fw-bold mb-1">
              {{ item?.quantity }} x {{ getSize(item) }}
              {{ trimText(item.name, 18) }}
            </h5>
            <!-- <p class="text-muted m-0">
              <span v-if="getOptions(item)">
                With
                {{ trimText(getOptions(item), 50) || " " }}
              </span>
            </p> -->

            <div class="i-cart-item-options">
              <div
                class="i-cart-item-option"
                v-for="(opt, i) in item?.options"
                :key="i"
                v-show="opt.selected"
              >
                <span class="i-cart-item-option-title">{{ opt?.name }}:</span>
                <div class="i-cart-item-option-values">
                  <div
                    class="i-cart-item-option-value"
                    v-for="(val, j) in opt?.options"
                    :key="j"
                  >
                    <span class="i-cart-item-option-value-name">
                      {{ val?.name }}
                      <span
                        class="i-cart-item-option-value-count"
                        v-if="val.quantity > 0"
                        >x {{ val?.quantity }} </span
                      >:
                    </span>

                    <span class="i-cart-item-option-value-price"
                      >{{ $currency
                      }}{{
                        parseFloat(
                          (val?.price * val?.quantity).toString()
                        ).toFixed(2)
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="i-cart-item-action">
            <h5 class="i-cart-item-price fw-bold">
              {{ $currency }}{{ getPrice(item) }}
            </h5>
            <div class="i-cart-item-count">
              <button
                class="i-cart-item-count-btn"
                :disabled="item?.quantity == 1"
                @click="
                  item.quantity--;
                  cart.updateCart();
                "
              >
                -
              </button>
              <span class="i-cart-item-count-value">{{ item?.quantity }}</span>
              <button
                class="i-cart-item-count-btn"
                @click="
                  item.quantity++;
                  cart.updateCart();
                "
              >
                +
              </button>
            </div>
          </div>

          <div class="i-cart-item-remove" @click="removeCartItem(index)">
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path
                  d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z"
                  fill="currentColor"
                  fill-rule="nonzero"
                />
                <path
                  d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="i-cart-items" v-else>
        <div class="i-empty-icon mt-4">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            transform="scale(2)"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect x="0" y="0" width="24" height="24" />
              <path
                d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M19.0710678,4.92893219 L19.0710678,4.92893219 C19.4615921,5.31945648 19.4615921,5.95262146 19.0710678,6.34314575 L6.34314575,19.0710678 C5.95262146,19.4615921 5.31945648,19.4615921 4.92893219,19.0710678 L4.92893219,19.0710678 C4.5384079,18.6805435 4.5384079,18.0473785 4.92893219,17.6568542 L17.6568542,4.92893219 C18.0473785,4.5384079 18.6805435,4.5384079 19.0710678,4.92893219 Z"
                fill="var(--bs-danger)"
                fill-rule="nonzero"
                opacity="0.3"
              />
            </g>
          </svg>
        </div>
        <h5 class="fw-bold text-center mt-4 text-muted">
          {{ $t("Your cart is empty") }}
        </h5>
      </div>

      <div class="i-cart-summary" v-if="cart?.subtotal > 0">
        <div class="i-cart-summary-item fw-bold">
          <span>{{ $t("Subtotal") }}</span>
          <span
            >{{ $currency
            }}{{ parseFloat(cart?.subtotal?.toString())?.toFixed(2) }}</span
          >
        </div>
        <div class="i-cart-summary-item" v-if="cart?.delivery > 0">
          <span>{{ $t("Delivery") }}</span>
          <span
            >{{ $currency
            }}{{ parseFloat(cart?.delivery?.toString())?.toFixed(2) }}</span
          >
        </div>
        <div class="i-cart-summary-item" v-if="cart?.tax > 0">
          <span>{{ $t("Tax") }}</span>
          <span
            >{{ $currency
            }}{{ parseFloat(cart?.tax?.toString())?.toFixed(2) }}</span
          >
        </div>
        <div class="i-cart-summary-item" v-if="cart?.discount > 0">
          <span>{{ $t("Discount") }}</span>
          <span
            >{{ $currency
            }}{{ parseFloat(cart?.discount?.toString())?.toFixed(2) }}</span
          >
        </div>
        <div class="i-cart-summary-item fw-bold">
          <span>{{ $t("Total") }}</span>
          <span
            >{{ $currency
            }}{{ parseFloat(cart?.total?.toString())?.toFixed(2) }}</span
          >
        </div>

        <span
          class="text-danger"
          v-if="cart.subtotal < settings.getCartMinimum"
        >
          {{ $t("Cart value is less than required amount") }}
          {{ settings.getCartMinimum }}
        </span>
      </div>

      <div class="i-cart-action" v-if="auth.isAuthenticated">
        <button
          class="btn btn-lg btn-primary w-100"
          :disabled="
            cart?.cart?.length == 0 || cart.subtotal < settings.getCartMinimum
          "
          @click="
            close();
            $router.push('/checkout');
          "
        >
          {{ $t("Checkout") }}
        </button>
      </div>

      <div class="i-cart-action" v-else>
        <button
          class="btn btn-lg btn-primary w-100"
          :disabled="
            cart?.cart?.length == 0 || cart.subtotal < settings.getCartMinimum
          "
          @click="
            close();
            auth._showLogin = true;
          "
        >
          {{ $t("Login to Checkout") }}
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { useMenuStore } from "~~/store/Menu";
import { useCartStore } from "~~/store/Cart";
import { useSettingStore } from "~~/store/Settings";
import { useAuthStore } from "~~/store/Auth";

export default defineNuxtComponent({
  name: "Menus",
  head() {
    return {
      title: "Menu - Sushi N Poke",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      meta: [
        {
          name: "description",
          content:
            "Sushi N Poke: Le meilleur restaurant de la ville pour une cuisine délicieuse.",
        },
      ],
    };
  },
  data() {
    return {
      activeCategory: null,
      activeLocation: null,
      show: false,
      activeProduct: {},
    };
  },
  methods: {
    trimText(text: string, length: number) {
      return text?.length > length ? text.substring(0, length) + "..." : text;
    },
    getOptions(cartItem) {
      let options = [];
      cartItem.options.forEach((option) => {
        if (option.selected) {
          options.push(option.name);
        }
      });

      return options.join(", ");
    },
    getSize(cartItem) {
      let option = cartItem?.options?.find(
        (option) => option.name.trim() == "Size"
      );

      return option?.options[0]?.name;
    },
    getPrice(cartItem) {
      let product_price =
        parseFloat(
          this.cart.is_pickup
            ? cartItem?.price?.price_pickup
            : cartItem?.price?.price_delivery
        ) * cartItem.quantity;

      let options_price = 0;
      cartItem?.options.forEach((option) => {
        if (option?.options?.length) {
          option.options.forEach((option) => {
            options_price +=
              parseFloat(option.price) * option?.quantity * cartItem.quantity;
          });
        }
      });

      return (product_price + options_price).toFixed(2);
    },
    togglePickup() {
      this.cart.updateCart();
    },
    removeCartItem(index) {
      this.cart.removeCartItem(index);
      this.cart.updateCart();
    },
  },
  setup() {
    const menus = useMenuStore();
    const cart = useCartStore();
    const auth = useAuthStore();
    const settings = useSettingStore();
    cart.fetchOffers();
    cart.updateCart();

    return {
      menus,
      cart,
      auth,
      settings,
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

.i-menu-right {
  overflow: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  z-index: 101;

  .i-cart-header {
    padding: 1.5rem 2rem 0 2rem;
    color: #fff;

    .i-switch-shipping {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      span {
        font-size: 1rem;
        font-weight: 500;
      }

      .i-switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .i-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #4b4545;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .i-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:active + .i-slider::before {
          width: 20px;
        }

        input:checked + .i-slider {
          background-color: var(--bs-primary);
        }

        input:focus + .i-slider {
          box-shadow: 0 0 1px var(--bs-primary);
        }

        input:checked + .i-slider:before {
          -webkit-transform: translateX(16px);
          -ms-transform: translateX(16px);
          transform: translateX(16px);
        }

        /* Rounded sliders */
        .i-slider.i-round {
          border-radius: 50px;
        }

        .i-slider.i-round:before {
          border-radius: 50px;
        }
      }
    }

    .i-cart-time {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 5px;
      padding: 1rem 0;

      .i-icon {
        width: 24px;
        height: 24px;
        color: var(--bs-primary);

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .i-cart-items {
    display: flex;
    padding: 1rem 2rem;
    flex-direction: column;

    .i-empty-icon {
      display: flex;
      justify-content: center;
    }

    .i-cart-item {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #4b4545;

      &:last-child {
        border-bottom: none;
      }

      width: 100%;

      .i-cart-item-image {
        width: 60px;
        height: 60px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .i-cart-item-info {
        flex: 1;
        display: flex;
        flex-direction: column;

        h3 {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0;
        }

        p {
          font-size: 0.8rem;
          margin-bottom: 0;
        }
      }

      .i-cart-item-action {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .i-cart-item-count {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        font-weight: bold;

        .i-cart-item-count-value {
          width: fit-content;
          text-align: center;
          color: #fff;
        }

        .i-cart-item-count-btn {
          height: 1.5rem;
          aspect-ratio: 1;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
          border: 2px solid var(--bs-primary);
          color: var(--bs-primary);
          background: #4b4545;

          &:hover {
            background: var(--bs-primary);
            color: #4b4545;
          }

          transition: all 0.2s ease-in-out;
        }
      }

      .i-cart-item-remove {
        width: 24px;
        height: 24px;
        cursor: pointer;

        color: var(--bs-danger);

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .i-cart-summary {
    padding: 1rem 2rem;

    .i-cart-summary-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.5rem 0;
      color: #fff;
      font-size: 16px;

      &:last-child {
        border-top: 1px solid #4b4545;
        font-size: 20px;
      }
    }
  }

  .i-cart-item-options {
    color: var(--bs-white);
    display: flex;
    flex-direction: column;
    line-height: 1.3;

    .i-cart-item-option {
      display: block;
      width: 100%;

      .i-cart-item-option-title {
        font-weight: bold;
        font-size: 1rem;
      }

      .i-cart-item-option-value {
        display: flex;
        align-items: center;

        .i-cart-item-option-value-name {
          font-size: 0.8rem;
        }

        .i-cart-item-option-value-price {
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--bs-primary);
          margin-left: 5px;
        }

        .i-cart-item-option-value-count {
          font-size: 0.8rem;
          font-weight: bold;
          margin-left: 2px;
        }
      }
    }
  }

  .i-cart-action {
    padding: 1rem 2rem;

    button {
      width: 100%;
      padding: 0.5rem 0;
      border-radius: 10px;
      border: 2px solid var(--bs-primary);
      background: var(--bs-primary);
      color: #4b4545;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: #4b4545;
        color: var(--bs-primary);
        border: 2px solid var(--bs-primary);
      }
    }
  }
}
</style>
