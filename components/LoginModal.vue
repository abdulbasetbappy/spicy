<template>
  <Teleport to="#__nuxt > div > div">
    <vue-final-modal
      v-bind="$attrs"
      classes="modal-container"
      content-class="modal-content"
      v-slot="{ params, close }"
      id="main-modal"
      :esc-to-close="false"
      :click-to-close="false"
      :key="page"
    >
      <div class="modal-body">
        <div class="modal-close" @click="close()">
          <span class="line-1"></span>
          <span class="line-2"></span>
        </div>

        <div v-if="page == 'login'">
          <h3 class="">{{ $t("Login") }}</h3>

          <div class="mb-2">
            <p>
              {{ $t("Don't have an account?") }}
              <a href="#" @click="page = 'signup'">{{ $t("Sign up") }}</a>
            </p>
          </div>
          <form v-if="settings.settings.otp_channel == 'sms'">
            <div class="form-group">
              <label for="phone">{{ $t("Phone") }}</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                :placeholder="$t('Enter your phone')"
                v-model="phone"
                required
                pattern="^\+[0-9]{11,}$"
              />

              <small class="form-text text-muted">
                {{
                  $t(
                    "Enter your phone number including country code (e.g. +312345678910)"
                  )
                }}
              </small>
            </div>

            <div class="form-group mt-4">
              <button
                type="submit"
                class="btn btn-primary text-white"
                @click="sendOTP($event)"
                :disabled="loading || !phone"
              >
                {{ $t("Get OTP") }}
              </button>
            </div>
          </form>

          <form v-else>
            <div class="form-group">
              <label for="email2">{{ $t("Email") }}</label>
              <input
                type="email"
                class="form-control"
                id="email2"
                :placeholder="$t('Enter your email')"
                v-model="email"
                required
              />
            </div>

            <!-- password field with eye -->
            <div class="form-group">
              <label for="password">{{ $t("Password") }}</label>
              <div class="d-flex align-items-center">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="password"
                  name="password"
                  :placeholder="$t('Enter your password')"
                  v-model="password"
                  required
                />
                <button
                  type="button"
                  class="btn btn-link text-decoration-none"
                  @click="showPassword = !showPassword"
                >
                  <span class="eye-open" v-if="!showPassword">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>

                  <span class="eye-closed" v-else>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      ></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <a href="#" @click="page = 'forgot'">{{
              $t("Forgot password?")
            }}</a>

            <div class="form-group mt-4">
              <button
                type="submit"
                class="btn btn-primary text-white"
                @click="login($event, close)"
                :disabled="loading"
              >
                {{ $t("Login") }}
              </button>
            </div>
          </form>
        </div>

        <div v-if="page == 'signup'">
          <h3 class="">{{ $t("Sign Up") }}</h3>

          <div class="mb-2">
            <p>
              {{ $t("Already have an account?") }}
              <a href="#" @click="page = 'login'">{{ $t("Login") }}</a>
            </p>
          </div>
          <form>
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
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">{{ $t("Phone") }}</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                name="phone"
                :placeholder="$t('Enter your phone')"
                v-model="phone"
                required
              />
            </div>

            <!-- password field with eye -->
            <div class="form-group">
              <label for="password1">{{ $t("Password") }}</label>
              <div class="d-flex align-items-center">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="password1"
                  name="password"
                  :placeholder="$t('Enter your password')"
                  v-model="password"
                  required
                />
                <button
                  type="button"
                  class="btn btn-link text-decoration-none"
                  @click="showPassword = !showPassword"
                >
                  <span class="eye-open" v-if="!showPassword">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>

                  <span class="eye-closed" v-else>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      ></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div class="form-group mt-4">
              <button
                type="submit"
                class="btn btn-primary text-white"
                @click="signup($event)"
                :disabled="loading"
              >
                {{ $t("Sign Up") }}
              </button>
            </div>
          </form>
        </div>

        <div v-if="page == 'forgot'">
          <h3 class="">{{ $t("Forgot Password") }}</h3>

          <div class="mb-2">
            <p>
              {{ $t("Remembered your password?") }}
              <a href="#" @click="page = 'login'">{{ $t("Login") }}</a>
            </p>
          </div>

          <form>
            <div class="form-group">
              <label for="email1">{{ $t("Email") }}</label>
              <input
                type="email"
                class="form-control"
                id="email1"
                :placeholder="$t('Enter your email')"
                v-model="email"
                required
              />
            </div>

            <div class="form-group mt-4">
              <button
                type="submit"
                class="btn btn-primary text-white"
                @click="sendOTP($event)"
                :disabled="loading"
              >
                {{ $t("Get OTP") }}
              </button>
            </div>
          </form>
        </div>

        <div v-if="page == 'change-password'">
          <h3 class="">{{ $t("Change Password") }}</h3>

          <div class="mb-2">
            <p>
              {{ $t("Remembered your password?") }}
              <a href="#" @click="page = 'login'">{{ $t("Login") }}</a>
            </p>
          </div>

          <div class="form-group">
            <label for="password3">{{ $t("Password") }}</label>
            <div class="d-flex align-items-center">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password3"
                name="password"
                :placeholder="$t('Enter your password')"
                v-model="password"
                required
              />
              <button
                type="button"
                class="btn btn-link text-decoration-none"
                @click="showPassword = !showPassword"
              >
                <span class="eye-open" v-if="!showPassword">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </span>

                <span class="eye-closed" v-else>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    ></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="password2">{{ $t("Retype Password") }}</label>
            <div class="d-flex align-items-center">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password2"
                name="password"
                :placeholder="$t('Enter your password again')"
                v-model="retype_password"
                required
              />
              <button
                type="button"
                class="btn btn-link text-decoration-none"
                @click="showPassword = !showPassword"
              >
                <span class="eye-open" v-if="!showPassword">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </span>

                <span class="eye-closed" v-else>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    ></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div class="form-group mt-4">
            <button
              type="submit"
              class="btn btn-primary text-white"
              @click="changePassword($event)"
              :disabled="loading"
            >
              {{ $t("Change Password") }}
            </button>
          </div>
        </div>

        <div v-if="page == 'otp'">
          <h3 class="">{{ $t("Verify OTP") }}</h3>

          <div class="mb-2">
            <p>
              {{ $t("Don't have an account?") }}
              <a href="#" @click="page = 'signup'">{{ $t("Sign up") }}</a>
            </p>
          </div>

          <form>
            <div class="form-group mb-2">
              <label for="otp">{{ $t("OTP") }}</label>
              <input
                type="text"
                class="form-control"
                id="otp"
                name="otp"
                :placeholder="$t('Enter OTP')"
                v-model="otp"
                required
              />
            </div>

            <div class="form-group mt-4">
              <button
                type="submit"
                class="btn btn-primary text-white"
                @click="verifyOTP($event, close)"
                :disabled="loading"
                v-if="settings.settings.otp_channel == 'sms' || is_signup"
              >
                {{ $t("Verify OTP") }}
              </button>

              <button
                type="submit"
                class="btn btn-primary text-white"
                @click="page = 'change-password'"
                :disabled="loading"
                v-else
              >
                {{ $t("Change Password") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </vue-final-modal>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "~~/store/Auth";
import { useSettingStore } from "~~/store/Settings";

export default defineComponent({
  name: "LoginModal",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "+33",
      password: "",
      retype_password: "",
      otp: "",
      loading: false,
      showPassword: false,
      page: "login",
      is_signup: false,
    };
  },
  methods: {
    async sendOTP(e) {
      e.preventDefault();

      if (this.settings.settings.otp_channel == "sms") {
        if (!this.phone) {
          this.$toast.error(this.$t("Please fill all the fields!"));
          return;
        }

        this.loading = true;
        window.localStorage.setItem("__phone", this.phone);
        const { data, pending, error, refresh } = await useFetch(
          `${useAppConfig().apiRoot}/v1/public/auth/send-otp?phone=${
            this.phone
          }`
        );

        if (data && data?.value?.status === "success") {
          this.loading = false;
          this.$toast.success("OTP sent successfully!");
          this.page = "otp";
        } else if (error) {
          this.loading = false;
          this.$toast.error(error?.value?.message);
        }
      } else {
        if (!this.email) {
          this.$toast.error(this.$t("Please fill all the fields!"));
          return;
        }

        this.loading = true;
        window.localStorage.setItem("__email", this.email);
        const { data, pending, error, refresh } = await useFetch(
          `${useAppConfig().apiRoot}/v1/public/auth/send-otp?email=${
            this.email
          }`
        );

        if (data && data?.value?.status === "success") {
          this.loading = false;
          this.$toast.success("OTP sent successfully!");
          this.page = "otp";
        } else if (error) {
          this.loading = false;
          console.log(error);
          this.$toast.error(error?.value?.message);
        }
      }
    },
    async verifyOTP(e, close) {
      e.preventDefault();
      if (this.settings.settings.otp_channel == "sms") {
        if (!this.phone || !this.otp) {
          this.$toast.error(this.$t("Please fill all the fields!"));
          return;
        }

        this.loading = true;
        const { data, pending, error, refresh } = await useFetch(
          `${useAppConfig().apiRoot}/v1/public/auth/verify-otp?phone=${
            this.phone
          }&otp=${this.otp}`
        );

        if (data && data?.value?.status === "success") {
          this.loading = false;
          this.$toast.success(this.$t("OTP verified successfully!"));
          window.localStorage.setItem("__token", data?.value?.token);
          window.localStorage.setItem(
            "__user",
            JSON.stringify(data?.value?.user)
          );
          this.store.login(data?.value?.user, data?.value?.token);
          close();
          this.otp = "";
        } else if (error) {
          this.loading = false;
          this.otp = "";
          this.$toast.error(this.$t("Something is not right!"));
        }
      } else {
        if (!this.email || !this.otp) {
          this.$toast.error(this.$t("Please fill all the fields!"));
          return;
        }

        this.loading = true;
        const { data, pending, error, refresh } = await useFetch(
          `${useAppConfig().apiRoot}/v1/public/auth/verify-otp?email=${
            this.email
          }&otp=${this.otp}`
        );

        if (data && data?.value?.status === "success") {
          this.loading = false;
          this.$toast.success(this.$t("OTP verified successfully!"));
          window.localStorage.setItem("__token", data?.value?.token);
          window.localStorage.setItem(
            "__user",
            JSON.stringify(data?.value?.user)
          );
          this.store.login(data?.value?.user, data?.value?.token);
          close();
          this.otp = "";
        } else if (error) {
          this.loading = false;
          this.otp = "";
          this.$toast.error(this.$t("Something is not right!"));
        }
      }
    },
    async signup(e) {
      e.preventDefault();
      if (
        !this.first_name ||
        !this.last_name ||
        !this.email ||
        !this.phone ||
        !this.password
      ) {
        this.$toast.error(this.$t("Please fill all the fields!"));
        return;
      }

      this.loading = true;
      this.is_signup = true;
      window.localStorage.setItem("__phone", this.phone);

      const { data, pending, error, refresh } = await useFetch(
        `${useAppConfig().apiRoot}/v1/public/auth/signup/`,
        {
          body: JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone: this.phone,
            password: this.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      this.loading = false;
      if (data?.value?.status == "success") {
        this.$toast.success(this.$t("OTP sent successfully!"));
        this.page = "otp";
      } else if (error) {
        this.loading = false;
        this.$toast.error(error.value.data.message);
      }
    },
    async login(e, close) {
      e.preventDefault();
      if (!this.email || !this.password) {
        this.$toast.error(this.$t("Please fill all the fields!"));
        return;
      }

      this.loading = true;
      const { data, pending, error, refresh } = await useFetch(
        `${useAppConfig().apiRoot}/v1/public/auth/login/`,
        {
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      this.loading = false;
      if (data?.value?.status == "success") {
        this.$toast.success(this.$t("Logged in successfully!"));
        window.localStorage.setItem("__token", data?.value?.token);
        window.localStorage.setItem(
          "__user",
          JSON.stringify(data?.value?.user)
        );
        this.store.login(data?.value?.user, data?.value?.token);
        this.email = "";
        this.password = "";
        close();
      } else if (error) {
        this.loading = false;
        this.$toast.error(error.value.data.message);
      }
    },
    async changePassword(e) {
      e.preventDefault();
      if (!this.password || !this.retype_password) {
        this.$toast.error(this.$t("Please fill all the fields!"));
        return;
      }

      if (this.password !== this.retype_password) {
        this.$toast.error(this.$t("Passwords do not match!"));
        return;
      }

      this.loading = true;
      const { data, pending, error, refresh } = await useFetch(
        `${useAppConfig().apiRoot}/v1/public/auth/change-password/`,
        {
          body: JSON.stringify({
            email: this.email || window.localStorage.getItem("__email"),
            password: this.password,
            otp: this.otp,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      this.loading = false;
      if (data?.value?.status == "success") {
        // go to login page
        this.$toast.success(this.$t("Password changed successfully!"));
        this.page = "login";
        this.password = "";
        this.retype_password = "";
        this.otp = "";
      } else if (error) {
        this.loading = false;
        this.$toast.error(error.value.data.message);
      }
    },
  },
  setup() {
    const store = useAuthStore();
    const settings = useSettingStore();

    return {
      store,
      settings,
    };
  },
});
</script>

<style scoped lang="scss">
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
  background: var(--p-background-color);
  overflow: hidden;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
  background: var(--p-background-color);

  input {
    color: var(--p-light-white);
  }

  a {
    @media (max-width: 768px) {
      padding: 0.3rem 0.2rem;
    }
  }
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

.vfm--overlay[data-v-2836fdb5] {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  z-index: 1000;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    display: block;
    width: 1rem;
    height: 0.25rem;
    background: var(--p-light-white);
    border-radius: 0.25rem;
    position: relative;
    transform-origin: 5px;
    transition: all 0.3s ease;

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
  }
}
</style>
