export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
    },
    'Work Social Media': 'شبکه اجتماعی کسب‌و‌کار',
    'Forgot Password': 'رمز عبور خود را فراموش کرده اید؟',
    "Write your post": 'مسئله خود را بنویسید..',
    'Send': 'ارسال',
  }
})
