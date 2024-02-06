<template>
  <div class="about-body">
    <div class="container">
      <div class="menu">
        <h2>Il nostro <span class="best-food-color">menù speciale</span></h2>
        <p>
          consectetur adipiscing elit. Donec ouis massa massa. Morbi frinailla
          convallis lacinia.
        </p>
      </div>
      <div class="card-menu">
        <div
          class="card-body"
          v-for="(product, index) in products"
          @click="$router.push('/menus')"
        >
          <div class="card-img">
            <img :src="useAppConfig().apiRoot + product.image" alt="" />
          </div>
          <div class="card-details">
            <h3 class="best-food-color ellipse">{{ product.name }}...</h3>
            <p>{{ trim(product.description, 30) }}...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="about-us container">
      <div class="about-us-details">
        <h3>Chi siamo</h3>
        <h2>Centro estetico <span>e termale</span></h2>
        <p>
          consectetur adipiscing elit. Donec ouis massa massa. Morbi frinailla
          convallis lacinia. Suspendisse eget nibh velit. In placerat, ipsum vel
          aliquam posuere.
        </p>
        <button>Learn more</button>
      </div>
      <div class="about-us-img">
        <img src="~/assets/images/about-us.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMenuStore } from "~~/store/Menu";

export default defineNuxtComponent({
  name: "MainCategories",
  computed: {
    products() {
      let items = [...this.menus.products].sort((a, b) => {
        return b.score - a.score;
      });

      items = items.slice(0, 3);

      return items; // return 3 items
    },
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
    trim(text: string, length: number) {
      return text.substring(0, length);
    },
  },
  setup() {
    const menus = useMenuStore();

    return {
      menus,
    };
  },
});
</script>

<style lang="scss">
/* about css */
.about-body {
  width: 100%;
  background: #33333310;
  margin-top: 100px;
  padding-bottom: 100px;
}
.menu {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu > h2 {
  width: 500px;
  text-align: center;
  font-weight: 500;
  font-size: 3rem;
  font-family: "Quicksand", serif;
}
.menu > p {
  height: 60px;
  width: 559px;
  text-align: center;
}

.card-menu {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card-body {
  display: flex;
  box-sizing: border-box;
  max-width: 32%;
  height: 154px;
  background: #ffffff;
  border: 1px solid #ececec;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  align-items: center;
}
.card-img {
  position: relative;
  width: 40%;
  height: 170px;
  overflow: hidden;
  border-radius: 10px;
  top: -35px;
  left: 15px;
  bottom: 0;
}
.card-img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-details {
  position: relative;
  width: 60%;
  height: 150px;
  overflow: hidden;
  top: 27px;
  left: 5px;
  bottom: 0;
  padding-left: 1.5rem;
  padding-right: 1rem;
}

.best-food-color.ellipse {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about-us {
  margin-top: 100px;
  display: flex;
  max-width: 70%;
  height: 500px;
  align-self: center;
  justify-content: space-between;
  gap: 2rem;
}
.about-us-details {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 400px;
  justify-content: center;
  gap: 10px;
}
.about-us-details h3 {
  font-weight: 100;
  color: var(--bs-primary);
  font-family: "Quicksand", serif;
}

.about-us-details h2 {
  font-weight: 500;
  font-size: 3rem;
  font-family: "Quicksand", serif;
}

.about-us-details span {
  color: var(--bs-primary);
}
.about-us-details button {
  width: 166px;
  height: 49px;
  color: var(--bs-body-bg);
  background: var(--bs-primary);
  border-radius: 80px;
  border: none;
}
.about-us-img {
  width: 50%;
  height: 400px;
  overflow: hidden;
  border-radius: 20px;
}
.about-us-img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
