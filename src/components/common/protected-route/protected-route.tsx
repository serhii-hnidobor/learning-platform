import { useContext, useLocation, useNavigate } from 'hooks/hooks';
import { AppContext } from 'components/app/app';
import { AppRoutes, SessionStorageKeys } from 'common/enum/enum';
import { Navigate } from 'react-router-dom';
import { sessionStorageService } from 'services/services';
import useDeepCompareEffect from 'use-deep-compare-effect';

type Props = {
  element: JSX.Element;
};

const ProtectedRoute = ({ element }: Props) => {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const hasUser = Boolean(appContext?.user);

  const prevRoute = sessionStorageService.retrieve(
    SessionStorageKeys.PREV_ROUTE,
  );

  useDeepCompareEffect(() => {
    if (!hasUser && prevRoute === AppRoutes.SIGN_IN) {
      sessionStorageService.remove(SessionStorageKeys.PREV_ROUTE);
      navigate(AppRoutes.ROOT, { replace: true });
    }
  }, [hasUser, prevRoute, navigate]);

  return hasUser ? (
    element
  ) : (
    <Navigate
      to={{
        pathname: AppRoutes.SIGN_IN,
        search: `?from=${encodeURIComponent(location.pathname)}`,
      }}
      replace={false}
    />
  );
};

export { ProtectedRoute, type Props as ProtectedRouteProps };
