export const useMenuStore = defineStore({
  id: "menus",
  state: () => ({
    _menus: [],
    _categories: [],
    _products: [],
    _options: [],
  }),
  getters: {
    menus: (state) => state._menus,
    categories: (state) => state._categories,
    products: (state) => state._products,
    options: (state) => state._options,
    mappedCategories: (state) => {
      // all menu ids
      const menuIds = state._menus?.map((menu) => menu.id);

      // all categories that belong to a menu
      const categories = state._categories?.filter((category) =>
        menuIds.includes(category.menu_id)
      );

      // map products to categories
      const mappedCategories = categories?.map((category) => {
        const menu = state._menus?.find((menu) => menu.id == category.menu_id);

        const products = state._products?.filter(
          (product) => product.category_id == category.id
        );

        return {
          ...category,
          locations: menu.locations,
          products,
        };
      });

      return mappedCategories;
    },
  },
  actions: {
    async fetchMenus() {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/menus"
      );
      this._menus = data.value.payload || [];
    },
    async fetchCategories() {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/categories"
      );
      this._categories = data.value.payload || [];
      return this._categories.sort((a, b) => {
        return a.order - b.order;
      });
    },
    async fetchProducts() {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/products"
      );
      this._products = data.value.payload || [];
      this._products.forEach((element) => {
        element.price = JSON.parse(element.price);
        element.quantity = 1;
        // get menu id and add it to the product
        const category = this._categories?.find(
          (category) => category.id == element.category_id
        );
        element.menu_id = category?.menu_id;
      });

      return this._products.sort((a, b) => {
        return a.order - b.order;
      });
    },
    async fetchOptions() {
      const { data, refresh } = await useFetch(
        useAppConfig().apiRoot + "/v1/public/options"
      );
      this._options = data.value.payload || [];
      this._options.forEach((element) => {
        element.options = JSON.parse(element.options || "[]");
        element.options.forEach((option) => {
          option.quantity = 0;
        });
        element.selected = 0;
        element.items = JSON.parse(element.items);
      });
    },
  },
});
