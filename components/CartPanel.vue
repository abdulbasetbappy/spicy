<template>
  <div class="mt-5 mb-4 card-panel-box">
    <div class="i-cart-header">
      <h5 class="fw-bold">{{ $t("Items in your cart") }}</h5>
    </div>

    <div class="i-cart-items" v-if="cart.cart.length">
      <!-- [Start]: Free -->

      <div
        class="i-cart-item"
        v-for="(item, index) in cart._freeItems"
        :key="index"
      >
        <div class="i-cart-item-info">
          <h5 class="fw-bold mb-1">
            {{ item?.quantity }} x {{ getSize(item) }}
            {{ trimText(item.name, 25) }}
          </h5>
          <!-- <p class="text-white m-0">
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
          <h5 class="i-cart-item-price fw-bold m-0">{{ $t("FREE") }}</h5>
        </div>
      </div>
      <!-- [End]: Free -->

      <div class="i-cart-item" v-for="(item, index) in cart.cart" :key="index">
        <div class="i-cart-item-info">
          <h5 class="fw-bold mb-1">
            {{ item?.quantity }} x {{ getSize(item) }}
            {{ trimText(item.name, 25) }}
          </h5>
          <!-- <p class="text-white m-0">
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
          <h5 class="i-cart-item-price fw-bold m-0">
            {{ $currency }}{{ getPrice(item) }}
          </h5>
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
      <h5 class="fw-bold text-center mt-4 text-white">
        {{ $t("Your cart is empty") }}
      </h5>
    </div>

    <div class="i-cart-summary" v-if="cart.subtotal > 0">
      <div class="i-cart-summary-item fw-bold">
        <span>{{ $t("Subtotal") }}</span>
        <span
          >{{ $currency
          }}{{ parseFloat(cart.subtotal.toString()).toFixed(2) }}</span
        >
      </div>
      <div class="i-cart-summary-item" v-if="cart.delivery > 0">
        <span>{{ $t("Delivery") }}</span>
        <span
          >{{ $currency
          }}{{ parseFloat(cart.delivery.toString()).toFixed(2) }}</span
        >
      </div>
      <div class="i-cart-summary-item" v-if="cart.tax > 0">
        <span>{{ $t("Tax") }}</span>
        <span
          >{{ $currency }}{{ parseFloat(cart.tax.toString()).toFixed(2) }}</span
        >
      </div>
      <div class="i-cart-summary-item" v-if="cart.discount > 0">
        <span>{{ $t("Discount") }}</span>
        <span
          >{{ $currency
          }}{{ parseFloat(cart.discount.toString()).toFixed(2) }}</span
        >
      </div>
      <div class="i-cart-summary-item fw-bold">
        <span>{{ $t("Total") }}</span>
        <span
          >{{ $currency
          }}{{ parseFloat(cart.total.toString()).toFixed(2) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMenuStore } from "~~/store/Menu";
import { useCartStore } from "~~/store/Cart";

export default defineComponent({
  name: "CartPanel",
  methods: {
    trimText(text: string, length: number) {
      return text.length > length ? text.substring(0, length) + "..." : text;
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
            ? cartItem.price.price_pickup
            : cartItem.price.price_delivery
        ) * cartItem.quantity;

      let options_price = 0;
      cartItem.options.forEach((option) => {
        if (option.options.length) {
          option.options.forEach((option) => {
            options_price +=
              parseFloat(option.price) * option.quantity * cartItem.quantity;
          });
        }
      });

      return product_price + options_price;
    },
    removeCartItem(index) {
      this.cart.removeCartItem(index);
      this.cart.updateCart();
    },
  },
  setup() {
    const menus = useMenuStore();
    const cart = useCartStore();
    cart.fetchOffers();

    let old_cart = window.localStorage.getItem("_cart");
    let last_time = new Date(window.localStorage.getItem("_last_time"));
    let now_time = new Date();

    if (old_cart && old_cart.startsWith("[") && old_cart.endsWith("]")) {
      if (last_time.getDate() == now_time.getDate()) {
        cart._cart = JSON.parse(old_cart);
      }
    }

    cart.updateCart();

    return {
      menus,
      cart,
    };
  },
});
</script>

<style lang="scss">
.i-cart-panel {
  margin-top: 120px !important;

  position: sticky;
  top: 100px;
  z-index: 1;
  height: fit-content;
}

.i-cart-header {
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
        background-color: #4b4545;
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
  flex-direction: column;

  .i-empty-icon {
    display: flex;
    justify-content: center;
  }

  .i-cart-item {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #4b4545;

    &:last-child {
      border-bottom: none;
    }

    width: 100%;

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
        width: 10px;
        text-align: center;
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
        background: #fff;

        &:hover {
          background: var(--bs-primary);
          color: var(--bs-body-bg);
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

.i-cart-summary {
  margin-top: 1rem;
  .i-cart-summary-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.2rem 0;
    color: #fff;

    &:last-child {
      border-top: 1px solid #4b4545;
      font-size: 20px;
    }
  }
}
</style>
