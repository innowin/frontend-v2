export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
      "Home page": "صفحه اصلی",
      "Explore": "اکسپلور",
    },
    "Create New Exchange": "ایجاد پنجرۀ جدید",
    "Exchange Name": "نام پنجره",
    "Exchange Description": "درباره پنجره",
    "Upload Picture": "انتخاب تصویر",
    "Product Video": "ویدیو محصول",
    "Product Gallery": "آلبوم تصاویر محصول",
    "Upload Video": "انتخاب ویدیو",
  },
})
