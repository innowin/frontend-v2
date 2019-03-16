export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar
    },
    "Get file": "دریافت فایل",
    "Product Catalog": "کاتالوگ محصول"
  }
})
