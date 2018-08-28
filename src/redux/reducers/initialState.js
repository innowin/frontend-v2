import messages from 'src/translate/fa'
import status from './statusChoices'


export default {
  auth: {
    client: {
      identity: {},
      profile: {},
      user: {},
      posts: [] /* id of user posts*/,
      organization: null,
      rememberMe: null,
      user_type: null,
      isLoggedIn: false,
      error: null,
      exchanges: []
    },
    clients: {
      users: [],
      active_user: {},
      visited_pages: {},
      logged_in_time: {}
    }
  },

  users: {
    list:[]
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
      categories: {
        content: {},
        isLoading: false,
        isLoaded: false
      },
    },
    certificate: {
      list: {},
    },
    file: {
      list: {}
    },
    badges: {
      // [badgeId]: {} // object of badge
    },
    hashTag: {
      list: {} // list of the all hashTag.
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
    posts: {
      // [postId]: {...data, isLoading:false, error:errorObject} isLoading and error are for update handling
    },
    social: {
      followees: {
        isLoading: false,
        content: [],
      },
      followers: {
        isLoading: false,
        content: [],
      },
    }
  },

  intl: {
    locale: 'fa',
    messages: {...messages}
  }
}