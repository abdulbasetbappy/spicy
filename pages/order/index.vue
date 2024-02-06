<template>
  <div>
    <!-- feature start  -->
    <div class="container p-menu-page-feature">
      <div
        class="p-menu-page-feature__container d-flex align-items-center justify-content-between"
      >
        <div
          class="p-menu-page-feature__delivery"
          :class="{ active: !cart.is_pickup }"
          @click="cart._is_pickup = false"
        >
          <p>Livraison</p>
        </div>
        <div
          class="p-menu-page-feature__pickup"
          :class="{ active: cart.is_pickup }"
          @click="cart._is_pickup = true"
        >
          <p>Click & Collect</p>
        </div>
        <div
          class="p-menu-page-feature__select__location"
          @click="showLocation = true"
        >
          <p :key="currentLocation() + currentDeliveryZone()">
            Emplacement ({{
              cart.is_pickup ? currentLocation() : currentDeliveryZone()
            }})
          </p>
          <img loading="lazy" src="~/assets/img/Group_2.png" alt="" />
        </div>
      </div>
    </div>
    <!-- feature end  -->
    <!-- menu page content start -->
    <div class="container">
      <div class="p-menu-page-content row">
        <div class="p-menu-page-content__category col-md-4 col-xl-3">
          <h3 class="p-menu-page-content__category__title">Catégories</h3>
          <div
            class="p-menu-page-content__category__link"
            :class="{ active: cat.id == activeCategory }"
            v-for="(cat, i) in allCategories"
            :key="i"
            @click="goTo(cat)"
          >
            <img
              :src="`${useAppConfig().apiRoot}${cat.image}`"
              :alt="cat.name"
            />
            <p>{{ cat.name }}</p>
          </div>
        </div>
        <div class="p-menu-page-content__products col-md-8 col-xl-9">
          <div
            class="p-menu-page-content__products__category"
            v-for="(cat, i) in allCategories"
            :key="i"
          >
            <p
              class="p-menu-page-content__products__category__name observe-opuu"
              :id="stringToID(cat.name)"
              :data-id="cat.id"
            >
              {{ cat.name }}
            </p>
            <div class="p-menu-page-content__products__wrapper">
              <!-- card start  -->
              <div
                class="p-product_card"
                v-for="(product, j) in cat.products"
                :key="j"
                @click="openModal(product)"
              >
                <img
                  loading="lazy"
                  :src="`${useAppConfig().apiRoot}${product.image}`"
                  :alt="product.name"
                  v-if="product.image"
                />
                <img
                  loading="lazy"
                  :src="`${useAppConfig().apiRoot}/uploads/404.png`"
                  alt=""
                  v-else
                />
                <div class="p-product_card__card_body">
                  <h5 class="p-product_card__card__title">
                    {{ product.name }}
                  </h5>
                  <p class="p-product_card__card__description">
                    {{ product.description }}
                  </p>
                  <p class="p-product_card__card__price">
                    {{ useAppConfig().currencySymbol
                    }}{{ product?.price?.price_delivery }}
                  </p>
                </div>
              </div>
              <!-- card end  -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- menu page content end -->

    <div>
      <CartModal
        v-model="show"
        :product="activeProduct"
        :show="show"
        @confirm="show = false"
        @cancel="show = false"
      >
      </CartModal>
      <LocationModal
        v-model="showLocation"
        @confirm="showLocation = false"
        @cancel="showLocation = false"
      />

      <div class="back-to-top" @click="goToTop">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="back-to-top__icon"
        >
          <path
            d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 22.8C6.072 22.8 1.2 17.928 1.2 12C1.2 6.072 6.072 1.2 12 1.2C17.928 1.2 22.8 6.072 22.8 12C22.8 17.928 17.928 22.8 12 22.8Z"
            fill="white"
          />
          <path
            d="M12.6 6.6L12 6L11.4 6.6L7.8 10.2L8.4 10.8L12 7.2L15.6 10.8L16.2 10.2L12.6 6.6Z"
            fill="white"
          />
          <path
            d="M12.6 17.4L12 18L11.4 17.4L7.8 13.8L8.4 13.2L12 16.8L15.6 13.2L16.2 13.8L12.6 17.4Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMenuStore } from "~~/store/Menu";
import { useCartStore } from "~~/store/Cart";

