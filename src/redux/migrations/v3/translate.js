export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
      'Home page': 'صفحه اصلی',
      'Explore': 'اکسپلور',
    },
  },
})
