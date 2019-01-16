export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
    },
    "Twitter": "توییتر",
    "Create Ability Done": "مهارت شما با موفقیت اضافه شد",
  }
})
