export default {
  client: {
    token: null,
    // if user_type is person identity is identity of user but if user_type is organ identity is identity of organ
    identity: {
      content: null, // content is id of identity
      isLoading: false,
      error: null,
    },
    profile: {},
    user: {},
    organization: null,
    posts: {}, /* ids of posts that postIdentity of them is identity of this client*/
    educations: [], /* ids of educations that client has them*/
    researches: [], /* ids of researches that client has them*/
    skills: [], /* ids of skills that client has them*/
    products: [], /* ids of products that client has them*/
    certificates: [], /* ids of certificates that client has them*/
    social: {
      follows: [], /* ids of follows that this client participates at them*/
    },
    abilities: [],  /* ids of abilities that this organization client has at them*/
    rememberMe: null,
    user_type: null,
    isLoggedIn: false,
    error: null,
    workExperiences: [], /* ids of workExperiences that this client is member of them*/
    customers: [], /* ids of customers that this org client has them*/
    selectedExchange: null,
    isBeeDone: false,
  },
}