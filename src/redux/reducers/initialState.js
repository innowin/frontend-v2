import messages from 'src/translate/fa'

export default {
  auth: {
    client: {
      isLoggedIn: false,
      identity: {},
      profile: {},
      user: {},
      organization: null,
      rememberMe: null,
      user_type: null,
      exchange_identities: []
    },
    clients: {
      users: [],
      active_user: {},
      visited_pages: {},
      logged_in_time: {}
    }
  },
  user: {
    skills: {
      isLoading: false,
      content: [],
      isLoaded: false
    },
    workExperiences: {
      isLoading: false,
      content: [],
      isLoaded: false,
      error: {
        isError: false,
        message: '',
      }
    }
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
    viewingProduct: {
      content: {},
      isLoading: false,
      isLoaded: false,
    }, // the product that is viewing now.
  },
  intl: {
    locale: 'fa',
    messages: {...messages}
  },
  error: {
    message: ''
  },
};