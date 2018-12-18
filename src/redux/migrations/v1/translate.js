export default state => ({
  ...state,
  messages: {
    ...state.messages,
    'Complete the validation code': 'کد را کامل وارد کنید!',
    'Incorrect validation code': 'کد وارد شده صحیح نمی باشد!',
    'Show join date in profile': 'نمایش تاریخ عضویت در پروفایل',
    'Editing': 'در حال ویرایش...',
    'Submit': 'ثبت',
    'Mobile not shown to the others': 'شماره خصوصی به کاربران نمایش داده نمی شود.',
    'Private email not shown to the others': 'ایمیل خصوصی به کاربران نمایش داده نمی شود.',
    'This address is for public view': 'این آدرس برای نمایش عمومی است.',
    'This number is for public view': 'این شماره برای نمایش عمومی است.',
    'This email is for public view': 'این ایمیل برای نمایش عمومی است.',
  },
})
