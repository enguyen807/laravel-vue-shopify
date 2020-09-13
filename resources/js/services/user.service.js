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
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        data:  query,
        url: "/api/create-customer"
    };

    const res = await Axios(config);
    console.log(res)
    if (res.data.data.customerCreate.userErrors > 0) {
        throw new Error(res.data.data.customerCreate.userErrors[0].message);
    }
    return res;
}

async function login(email, password, rememberMe) {
    const query = userQuery.login({ email, password, rememberMe });

    const config = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        data: query,
        url: "/api/create-token"
    };

    const res = await Axios(config);
    console.log(res)
    if (res.data.data.customerAccessTokenCreate.customerUserErrors.length) {
        throw new Error(res.data.data.customerAccessTokenCreate.customerUserErrors[0].message);
    }

    if (
        res.data.data.customerAccessTokenCreate.customerAccessToken.accessToken
    ) {
        const data = {
            token:
                res.data.data.customerAccessTokenCreate.customerAccessToken
                    .accessToken,
            email: email
        };

        localStorage.setItem("user", JSON.stringify(data))
        localStorage.removeItem("tempUser");
    }

    return res;
}