/* eslint-disable-next-line */
// @ts-ignore
import InView from "@opuu/inview";
import { useAuthStore } from "~~/store/Auth";
import { useSettingStore } from "~~/store/Settings";

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
      links: [
        { rel: "icon", type: "image/x-icon", href: "~/assets/favicon.ico" },
      ],
    };
  },
  data() {
    return {
      activeCategory: null,
      activeLocation: null,
      show: false,
      showLocation: false,
      activeProduct: {},
    };
  },
  mounted() {
    setTimeout(() => {
      const inview = new InView(".observe-opuu");

      inview.on("enter", (el: any) => {
        this.activeCategory = parseInt(el.target.dataset.id);
      });
    }, 1000);

    window.addEventListener("scroll", () => {
      // hide back to top button if the user is not at the top of the page
      if (window.scrollY > 100) {
        document.querySelector(".back-to-top").classList.add("active");
      } else {
        document.querySelector(".back-to-top").classList.remove("active");
      }
    });
  },
  computed: {
    currentCategory() {
      return (
        this.menus.mappedCategories.find(
          (category) => category.id === this.activeCategory
        ) || {
          products: [],
        }
      );
    },
    allCategories() {
      let locloc = window.localStorage.getItem("_location");
      let defaultloc = 1;
      if (
        this.settings?.settings?.locations &&
        this.settings?.settings?.locations?.length
      ) {
        defaultloc = this.settings?.settings?.locations[0]?.id;
      }

      if (
        this.settings?.settings?.locations?.find(
          (loc) => loc.id == this.$route.query.location
        )
      ) {
        defaultloc = this.$route.query.location;
      } else if (
        this.settings?.settings?.locations?.find((loc) => loc.id == locloc)
      ) {
        defaultloc = parseInt(locloc);
      } else {
        window.localStorage.setItem("_location", defaultloc.toString());
      }

      this.activeLocation = defaultloc;

      let allCats =
        this.menus?.mappedCategories?.filter((category) =>
          category.locations.includes(this.activeLocation)
        ) || [];
      this.activeCategory = allCats[0]?.id || null;

      return allCats;
    },

    popular() {
      let items = [];

      this.allCategories.forEach((category) => {
        category.products.forEach((product) => {
          items.push(product);
        });
      });

      items = items.sort((a, b) => {
        return b.score - a.score;
      });

      items = items.slice(0, 8);

      if (items?.length < 8) {
        items = items.slice(0, 4);
      }

      return items; // return 8 or 4 items
    },
  },
  methods: {
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    currentLocation() {
      if (!this.settings?.settings?.locations) {
        return "";
      }
      const loc = this.settings?.settings?.locations?.find(
        (loc) =>
          loc.id == window.localStorage.getItem("_location") ||
          this.settings?.settings?.locations[0].id
      );

      return `${loc?.zip}`;
    },
    currentDeliveryZone() {
      if (!this.settings?.settings?.delivery_zones) {
        return "";
      }
      const loc = this.settings?.settings?.delivery_zones.find(
        (zone) =>
          zone.id == window.localStorage.getItem("_delivery_zone") ||
          this.settings?.settings?.delivery_zones[0].id
      );

      return `${loc?.zip}`;
    },
    trimText(text: string, length: number) {
      return text?.length > length ? text.substring(0, length) + "..." : text;
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
    getOptions(cartItem) {
      let options = [];
      cartItem.options.forEach((option) => {
        if (option.selected) {
          options.push(option.name);
        }
      });

      return options.join(", ");
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
    openModal(product) {
      this.activeProduct = product;
      this.show = true;
    },
    togglePickup() {
      this.cart.updateCart();
    },
    addToCart(product) {
      this.cart.addToCart(product);
      this.cart.updateCart();
    },
    removeCartItem(index) {
      this.cart.removeCartItem(index);
      this.cart.updateCart();
    },
    goTo(cat) {
      this.activeCategory = cat.id;

      let el = document.getElementById(this.stringToID(cat.name));
      // scroll to the element if it exists (keep a 100px margin from the top)

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    },
  },
  setup() {
    const menus = useMenuStore();
    const cart = useCartStore();
    const auth = useAuthStore();
    const settings = useSettingStore();
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
      auth,
      settings,
    };
  },
});
</script>

<style lang="scss" scoped>
// menu page feature start
.p-menu-page-feature {
  padding: 50px 12px;
  &__delivery {
    width: 32%;
    height: 54px;
    background-color: var(--p-black-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 12px;
    cursor: pointer;
    p {
      padding: 0;
      margin: 0;
      font-weight: 700;
      font-size: 18px;
      color: var(--p-white-color);
    }

    &.active {
      background-color: var(--p-primary-color);
      p {
        color: #050c12;
      }
    }
  }
  &__pickup {
    width: 32%;
    height: 54px;
    background-color: var(--p-black-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 12px;
    cursor: pointer;
    p {
      padding: 0;
      margin: 0;
      font-weight: 700;
      font-size: 18px;
      color: var(--p-white-color);
    }

    &.active {
      background-color: var(--p-primary-color);
      p {
        color: #050c12;
      }
    }
  }
  &__select__location {
    cursor: pointer;
    width: 32%;
    height: 54px;
    background-color: var(--p-black-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 12px;
    p {
      padding: 0;
      margin: 0;
      font-weight: 700;
      font-size: 18px;
      color: var(--p-white-color);
    }
    img {
      width: 16px;
      height: 12px;
    }
  }
}
// menu page feature end

// category start
.p-menu-page-content {
  padding: 0px 12px;
  &__category {
    background-color: #161819;
    height: 85vh;
    border-radius: 10px;
    padding: 0;
    overflow: hidden;
    overflow-y: scroll;

    @media screen and (min-width: 768px) {
      position: sticky;
      top: 80px;
    }

    &__title {
      font-weight: 700;
      font-size: 26px;
      line-height: 26px;
      color: var(--p-white-color);
      padding: 25px;
      margin-bottom: 15px;
    }
    &__link {
      height: 48px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0px 25px;
      color: var(--p-white-color);
      margin-bottom: 10px;
      cursor: pointer;
      img {
        width: 22px;
        height: 22px;
      }
      p {
        padding: 0;
        margin: 0;
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
      }

      &.active {
        background-color: var(--p-primary-color);
        p {
          color: #050c12;
        }
      }
    }
  }
  &__products {
    padding-left: 20px;

    img {
      width: 100%;
      aspect-ratio: 3/2;
      object-fit: cover;
    }

    &__category {
      margin-bottom: 80px;
    }
    &__category__name {
      font-weight: 700;
      font-size: 40px;
      line-height: 40px;
      color: var(--p-white-color);
      margin-bottom: 30px;
    }
    &__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px;
    }
  }
}
// category end

// product card start
.p-product_card {
  background-color: #161819;
  border-radius: 17px;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
  }
  &__card_body {
    padding: 15px;
  }
  &__card__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 20x;
    color: var(--p-white-color);
  }
  &__card__description {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: var(--p-light-white);
  }
  &__card__price {
    font-weight: 700;
    font-size: var(--p-small-font);
    line-height: 16px;
    color: var(--p-primary-color);
  }
}
// product card end

