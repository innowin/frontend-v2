const success = (state, action) =>
{
    const {data} = action.payload
    let allExchanges = {}
    data.results.forEach(exchange =>
    {
        // commented for unFollow exchange bug ; better to change in future
        // allExchanges[exchange.id] = {...state.list[exchange.id], ...exchange}
        let data = {...exchange.exchange}
        data.joint_follows = exchange.joint_follows
        data.is_joined = exchange.is_joined
        data.supply = exchange.supply
        data.demand = exchange.demand
        allExchanges[exchange.exchange.id] = {...state.list[exchange.exchange.id],...data}
    })

    return {
        ...state,
        list: {
            ...state.list,
            ...allExchanges,
        },
        searchByWord: [],
        searchByHashTag: []
    }
}

const error = (state, action) =>
{

}

const base = (state, action) =>
{

}

export default {
    base,
    error,
    success
}