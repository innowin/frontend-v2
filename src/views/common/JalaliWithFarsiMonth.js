// @flow
import * as jMoment from "moment-jalali"

export const JalaliWithFarsiMonth = (date: string): string => {
  // this function getting a date in format "YYYY-MM-DDTHH:mm:ss.SSZ" and return somthing like 26 فروردین 1397
  const months: { [string]: string } = {  // object of months
    "1": 'فروردین',
    "2": 'اردیبهشت',
    "3": 'خرداد',
    "4": 'تیر',
    "5": 'مرداد',
    "6": 'شهریور',
    "7": 'مهر',
    "8": 'آبان',
    "9": 'آذر',
    "10": 'دی',
    "11": 'بهمن',
    "12": 'اسفند',
  }
  const convertTOFarsi = (month) => {
    // a function that convert numbered month to farsi month(for example convert 1 to فروردین).
    return Object.keys(months).reduce((farsi, key) => {
      return ((+key === month) && months[key]) || farsi
    }, '')
    /*
        the returned value working as same as the below:
        if (key == month) return months[key]
        else return farsi
    */
  }
  if(date){
    const jalaliDate = jMoment(date, "YYYY-MM-DDTHH:mm:ss.SSZ")
    console.log(`${jalaliDate.jDate()}.${jalaliDate.jMonth()}.${jalaliDate.jYear()}`)
    return `${jalaliDate.jDate()} ${convertTOFarsi(jalaliDate.jMonth())} ${jalaliDate.jYear()}`
    // the output is something like 26 فروردین 1397
  }
  return ''
}

export const JalaliDateWithDot = (date: string): string => {
  // this function getting a date in format "YYYY-MM-DDTHH:mm:ss.SSZ" and return something 1397.02.01
  if(date){
    const jalaliDate = jMoment(date, "YYYY-MM-DDTHH:mm:ss.SSZ")
    return `${jalaliDate.jYear()}.${jalaliDate.jMonth()}.${jalaliDate.jDate()}`
    // the output is something like 1397.02.01
  }
  return ''
}