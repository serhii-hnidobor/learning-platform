import { AppContextType } from 'pages/_app';

export function appContextProvideCheck(appContext: AppContextType | null) {
  if (!appContext) {
    throw new Error('app context bot found');
  }

  return appContext;
}
