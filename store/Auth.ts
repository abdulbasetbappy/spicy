export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    _user: null,
    _token: null,
    _phone: null,
    _location: 0,
    _isAuthenticated: false,
    _showLogin: false,
  }),
  getters: {
    user: (state) => state._user,
    token: (state) => state._token,
    phone: (state) => state._phone,
    location: (state) => state._location,
    isAuthenticated: (state) => state._isAuthenticated,
  },
  actions: {
    async login(user, token) {
      this._user = user;
      this._token = token;
      this._isAuthenticated = true;
    },
  },
});
