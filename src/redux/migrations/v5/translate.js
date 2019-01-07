export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
    },
    'Create exchange done': 'پنجره شما با موفقت ساخته شد',
    'Create exchange membership done': 'عضویت شما با موفقیت ثبت شد',
    'Exchange removed': 'پنجره شما پاک شد',
    'Exchange membership removed': 'لغو عضویت شما انجام شد',
  }
})
