import messages from 'src/translate/fa'
import status from './statusChoices'


export default {
  auth: {
    client: {
      identity: {},
      profile: {},
      user: {},
      organization: null,
      rememberMe: null,
      user_type: null,
      isLoggedIn: false,
      error: null,
      exchange_identities: {
        isLoading: false,
        isLoaded: false,
        error: null,
        content: []
      }
    },
    clients: {
      users: [],
      active_user: {},
      visited_pages: {},
      logged_in_time: {}
    }
  },

  users: {
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
       }
        ------------ common --------------
         badges:{
             content:[1, 2, ...], list of badges id
             isLoading:false,
             error:null
         },
         exchanges:{
             content:[1, 2, ...], list of exchanges id
             isLoading:false,
             error:null
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
         }
     }
    */
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

  exchanges: {
    // full with this objects: 97 : {id:97, ...}, 102:{id:102, ...}
  },

  common: {
    agencyRequest: {
      isLoading: false,
      error: {message: null}
    },
    product: {
      // TODO: the 'viewingProduct' object should remove.
      list: {},
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
        // TODO: remove the below codes of 'certificate' object.
      objectCertificates: { // the 'object' in objectCertificates can be organization or user or product.
        content: {},
        isLoaded: false,
        isLoading: false,
      },
      creatingObjCertStatus: status.NEUTRAL
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
  },

  intl: {
    locale: 'fa',
    messages: {...messages}
  }
}