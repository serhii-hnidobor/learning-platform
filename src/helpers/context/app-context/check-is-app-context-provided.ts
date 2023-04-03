import { AppContextType } from 'pages/_app';

export function appContextProvideCheck(appContext: AppContextType | null) {
  if (!appContext) {
    throw new Error('try use sign in page without app context');
  }

  return appContext;
}
