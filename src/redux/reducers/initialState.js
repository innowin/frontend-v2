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
       },
       posts: {
         content:{} posts property beside error,
         isLoading:false,
         error: null
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
      viewingProduct: {
        content: {},
        isLoading: false,
        isLoaded: false,
      }, // the product that is viewing now.
      list: {},
      isLoaded: false,
      isLoading: false,
      error: null,
      viewingId: 0
    },
    category: {
      categories: {
        content: {},
        isLoading: false,
        isLoaded: false
      },
    },
    certificate: {
      objectCertificates: { // the 'object' in objectCertificates can be organization or user or product.
        content: {},
        isLoaded: false,
        isLoading: false,
      },
      creatingObjCertStatus: status.NEUTRAL
    },
    file: {
      files: {
        middlewareFileData: { // the file that is new creating or is updating in the moment.
          content: {},
          isCreating: false,
          isCreated: false
        }
        /*
        [fileId]: {
             content:{},
             isLoading:false,
             error:null
        */
      },
      middlewareFileData: { // the file that is new creating or is updating in the moment.
        content: {},
        isCreating: false,
        isCreated: false
      }
    },
    badges: {
      // [badgeId]: {} // object of badge
    },
    hashTag: {
      list: { // list of the all hashTag.
        content: {},
        isLoaded: false,
        isLoading: false
      }
    },
    location: {
      country: {
        content: {},
        isLoading: false,
        isLoaded: false
      },
      province: {
        content: {},
        isLoading: false,
        isLoaded: false
      },
      city: {
        content: {},
        isLoaded: false,
        isLoading: false
      }
    },
    posts: {
      // each item has post detail
      /* content: {
          [postId]: {},
          isLoading: boolean,
          error: null | {message}
      }*/
    }
  },

  intl: {
    locale: 'fa',
    messages: {...messages}
  }
}