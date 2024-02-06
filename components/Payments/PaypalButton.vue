<template>
  <div class="i-paypal-button">
    <div class="loading" ref="loading">
      <span class="spinner"></span>
    </div>
    <div id="paypal-button-container" ref="paypal">
      <!--data-will-be-injected-here-->
    </div>
  </div>
</template>

<script lang="ts">
import { loadScript } from "@paypal/paypal-js";
import { useSettingStore } from "~~/store/Settings";

export default defineComponent({
  name: "PaypalButton",
  props: {
    amount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    renderButton() {
      let paypal = window.paypal.Buttons({
        style: {
          shape: "pill",
          label: "checkout",
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(function (details) {
            this.$emit("success", details);
          });
        },
        onError: (err) => {
          console.log(err);
        },
      });
      paypal.render("#paypal-button-container");
      this.$refs.loading.style.display = "none";
    },
  },
  mounted() {
    if (typeof window.paypal !== "undefined") {
      this.renderButton();
    } else {
      setTimeout(() => {
        this.renderButton();
      }, 3000);
    }
  },
  setup(props) {
    const settings = useSettingStore();

    loadScript({
      "client-id": settings.settings.payments.paypal.public_key,
      currency: "EUR",
      intent: "capture",
      components: "buttons",
      "disable-funding": "credit,card",
    });

    return {
      settings,
    };
  },
});
</script>

<style scoped>
.i-paypal-button {
  position: relative;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

#paypal-button-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bs-body-bg);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #4b4545;
  border-top: 4px solid var(--bs-primary);
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
