<template>
  <div>
    <!-- hero section start  -->
    <div class="p-hero">
      <video
        src="~/assets/desktop.mp4"
        autoplay
        loop
        muted
        class="video-desktop"
        v-if="isMobile == false"
      ></video>
      <video
        src="~/assets/mobile.mp4"
        autoplay
        loop
        muted
        class="video-mobile"
        v-else
      ></video>
      <div class="container p-0 m-0 row">
        <div class="col-md-7 d-md-flex align-items-center">
          <div>
            <h2 class="p-hero__heading">
              Sushi N Poke 🍣: Délicieux <span>Sushi</span> & Bols de
              <span>Poke</span>
            </h2>
            <h3 class="p-hero__title">
              Les plats traditionnels indiens, la livraison rapide à domicile et
              à emporter. 🥡🚚
            </h3>
            <div class="p-hero__button__group d-flex gap-3 align-items-center">
              <!-- <button class="p-primary-btn">Order Now</button>
              <button class="p-primary-btn-outeline">See Our Menu</button> -->
              <nuxt-link to="/order" class="p-primary-btn">Commander</nuxt-link>
              <nuxt-link to="/contact" class="p-primary-btn-outeline">
                Contactez-nous
              </nuxt-link>
            </div>
            <!-- <img
              class="p-hero__mouse__icon d-none d-xl-block"
              src="~/assets/img/mouse.png"
              alt="Sushi N Poke"
            /> -->
          </div>
        </div>
        <!-- <div class="col-md-5 d-none d-md-block p-hero__hero__image">
          <img src="~/assets/img/Rectangle1.png" alt="Sushi N Poke" />
        </div> -->
      </div>
    </div>
    <!-- hero section end  -->

    <!-- food catagory start  -->
    <div class="p-food-category">
      <div class="container-fluid container mx-auto">
        <div class="d-flex flex-column align-items-center">
          <h3 class="p-food-category__heading">Catégories Populaires</h3>
          <p class="p-food-category__title">
            Découvrez nos catégories les plus populaires et savourez nos plats
            japonais emblématiques. 🍱
          </p>
        </div>
        <div class="p-food-category__cards__container">
          <div
            class="p-food-category__card"
            v-for="(item, index) in popular_categories"
            :key="index"
            @click="$router.push(`/order/#${stringToID(item.name)}`)"
          >
            <img
              :src="`${useAppConfig().apiRoot}${item.image}`"
              alt="Sushi N Poke"
            />
            <h3>{{ item.name }}</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- food catagory end  -->

    <!-- choose favourit diseh start  -->
    <div class="p-favourit-dishes container">
      <div class="p-favourit-dishes__top row-md align-items-center">
        <div class="col-lg-5">
          <h1 class="p-favourit-dishes__heading">
            Choisissez Vos Plats <br />
            Préférés
          </h1>
        </div>
        <div class="col-lg-7">
          <p class="p-favourit-dishes__title">
            Régalez-vous avec nos plats japonais les plus populaires, comme les
            sushis, les poke bowls et les salades. 🍣🍲🥗
          </p>
        </div>
      </div>
      <div class="p-favourit-dishes__cards__container">
        <div
          class="p-favourit-dishes__card"
          v-for="(item, index) in popular_products"
          :key="index"
          @click="
            activeProduct = item;
            show = true;
          "
        >
          <img
            :src="`${useAppConfig().apiRoot}${item.image}`"
            alt="Sushi N Poke"
          />
          <div class="p-favourit-dishes__card_body">
            <h5 class="p-favourit-dishes__card__title">
              {{ item.name }}
            </h5>
            <p class="p-favourit-dishes__card__description">
              {{ item.description }}
            </p>
            <p class="p-favourit-dishes__card__price">
              {{ useAppConfig().currencySymbol }}{{ item.price.price_delivery }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- choose favourit diseh end  -->

    <!-- feature start  -->
    <div class="container-fluid mx-auto container p-feature">
      <div
        class="p-feature__container d-md-flex align-items-center justify-content-around"
      >
        <div class="p-feature__card d-flex flex-column align-items-center">
          <img src="~/assets/img/Frame15.png" alt="Sushi N Poke" />
          <h3 class="p-feature__card__title">Saveurs Japonaises Exquises</h3>
          <p class="p-feature__card__description">
            Découvrez "Sushi N Poke," le paradis des saveurs japonaises, où
            chaque bouchée est une explosion de délices exquis.
          </p>
        </div>
        <div class="p-feature__card d-flex flex-column align-items-center">
          <img src="~/assets/img/Frame15.png" alt="Sushi N Poke" />
          <h3 class="p-feature__card__title">Festin de Fast Food Japonais</h3>
          <p class="p-feature__card__description">
            "Sushi N Poke" propose des plats japonais rapides et délicieux, des
            sushis aux bols authentiques comme le poke au saumon.
          </p>
        </div>
        <div class="p-feature__card d-flex flex-column align-items-center">
          <img src="~/assets/img/Frame15.png" alt="Sushi N Poke" />
          <h3 class="p-feature__card__title">
            Voyage Culinaire chez Sushi N Poke
          </h3>
          <p class="p-feature__card__description">
            Plongez dans la délicieuse cuisine japonaise chez "Sushi N Poke," où
            le menu varié et les délices uniques vous attendent.
          </p>
        </div>
      </div>
    </div>

    <!-- feature end  -->
    <!-- about shop start  -->
    <div class="p-about-shop">
      <div class="container mx-xl-auto p-xl-0 row d-flex align-items-center">
        <div class="col-md-6 p-0 p-about-shop__content">
          <h1 class="p-about-shop__heading">
            Rejoignez-nous pour une <br />
            expérience culinaire
          </h1>
          <p class="p-about-shop__description">
            Chez Sushi N Poke, nous sommes passionnés par la cuisine japonaise
            authentique. Nous nous engageons à utiliser des ingrédients frais et
            de qualité supérieure, et à préparer nos plats avec amour et
            passion. 🍣
          </p>
          <nuxt-link to="/about" class="p-primary-btn"> A propos </nuxt-link>
        </div>
        <div
          class="col-md-6 d-none d-md-flex justify-content-xl-end gap-xl-3 p-about-shop__image_box"
        >
          <div
            class="p-about-shop__small__images d-xl-flex flex-xl-column gap-xl-3"
          >
            <img src="~/assets/img/sushi.jpg" alt="Sushi N Poke" />
            <img src="~/assets/img/sushi-1.jpg" alt="Sushi N Poke" />
          </div>
          <div class="p-about-shop__big__iamge">
            <img src="~/assets/img/sushi-2.jpg" alt="Sushi N Poke" />
          </div>
        </div>
      </div>
    </div>
    <!-- about shop end  -->

    <!-- advertise start  -->
    <div class="p-advertise">
      <div
        class="p-advertise__container container-fluid container mx-xl-auto d-flex justify-content-between"
      >
        <div class="">
          <h1 class="p-advertise__heading">
            Passez votre commande en un clic !
          </h1>
          <!-- <button class="p-advertise__btn">Pick Up</button> -->
          <NuxtLink to="/order" class="p-advertise__btn">
            Commandez ici
          </NuxtLink>
        </div>
        <div class="p-advertise__image">
          <img src="~/assets/img/sushi-3.png" alt="Sushi N Poke" />
        </div>
      </div>
    </div>
    <!-- advertise end  -->

    <CartModal
      v-model="show"
      :product="activeProduct"
      :show="show"
      v-if="show && activeProduct"
      @confirm="show = false"
      @cancel="show = false"
    >
    </CartModal>
  </div>
</template>

<script lang="ts">
import { useCartStore } from "~~/store/Cart";
import { useMenuStore } from "~~/store/Menu";
import { useSettingStore } from "~~/store/Settings";

export default defineNuxtComponent({
  name: "Home",
  data() {
    return {
      show: false,
      activeProduct: null,
      isMobile: false,
    };
  },
  head() {
    return {
      title: "Home - Sushi N Poke",
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
  methods: {
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
    goToLocation(location: any) {
      if (this.cart.is_pickup) {
        window.localStorage.setItem("_location", location);
        this.$router.push(`/order/?location=${location}`);
      } else {
        // get the delivery zone
        const delivery_zone = this?.store?.settings?.delivery_zones.find(
          (zone: any) => zone.id == location
        );

        window.localStorage.setItem("_location", delivery_zone.handled_by);
        window.localStorage.setItem("_delivery_zone", location);
        this.$router.push(`/order/?location=${delivery_zone.handled_by}`);
      }
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 768;

    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth < 768;
    });
  },
  computed: {
    delivery_zones() {
      let length = this.settings?.settings?.delivery_zones?.length;
      let delivery_zones = this.settings?.settings?.delivery_zones;

      if (length > 8) {
        return delivery_zones.slice(0, 11);
      } else if (length < 8) {
        return delivery_zones.slice(0, 7);
      }
    },
    popular_products() {
      const popular = this.menus?.products?.sort((a: any, b: any) => {
        return b.score - a.score;
      });

      // remove products with no image
      const products = popular.filter((product: any) => product.image);

      return products.slice(0, 4);
    },
    popular_categories() {
      let categories = this.menus?.mappedCategories;

      // sort by score
      categories.sort((a: any, b: any) => {
        return b.score - a.score;
      });

      // remove categories with no items
      categories = categories.filter(
        (category: any) => category.products.length > 3
      );

      return categories.slice(0, 8);
    },
  },
  setup() {
    const menus = useMenuStore();
    const settings = useSettingStore();
    const cart = useCartStore();

    return {
      menus,
      settings,
      cart,
    };
  },
});
</script>

<style lang="scss" scoped>
body {
  background-color: var(--p-background-color);
}

.p-primary-btn {
  width: 150px;
  height: 46px;
  border: none;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--p-small-font);
  font-weight: 600;
  line-height: 16px;
  background-color: var(--p-primary-color);
  color: var(--p-black-color);
}

.p-primary-btn-outeline {
  width: 150px;
  height: 46px;
  border: solid 1px var(--p-primary-color);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--p-small-font);
  font-weight: 600;
  line-height: 16px;
  background-color: var(--p-black-gray);
  color: var(--p-primary-color);
}

