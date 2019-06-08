export default state => ({
  ...state,
  searchedOrganizations: {
    isLoading: false,
    error: false,
    content: {},
  },
})