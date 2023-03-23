import * as Joi from 'joi';
import { SignInFormValues } from 'types/user/user-sign-in-form-values';
import { UserValidationMessage } from 'common/enum/enum';

const userSignIn = Joi.object<SignInFormValues, true>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(6)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_WRONG_LENGTH,
      'string.pattern.invert.base': UserValidationMessage.EMAIL_WRONG_REGEX,
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(16)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'any.required': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_WRONG_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_WRONG_LENGTH,
      'string.pattern.invert.base': UserValidationMessage.PASSWORD_WRONG_REGEX,
    }),
});

export { userSignIn };
