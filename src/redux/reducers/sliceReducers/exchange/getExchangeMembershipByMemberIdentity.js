const success = (state, action) => {
  const {exchangeData} = action.payload
  const nextExchange = {}
  const allExchanges = {...state.list}

  // for (let id in allExchanges) {
  //   delete allExchanges[id]
  // delete allExchanges[id].exchange.content.exchange
  // }

  for (let id in exchangeData) {
    state.list[id] ?
        nextExchange[id] = {
          ...state.list[id],
          ...exchangeData[id].exchange.content
        }
        :
        nextExchange[id] = {
          ...exchangeData[id].exchange.content
        }
    // state.list[id] && state.list[id].exchange
    //     ? nextExchange[id] = {
    //       ...state.list[id],
    //       exchange: {
    //         ...state.list[id].exchange,extendedView
    //         content: {
    //           ...state.list[id].exchange.content,
    //           ...exchangeData[id].exchange.content,
    //         }
    //       }
    //     }
    //     : nextExchange[id] = {
    //       ...state.list[id],
    //       exchange: {
    //         content: {
    //           ...exchangeData[id].exchange.content
    //         }
    //       }
    //     }
  }


  return {
    ...state,
    list: {
      ...allExchanges,
      ...nextExchange
    }
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success
}