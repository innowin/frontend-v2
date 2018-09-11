// this is temporary. and this
// is because of the action obj is not unique (some thing bad. and should fix this prob.
export const setDataByAction = action =>
    (action.payload && action.payload.data) || action.data || {}