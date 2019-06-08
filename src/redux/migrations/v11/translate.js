export default state => ({
  ...state,
  messages: {
    ...state.messages,
    'Report': 'گزارش تخلف',
    'Delete Comment': 'حذف کامنت',
  },
})