// hero start
.p-hero {
  height: 643px;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: var(--p-black-gray);
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;

  @media screen and (max-width: 768px) {
    height: 60dvh;
    padding: 40px 0px;
  }

  .video-desktop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .video-mobile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  &__heading {
    font-weight: 700;
    font-size: 50px;
    line-height: 60px;
    margin-bottom: 25px;
    color: var(--p-white-color);
    span {
      color: var(--p-primary-color);
      display: inline-block;
      position: relative;

      img {
        max-width: 100%;
        height: auto;
        display: block;
        width: 100%;
      }

      &::after {
        content: "";
        background-image: url("~/assets/img/Vector-1.png");
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 15px;
        filter: hue-rotate(321deg) saturate(8);
      }
    }
  }
  &__title {
    font-weight: 500;
    font-size: var(--p-small-font);
    line-height: 24px;
    color: var(--p-white-color);
    width: 90%;
    margin-bottom: 25px;
  }
  &__mouse__icon {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    margin-bottom: 50px;
    filter: hue-rotate(321deg) saturate(8);
  }
  &__hero__image {
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
}
// hero end

// foocategory start
.p-food-category {
  padding: 60px 0px;
  margin-bottom: 100px;
  &__heading {
    font-weight: 700;
    font-size: var(--p-heading-font);
    line-height: 50px;
    color: var(--p-white-color);
    margin-bottom: 15px;
  }
  &__title {
    font-weight: 500;
    font-size: var(--p-small-font);
    line-height: 24px;
    color: var(--p-light-white);
    text-align: center;
    width: 536px;
    padding: 0;
    margin: 0;
  }
  &__cards__container {
    position: relative;
    margin-top: 60px;
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  &__card {
    width: 192px;
    height: 152px;
    border-radius: 17px;
    background-color: var(--p-black-gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 20px;
    }
    h3 {
      font-weight: 700;
      font-size: 15px;
      line-height: 18px;
      color: var(--p-white-color);
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding: 0 0.5rem;
    }
  }
  &__next_btn {
    position: absolute;
    background-color: var(--p-primary-color);
    right: 0;
    top: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    cursor: pointer;
  }
}
// foocategory end

// favourit dishes start
.p-favourit-dishes {
  &__top {
    margin-bottom: 60px;
  }
  &__heading {
    font-weight: 700;
    font-size: var(--p-heading-font);
    line-height: 70px;
    color: var(--p-white-color);
  }
  &__title {
    font-weight: 500;
    font-size: var(--p-small-font);
    line-height: 24px;
    color: var(--p-white-color);
  }
  &__cards__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
  }
  &__card {
    background-color: var(--p-black-gray);
    border-radius: 17px;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &__card_body {
    padding: 15px;
  }
  &__card__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 20x;
    color: var(--p-white-color);

    // add ... after first line
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &__card__description {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: var(--p-light-white);
    // add ... after first line
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &__card__price {
    font-weight: 700;
    font-size: var(--p-small-font);
    line-height: 16px;
    color: var(--p-primary-color);
  }
}
// favourit dishes end

// feature start
.p-feature {
  margin-top: 120px;
  border: 1px solid var(--p-primary-color);
  border-radius: 20px;
  padding: 40px;
  width: calc(100% - 20px);

  &__card {
    img {
      width: 53px;
      height: 53px;
      margin-bottom: 15px;
      filter: hue-rotate(321deg) saturate(8);
    }
  }
  &__card__title {
    font-weight: 700;
    font-size: 22px;
    line-height: 22px;
    color: var(--p-white-color);
  }
  &__card__description {
    font-weight: 500;
    font-size: var(--p-small-font);
    line-height: 24px;
    color: var(--p-light-white);
    width: 290px;
    text-align: center;
  }
}
// feature end

// about shop start
.p-about-shop {
  margin-top: 100px;
  &__heading {
    font-weight: 700;
    font-size: var(--p-heading-font);
    line-height: 70px;
    color: var(--p-white-color);
    margin-bottom: 20px;
  }
  &__description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: var(--p-white-color);
    margin-bottom: 30px;
  }
  &__image_box {
    padding: 0;
    margin: 0;
  }
  &__small__images {
    img {
      width: 100%;
      height: 233px;
      border-radius: 12px;
      object-fit: cover;
    }
  }
  &__big__iamge {
    img {
      width: 100%;
      height: 485px;
      border-radius: 12px;
      object-fit: cover;
    }
  }
}
// about shop end

// advertise start
.p-advertise {
  margin-top: 100px;
  height: 290px;
  &__container {
    background-color: var(--p-primary-color);
    border-radius: 17px;
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__heading {
    font-weight: 700;
    font-size: 40px;
    line-height: 56px;
    color: var(--p-black-color);
    margin-bottom: 20px;
  }
  &__btn {
    width: 150px;
    height: 46px;
    border: none;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--p-small-font);
    font-weight: 600;
    line-height: 16px;
    background-color: #333030;
    color: var(--p-white-color);
  }
  &__image {
    height: 250px;
    width: 300px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
// advertise end

@media screen and (max-width: 768px) {
  .p-primary-btn {
    width: 120px;
    height: 40px;
    font-weight: 700;
  }

  .p-primary-btn-outeline {
    width: 120px;
    height: 40px;
  }

  // header start
  .p-header {
    padding: 8px 0px;

    &__logo {
      font-size: 28px;
      line-height: 56px;

      span {
        color: var(--p-primary-color);
      }
    }

    &__user {
      height: 24px;
      width: 24px;
      cursor: pointer;
    }

    &__cart {
      cursor: pointer;
      height: 25px;
      width: 25px;

      span {
        width: 14px;
        height: 14px;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }

  // header end

  // hero start
  .p-hero {
    width: 100%;
    padding: 40px 0px;

    &__heading {
      font-weight: 700;
      font-size: 35px;
      line-height: 50px;
      margin-bottom: 20px;
    }

    &__title {
      font-weight: 500;
      line-height: 24px;
      width: 90%;
      margin-bottom: 25px;
    }
  }

  // hero end

  // foocategory start
  .p-food-category {
    padding: 60px 0px;
    margin-bottom: 0px;

    &__heading {
      font-weight: 700;
      line-height: 40px;
    }

    &__title {
      width: auto;
    }

    &__cards__container {
      position: relative;
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      overflow: hidden;
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 0;
        display: none;
      }
    }

    &__card {
      height: 132px;
      padding: 0px 20px;
      aspect-ratio: 1;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: var(--p-primary-color);
        cursor: pointer;
      }

      img {
        width: 60px;
        height: 60px;
        margin-bottom: 15px;
      }

      h3 {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        width: 100px;
        text-overflow: ellipsis;
      }
    }

    &__next_btn {
      display: none;
    }
  }

  // foocategory end

  // favourit dishes start
  .p-favourit-dishes {
    &__top {
      margin-bottom: 0px;
    }

    &__heading {
      line-height: 45px;
    }

    &__title {
      line-height: 20px;
    }

    &__cards__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    &__card {
      background-color: var(--p-black-gray);
      border-radius: 17px;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;

      img {
        width: 100%;
      }
    }

    &__card_body {
      padding: 5px;
    }

    &__card__title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10;
    }

    &__card__description {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      margin-bottom: 8px;
    }

    &__card__price {
      font-weight: 600;
      line-height: 15px;
      margin-bottom: 6px;
    }
  }

  // favourit dishes end

  // feature start
  .p-feature {
    margin-top: 80px;
    border: none;
    border-radius: none;
    padding: 20px 0px;
    border: 1px solid var(--p-primary-color);
    border-radius: 20px;

    &__card {
      margin-bottom: 20px;

      img {
        width: 33px;
        height: 33px;
        margin-bottom: 10px;
      }
    }

    &__card__title {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: var(--p-white-color);
    }

    &__card__description {
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      color: var(--p-light-white);
      width: 80%;
      text-align: center;
    }
  }

  // feature end

  // about shop start
  .p-about-shop {
    margin-top: 60px;
    padding: 15px;

    &__heading {
      font-weight: 700;
      font-size: 30px;
      line-height: 40px;
      margin-bottom: 20px;
    }

    &__description {
      font-weight: 500;
      font-size: 15px;
      line-height: 24px;
      color: var(--p-white-color);
      margin-bottom: 30px;
    }
  }

  // about shop end

  // advertise start
  .p-advertise {
    margin-top: 60px;
    height: auto;
    padding: 0px 10px;

    &__container {
      border-radius: 17px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__heading {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 15px;
    }

    &__btn {
      width: auto;
      height: 36px;
      padding: 0px 20px;
    }

    &__image {
      min-width: 40%;
      width: fit-content;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        width: 120px;
      }
    }
  }

  // advertise end

  // footer start
  .p-footer {
    margin-top: 60px;

    &__container {
      padding: 0px 10px;
    }

    &__logo__section {
      margin-bottom: 10px;

      &__logo {
        font-size: 22px;
        margin-bottom: 10px;

        span {
          color: var(--p-primary-color);
        }
      }
    }

    &__opening__houres {
      padding: 0px 0px;

      h3 {
        font-weight: 700;
        font-size: 17px;
        line-height: 22px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        font-weight: 500;
      }
    }

    &__location {
      padding: 0px 0px;

      &__heading {
        font-size: 17px;
      }

      &__location__name {
        font-size: 14px;
      }
    }

    &__map {
      padding: 0;

      iframe {
        height: 200px;
        width: 100%;
        border-radius: 10px;
      }
    }

    &__bottom {
      border-top: 1px solid #656565;
      padding: 15px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      &__copyright {
        font-size: 14px;
      }

      &__devloped_by {
        font-size: 14px;
      }

      &__payment__image {
        height: 12px;
      }
    }
  }

  // footer end
}

// medium device start

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .p-primary-btn {
    width: auto;
    padding: 0px 20px;
    height: 40px;
    font-weight: 700;
  }

  .p-primary-btn-outeline {
    width: auto;
    padding: 0px 20px;
    height: 40px;
  }

  // hero start
  .p-hero {
    height: auto;
    width: 100%;
    padding: 40px 0px;

    &__heading {
      font-weight: 700;
      font-size: 43px;
      line-height: 65px;
      margin-bottom: 25px;
    }
  }

  // hero end

  // foocategory start
  .p-food-category {
    padding: 60px 0px;
    margin-bottom: 0px;

    &__heading {
      font-weight: 700;
      line-height: 40px;
      font-size: 35px !important;
    }

    &__title {
      width: auto;
    }

    &__cards__container {
      position: relative;
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      overflow: hidden;
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 0;
        display: none;
      }
    }

    &__card {
      width: auto;
      height: 132px;
      padding: 0px 20px;

      img {
        width: 50px;
        height: 50px;
        margin-bottom: 15px;
      }

      h3 {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        white-space: nowrap;
      }
    }

    &__next_btn {
      display: none;
    }
  }

  // foocategory end

  // favourit dishes start
  .p-favourit-dishes {
    &__top {
      margin-bottom: 60px;
    }

    &__heading {
      font-size: 35px;
      line-height: 45px;
    }

    &__title {
      line-height: 20px;
      font-size: 15px;
    }

    &__cards__container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px;
    }

    &__card {
      background-color: var(--p-black-gray);
      border-radius: 17px;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;

      img {
        width: 100%;
      }
    }

    &__card_body {
      padding: 10px;
    }

    &__card__title {
      font-weight: 600;
      font-size: 17px;
      line-height: 20px;
      margin-bottom: 15;
    }

    &__card__description {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      margin-bottom: 12px;
    }

    &__card__price {
      font-weight: 600;
      line-height: 15px;
      margin-bottom: 6px;
    }
  }

  // favourit dishes end

  // feature start
  .p-feature {
    margin-top: 80px;
    border: none;
    border-radius: none;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--p-primary-color);
    border-radius: 20px;

    &__card {
      margin-bottom: 0;

      img {
        width: 36px;
        height: 36px;
        margin-bottom: 10px;
      }
    }

    &__card__title {
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
      color: var(--p-white-color);
    }

    &__card__description {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.5px;
      color: var(--p-light-white);
      width: 95%;
      text-align: center;
    }
  }

  // feature end

  // about shop start
  .p-about-shop {
    margin-top: 60px;

    &__content {
      margin-bottom: 40px;
    }

    &__heading {
      font-size: 35px;
      line-height: 50px;
      margin-bottom: 20px;
    }

    &__description {
      font-size: 15px;
      line-height: 22px;
      margin-bottom: 30px;
    }

    &__image_box {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__small__images {
      img {
        margin-bottom: 10px;
        width: 100%;
        height: 233px;
        border-radius: 12px;
      }
    }

    &__big__iamge {
      display: none;

      img {
        width: 100%;
        height: auto;
        border-radius: 12px;
      }
    }
  }

  // about shop end

  // advertise start
  .p-advertise {
    margin-top: 60px;
    height: auto;
    padding: 0px 10px;

    &__container {
      border-radius: 17px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__heading {
      font-size: 30px;
      line-height: 36px;
      margin-bottom: 15px;
    }

    &__btn {
      width: auto;
      height: 33px;
      padding: 0px 30px;
    }

    &__image {
      min-width: 50%;
      width: fit-content;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        width: 200px;
      }
    }
  }

  // advertise end

  // footer start
  .p-footer {
    margin-top: 60px;

    &__container {
      padding: 0px 10px;
    }

    &__logo__section {
      margin-bottom: 10px;

      &__logo {
        font-size: 28px;
        margin-bottom: 10px;

        span {
          color: var(--p-primary-color);
        }
      }
    }

    &__opening__houres {
      padding: 0px 0px;

      h3 {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        font-weight: 500;
      }
    }

    &__location {
      padding: 0px 0px;

      &__heading {
        font-size: 18px;
      }

      &__location__name {
        font-size: 14px;
      }
    }

    &__map {
      padding: 0;

      iframe {
        height: 300px;
        width: 100%;
        border-radius: 10px;
      }
    }

    &__bottom {
      border-top: 1px solid #656565;
      padding: 15px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      &__copyright {
        font-size: 14px;
      }

      &__devloped_by {
        font-size: 14px;
      }

      &__payment__image {
        margin-top: 10px;
        img {
          height: 22px;
        }
      }
    }
  }
  // footer end
}
</style>
