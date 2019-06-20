export default function isExchangeMember({exchangeId, identityMemberships, exchangeMemberships}) {
  const haveMemberships = identityMemberships.reduce((sum, id) => {
    return [...sum, exchangeMemberships[id].exchange_identity_related_exchange.id === exchangeId]
  }, [])
  return haveMemberships.indexOf(true) >= 0
}
