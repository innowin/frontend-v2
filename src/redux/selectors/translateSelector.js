import { createSelector } from 'reselect'

const getAllMessages = (state) => state.intl.messages

export const getMessages = createSelector(
  getAllMessages,
  messages => messages
)