// small device start

@media screen and (max-width: 768px) {
  // menu page feature start
  .p-menu-page-feature {
    padding: 30px 12px;
    &__container {
      gap: 10px;
      overflow: hidden;
      overflow-x: auto;
    }
    &__delivery {
      width: 100%;
      padding: 0px 15px;
      height: 40px;
      gap: 10px;
      p {
        font-weight: 600;
        font-size: 14px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    &__pickup {
      width: 100%;
      padding: 0px 15px;
      height: 40px;
      gap: 10px;
      text-wrap: nowrap;
      p {
        font-weight: 600;
        font-size: 14px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    &__select__location {
      width: 100%;
      padding: 0px 15px;
      height: 40px;
      gap: 10px;
      p {
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
      }
      img {
        width: 14px;
      }
    }
  }
  // menu page feature end

  // category start
  .p-menu-page-content {
    padding: 0px 10px;
    &__category {
      height: fit-content;
      &__title {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 0;
      }
      &__link {
        height: 40px;
        cursor: pointer;
        img {
          width: 18px;
          height: 18px;
        }
        p {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
    &__products {
      padding-left: 0px;
      margin-top: 30px;
      &__category {
        margin-bottom: 30px;
      }
      &__category__name {
        font-size: 20px;
        margin-bottom: 20px;
      }
      &__wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
    }
  }
  // category end

  // product card start
  .p-product_card {
    &__card_body {
      padding: 10px;
    }
    &__card__title {
      font-weight: 700;
      font-size: 16px;
    }
    &__card__price {
      line-height: 15px;
    }
  }
  // product card end
}

// medium screen start

@media screen and (min-width: 768px) and (max-width: 1200px) {
  // menu page feature start
  .p-menu-page-feature {
    padding: 40px 0px;
    &__container {
      gap: 15px;
    }
    &__delivery {
      width: 100%;
      padding: 0px 15px;
      height: 40px;
      gap: 10px;
      p {
        font-weight: 600;
        font-size: 16px;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
    &__pickup {
      width: 100%;
      padding: 0px 15px;
      height: 40px;
      gap: 10px;
      p {
        font-weight: 600;
        font-size: 16px;
      }
      img {
        width: 22px;
        height: 22px;
      }
    }
    &__select__location {
      width: 100%;
      padding: 0px 15px;
      height: 40px;
      gap: 10px;
      p {
        font-weight: 600;
        font-size: 16px;
        white-space: nowrap;
      }
      img {
        width: 14px;
      }
    }
  }
  // menu page feature end

  // category start
  .p-menu-page-content {
    padding: 0px 0px;
    &__category {
      height: 100vh;
      &__title {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 0;
      }
      &__link {
        height: 40px;
        cursor: pointer;
        img {
          width: 18px;
          height: 18px;
        }
        p {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
    &__products {
      padding-left: 10px;
      margin-top: 0;
      &__category {
        margin-bottom: 50px;
      }
      &__category__name {
        font-size: 20px;
        margin-bottom: 20px;
      }
      &__wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
    }
  }
  // category end

  // product card start
  .p-product_card {
    &__card_body {
      padding: 10px;
    }
    &__card__title {
      font-weight: 700;
      font-size: 16px;
    }
    &__card__price {
      line-height: 15px;
    }
  }
  // product card end
}

// back to top start
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: var(--p-primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  transform: scale(0);

  @media screen and (max-width: 768px) {
    bottom: 120px;
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: var(--p-white-color);
  }
  &:hover {
    transform: scale(1.1);
  }

  &.active {
    transform: scale(1);
  }
}
</style>
