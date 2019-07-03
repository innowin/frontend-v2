const base = (state, action) => {
  const {formValues} = action.payload
  const {proposal_parent} = formValues
  if (proposal_parent)
    return {
      ...state,
      list: {
        ...state.list,
        [proposal_parent]: {
          ...state.list[proposal_parent],
          proposals: {
            ...state.list[proposal_parent].proposals,
            loading: true,
          },
        },
      },
    }
  else return state
}

export default {
  base,
}