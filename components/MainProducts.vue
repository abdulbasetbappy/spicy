<template>
  <section class="i-product-section mt-5 pt-5">
    <ITitle :front="$t('Popular products')" :back="$t('Products')" />
    <div class="container">
      <div class="i-products">
        <div
          class="i-product"
          v-for="product in products"
          @click="openModal(product)"
        >
          <div class="i-product-cover">
            <!-- <div
              class="i-product-image"
              :style="`background-image: url(${useAppConfig().apiRoot}${product.image})`"
            ></div> -->
            <img
              class="i-product-image"
              :src="`${useAppConfig().apiRoot}${product.image}`"
              @error="$event.target.src = '/placeholder.jpg'"
            />
          </div>
          <div class="i-product-content">
            <h4 class="fw-bold m-0 i-ellipsis">{{ product.name }}</h4>
            <p class="m-0 i-ellipsis text-muted fs-6">
              {{ product.description }}
            </p>
          </div>
          <div class="i-product-action">
            <div class="i-product-price">
              {{ $t("Price") }}:
              <strong>{{ $currency }}{{ product.price.price_delivery }}</strong>
            </div>
            <button class="i-product-add" @click="openModal(product)">
              <font-awesome-icon icon="plus" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <CartModal
        v-model="show"
        :product="activeProduct"
        @confirm="show = false"
        @cancel="show = false"
        v-if="activeProduct"
      >
      </CartModal>
    </div>
  </section>
</template>

<script lang="ts">
import { useMenuStore } from "~~/store/Menu";
import { useCartStore } from "~~/store/Cart";

export default defineNuxtComponent({
  name: "MainProducts",
  data() {
    return {
      show: false,
      activeProduct: null,
    };
  },
  computed: {
    products() {
      let items = [...this.menus.products].sort((a, b) => {
        return b.score - a.score;
      });

      items = items.slice(0, 8);

      if (items.length < 8) {
        items = items.slice(0, 4);
      }

      return items; // return 8 or 4 items
    },
  },
  methods: {
    addProduct(product: any) {
      this.cart.addToCart(product);
      this.cart.updateCart();
    },
    openModal(product) {
      this.activeProduct = product;
      this.show = true;
    },
  },
  setup() {
    const menus = useMenuStore();
    const cart = useCartStore();

    return {
      menus,
      cart,
    };
  },
});
</script>

<style lang="scss">
.i-products {
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

  .i-product {
    background: #fff;
    box-shadow: 6px 22px 26px 0px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    .i-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .i-product-cover {
      position: relative;

      .i-product-image {
        height: 250px;
        width: 100%;
        object-fit: cover;
      }
    }

    .i-product-content {
      padding: 15px;
      background: #f4f4f4;
    }

    .i-product-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #000;
      color: #fff;
      padding: 8px 8px 8px 15px;

      .i-product-price {
        font-size: 1.1rem;
      }

      .i-product-add {
        aspect-ratio: 1;
        background-color: var(--bs-primary);
        font-size: 1.2rem;
        border: 2px solid var(--bs-primary);
        color: var(--bs-body-bg);
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: var(--bs-primary);
          color: var(--bs-body-bg);
        }
      }
    }

    h4 {
      font-size: 18px !important;
    }

    p {
      font-size: 14px !important;
    }
  }
}
</style>
