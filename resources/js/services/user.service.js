import Axios from "axios";

export const userService = {
    register
};

async function register(fname, lname, email, password) {
    const query = {
        query: `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
        variables: {
            input: {
                firstName: fname,
                lastName: lname,
                email: email,
                password: password
            }
        }
    };

    console.log(process.env.MIX_SHOPIFY_STOREFRONT_URL);

    const config = {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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
