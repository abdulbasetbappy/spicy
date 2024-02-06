<template>
  <Teleport to="body">
    <vue-final-modal
      v-bind="$attrs"
      classes="modal-container"
      content-class="modal-content"
      v-slot="{ params, close }"
      id="main-modal"
    >
      <div class="modal-body">
        <div class="i-tabs">
          <div
            class="i-tab"
            :class="{ active: active_tab == 'orders' }"
            @click="active_tab = 'orders'"
          >
            {{ $t("Orders") }}
          </div>
          <div
            class="i-tab"
            :class="{ active: active_tab == 'profile' }"
            @click="active_tab = 'profile'"
          >
            {{ $t("Profile") }}
          </div>
          <div
            class="i-tab"
            :class="{ active: active_tab == 'review' }"
            @click="active_tab = 'review'"
          >
            {{ $t("Review") }}
          </div>
        </div>

        <div class="i-orders" v-if="active_tab == 'orders'">
          <div class="i-order-items">
            <div class="i-order-item">
              <span class="i-order-data">{{ $t("ID") }}</span>
              <span class="i-order-data">{{ $t("Status") }}</span>
              <span class="i-order-data">{{ $t("Total") }}</span>
              <span class="i-order-data">{{ $t("Date") }}</span>
            </div>

            <div class="i-order-item" v-for="order in orders" :key="order.id">
              <span class="i-order-data">{{ order.id }}</span>
              <span class="i-order-data">{{ order.status }}</span>
              <span class="i-order-data">{{ $currency }}{{ order.total }}</span>
              <span class="i-order-data">{{
                new Date(order.created_at).toLocaleString()
              }}</span>
            </div>
          </div>
        </div>

        <div class="i-profile" v-if="active_tab == 'profile'">
          <form class="i-form" @submit.prevent="">
            <div class="form-group mb-2">
              <div class="d-flex gap-2">
                <div class="flex-grow-1 mr-2">
                  <label for="first_name">{{ $t("First name") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    id="first_name"
                    name="first_name"
                    :placeholder="$t('Enter your first name')"
                    v-model="first_name"
                    required
                  />
                </div>
                <div class="flex-grow-1">
                  <label for="last_name">{{ $t("Last name") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    id="last_name"
                    name="last_name"
                    :placeholder="$t('Enter your last name')"
                    v-model="last_name"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group mb-2">
              <label for="email">{{ $t("Email") }}</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                :placeholder="$t('Enter your email')"
                v-model="email"
                disabled
                required
              />
            </div>

            <div class="form-group mb-2">
              <label for="phone">{{ $t("Phone") }}</label>
              <input
                type="phone"
                class="form-control"
                id="phone"
                name="phone"
                :placeholder="$t('Enter phone')"
                v-model="phone"
                disabled
                required
              />
            </div>

            <div class="form-group mb-2">
              <label for="location">{{ $t("Location") }}</label>
              <select
                class="form-control"
                id="location"
                name="location"
                v-model="activeLocation"
                @change="changedLocation($event)"
              >
                <option
                  v-for="(loc, index) in allLocations"
                  :key="index"
                  :value="loc.id"
                  :selected="loc.id === activeLocation"
                >
                  {{ loc.name }} - {{ loc.zip }}
                </option>
              </select>
            </div>
            <!-- address, city, state, zip -->

            <div class="form-group mb-2">
              <label for="address">{{ $t("Address") }}</label>
              <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                :placeholder="$t('Enter your address')"
                v-model="address"
                required
              />
            </div>

            <div class="form-group mb-2">
              <div class="d-flex gap-2">
                <div class="flex-grow-1 mr-2">
                  <label for="city">{{ $t("City") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    id="city"
                    name="city"
                    :placeholder="$t('Enter your city')"
                    :value="city"
                    required
                    disabled
                  />
                </div>
                <div class="flex-grow-1">
                  <label for="state">{{ $t("State") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    id="state"
                    name="state"
                    :placeholder="$t('Enter your state')"
                    :value="state"
                    required
                    disabled
                  />
                </div>
              </div>

              <div class="form-group mb-2">
                <label for="zip">{{ $t("Zip") }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="zip"
                  name="zip"
                  :placeholder="$t('Enter your zip')"
                  :value="zip"
                  required
                  disabled
                />
              </div>
            </div>

            <div class="form-group mt-4">
              <button
                type="submit"
                class="btn btn-primary text-white"
                @click.prevent="onSubmit"
              >
                {{ $t("Save") }}
              </button>
            </div>
          </form>
        </div>

        <div class="i-review" v-if="active_tab == 'review'">
          <h4 class="fw-bold">{{ $t("Write your honest review") }}</h4>

          <div class="mb-2">
            <div class="i-review-stars">
              <div
                class="i-review-star"
                v-for="star in 5"
                :key="star"
                @click="rating = star"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  :class="star <= rating ? 'active' : ''"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                      d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <textarea
            class="form-control"
            id="review"
            name="review"
            placeholder="Write your review here"
            rows="3"
            v-model="review"
            required
          ></textarea>

          <div class="form-group mt-4">
            <button
              type="submit"
              class="btn btn-primary text-white"
              @click.prevent="onReviewSubmit"
            >
              {{ $t("Submit") }}
            </button>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </Teleport>
</template>

<script lang="ts">
import { Field } from "vee-validate";
import { defineComponent } from "vue";
import { useAuthStore } from "~~/store/Auth";
import { useCartStore } from "~~/store/Cart";
import { useSettingStore } from "~~/store/Settings";

export default defineComponent({
  name: "ProfileModal",
  data() {
    return {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      active_tab: "orders",
      activeLocation: 0,
    };
  },
  mounted() {
    this.id = this.auth.user.id;
    this.first_name = this.auth.user.first_name;
    this.last_name = this.auth.user.last_name;
    this.email = this.auth.user.email;
    this.phone = this.auth.user.phone;
    this.role = this.auth.user.role;
    if (this.auth.user.address && this.auth.user.address.address) {
      let address = this.auth.user.address;
      this.address = address.address;
      this.city = address.city;
      this.state = address.state;
      this.zip = address.zip;
    }
    if (window.localStorage.getItem("_location")) {
      this.activeLocation = parseInt(window.localStorage.getItem("_location"));
    } else {
      this.activeLocation = this.settings.settings.locations[0].id;
    }
  },
  watch: {
    activeLocation() {
      let loc = this.settings.settings.locations.find(
        (l) => l.id == this.activeLocation
      );
      this.city = loc.city;
      this.state = loc.state;
      this.zip = loc.zip;
    },
  },
  computed: {
    allLocations() {
      return this.settings.settings.locations;
    },
  },
  methods: {
    changedLocation($event) {
      this.activeLocation = parseInt($event.target.value || "0");
      window.localStorage.setItem("_location", this.activeLocation.toString());
      this.cart.updateCart();
    },
    onSubmit() {
      // load tokens and user id from local storage
      const token = localStorage.getItem("__token");
      const user_id = JSON.parse(localStorage.getItem("__user") || "{}")?.id;
      useFetch(
        `${
          useAppConfig().apiRoot
        }/v1/public/auth/update-profile/?token=${token}&user_id=${user_id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            address: JSON.stringify({
              address: this.address,
              city: this.city,
              state: this.state,
              zip: this.zip,
            }),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res: any) => {
        window.localStorage.setItem(
          "__user",
          JSON.stringify({
            email: this.email,
            first_name: this.first_name,
            id: user_id,
            last_name: this.last_name,
            phone: this.phone,
            role: res.role,
            address: {
              address: this.address,
              city: this.city,
              state: this.state,
              zip: this.zip,
            },
          })
        );
        this.$toast.success(this.$t("Profile updated successfully!"), {
          position: "bottom-right",
          timeout: 5000,
          icon: true,
        });
      });
    },
    onReviewSubmit() {
      let token = window.localStorage.getItem("__token");
      let user = JSON.parse(window.localStorage.getItem("__user") || "{}").id;

      useFetch(
        `${
          useAppConfig().apiRoot
        }/v1/public/reviews/?token=${token}&user_id=${user}`,
        {
          method: "POST",
          body: JSON.stringify({
            stars: this.rating,
            description: this.review,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res: any) => {
        console.log(res);
        if (res.data.value.status == "success") {
          this.$toast.success(this.$t("Review saved successfully!"), {
            position: "bottom-right",
            timeout: 5000,
            icon: true,
          });
        }
      });
    },
  },
  async setup() {
    const orders = ref([]);
    const user: any = ref({});
    const auth = useAuthStore();
    const settings = useSettingStore();
    const cart = useCartStore();
    // load tokens and user id from local storage
    const token = localStorage.getItem("__token");
    const user_id = JSON.parse(localStorage.getItem("__user") || "{}")?.id;
    const { data } = await useFetch(
      `${
        useAppConfig().apiRoot
      }/v1/public/sales/orders/?token=${token}&user_id=${user_id}`
    );
    orders.value = data?.value?.data?.sort(
      (a: any, b: any) => new Date(b.created_at) - new Date(a.created_at)
    );
    const { data: user_data } = await useFetch(
      `${
        useAppConfig().apiRoot
      }/v1/public/auth/profile/?token=${token}&user_id=${user_id}`
    );
    user.value = user_data?.value?.user;

    // useFetch(`/v1/public/reviews/?token=${token}&user_id=${user}`).then(
    //   (res: any) => {
    //     stars.value = res.data[0].stars;
    //     description.value = res.data[0].description;
    //   }
    // );

    const rating = ref(5);
    const review = ref("");

    const { data: review_data } = await useFetch(
      `${
        useAppConfig().apiRoot
      }/v1/public/reviews/?token=${token}&user_id=${user_id}`
    );

    console.log(review_data);

    if (review_data?.value?.data?.length) {
      rating.value = review_data?.value?.data[0].stars;
      review.value = review_data?.value?.data[0].description;
    }

    return {
      orders,
      user,
      auth,
      settings,
      cart,
      rating,
      review,
    };
  },
  components: { Field },
});
</script>

<style lang="scss" scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
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
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
}

// style scroll bar
.modal-body::-webkit-scrollbar {
  width: 0.5rem;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #888;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.i-tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;

  .i-tab {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: var(--bs-primary);

    &:hover {
      background: var(--bs-primary);
      color: var(--bs-white);
    }

    &.active {
      background: var(--bs-primary);
      color: var(--bs-white);
    }
  }
}

.i-orders {
  .i-order-items {
    .i-order-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;

      &:hover {
        background: #eee;
      }

      .i-order-data {
        flex: 1;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
}

.i-review-stars {
  display: flex;
  align-items: center;

  .i-review-star {
    margin-right: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
      color: #ccc;
    }

    &:hover {
      svg {
        color: rgba(255, 165, 0, 0.5);
      }
    }

    .active {
      color: rgb(255, 165, 0);
    }
  }
}

input,
input[disabled],
select,
textarea {
  border: 1px solid #ccc;
  background-color: var(--p-black-gray);
  color: var(--bs-white);
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: var(--bs-primary);
  }
}
</style>
