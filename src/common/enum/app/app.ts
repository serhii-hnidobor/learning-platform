import { FailedFetchMessage } from './failed-fetch-message/failed-fetch-message';

enum AppParams {
  COURSE_ID = 'courseId',
  LESSON_ID = 'lessonId',
}

const AppRoutes = {
  ROOT: '/',
  BROWSE: '/browse',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ANY: '*',
  COURSE_$ID: `/course/:${AppParams.COURSE_ID}`,
  LESSON_$ID: `/lesson/:${AppParams.LESSON_ID}`,
} as const;

/*this need for prevent redirect user back loop when he try access to protected route
 * and not sign and then also dont sign in and want return back */
const ProtectedRoutes = {
  COURSE: 'course',
  LESSON: 'lesson',
} as const;

type AppRouteType = (typeof AppRoutes)[keyof typeof AppRoutes];

enum AuthErrorMessages {
  CREDENTIAL_ALREADY_USE = 'this credential already use please try another',
  UNKNOWN_ERROR = 'ooops something went wrong',
  INVALID_CREDENTIAL = 'wrong email or password. Check caps lock',
  EMAIL_NOT_VERIFIED = 'please verify you email to sign in',
  GOOGLE_ERROR = 'unknow error check is you browser allowed popup from this site',
}

enum AuthMessage {
  VERIFICATION_EMAIL_SEND = 'we sent email verification check you email',
}

export {
  AppParams,
  AppRoutes,
  AuthMessage,
  type AppRouteType,
  ProtectedRoutes,
  AuthErrorMessages,
  FailedFetchMessage,
};
