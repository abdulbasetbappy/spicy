<template>
  <div class="hero container">
    <div class="left-details">
      <div class="tagline">
        <h1>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="
              position: absolute;
              height: 40px;
              width: 40px;
              margin-left: -50px;
              margin-top: 16px;
            "
          >
            <path
              d="M11 0L13.971 8.029L22 11L13.971 13.971L11 22L8.029 13.971L0 11L8.029 8.029L11 0Z"
              fill="#E28219"
              style="display: "
            ></path>
          </svg>
          Fornisci il
          <span class="titleImg"
            ><img src="~/assets/images/titleimg.png" alt=""
          /></span>
          <br />
          <span class="best-food-color">cibo migliore </span> per te.
        </h1>
      </div>
      <div class="tagline-details">
        <div class="left-img">
          <img src="~/assets/images/hero-pic-1.png" alt="" />
        </div>
        <div class="left-img-details">
          <p>
            consectetur adipiscing elit. Donec ouis massa massa. Morbi frinailla
            convallis lacinia. Suspendisse eget nibh velit. In placerat, ipsum
            vel aliquam posuere.
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 0L13.971 8.029L22 11L13.971 13.971L11 22L8.029 13.971L0 11L8.029 8.029L11 0Z"
                fill="#E28219"
              ></path>
            </svg>
          </p>
          <button @click="$router.push('/menus')">Ordina Adesso</button>
          <div class="social-icon">
            <a href="" class="circle-shape color"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-facebook"
              >
                <path
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                ></path>
              </svg>
            </a>

            <a href="" class="circle-shape color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-twitter"
              >
                <path
                  d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                ></path>
              </svg>
            </a>

            <a href="" class="circle-shape color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                ></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="right-details">
      <img src="~/assets/images/hero-pic-2.png" alt="pic" />
    </div>
  </div>
</template>

<script lang="ts">
import { useCartStore } from "~~/store/Cart";
import { useSettingStore } from "~~/store/Settings";

export default defineComponent({
  name: "MainHero",
  methods: {
    goToLocation(location: any) {
      if (this.cart.is_pickup) {
        window.localStorage.setItem("_location", location);
        this.$router.push(`/menus/?location=${location}`);
      } else {
        // get the delivery zone
        const delivery_zone = this?.settings?.settings?.delivery_zones.find(
          (zone: any) => zone.id == location
        );

        window.localStorage.setItem("_location", delivery_zone.handled_by);
        window.localStorage.setItem("_delivery_zone", location);
        this.$router.push(`/menus/?location=${delivery_zone.handled_by}`);
      }
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

<style lang="scss">
/* hero section */
.hero {
  width: 100%;
  height: 520px;
  display: flex;
  padding-left: 40px;
  padding-right: 45px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.left-details {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 60%;
}
.right-details {
  width: 35%;
}
.titleImg > img {
  width: 200px;
  height: 65px;
  border-radius: 100px;
}
.right-details {
  width: 520px;
  height: 436px;
  text-align: center;
  background: #bdbdbd;
  overflow: hidden;
  border-radius: 30px;
}
.right-details > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tagline {
  margin-right: 40px;
  align-self: flex-end;
}
.tagline h1 {
  font-family: "Quicksand", serif;
  font-size: 60px;
  font-weight: 500;
  margin-bottom: 2rem;
}
.best-food-color {
  color: var(--bs-primary);
}

.left-img {
  height: 334px;
  width: 394px;
  text-align: center;
  background: #bdbdbd;
  overflow: hidden;
  border-radius: 30px;
}
.left-img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tagline-details {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.left-img-details {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: space-around;
  align-items: self-start;
}
.left-img-details button {
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 80px;
  background: var(--bs-primary);
  color: var(--bs-body-bg);
}
.social-icon {
  width: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.social-icon::before {
  margin-right: 40px;
  content: "";
  position: relative;
  height: 1px;
  width: 110px;
  background: #bdbdbd;
  display: block;
  left: 0px;
  right: 0;
  top: 0px;
  bottom: 0;
}

.social-icon {
  a:focus,
  a:hover,
  .portfolio-cat a:hover,
  .footer -menu li a:hover {
    color: var(--bs-primary);
    text-decoration: none;
    border-color: var(--bs-primary);
    transition: all 0.3s ease-in-out;
  }
}

.circle-shape {
  display: flex;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  left: 0px;
  top: 0px;
  right: 0;
  bottom: 0;
  border: 2px solid rgb(131, 126, 126);
  align-items: center;
  justify-content: center;
  text-align: center;
}
.color {
  color: black;
}
</style>
