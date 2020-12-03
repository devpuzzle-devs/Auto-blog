import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateUserInput(data) {
  let errors = {};


  if (Validator.isEmpty(data.nickName)) {
    errors.nickName = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}