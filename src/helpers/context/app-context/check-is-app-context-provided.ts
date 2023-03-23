import { AppContextType } from 'components/app/app';

export function appContextProvideCheck(appContext: AppContextType | null) {
  if (!appContext) {
    throw new Error('try use sign in page without app context');
  }

  return appContext;
}
