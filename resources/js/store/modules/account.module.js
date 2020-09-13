/**
 * This is the store that will contain all account related vuex operations
 *
 */

import { userService } from "../../services/user.service";

const user = JSON.parse(localStorage.getItem("user"));

const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

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
        state.status = { loggedIn: true };
        state.user = payload.user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    }
};

const actions = {
    async register({ commit }, { fname, lname, email, password }) {
        commit("registerRequest");
        try {
            // Outsource chunk of api call to user service folder
            const res = await userService.register(
                fname,
                lname,
                email,
                password
            );

            // Commit successful registeration to state
            commit(
                "registerSuccess",
                res.data.data.customerCreate.customer.email
            );
        } catch (error) {
            // Commit registeration error to state
            commit("registerFailure", error);
        }
    },
    async login({ commit }, { email, password }) {
        // Registers the user that attempted to login
        commit("loginRequest", { email });
        try {
            const res = await userService.login(email, password);

            const user = {
                token:
                    res.data.data.customerAccessTokenCreate.customerAccessToken
                        .accessToken,
                email: email,
                expiresAt:
                    res.data.data.customerAccessTokenCreate.customerAccessToken
                        .expiresAt
            };

            commit("loginSuccess", { user });

            window.location.href = "/home";
        } catch (error) {
            // Commit registeration error to state
            commit("loginFailure", error);
        }
    }
};

export const account = {
    namespaced: true,
    state,
    mutations,
    actions
};
