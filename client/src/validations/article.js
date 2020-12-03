import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateArticleInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.title)) {
    errors.title = 'This field is required';
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'This field is required';
  }
  if (Validator.isEmpty(data.author)) {
    errors.author = 'This field is required';
  }
// if(Validator.isEmpty(data.photo)){
//   errors.photo='Фотография обязательна'
// }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}