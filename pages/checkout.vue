<template>
  <div class="i-checkout">
    <div class="container">
      <div class="row m-row">
        <div class="col-8 m-col">
          <h1 class="mt-5 mb-4">{{ $t("Checkout") }}</h1>

          <Form
            :key="JSON.stringify(schema)"
            ref="form"
            :validation-schema="schema"
            @change="updateForm()"
          >
            <!-- Start: delivery method -->
            <div class="i-checkout-section">
              <div class="i-checkout-header">
                <h2>
                  <span class="i-number">1</span>
                  <span>{{ $t("Delivery Method") }}</span>
                </h2>
                <!-- <a href="#" class="i-checkout-action">Edit</a> -->
              </div>
              <div class="i-checkout-content">
                <div class="row w-100 ms-0">
                  <div
                    class="col i-pick-option"
                    :class="{
                      active: !cart._is_pickup,
                    }"
                    @click="
                      cart._is_pickup = false;
                      updateForm();
                    "
                  >
                    <span>{{ $t("Delivery") }}</span>
                    <span></span>
                  </div>
                  <div
                    class="col i-pick-option"
                    :class="{
                      active: cart._is_pickup,
                    }"
                    @click="
                      cart._is_pickup = true;
                      updateForm();
                    "
                  >
                    <span>{{ $t("Pickup") }}</span>
                    <span>{{ $t("FREE") }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- End: delivery method -->

            <!-- Start: personal -->
            <div class="i-checkout-section">
              <div class="i-checkout-header">
                <h2>
                  <span class="i-number">2</span>
                  <span>{{ $t("Personal Information") }}</span>
                </h2>
                <!-- <a href="#" class="i-checkout-action"
                  >Clear</a
                > -->
              </div>
              <div class="i-checkout-content">
                <!-- Start: name -->
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="name" class="form-label">{{
                      $t("Name")
                    }}</label>
                    <Field
                      v-model="form.name"
                      name="name"
                      :label="$t('Name')"
                      :placeholder="$t('Enter your name')"
                      id="name"
                      autocomplete="name"
                    />
                    <ErrorMessage name="name" />
                  </div>
                </div>
                <!-- End: name -->

                <!-- Start: contact -->
                <div class="row mb-3">
                  <div class="col-6">
                    <label for="email" class="form-label">{{
                      $t("Email")
                    }}</label>
                    <Field
                      v-model="form.email"
                      name="email"
                      :label="$t('Email')"
                      :placeholder="$t('Enter your email')"
                      id="email"
                      autocomplete="email"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div class="col-6">
                    <label for="phone" class="form-label">{{
                      $t("Phone")
                    }}</label>
                    <Field
                      v-model="form.phone"
                      name="phone"
                      :label="$t('Phone')"
                      :placeholder="$t('Enter your phone')"
                      id="phone"
                      autocomplete="phone"
                    />
                    <ErrorMessage name="phone" />
                  </div>
                </div>
              </div>

              <!-- <button
                type="button"
                class="btn btn-primary w-100 text-white"
                @click="focusNextSection"
              >
                Next
              </button> -->
            </div>
            <!-- End: personal -->

            <!-- Start: address -->
            <div class="i-checkout-section" v-if="!cart._is_pickup">
              <div class="i-checkout-header">
                <h2>
                  <span class="i-number">3</span>
                  <span>{{ $t("Delivery Address") }}</span>
                </h2>
                <div class="i-select-location">
                  <label for="location" class="form-label">{{
                    $t("Location")
                  }}</label>
                  <select
                    class="form-select"
                    id="location"
                    v-model="activeLocation"
                    :key="activeLocation"
                    @change="changedLocation($event)"
                  >
                    <option
                      v-for="(loc, index) in allLocations"
                      :key="index"
                      :value="loc.id"
                      :selected="loc.id === activeLocation"
                    >
                      {{ loc.city }} - {{ loc.zip }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="i-checkout-content">
                <h4 class="fw-bold" :key="location.id">
                  {{ location.city }} - {{ location.zip }}
                </h4>
                <p>{{ $t("We are missing your street.") }}</p>
                <!-- Start: street -->
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="street" class="form-label">{{
                      $t("Street")
                    }}</label>
                    <Field
                      v-model="form.street"
                      name="street"
                      :label="$t('Street')"
                      :placeholder="$t('Street')"
                      id="street"
                      autocomplete="street"
                    />
                    <ErrorMessage name="street" />
                  </div>
                </div>
                <!-- End: street -->

                <!-- Start: apartment -->
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="apartment" class="form-label"
                      >{{ $t("Apartment") }} #</label
                    >
                    <Field
                      v-model="form.apartment"
                      name="apartment"
                      :label="$t('Apartment')"
                      :placeholder="$t('Apartment')"
                      id="apartment"
                      autocomplete="apartment"
                    />
                    <ErrorMessage name="apartment" />
                  </div>
                </div>
              </div>
              <!-- End: apartment -->

              <!-- Start: note to rider  -->
              <div class="row mb-3">
                <div class="col-12">
                  <label for="note" class="form-label">
                    {{ $t("Note to rider - e.g. Floor/direction/landmark") }}
                  </label>
                  <Field
                    v-model="form.note"
                    name="note"
                    :label="$t('Note to rider - e.g. Floor/direction/landmark')"
                    :placeholder="
                      $t('Note to rider - e.g. Floor/direction/landmark')
                    "
                    id="note"
                    autocomplete="note"
                  />
                  <ErrorMessage name="note" />
                </div>
              </div>

              <!-- <button
                type="button"
                class="btn btn-primary w-100 text-white"
                @click="focusNextSection"
              >
                Next
              </button> -->
            </div>
            <!-- End: address -->

            <!-- Start: payment -->
            <div class="i-checkout-section">
              <div class="i-checkout-header">
                <h2>
                  <span class="i-number">{{
                    cart._is_pickup ? "3" : "4"
                  }}</span>
                  <span>{{ $t("Payment") }}</span>
                </h2>
                <!-- <a href="#" class="i-checkout-action">Edit</a> -->
              </div>
              <div class="i-checkout-content">
                <div class="row w-100 ms-0">
                  <div
                    class="col i-pick-option"
                    :class="{ active: form.payment_method == 'cash' }"
                    @click="form.payment_method = 'cash'"
                    v-if="settings.settings.payments?.cod.active"
                  >
                    <span>{{ $t("Cash") }}</span>
                    <span
                      ><svg width="24px" height="24px" viewBox="0 0 24 24">
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                            d="M2,6 L21,6 C21.5522847,6 22,6.44771525 22,7 L22,17 C22,17.5522847 21.5522847,18 21,18 L2,18 C1.44771525,18 1,17.5522847 1,17 L1,7 C1,6.44771525 1.44771525,6 2,6 Z M11.5,16 C13.709139,16 15.5,14.209139 15.5,12 C15.5,9.790861 13.709139,8 11.5,8 C9.290861,8 7.5,9.790861 7.5,12 C7.5,14.209139 9.290861,16 11.5,16 Z"
                            fill="currentColor"
                            opacity="0.3"
                            transform="translate(11.500000, 12.000000) rotate(-345.000000) translate(-11.500000, -12.000000) "
                          />
                          <path
                            d="M2,6 L21,6 C21.5522847,6 22,6.44771525 22,7 L22,17 C22,17.5522847 21.5522847,18 21,18 L2,18 C1.44771525,18 1,17.5522847 1,17 L1,7 C1,6.44771525 1.44771525,6 2,6 Z M11.5,16 C13.709139,16 15.5,14.209139 15.5,12 C15.5,9.790861 13.709139,8 11.5,8 C9.290861,8 7.5,9.790861 7.5,12 C7.5,14.209139 9.290861,16 11.5,16 Z M11.5,14 C12.6045695,14 13.5,13.1045695 13.5,12 C13.5,10.8954305 12.6045695,10 11.5,10 C10.3954305,10 9.5,10.8954305 9.5,12 C9.5,13.1045695 10.3954305,14 11.5,14 Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div
                    class="col i-pick-option"
                    :class="{ active: form.payment_method == 'card' }"
                    @click="form.payment_method = 'card'"
                    v-if="
                      settings.settings.payments?.stripe.active && client_secret
                    "
                  >
                    <span>{{ $t("Card") }}</span>
                    <span>
                      <svg width="24px" height="24px" viewBox="0 0 24 24">
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <rect
                            fill="currentColor"
                            opacity="0.3"
                            x="2"
                            y="5"
                            width="20"
                            height="14"
                            rx="2"
                          />
                          <rect
                            fill="currentColor"
                            x="2"
                            y="8"
                            width="20"
                            height="3"
                          />
                          <rect
                            fill="currentColor"
                            opacity="0.3"
                            x="16"
                            y="14"
                            width="4"
                            height="2"
                            rx="1"
                          />
                        </g>
                      </svg>
                    </span>
                  </div>

                  <div
                    class="col i-pick-option"
                    :class="{ active: form.payment_method == 'paypal' }"
                    @click="form.payment_method = 'paypal'"
                    v-if="settings.settings.payments?.paypal.active"
                  >
                    <span>{{ $t("Paypal") }}</span>
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle
                            fill="currentColor"
                            opacity="0.3"
                            cx="20.5"
                            cy="12.5"
                            r="1.5"
                          />
                          <rect
                            fill="currentColor"
                            opacity="0.3"
                            transform="translate(12.000000, 6.500000) rotate(-15.000000) translate(-12.000000, -6.500000) "
                            x="3"
                            y="3"
                            width="18"
                            height="7"
                            rx="1"
                          />
                          <path
                            d="M22,9.33681558 C21.5453723,9.12084552 21.0367986,9 20.5,9 C18.5670034,9 17,10.5670034 17,12.5 C17,14.4329966 18.5670034,16 20.5,16 C21.0367986,16 21.5453723,15.8791545 22,15.6631844 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,9.33681558 Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div
                  class="row w-100 ms-0"
                  v-show="form.payment_method == 'card'"
                  v-if="
                    settings.settings.payments?.stripe.active && client_secret
                  "
                >
                  <div class="col p-0">
                    <PaymentsStripeCard
                      class="input"
                      style="padding: 14.4px; position: relative"
                      @error="cardInvalid($event)"
                      @success="setToken($event)"
                      @change="this.token = null"
                      :client_secret="client_secret"
                    />
                    <span v-if="cardError" role="alert">{{
                      cardError == true
                        ? cardError
                        : $t("Please check your card details")
                    }}</span>
                  </div>
                </div>
                <!-- TODO: Implement card and paypal -->
              </div>
              <!-- <button
                type="button"
                class="btn btn-primary w-100 text-white"
                @click="focusNextSection"
              >
                Next
              </button> -->
            </div>
          </Form>

          <!-- Start: term and condition notice -->

          <p class="text-center">
            {{ $t("By placing your order, you agree to our") }}
            <a href="#">{{ $t("Terms and Conditions") }}</a>
          </p>

          <!-- Start: confirm button -->

          <PaymentsPaypalButton
            v-if="
              form.payment_method == 'paypal' &&
              isFormValid == true &&
              cart.total >= settings.getCartMinimum
            "
            :key="cart.total"
            :amount="cart.total"
            @success="
              setToken($event);
              placeOrder();
            "
          />

          <button
            v-else-if="allowOrder"
            :disabled="cart.subtotal < settings.getCartMinimum || loading"
            type="submit"
            class="btn btn-primary w-100 fw-bold btn-lg mb-5"
            @click="placeOrder()"
          >
            {{ $t("Place Order") }}
          </button>
          <!-- End: confirm button -->
        </div>
        <div class="col-4 m-col">
          <CartPanel class="i-cart-panel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCartStore } from "~~/store/Cart";
import { useSettingStore } from "~~/store/Settings";
import { useAuthStore } from "~~/store/Auth";

export default defineNuxtComponent({
  name: "Menus",
  head() {
    return {
      title: "Checkout - Sushi N Poke",
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
      isFormValid: false,
      token: null,
      cardError: false,
      client_secret: "",
      customer_id: "",
      form: {
        name: "",
        email: "",
        phone: "",
        apartment: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        note: "",
        payment_method: this.settings.settings.payments?.cod.active
          ? "cash"
          : "card",
        transaction_id: "",
        is_pickup: window.localStorage.getItem("_is_pickup") == "true",
        items: [],
        date: {
          date: new Date().toISOString().substr(0, 10),
          time: "",
        },
      },
    };
  },
  mounted() {
    this.cart.updateCart();
    this.getClientSecret();
    // scroll to top
    window.scrollTo(0, 0);

    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("focus", (e) => {
        /* eslint-disable-next-line */
        // @ts-ignore
        e.target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      // if has no text add class to previous label
      input.addEventListener("input", (e) => {
        /* eslint-disable */
        // @ts-ignore
        if (e.target.value) {
          // @ts-ignore
          let label = e.target.previousElementSibling as HTMLElement;
          label.classList.add("active");
        } else {
          // @ts-ignore
          let label = e.target.previousElementSibling;
          label.classList.remove("active");
        }
        /* eslint-enable */
      });
    });

    if (!this.auth.isAuthenticated) {
      this.auth._showLogin = false;
    } else {
      this.form.name =
        this.auth.user.first_name + " " + this.auth.user.last_name;
      this.form.email = this.auth.user.email;
      this.form.phone = this.auth.user.phone;

      if (this.cart.is_pickup) {
        this.form.street = "-";
        this.form.apartment = "-";
        this.isFormValid = true;
      } else {
        this.form.street = this.auth.user?.address?.address || "";
        this.form.apartment;
      }
    }

    this.updateForm();
  },
  computed: {
    schema() {
      return {
        name: "required",
        email: "required|email",
        phone: "required",
        street: this.cart.is_pickup ? "optional" : "optional",
        apartment: this.cart.is_pickup ? "optional" : "optional",
        // make note optional
        note: "optional",
        zip: "optional",
        city: "optional",
        state: "optional",
      };
    },
    location() {
      let loc = this.settings?.settings?.delivery_zones?.find(
        (l) => l.id == this.activeLocation
      );

      this.form.city = loc?.city;
      this.form.state = loc?.state;
      this.form.zip = loc?.zip;

      return loc;
    },
    allLocations() {
      return this.settings.settings.delivery_zones;
    },
    allowOrder() {
      if (this.form.payment_method == "card" && !this.token) {
        return false;
      } else {
        return this.isFormValid;
      }
    },
    deliveryFee() {
      if (this.cart.is_pickup) {
        return 0;
      }
    },
  },
  methods: {
    changedLocation($event) {
      this.settings.settings.delivery_zones.forEach((loc) => {
        if (loc.id == $event.target.value) {
          this.activeLocation = loc.id;
          window.localStorage.setItem("_location", loc.handled_by);
          window.localStorage.setItem("_delivery_zone", loc.id);
        }
      });

      this.cart.updateCart();
    },
    getClientSecret() {
      this.loading = true;
      this.cart.updateCart();
      let user_id =
        JSON.parse(window.localStorage.getItem("__user") || "{}").id || "N/A";

      let data = {
        customer: {
          id: user_id,
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          note: this.form.note,
          location: {
            city: this.location?.city,
            state: this.location?.state,
            zip: this.location?.zip,
            street: this.form.street,
            apartment: this.form.apartment,
          },
        },
        items: { ...this.form.items },
        free_items: { ...this.cart.freeItems },
        payment_method: this.form.payment_method,
        is_pickup: this.cart.is_pickup,
        tax: parseFloat(this.cart.tax.toString()),
        delivery: parseFloat(this.cart.delivery.toString()),
        discount: parseFloat(this.cart.discount.toString()),
        subtotal: parseFloat(this.cart.subtotal.toString()),
        total: parseFloat(this.cart.total.toString()),
        transaction_id: this.token,
        status: "pending",
      };

      const token = this.cart.getClientSecret(data);

      token.then((res) => {
        this.customer_id = res.data.customer;
        this.client_secret = res.data.client_secret;
        this.loading = false;
      });
    },
    placeOrder() {
      if (!this.auth.isAuthenticated) {
        this.$toast.error(this.$t("You must be logged in to place an order"), {
          position: "bottom-right",
          timeout: 5000,
          icon: true,
        });
        return;
      }

      this.$toast.success(this.$t("Placing order..."), {
        position: "bottom-right",
        timeout: 5000,
        icon: true,
      });

      this.loading = true;

      let user_id = JSON.parse(
        window.localStorage.getItem("__user") || "{}"
      ).id;

      this.form.items = this.cart.cart;
      // check if form is valid
      if (this.allowOrder) {
        if (this.token && this.token.setupIntent) {
          this.token.setupIntent.customer = this.customer_id;
        }
        let data = {
          customer: {
            id: user_id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            note: this.form.note,
            location: {
              city: this.location?.city,
              state: this.location?.state,
              zip: this.location?.zip,
              street: this.form.street,
              apartment: this.form.apartment,
            },
          },
          items: { ...this.form.items },
          free_items: { ...this.cart.freeItems },
          payment_method: this.form.payment_method,
          is_pickup: this.cart.is_pickup,
          tax: parseFloat(this.cart.tax.toString()),
          delivery: parseFloat(this.cart.delivery.toString()),
          discount: parseFloat(this.cart.discount.toString()),
          subtotal: parseFloat(this.cart.subtotal.toString()),
          total: parseFloat(this.cart.total.toString()),
          transaction_id: this.token?.setupIntent || "",
          status: "pending",
        };

        this.cart
          .placeOrder(data)
          .then((res) => {
            this.$toast.success(this.$t("Order placed successfully!"), {
              position: "bottom-right",
              timeout: 5000,
              icon: true,
            });
            // reset cart
            this.cart.resetCart();

            window.scrollTo(0, 0);

            this.loading = false;
            this.$router.push("/success");
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      } else {
        this.$toast.error(this.$t("Please fill out the form correctly"), {
          position: "bottom-right",
          timeout: 5000,
          icon: true,
        });
        this.loading = false;
      }
    },
    updateForm() {
      setTimeout(() => {
        this.$refs.form.validate().then((valid) => {
          this.isFormValid = valid.valid;
          console.log({ valid });
        });

        this.cart.updateCart();
        this.getClientSecret();
      }, 100);
    },
    setToken(token) {
      if (this.payment_method == "card" && token.status == "success") {
        this.placeOrder();
      }
      this.token = token;
      this.cardError = false;
    },
    cardInvalid($event) {
      // show toast
      this.$toast.error(this.$t($event), {
        position: "top-right",
        timeout: 5000,
        icon: true,
      });
      this.token = null;
      this.cardError = $event;
    },
  },
  setup() {
    const cart = useCartStore();
    const settings = useSettingStore();
    const auth = useAuthStore();
    cart.fetchOffers();
    const activeLocation = ref(0);

    let old_cart = window.localStorage.getItem("_cart");
    let last_time = new Date(window.localStorage.getItem("_last_time"));
    let now_time = new Date();

    if (old_cart && old_cart.startsWith("[") && old_cart.endsWith("]")) {
      if (last_time.getDate() == now_time.getDate()) {
        cart._cart = JSON.parse(old_cart);
      }
    }

    let loc =
      window.localStorage.getItem("_delivery_zone") ||
      settings?.settings?.delivery_zones[0]?.id;
    if (loc) {
      activeLocation.value = parseInt(loc);
    } else {
      activeLocation.value = 0;
    }

    cart.updateCart();

    return {
      cart,
      auth,
      settings,
      activeLocation,
    };
  },
});
</script>

<style lang="scss" scoped>
.i-checkout {
  background: var(--bs-body-bg);
  label {
    position: absolute;
    margin-top: -15px;
    margin-left: 0;
    border-radius: 5px;
    background: #4b4545;
    color: #fff;
    font-weight: bold;
    padding: 0 5px;
    height: 20px;
    font-size: 0;
    opacity: 0;
    transition: all 0.3s ease;

    &.active {
      opacity: 1;
      font-size: inherit;
    }
  }

  select {
    background: #4b4545;
    border: 1px solid #4b4545;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

  input,
  .input {
    background: #4b4545;
    border: 1px solid #4b4545;
    color: #fff;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    overflow: hidden;
    &::placeholder {
      color: #fff5;
    }

    // color of autocomplete
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: #fff;
      -webkit-box-shadow: 0 0 0px 1000px #4b4545 inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    &:focus {
      border-color: #fff;
    }
  }

  span[role="alert"] {
    color: var(--bs-danger);
    font-size: 14px;
    margin: 0;
    position: relative;
    top: -10px;
  }

  .i-checkout-section {
    margin-bottom: 30px;

    .i-checkout-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        display: flex;
        align-items: center;
      }

      .i-number {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background-color: var(--bs-primary);
        color: var(--bs-body-bg);
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 10px;
      }

      .i-checkout-title {
        font-size: 20px;
        font-weight: 600;
        color: #000;
      }
    }
    .i-checkout-content {
      .i-pick-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        background: #4b4545;
        color: #fff;
        margin-bottom: 10px;

        &.active {
          background: var(--bs-primary);
          color: var(--bs-body-bg);
        }

        &:not(:last-child) {
          margin-right: 10px;
        }

        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .i-checkout {
    .i-checkout-section {
      .i-checkout-header {
        h2 {
          font-size: 1.2rem;
        }
      }
    }
  }

  .m-row {
    display: flex;
    flex-direction: column;
    .m-col {
      width: 100%;
    }
  }
}
</style>
