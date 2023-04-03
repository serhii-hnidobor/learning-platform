import { UserValidationMessage } from 'common/enum/enum';
import { passwordSchema } from './password-creation-schema';
import { UserSignUpFormValues } from 'types/user/user-sign-up-form-values';
import { object, string, ref, Schema } from 'yup';
const userSignUp: Schema<UserSignUpFormValues> = object({
  email: string()
    .trim()
    .email(UserValidationMessage.EMAIL_WRONG)
    .min(6, UserValidationMessage.EMAIL_WRONG_LENGTH)
    .matches(/[а-яА-ЯЁёІіЄєЇї]/, {
      excludeEmptyString: true,
      message: UserValidationMessage.EMAIL_WRONG_REGEX,
    })
    .required(UserValidationMessage.EMAIL_REQUIRE),
  password: passwordSchema,
  passwordConfirm: string()
    .oneOf([ref('password')], UserValidationMessage.PASSWORDS_NOT_MATCH)
    .required(UserValidationMessage.PASSWORD_CONFIRM_REQUIRE),
  username: string()
    .trim()
    .min(3, UserValidationMessage.USERNAME_WRONG_LENGTH)
    .max(25, UserValidationMessage.USERNAME_WRONG_LENGTH)
    .matches(/[а-яА-ЯЁёІіЄєЇї]/, {
      excludeEmptyString: true,
      message: UserValidationMessage.USERNAME_WRONG_REGEX,
    })
    .required(UserValidationMessage.USERNAME_REQUIRE),
});

export { userSignUp };
