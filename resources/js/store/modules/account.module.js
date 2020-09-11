import { userService } from "../../services/user.service"

const user = JSON.parse(localStorage.getItem("user"))

const state = user 
  ? { status: { loggedIn: true }, user } 
  : { status: {}, user: null }

const mutations = {
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = { registerSuccess: true };
  },
  registerFailure(state) {
    state.status = { registerFailure: true };
  },
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, payload) {
    state.status = { loggedIn: true, autoLogoutIn: payload.expiresIn };
    state.user = payload.user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
}

const actions = {
  async register({ commit }, { fname, lname, email, password }) {
    try {
      const res = await userService.register(
        fname,
        lname,
        email,
        password
      )

      console.log(res)
    } catch (error) {
      const errorMsg = error.response.data.errors[0].message;
      commit("registerFailure", errorMsg);
    }
  }
}


export const account = {
  namespaced: true,
  state,
  mutations,
  actions,
};