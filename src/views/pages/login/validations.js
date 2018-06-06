

  const validateUsername = (username) => {
    if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
      return 'نام کاربری غیر قابل قبول است. لطفا تنها از حروف انگلیسی  یا اعداد یا کاراکتر ـ استفاده نمایید.'
    }
    else if (username.length < 4) return 'نام کاربری باید حداقل ۴ حرف باشد.'
  }
  
  const validateEmail = (email) => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
      return 'آدرس ایمیل اشتباه است.'
    }
  };
  
  const validateNationalCode = (nationalCode) => {
    const code = +nationalCode;
    if (Number.isInteger(code)){
      if (nationalCode.length === 10) {
        let checkNum = 0
        for (let i = 0; i < 9; i++) checkNum += (nationalCode[i] * (10 - i))
        checkNum = checkNum % 11
        const code9 = nationalCode[9]
        const condition = ((code9 == 1 && checkNum === 1) || // '==' is important. === dont working.
                           (code9 == 0 && checkNum === 0) ||
                           (code9 == 11 - checkNum)
                          )
        if (condition) return ''
        return 'کد ملی اشتباه است.'
      } else return 'کد ملی باید ۱۰ رقم باشد.'
    } return 'همه کاراکترهای کدملی باید عدد باشد.'
  }
  
  export const validateSignup = values => {
    const errors = {}
    const requiredFields = [
      'username', 'email', 'official_name', 'national_code', 'country', 'province', 'password',
      'passwordConfirm', 'city', 'organization_type', 'business_type']
    const { username, email, national_code, password, passwordConfirm} = values
  
    if (username) errors.username = validateUsername(username)
    if (email) errors.email = validateEmail(email)
    if (national_code) errors.national_code = validateNationalCode(national_code)
    
    if (passwordConfirm && passwordConfirm !== password) errors.passwordConfirm = 'دو رمز وارد شده یکسان نیستند.'
  
    requiredFields.forEach(field => {
      if (!values[field]) errors[field] = 'این فیلد ضروری است.'
    })
    return errors
  }
