import { UserValidationMessage } from 'common/enum/enum';
import { string as yupString } from 'yup';

export const passwordSchema = yupString()
  .trim()
  .min(8, UserValidationMessage.PASSWORD_WRONG_LENGTH)
  .max(16, UserValidationMessage.PASSWORD_WRONG_LENGTH)
  .matches(/[а-яА-ЯЁёІіЄєЇї]/, UserValidationMessage.PASSWORD_WRONG_REGEX)
  .required(UserValidationMessage.PASSWORD_REQUIRE);
