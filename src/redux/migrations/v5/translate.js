export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
    },
    "Skill": "مهارت",
    "Skills": "مهارت ها",
    'Create post done': 'پست شما با موفقیت ثبت شد',
    "Create exchange done": "پنجره شما با موفقیت ساخته شد",
    "Create exchange membership done": "عضویت شما با موفقیت ثبت شد",
    "Exchange removed": "پنجره شما پاک شد",
    "Exchange membership removed": "لغو عضویت شما انجام شد",
    "Create Ability Done": "توانمندی شما با موفقیت ثبت شد",
    "Create Product Done": "محصول شما با موفقیت ثبت شد",
    "Confirm": "تایید",
    "Edit Exchange Successful": "ویرایش پنجره با موفقیت انجام شد",
    'Create Follow Done': 'دنبال کردن کاربر با موفقیت انجام شد',
    'Update Post Done': 'ویرایش پست با موفقیت انجام شد',
    'Create Comment Done': 'نظر شما با موفقیت ثبت شد',
    'Delete Comment Done': 'نظر شما با موفقیت پاک شد',
    'Delete Follow Done': 'شما کاربر را دنبال نمی کنید',
    'Update Profile Done': 'به روز رسانی مشخصات انجام شد',
    'Update Organ Done': 'به روز رسانی مشخصات انجام شد',
  }
})
