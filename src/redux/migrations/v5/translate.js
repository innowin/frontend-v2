export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
    },
    "Skill": "مهارت",
    "Skills": "مهارت ها",
    "Create exchange done": "پنجره شما با موفقیت ساخته شد",
    "Create exchange membership done": "عضویت شما با موفقیت ثبت شد",
    "Exchange removed": "پنجره شما پاک شد",
    "Exchange membership removed": "لغو عضویت شما انجام شد",
    "Create Ability Done": "توانمندی شما با موفقت ثبت شد",
    "Create Product Done": "محصول شما با موفقت ثبت شد",
    "Confirm": "تایید",
    "Edit Exchange Successful": "ویرایش پنجره با موفقیت انجام شد",
  }
})
