const base = (state, action) => {
}

const success = (state, action) => {
    const {data, exchangeId} = action.payload
    
    let object = {}
    let members = []
    
    // TODO Hoseyn Check organization mode
    
    data.forEach(p => {
        members.push(p.exchange_identity_related_identity.identity_user.id ? p.exchange_identity_related_identity.identity_user.id : p.exchange_identity_related_identity.identity_organization)
    })
    object[exchangeId] = members
    
    return {
        ...state,
        list: {...state.list, ...object}
    }
}

const error = (state, action) => {
}

export default {
    base,
    success,
    error,
}