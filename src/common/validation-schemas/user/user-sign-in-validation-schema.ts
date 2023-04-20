import { SignInFormValues } from 'types/user/user-sign-in-form-values';
import { UserValidationMessage } from 'common/enum/enum';
import { Schema, object, string } from 'yup';

const userSignIn: Schema<SignInFormValues> = object({
  email: string()
    .trim()
    .email(UserValidationMessage.EMAIL_WRONG)
    .min(6, UserValidationMessage.EMAIL_WRONG_LENGTH)
    .matches(/^[^а-яА-ЯЁёІіЄєЇї]*$/, UserValidationMessage.EMAIL_WRONG_REGEX)
    .required(UserValidationMessage.EMAIL_REQUIRE),
});

export { userSignIn };
