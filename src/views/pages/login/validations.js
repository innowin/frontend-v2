import * as __ from "src/translate/fa"
const validateUsername = (username) => {
  if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
    return 'نام کاربری غیر قابل قبول است. لطفا تنها از حروف انگلیسی  یا اعداد یا کاراکتر ـ استفاده نمایید.'
  }
  else if (username.length < 4) return 'نام کاربری باید حداقل ۴ حرف باشد.'
};

const validateEmail = (email) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return 'آدرس ایمیل اشتباه است.'
  }
};

const validateOrganNationalCode = (nationalCode) => {
  if (nationalCode.length === 11) {
    return ''
  } else return __['Organization national code must be 11 digit']
}

const validatePassword = (pass) => {
  const level = new RegExp("^[\s\S]{4,}$");
  const level7 = new RegExp('([\\s\\S])\\1\\1\n');
  if (!level.test(pass) || level7.test(pass)) return 'این رمز ضعیف است. رمز ورود باید حداقل ۸ کاراکتر باشد و از حداقل دارای یک حرف باشد.'
};

export const validateSignup = values => {
  const errors = {};
  const requiredFields = [
    'username', 'email', 'official_name', 'national_code', 'country', 'province', 'password',
    'passwordConfirm', 'city', 'organization_type', 'business_type'];
  const {username, email, national_code, password, passwordConfirm} = values;

  if (username) errors.username = validateUsername(username);
  if (email) errors.email = validateEmail(email);
  if (national_code) errors.national_code = validateOrganNationalCode(national_code);
  // if (password) errors.password = validatePassword(password)

  if (passwordConfirm && passwordConfirm !== password) errors.passwordConfirm = 'دو رمز وارد شده یکسان نیستند.';

  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'این فیلد ضروری است.'
  });
  return errors
};
