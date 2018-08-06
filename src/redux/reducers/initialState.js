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
                isLoading: false
            }
        },
        file: {
            middlewareFileData: { // the file that is new creating or is updating in the moment.
                content: {},
                isCreating: false,
                isCreated: false
            }
        }
    },
    test: {
        result: 1,
        content: []
    },
    intl: {
        locale: 'fa',
        messages: {...messages}
    },
    error: {
        message: ''
    },
};