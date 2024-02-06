export const useSettingStore = defineStore({
  id: "settings",
  state: () => ({
    _settings: {},
  }),
  getters: {
    settings: (state) =>
      state._settings || {
        locations: [],
        delivery_zones: [],
      },
    getCartMinimum: (state) => {
      const delivery_zone = parseInt(
        window.localStorage.getItem("_delivery_zone") || "0"
      );

      return parseFloat(
        state._settings?.delivery_zones?.find(
          (zone) => zone.id == delivery_zone
        )?.minimum_cart_amount || "0"
      );
    },
  },
  actions: {
    async fetchSettings() {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/settings/"
      );
      let payload = data.value.payload || [];

      payload.forEach((element) => {
        // if json string, parse it
        if (element.value[0] === "{" || element.value[0] === "[") {
          element.value = JSON.parse(element.value);
        }

        this._settings[element.name] = element.value;
      });
    },
  },
});
