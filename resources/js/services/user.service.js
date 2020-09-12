/**
 * This file will primarily be making the api calls
 *
 */
import Axios from "axios";
import { userQuery } from "../graphql/user.query.js";

export const userService = {
    register,
    login
};

async function register(fname, lname, email, password) {
    // Outsourced graphql query to graphql folder
    const query = userQuery.register({ fname, lname, email, password });

    // Setup axios config
    const config = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
                process.env.MIX_SHOPIFY_STOREFRONT_TOKEN
        },
        data: query,
        url: process.env.MIX_SHOPIFY_STOREFRONT_URL
    };

    const res = await Axios(config);
    if (res.errors) {
        throw new Error("User creation failed");
    }
    return res;
}

async function login(email, password, rememberMe) {
    const query = userQuery.login({ email, password, rememberMe });

    const config = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
                process.env.MIX_SHOPIFY_STOREFRONT_TOKEN
        },
        data: query,
        url: process.env.MIX_SHOPIFY_STOREFRONT_URL
    };

    const res = await Axios(config);
    if (res.errors) {
        throw new Error("User login failed");
    }

    if (res.data.data.customerAccessTokenCreate.customerAccessToken.accessToken) {
      const data = {
        token: res.data.data.customerAccessTokenCreate.customerAccessToken.accessToken,
        email: email
      }

    }

    return res;
}
