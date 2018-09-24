export default {
  client: {
    token: null,
    // if user_type is person identity is identity of user but if user_type is organ identity is identity of organ
    identity: {},
    profile: {},
    user: {},
    organization: null,
    posts: [], /* ids of posts that postIdentity of them is identity of this client*/
    educations: [], /* ids of educations that client has them*/
    researches: [], /* ids of researches that client has them*/
    skills: [], /* ids of skills that client has them*/
    social: {
      follows: [], /* ids of follows that this client participates at them*/
    },
    rememberMe: null,
    user_type: null,
    isLoggedIn: false,
    error: null,
    exchangeMemberships: [], /* ids of exchanges that user is member of that*/
    workExperiences: [], /* ids of workExperiences that this client is member of them*/
  }
}