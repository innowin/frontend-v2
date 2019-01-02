export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
      "Explore": "بگرد"
    },
  },
})
