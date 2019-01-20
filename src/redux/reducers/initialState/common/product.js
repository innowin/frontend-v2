export default {
  products: {
    list: {},
    isLoading: false,
    search: null,
    nowCreatedId: null // the id of the product that is created now by the current user.
    // this field sets in createProduct success
    // and sets to null again by in createProduct request (base type).
  },
  productPicture: {
    list: {}
  },
  price: {
    list: {}
  }
}