export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar
    },
    "Get file": "دریافت فایل",
    "Product Catalog": "کاتالوگ محصول",
    "Stream": "پست‌ها",
    "Info": "دربارۀ پنجره",

    'Report': 'گزارش تخلف',
    'Delete Comment': 'حذف کامنت',
  }
})
