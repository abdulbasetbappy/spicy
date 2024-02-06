<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    :drag="false"
    id="main-modal"
    @beforeClose="closeOption(close)"
  >
    <div class="modal-body">
      <span class="modal-close">
        <font-awesome-icon
          icon="close"
          size="2x"
          @click="$emit('cancel', close)"
        />
      </span>
      <!-- <div
        class="modal-image"
        :style="`background-image: url(${useAppConfig().apiRoot}${product.image});`"
      ></div> -->
      <img
        class="modal-image"
        :src="`${useAppConfig().apiRoot}${product.image}`"
        @error="$event.target.src = '/placeholder.jpg'"
        alt="Product image"
        v-if="false"
      />
      <div class="product-intro">
        <div class="row mb-2">
          <div class="col-6">
            <h4 class="fw-bold mb-0">{{ product.name }}</h4>
          </div>
          <div class="col-6">
            <h4 class="fw-bold text-end text-primary mb-0">
              {{ $currency }}{{ getTotalPrice }}
            </h4>
          </div>
        </div>
        <p class="mb-0">
          {{ product.description }}
        </p>

        <div class="d-flex mt-3">
          <!-- plus minus -->
          <div class="option-amount">
            <button
              v-if="product.quantity"
              class="option-amount-button"
              @click="product.quantity--"
            >
              <font-awesome-icon icon="minus" />
            </button>
            <span class="amount">{{ product.quantity || 0 }}</span>
            <button class="option-amount-button" @click="product.quantity++">
              <font-awesome-icon icon="plus" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="product-options"
        v-if="show"
        :key="product.name + product.description"
      >
        <div
          class="product-option"
          v-for="(opt, index) in options"
          :key="index"
        >
          <h5 class="fw-bold mb-0">{{ opt.name }}</h5>
          <p v-if="opt.min != 0">{{ $t("Required") }}</p>
          <p v-else>{{ $t("Optional") }}</p>
          <div
            class="opt-items mb-2"
            v-for="(item, index) in opt.options"
            :key="index"
          >
            <div class="row d-flex align-items-center" v-if="opt.max != 0">
              <div class="col-3">
                <div class="option-amount">
                  <button
                    :disabled="isOptionFilled(opt.id)"
                    class="option-amount-button"
                    @click="item.quantity++"
                  >
                    <font-awesome-icon icon="plus" />
                  </button>
                  <span class="amount" v-if="item.quantity">{{
                    item.quantity || 0
                  }}</span>
                  <button
                    class="option-amount-button"
                    @click="item.quantity--"
                    v-if="item.quantity"
                  >
                    <font-awesome-icon icon="minus" />
                  </button>
                </div>
              </div>
              <div class="col-6">
                <h6 class="fw-bold mb-0">
                  {{ item.name }}
                  <small class="option-desc" v-if="item.description">{{
                    item.description
                  }}</small>
                </h6>
              </div>
              <div class="col-3">
                <h6
                  class="fw-bold text-end text-primary mb-0"
                  v-if="opt.full_price"
                >
                  {{ $currency
                  }}{{
                    parseFloat(item.price) +
                    parseFloat(
                      this.cart._is_pickup == true
                        ? this.product?.price?.price_pickup
                        : this.product?.price?.price_delivery
                    )
                  }}
                </h6>
                <h6 class="fw-bold text-end text-primary mb-0" v-else>
                  +{{ $currency }}{{ item.price }}
                </h6>
              </div>
            </div>

            <div
              class="row d-flex align-items-center"
              v-else-if="opt.max == 0 && opt.min != 0"
            >
              <div class="col-3">
                <div class="option-amount">
                  <!-- radio -->
                  <input
                    type="radio"
                    :id="`radio-${item.id}`"
                    :name="`radio-${opt.id}`"
                    :value="item.quantity"
                    @click="updateRadio(item, opt)"
                  />
                </div>
              </div>
              <div class="col-6">
                <h6 class="fw-bold mb-0">
                  {{ item.name }}
                  <small class="option-desc" v-if="item.description">{{
                    item.description
                  }}</small>
                </h6>
              </div>
              <div class="col-3">
                <h6
                  class="fw-bold text-end text-primary mb-0"
                  v-if="opt.full_price"
                >
                  {{ $currency
                  }}{{
                    parseFloat(item.price) +
                    parseFloat(this.product.price.price_delivery)
                  }}
                </h6>
                <h6 class="fw-bold text-end text-primary mb-0" v-else>
                  +{{ $currency }}{{ item.price }}
                </h6>
              </div>
            </div>

            <div class="row d-flex align-items-center" v-else-if="opt.min == 0">
              <div class="col-3">
                <div class="option-amount">
                  <!-- checkbox -->
                  <input
                    type="checkbox"
                    :id="`checkbox-${item.id}`"
                    :name="`checkbox-${opt.id}`"
                    :checked="item.quantity"
                    @click="updateCheckbox(item, opt)"
                  />
                </div>
              </div>
              <div class="col-6">
                <h6 class="fw-bold mb-0">
                  {{ item.name }}
                  <small class="option-desc" v-if="item.description">{{
                    item.description
                  }}</small>
                </h6>
              </div>
              <div class="col-3">
                <h6
                  class="fw-bold text-end text-primary mb-0"
                  v-if="opt.full_price"
                >
                  {{ $currency
                  }}{{
                    parseFloat(item.price) +
                    parseFloat(this.product.price.price_delivery)
                  }}
                </h6>
                <h6 class="fw-bold text-end text-primary mb-0" v-else>
                  +{{ $currency }}{{ item.price }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="footer-buttons">
          <button
            class="btn btn-primary close-button"
            @click="$emit('cancel', close)"
          >
            <font-awesome-icon class="text-white" icon="close" size="2x" />
          </button>
          <button class="btn btn-primary cart-button" @click="addToCart(close)">
            {{ $t("Add to Cart") }}
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { useMenuStore } from "~~/store/Menu";
import { useCartStore } from "~~/store/Cart";

export default {
  name: "CartModal",
  inheritAttrs: false,
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    isOptionFilled(id) {
      let selected = this.cartItem.options.find((e) => e.id == id);
      if (selected.selected == selected.max) {
        return true;
      } else {
        return false;
      }
    },
    updateRadio(item, option) {
      let selected = this.cartItem.options.find((e) => e.id == option.id);
      selected.selected = 1;
      selected.options.forEach((e) => {
        e.quantity = 0;
      });
      item.quantity = 1;
      option.options.forEach((e) => {
        if (e.id != item.id) {
          e.quantity = 0;
        }
      });
    },
    updateCheckbox(item, option) {
      let selected = this.cartItem.options.find((e) => e.id == option.id);
      // check the current selected item and deselect everything else
      if (item.quantity) {
        item.quantity = 0;
        selected.selected--;
      } else {
        item.quantity = 1;
        selected.selected++;
      }
      option.options.forEach((e) => {
        if (e.id != item.id) {
          e.quantity = 0;
        }
      });
    },
    async addToCart(close) {
      const success = await this.cart.addToCart(this.cartItem);
      this.cart.updateCart();

      if (success) {
        this.$toast.success(this.$t("Added to cart"), {
          timeout: 5000,
          icon: true,
        });
        this.$emit("confirm", close);
      } else {
        return false;
      }
    },
    async closeOption(close) {
      this.product.quantity = 1;
      this.options.forEach((e) => {
        e.selected = 0;
        e.options.forEach((e) => {
          e.quantity = 0;
        });
      });
      this.$emit("cancel", close);
    },
  },
  computed: {
    options() {
      let options = this.menus.options;
      let product = this.product.id;

      return options.filter((option) => option.items.includes(product));
    },
    getTotalPrice() {
      let total =
        this.cart._is_pickup == true
          ? this.product?.price?.price_pickup * this.cartItem?.quantity
          : this.product?.price?.price_delivery * this.cartItem?.quantity;

      this.cartItem.options.forEach((e) => {
        e.options.forEach((e) => {
          total += e.price * e.quantity * this.cartItem.quantity;
        });
      });

      return total.toFixed(2);
    },
    cartItem() {
      let selectedOptions = this.options.map((option) => {
        let selected = option.options.filter((item) => item.quantity > 0);
        let totalOptions = selected.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);

        selected = selected.map((item) => {
          return {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            tax_rate: item.tax_rate,
          };
        });

        return {
          id: option.id,
          name: option.name,
          selected: totalOptions,
          max: option.max,
          min: option.min,
          options: selected,
        };
      });

      return {
        id: this.product.id,
        quantity: this.product.quantity,
        options: selectedOptions,
      };
    },
  },
  setup() {
    let menus = useMenuStore();
    let cart = useCartStore();

    return {
      menus,
      cart,
    };
  },
};
</script>

