export default state => ({
  ...state,
  messages: {
    ...state.messages,
    topBar: {
      ...state.messages.topBar,
      'Explore': 'بگرد'
    },
    'Submit Changes': 'ثبت ویرایش',
    'The Ways to Connect With Your Collection': 'راه های ارتباط با مجموعه شما',
    'WebSite': 'آدرس وب سایت',
    'Telegram Id': 'آدرس تلگرام',
    'Please Enter Your Website!': 'لطفا آدرس سایت را وارد کنید!',
    'Please Enter Your Telegram Id!': 'لطفا آدرس تلگرام را وارد کنید!',
    'Enter Your Team Name': 'نام تیم یا شرکت را وارد کنید.',
    'Organization Name': 'نام مجموعه',
    'Write a Short Introduction Of Team Or Organization, Your Activities Or Your Interests': 'معرفی کوتاهی از تیم یا شرکت خود و فعالیت های آن بنویسید.',
    'Example: Nokavan , IT Products Developer': 'مثال: نوکاوان ، توسعه دهنده محصولات IT',
    'About Me': 'درباره من',
  }
})
