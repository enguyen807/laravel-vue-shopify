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
          mutation {
            customerCreate(input: { firstName:"${fname}", lastName:"${lname}", email: "${email}", password:"${password}"}) {
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
        `
    };

    return formDataQuery;
}

function login({email, password}) {
  const formDataQuery = {
    query: `
      mutation {
        customerAccessTokenCreate(input: { email: "${email}", password: "${password}"}) {
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
    `
  };
  
  return formDataQuery;
}
