export default {
  client: {
    token: null,
    // if user_type is person identity is identity of user but if user_type is organ identity is identity of organ
    identity: {},
    profile: {},
    user: {},
    organization: null,
    posts: [], /* ids of posts that postIdentity of them is identity of this client*/
    exchanges: [], /* ids of exchanges that this client is member of them*/
    social: {
      follows: [], /* ids of follows that this client is participates at them*/
    },
    rememberMe: null,
    user_type: null,
    isLoggedIn: false,
    error: null,
    exchangeMemberships: [], /* ids of exchanges that user is member of that*/
    workExperiences: [], /* ids of workExperiences that this client is member of them*/
  }
}