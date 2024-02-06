import { useMenuStore } from "./Menu";
import { useSettingStore } from "./Settings";
import { useToast } from "vue-toastification";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    _cart: [],
    _freeItems: [],
    _offers: [],
    _total: 0,
    _tax: 0,
    _is_pickup: window.localStorage.getItem("__is_pickup") === "1",
    _delivery: 0,
    _discount: 0,
    _subtotal: 0,
  }),
  getters: {
    cart: (state) => state._cart,
    freeItems: (state) => state._freeItems,
    is_pickup: (state) => {
      window.localStorage.setItem("__is_pickup", state._is_pickup ? "1" : "0");
      return state._is_pickup;
    },
    offers: (state) => state._offers,
    total: (state) => state._total,
    tax: (state) => state._tax,
    delivery: (state) => state._delivery,
    discount: (state) => state._discount,
    subtotal: (state) => state._subtotal,
  },
  actions: {
    async addToCart(product) {
      const toast = useToast();
      // if required options are not selected
      let hasError = false;
      product.options.forEach((option: any) => {
        if (option.min > 0 && option.options.length < option.min) {
          // show notification
          toast.error(`Choose ${option.name}`, {
            timeout: 5000,
            icon: true,
          });

          hasError = true;
        }
      });

      if (hasError == false) {
        this._cart.push(product);
        // fetch to increment score
        await useFetch(
          useAppConfig().apiRoot + "/v1/public/products/" + product.id
        );

        return true;
      } else {
        return false;
      }
    },
    async removeCartItem(index) {
      this._cart.splice(index, 1);
      this._freeItems = [];
      this.updateCart();
    },
    async removeFromCart(product) {
      this._cart = this._cart.filter((item) => item.id !== product.id);
      this._freeItems = [];
      this.updateCart();
    },
    async setCart(cart) {
      this._cart = cart;
    },
    async updateCart() {
      const menu = useMenuStore();
      const settings = useSettingStore();
      let product_total = 0;
      let product_tax = 0;

      let options_total = 0;
      let options_tax = 0;

      let has_free_delivery = false;
      let free_items = [];

      // NEW CODE STARTS HERE
      for (let item of this._cart) {
        let main_product = menu.products?.find(
          (product) => product.id === item.id
        );

        item.name = main_product?.name;
        item.price = main_product?.price;
        item.image = main_product?.image;

        if (this._is_pickup) {
          let total =
            parseFloat(main_product?.price?.price_pickup) * item.quantity;
          let tax = total * (parseFloat(main_product?.price?.tax_rate) / 100);

          product_total += total;
          product_tax += tax;
        } else {
          let total =
            parseFloat(main_product?.price?.price_delivery) * item.quantity;
          let tax = total * (parseFloat(main_product?.price?.tax_rate) / 100);

          product_total += total;
          product_tax += tax;
        }

        if (item.options && item.options.length > 0) {
          item.options.forEach((option) => {
            option.options.forEach((option_item) => {
              let total =
                parseFloat(option_item.price) *
                option_item.quantity *
                item.quantity;
              let tax = total * (parseFloat(option_item.tax_rate) / 100);

              options_total += total;
              options_tax += tax;
            });
          });
        }

        if (this._offers && this._offers.length > 0) {
          for (let offer of this._offers) {
            if (
              (offer.menus.length === 0 &&
                offer.categories.length === 0 &&
                offer.items.length === 0) ||
              offer.menus.includes(main_product.menu_id) ||
              offer.categories.includes(main_product.category_id) ||
              offer.items.includes(item.id)
            ) {
              if (item.offers === undefined) {
                item.offers = [];
              }
              if (offer.minimum_amount <= product_total) {
                item.offers.push(offer);
              }
            }
          }
        }

        // find the best offer
        let best_discount = 0;
        let best_offer = null;
        if (item.offers && item.offers.length > 0) {
          for (let offer of item.offers) {
            if (offer.type === "percentage") {
              if (offer.minimum_amount <= product_total) {
                let total = 0;

                if (this._is_pickup) {
                  total +=
                    parseFloat(item?.price?.price_pickup) * item.quantity;
                } else {
                  total +=
                    parseFloat(item?.price?.price_delivery) * item.quantity;
                }

                let discount = total * (parseFloat(offer.value) / 100);

                if (discount > best_discount) {
                  best_discount = discount;
                  best_offer = offer;
                }
              }
            }
            if (offer.type === "fixed_amount") {
              if (offer.minimum_amount <= product_total) {
                let discount = parseFloat(offer.value);
                if (discount > best_discount) {
                  best_discount = discount;
                  best_offer = offer;
                }
              }
            }
            if (offer.type === "free_item") {
              if (offer.minimum_amount <= product_total) {
                free_items.push(offer.value);
              }
            }
            if (offer.type === "free_delivery" && !has_free_delivery) {
              has_free_delivery = true;
            }
          }
        }
        if (best_offer !== null) {
          item.offers = [best_offer];
          item.discount = best_discount;
        }

        if (free_items.includes(item.id)) {
          item.quantity += 1;
        }
      }

      let location_id = window.localStorage.getItem("_delivery_zone");

      let location = settings?.settings?.delivery_zones?.find(
        (e) => e.id == location_id
      );

      if (!location) {
        location = 0;
      }

      // UPDATE DELIVERY
      if (!this._is_pickup && !has_free_delivery) {
        location?.charges?.forEach((charge) => {
          // if current total is in between the min and max
          if (
            product_total >= parseFloat(charge.min) &&
            product_total <= parseFloat(charge.max)
          ) {
            this._delivery = parseFloat(charge.charge);
          }
        });
      } else {
        this._delivery = 0;
      }

      // TODO: ADD FREE ITEMS TO CART
      free_items = [...new Set(free_items)];
      if (free_items.length) {
        free_items.forEach((item) => {
          let free_item = menu.products.find((e) => e.id == item);

          // if already in cart decrease one paid and add one free
          // let existing_item = this._cart.find((e) => e.id == item);
          // if (existing_item) {
          //   if (existing_item.quantity > 1) {
          //     existing_item.quantity -= 1;
          //   } else {
          //     this._cart = this._cart.filter((e) => e.id != item);
          //   }
          // }

          // add the item to freeItems if not already there
          let free_item_index = this._freeItems.findIndex(
            (e) => e.id == free_item.id
          );
          if (free_item_index === -1) {
            this._freeItems.push({
              id: free_item.id,
              quantity: 1,
              options: [],
              name: free_item.name,
              price: {
                price_delivery: 0,
                price_pickup: 0,
                tax_rate: 0,
              },
              image: free_item.image,
              offers: [],
              discount: 0,
            });
          }
        });
      }

      // keep only two decimal places (e.g. 1.99)
      this._discount = this._cart.reduce((a, b) => a + (b.discount || 0), 0);
      this._subtotal = product_total + options_total;
      this._tax = product_tax + options_tax;
      this._total =
        this._subtotal + this._tax + this._delivery - this._discount;
      this._subtotal = Math.round(this._subtotal * 100) / 100;
      this._tax = Math.round(this._tax * 100) / 100;
      this._discount = Math.round(this._discount * 100) / 100;
      this._total = Math.round(this._total * 100) / 100;

      window.localStorage.setItem("_cart", JSON.stringify(this._cart));
      window.localStorage.setItem("_last_time", new Date().toString());
    },
    async fetchOffers() {
      this._offers = [];
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/offers"
      );

      this._offers = data?.value?.payload || [];
    },
    async resetCart() {
      this._cart = [];
      this._freeItems = [];
      this._subtotal = 0;
      this._tax = 0;
      this._delivery = 0;
      this._discount = 0;
      this._total = 0;
      this._is_pickup = false;
      this._offers = [];

      window.localStorage.setItem("_cart", JSON.stringify(this._cart));
    },
    async placeOrder(payload) {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/sales",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      return data.value;
    },
    async getClientSecret(payload) {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/sales?verify=1",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      return data.value;
    },
  },
});
