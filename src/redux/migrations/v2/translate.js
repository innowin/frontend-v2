export default state => ({
  ...state,
  messages: {
    ...state.messages,
    "Forgot password": "فراموشی رمز عبور",
    "Pick a way for creating new password": "برای ساخت رمز عبور جدید کدام راه را انتخاب می کنید؟",
    "Select a new password": "رمز عبور جدیدی را برای خود تعریف کنید.",
    "Select a hard password": "رمز عبوری انتخاب کنید که برای دیگران به سختی قابل حدس زدن باشد",
    "Password": "رمز عبور",
    "Repeat password": "تکرار رمز عبور",
    "Password recovery": "بازیابی رمز عبور",
    "Password not equal to repeated": "رمز عبور انتخابی با تکرار آن یکسان نیست.",
    "Edit Post": "ویرایش پست",
    topBar: {
      ...state.messages.topBar,
      "Password": "رمز عبور",
      'Phone setting description': 'یک شماره موبایل وارد کنید. این شماره برای ارتباط اینوین (مثلا بازیابی رمز عبور) با شما است و برای سایر کاربران قابل مشاهده نخواهد بود.',
    },
    'Create post done': 'پست شما با موفقت ثبت شد',
    'Post removed': 'پست شما پاک شد',
    "Password is required": "رمز عبور الزامی است",
    "Different password": "عدم تطابق رمز عبور و تکرار آن",
  },
})
