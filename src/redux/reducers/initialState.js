import messages from 'src/translate/fa'


export default {
  auth: {
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
    }
  },

  users: {
    list: []
    /*
     [userId]: {
       ----------- info -----------
       user: {
         content:{},
         isLoading:false,
         error:null
       },
       profile:{
         content:{},
         isLoading:false,
         error:null
       },
      ------------ common --------------
       badges:{
           content:[1, 2, ...], list of badges id
           isLoading:false,
           error:null
       },
       posts: {
         content:[1, 2, ...], list of posts id
         isLoading:false,
         error: null
       },
       certificates:{
           content:[1, 2, ...], list of certificates id
           isLoading:false,
           error:null
       },
       social: {
         follows: {
           content:[1, 2, ...], list of follows id
           isLoading:false,
           error:null
         },
       },
       memberships: {
          content:[1, 2, ...], list of membership id
          isLoading:false,
          error:null
       }
       ---------------- other ----------
       skills:{
           content:[{},{},...],  list of skill object
           isLoading:false,
           error:null
       },
       workExperiences:{
           content:[{}, {} , ...],  list of workExperience object
           isLoading:false,
           error:null
       },
       exchanges:{
           content:[1, 2, ...], list of exchanges id
           isLoading:false,
           error:null
       }
     }
    */
  },
  skills: {
    list: {}
  },
  organization: {
    isLoading: false,
    error: {message: null},
    content: {},
    exchanges: {
      isLoading: false,
      content: []
    },
    followings: {
      isLoading: false,
      content: []
    },
    followers: {
      isLoading: false,
      content: []
    },
    abilities: {
      isLoading: false,
      content: []
    },
    certificates: {
      isLoading: false,
      content: []
    },
    customers: {
      isLoading: false,
      error: false,
      content: []
    },
    products: {
      isLoading: false,
      content: []
    },
    pictures: {
      isLoading: false,
      content: []
    },
    staff: {
      isLoading: false,
      content: []
    },
    identity: {
      isLoaded: false,
      content: ''
    },
  },

  organs: {
    /*
  [organId]: {
  -------------- info -------------
     organization: {
       content:{},
       isLoading:false,
       error: null
     },
    ---------------- common -----------
     badges:{
       content:[1, 2, ...], list of badges id
       isLoading:false,
       error: null
      },
   }
  */
  },

  exchanges: {
    list: {
      /*
   [exchangeId]:{
     ----------- info -----------------------
     exchange:{
       content: {},
       isLoading: false,
       error: null
     },
     ------------------ common ------------
     posts: {
        content:[1, 2, ...] list of posts have this user
        isLoading:false,
        error: null
     },
   }
   */
    }
  },

  common: {
    agencyRequest: {
      isLoading: false,
      error: null
    },
    product: {
      products: {
        list: {},
        nowCreatedId: null // the id of the product that is created now by the current user.
        // this field sets in createProduct success
        // and sets to null again by in createProduct request (base type).
      },
      productPicture: {
        list: {}
      }
    },
    category: {
      list: {},
    },
    certificate: {
      list: {},
    },
    file: {
      list: {
        // [fileId]: {} // object of file
      }
    },
    badge: {
      list: {
        // [badgeId]: {} // object of badge
      }
    },
    hashTag: {
      mainHashTags: {
        list: {} // list of the all hashTag.
      },
      objHashTags: {
        list: {} // list of the object's hashTags
      }
    },
    location: {
      country: {
        list: {},
      },
      province: {
        list: {},
      },
      city: {
        list: {},
      }
    },
    post: {
      list: {
        // [postId]: {...data, viewerCount:0, isLoading:false, error:errorObject}
      }
    },
    social: {
      follows: {
        list: {
          // [followId]: {...data, isLoading:false, error:errorObject}
        }
      },
    },
    exchangeMembership: {
      list: {
        // [membershipId]: {...data, isLoading:false, error:errorObject}
      }
    }
  },
  intl: {
    locale: 'fa',
    messages: {...messages}
  },
}