<style scoped lang="scss">
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

.modal-image {
  display: block;
  height: 200px;
  width: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
  cursor: grab;

  &:-moz-drag-over {
    cursor: grabbing;
  }
}

.modal-body {
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}

// style scroll bar
.modal-body::-webkit-scrollbar {
  width: 0.5rem;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #4b4545;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #4b4545;
}

.modal-body .product-intro {
  position: sticky;
  top: 0;
  z-index: 4;
  background-color: var(--bs-body-bg);
}

.product-intro {
  padding: 1.5rem;
}

.product-options {
  padding: 1.5rem;
  padding-top: 0;

  &:empty {
    display: none;
  }
}

.product-option {
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

.modal-footer {
  padding: 1.5rem;
  padding-top: 1rem;
  position: sticky;
  bottom: 0;

  .footer-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .close-button {
      margin-right: 1rem;
      height: 50px;

      svg {
        color: var(--bs-body-bg) !important;
        height: 20px;
        width: 20px;
      }

      @media screen and (max-width: 768px) {
        // display: none;
      }
    }

    .cart-button {
      width: -webkit-fill-available;
    }
  }
}

.modal-footer .option-amount {
  font-size: 20px;
}

.modal-footer .amount {
  display: inline-block;
  width: 60px;
  text-align: center;
  color: #fff;
}

.option-amount {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 25px;
  user-select: none;
}

.option-amount-button {
  display: flex;
  padding: 2px;
  border: 2px solid var(--bs-primary);
  border-radius: 15px;
  color: var(--bs-primary);
  background-color: var(--bs-body-bg);
  cursor: pointer;
  height: 28px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.product-option .option-amount-button {
  height: 25px;
}

input[type="radio"],
input[type="checkbox"] {
  appearance: none;
  width: 25px;
  height: 25px;
  border: 2px solid var(--bs-primary);
  border-radius: 50%;
  background-color: var(--bs-body-bg);
  cursor: pointer;
  margin-right: 10px;
  outline: none;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:checked {
    background-color: var(--bs-primary);
    border: 2px solid var(--bs-primary);
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--bs-body-bg);
  }

  &:disabled {
    background-color: #ccc;
    border: 2px solid #ccc;
    cursor: not-allowed;
  }
}

span.amount {
  font-weight: bold;
  margin: 0 10px;
  color: #fff;
}

.modal-close {
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  margin-left: auto;
  margin-right: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--bs-primary);
  cursor: pointer;
}

.cart-button {
  height: 50px;
  text-transform: uppercase;
  font-size: 16px;
  background-color: var(--bs-primary);
  color: var(--bs-body-bg);
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
  }
}

.option-desc {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: normal;
}
</style>
