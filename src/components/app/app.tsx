import { BrowsePage } from 'pages/browse-page/browse-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'common/enum/enum';
import { SignInPage } from 'pages/sign-in-page/sign-in-page';
import { SignUpPage } from 'pages/sign-up-page/sign-up-page';
import { createContext, Dispatch, SetStateAction } from 'react';
import { useEffect, useLocation, useNavigate, useState } from 'hooks/hooks';
import { LandingPage } from 'pages/landing-page/landing-page';
import { auth } from 'api/firebase';
import { CoursePage } from 'pages/course-page/course-page';
import { Footer, Header } from 'components/common/common';
import { LessonPage } from 'pages/lesson-page/lesson-page';
import { ProtectedRoute } from 'components/common/protected-route/protected-route';
import { concatClasses } from 'helpers/helpers';
import { Watch } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { NotFound } from 'pages/page-404/page-404';

interface AppUserInterface {
  id: string;
  email: string;
}

interface AppContextType {
  user: AppUserInterface | undefined;
  setUser: Dispatch<SetStateAction<AppUserInterface | undefined>>;
}

export const AppContext = createContext<AppContextType | null>(null);

function App() {
  const [user, setUser] = useState<AppUserInterface>();

  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();

  const isSingIn = Boolean(user);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (authenticate) => {
      if (authenticate && authenticate.emailVerified) {
        const { email, uid: id } = authenticate;
        if (email) {
          setUser({ email, id });
        }
      }
      setIsLoading(false);
    });
  }, []);

  const isAuthRoute =
    pathname === AppRoutes.SIGN_UP || pathname === AppRoutes.SIGN_IN;

  useEffect(() => {
    if (navigate && isAuthRoute && isSingIn && !isLoading) {
      navigate(AppRoutes.ROOT, { replace: true });
    }
  }, [navigate, isLoading, isSingIn, isAuthRoute]);

  if (isLoading) {
    return (
      <div
        className={concatClasses([
          'flex',
          'h-screen',
          'w-screen',
          'items-center',
          'justify-center',
          'transition-all',
        ])}
      >
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#F2C94C"
          ariaLabel="watch-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isAuthRoute && (
        <div
          className={concatClasses([
            'min-h-[100vh]',
            'min-w-[100vw]',
            'overflow-y-auto',
            'overflow-x-hidden',
          ])}
        >
          <Routes>
            <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
            <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
          </Routes>
        </div>
      )}
      {!isAuthRoute && (
        <>
          <Header isSignIn={isSingIn} />
          <div
            className={concatClasses([
              'h-[calc(100vh_-_80px)]',
              'flex',
              'flex-col',
              'justify-between',
              'overflow-x-hidden',
              'overflow-y-auto',
              'relative',
            ])}
          >
            <Routes>
              <Route path={AppRoutes.ROOT} element={<LandingPage />} />
              <Route path={AppRoutes.BROWSE} element={<BrowsePage />} />
              <Route
                path={AppRoutes.COURSE_$ID}
                element={<ProtectedRoute element={<CoursePage />} />}
              />
              <Route
                path={AppRoutes.LESSON_$ID}
                element={<ProtectedRoute element={<LessonPage />} />}
              />
              <Route path={AppRoutes.ANY} element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </>
      )}
    </AppContext.Provider>
  );
}

export { App, type AppContextType };
