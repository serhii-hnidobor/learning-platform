import { Burger, Button, Drawer, Icon, Logo } from 'components/common/common';
import { IconName } from 'common/enum/icons/icons';
import { useWindowDimensions } from 'hooks/use-window-dimensions/use-window-dimensions';
import { concatClasses } from 'helpers/helpers';
import { useContext, useLocation, useNavigate, useState } from 'hooks/hooks';
import { createContext, useEffect } from 'react';
import { MobileDrawerContent } from './components/mobile-header/content/content';
import { AppRoutes } from 'common/enum/app/app';
import { HeaderLink } from './components/header-link/header-link';
import { MobileHeaderDrawerHeader } from 'components/common/header/components/mobile-header';
import { HeaderMenu } from './components/header-menu/header-menu';
import { AppContext } from 'components/app/app';
import { auth } from 'api/firebase';

interface HeaderProps {
  isSignIn?: boolean;
}

interface HeaderContextInterface {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (newValue: boolean) => void;
}

const HeaderContext = createContext<HeaderContextInterface | null>(null);

const Header = ({ isSignIn = false }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname: curRoute } = location;

  const from = encodeURIComponent(curRoute);

  const { screen } = useWindowDimensions();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('try to use header without app context');
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (e: unknown) {
      console.error(e);
    } finally {
      appContext.setUser(undefined);
    }
  };

  const isCompanyNameNeed = !(
    screen === 'lg' ||
    screen === 'sm' ||
    screen === 'md' ||
    screen === 'xs' ||
    screen === 'extra-small'
  );

  const isMobileMenuNeed =
    screen === 'sm' ||
    screen === 'md' ||
    screen === 'xs' ||
    screen === 'extra-small';

  const handleRedirectSignIn = () => {
    navigate(`${AppRoutes.SIGN_IN}?from=${from}`, { replace: false });
  };

  const handleRedirectSignUp = () => {
    navigate(`${AppRoutes.SIGN_UP}?from=${from}`, { replace: false });
  };

  useEffect(() => {
    if (!isMobileMenuNeed) {
      setIsDrawerOpen(false);
    }
  }, [isMobileMenuNeed]);

  return (
    <HeaderContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
      <nav
        className={concatClasses([
          'bg-gradient-135',
          'from-[#302F32_5.14%]',
          'to-[#242424_78.54%]',
          'flex',
          'h-20',
          'w-screen',
          'justify-center',
          'sticky',
          'top-0',
          'border-b',
          'z-40',
          'border-b-white/10',
        ])}
      >
        <div
          className={concatClasses([
            'w-full',
            'flex',
            'lg:px-28',
            'sm:px-8',
            'px-4',
            'justify-between',
            'w-full',
            '2xl:w-[1497px]',
          ])}
        >
          {isMobileMenuNeed && (
            <Burger
              isOpen={isDrawerOpen}
              className={'flex items-center justify-center py-0'}
              onOpen={() => setIsDrawerOpen(true)}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
          <Drawer
            isOpen={isDrawerOpen}
            contentContainerClassName={'h-full bg-dark !w-full'}
            setIsOpen={setIsDrawerOpen}
            children={
              <MobileDrawerContent
                handleSignOut={handleSignOut}
                curRoute={curRoute}
                isSignIn={isSignIn}
                handleRedirect={(route) => navigate(route)}
              />
            }
            header={
              <MobileHeaderDrawerHeader
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            }
          />
          <Logo
            logoIconProps={{ className: 'mr-4' }}
            isTitleNeed={isCompanyNameNeed}
          />
          <div className="flex items-center gap-x-9">
            <ul className="hidden h-full items-center gap-x-8 md:flex">
              <HeaderLink
                name={'home'}
                isActive={curRoute === AppRoutes.ROOT}
                route={AppRoutes.ROOT}
              />
              <HeaderLink
                name={'browse'}
                isActive={curRoute === AppRoutes.BROWSE}
                route={AppRoutes.BROWSE}
              />
            </ul>
            <Icon
              name={IconName.SEARCH}
              width={18}
              height={18}
              color={'white'}
            />
          </div>
          <div
            className={concatClasses([
              'user-control-box',
              'md:flex',
              'hidden',
              'items-center',
              'justify-center',
              'gap-6',
            ])}
          >
            {isSignIn ? (
              <HeaderMenu handleSignOut={handleSignOut} />
            ) : (
              <>
                <Button
                  ariaLabel={'sign in button'}
                  intent={'textSecondary'}
                  onClick={handleRedirectSignIn}
                >
                  Sign In
                </Button>
                <Button
                  ariaLabel={'sign up button'}
                  size={'small'}
                  intent={'secondary'}
                  onClick={handleRedirectSignUp}
                >
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </HeaderContext.Provider>
  );
};

export { Header };
