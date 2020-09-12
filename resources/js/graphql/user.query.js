/**
 * This file is primarily for user related queries e.g login, register, update 
 * 
 * 
 */

export const userQuery = {
    register,
    login
};

function register({ fname, lname, email, password }) {
    const formDataQuery = {
        query: `
          mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                id,
                email
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

    return formDataQuery;
}

function login({email, password}) {
  const formDataQuery = {
    query: `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }    
    `,
    variables: {
      input: {
        email: email,
        password: password
      }
    }
  };
  
  return formDataQuery;
}
