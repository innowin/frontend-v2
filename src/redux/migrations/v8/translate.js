export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
      'Persons': 'افراد و شرکت ها',
      'New Window': 'پنجره جدید',
      'Update exchange': 'درخواست ارتقاء به کارگزار',
      'Add product':'افزودن محصول',
    },
  }
})
