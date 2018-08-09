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
      error: {
        isError: false,
        message: null
      },
      exchange_identities: {
        isLoading: false,
        isLoaded: false,
        error: {
          isError: false,
          messages: null
        },
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
  usersInfo: {
    // initial structure build in first request for getUser is called:
    // [userId]: {
    //   user: {
    //     content:{},
    //     isLoading:false,
    //     error:{
    //       message:null
    //     }
    //   },
    //   profile:{
    //     content:{},
    //     isLoading:false,
    //     error:{
    //       message: null
    //     }
    //   }
    // }
  },
  users: {
    // initial structure build in first request for getUser is called:
    // [userId]: {
    // exchanges:[],
    // skills:[],
    // workExperience:[],
    // certificates:[]
    // }
  },
  organsInfo:{
    // initial structure build in first request for getOrgan is called:
    // [organizationId]: {
    //   organization: {
    //     content:{},
    //     isLoading:false,
    //     error:{
    //       message:null
    //     }
    //   },
  },
  organization: {
    isLoading: false,
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
    members: {
      isLoading: false,
      content: []
    },
    name: '',
    id: '',
    official_name: '',
    identity: {
      isLoaded: false,
      content: ''
    },
  },
  exchanges: {
    // full with this objects: 97 : {id:97, ...}, 102:{id:102, ...}
  },

  common: {
    product: {
      viewingProduct: {
        content: {},
        isLoading: false,
        isLoaded: false,
      }, // the product that is viewing now.
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
      middlewareFileData: { // the file that is new creating or is updating in the moment.
        content: {},
        isCreating: false,
        isCreated: false
      }
    }
  },
  intl: {
    locale: 'fa',
    messages: {...messages}
  }
}