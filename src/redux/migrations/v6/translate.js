export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
    },
    "Twitter": "توییتر",
    "Create Ability Done": "مهارت شما با موفقیت اضافه شد",
    "Biography Length is Illegal": "طول معرفی‌نامه بیش از حد مجاز است",
    "Nike name is wrong": "نام مستعار شرکت اشتباه است",
    "Unfollow": "قطع ارتباط",
    'Create post header placeholder':  'مثال: برگزاری کارگاه آموزشی، معرفی رزومه، خدمات منتورینگ',
  }
})
