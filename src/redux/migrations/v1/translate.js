export default state => ({
  ...state,
  messages: {
    ...state.messages,
    'Complete the validation code': 'کد را کامل وارد کنید!',
    'Incorrect validation code': 'کد وارد شده صحیح نمی باشد!',
  },
})
