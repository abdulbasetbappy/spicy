<template>
  <div class="container py-5" v-if="cart?.offers?.length > 2">
    <Carousel
      :itemsToShow="3"
      :wrapAround="true"
      :transition="500"
      :autoplay="5000"
      width="100%"
      class="i-offers__carousel py-5"
    >
      <Slide v-for="(slide, index) in cart.offers" :key="index">
        <div
          class="carousel__item"
          :style="
            slide.image
              ? `background-image: url(${useAppConfig().apiRoot}${slide.image})`
              : `background-image: url(/placeholder.jpg)`
          "
        ></div>
      </Slide>
    </Carousel>
    <!-- <Pagination /> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import { useCartStore } from "~~/store/Cart";

export default defineComponent({
  name: "OfferCarousel",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  setup() {
    const cart = useCartStore();
    cart.fetchOffers();

    return {
      cart,
    };
  },
});
</script>

<style>
.carousel__viewport {
  perspective: 100% !important;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  height: 200px;
  margin-right: 1.6666%;
  margin-left: 1.6666%;
  width: 30% !important;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
}

.carousel__item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
