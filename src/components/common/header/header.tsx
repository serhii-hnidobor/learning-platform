import { useWindowDimensions } from 'hooks/use-window-dimensions/use-window-dimensions';
import { concatClasses } from 'helpers/string/string';
import { useContext, useRouter, useState } from 'hooks/hooks';
import { createContext, useEffect } from 'react';
import { MobileDrawerContent } from './components/mobile-header';
import { AppRoutes } from 'common/enum/app/app';
import { HeaderLink } from './components/header-link/header-link';
import { MobileHeaderDrawerHeader } from 'components/common/header/components/mobile-header';
import { HeaderMenu } from './components/header-menu/header-menu';
import { AppContext } from 'pages/_app';
import { auth } from 'api/auth';
import { Burger } from '../burger/burger';
import Logo from '../logo/logo';
import Button from '../button/button';
import dynamic from 'next/dynamic';
import { Icon } from '../icon/icon';
import { IconName } from 'common/enum/enum';
import Skeleton from 'react-loading-skeleton';

const Drawer = dynamic(import('../drawer/drawer'));

interface HeaderContextInterface {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (newValue: boolean) => void;
}

const HeaderContext = createContext<HeaderContextInterface | null>(null);

const Header = () => {
  const Router = useRouter();

  const { route: curRoute } = Router;

  const from = encodeURIComponent(curRoute);

  const { screen } = useWindowDimensions();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const appContext = useContext(AppContext);

  const isSignIn = Boolean(appContext?.user);

  if (!appContext) {
    throw new Error('try to use header without app context');
  }

  const { isLoading } = appContext;

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
    Router.push(`${AppRoutes.SIGN_IN}?from=${from}`);
  };

  const handleRedirectSignUp = () => {
    Router.push(`${AppRoutes.SIGN_UP}?from=${from}`);
  };

  useEffect(() => {
    if (!isMobileMenuNeed) {
      setIsDrawerOpen(false);
    }
  }, [isMobileMenuNeed]);

  let ControlButtons: JSX.Element;

  if (isLoading) {
    ControlButtons = (
      <Skeleton
        className={'h-full w-full'}
        containerClassName={concatClasses([
          'flex',
          'items-center',
          'justify-center',
          '!w-[84px]',
          '!h-[35px]',
        ])}
      />
    );
  } else if (isSignIn) {
    ControlButtons = (
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
    );
  } else {
    ControlButtons = <HeaderMenu handleSignOut={handleSignOut} />;
  }

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
          'lg:px-28',
          'sm:px-8',
          'px-4',
          'w-full',
          'flex',
          'justify-center',
        ])}
      >
        <div
          className={concatClasses([
            'w-full',
            'flex',
            'justify-between',
            '2xl:w-[1497px]',
          ])}
        >
          <Burger
            isOpen={isDrawerOpen}
            className={'flex items-center justify-center py-0 md:hidden'}
            onOpen={() => setIsDrawerOpen(true)}
            onClose={() => setIsDrawerOpen(false)}
          />
          <Drawer
            isOpen={isDrawerOpen}
            contentContainerClassName={'h-full bg-dark !w-full'}
            setIsOpen={setIsDrawerOpen}
            children={
              <MobileDrawerContent
                handleSignOut={handleSignOut}
                curRoute={curRoute}
                isLoading={isLoading}
                isSignIn={isSignIn}
                handleRedirect={(route) => Router.push(route)}
              />
            }
            header={
              <MobileHeaderDrawerHeader
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            }
          />
          <Logo isTitleNeed={isCompanyNameNeed} />
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
              'md:flex',
              'hidden',
              'items-center',
              'justify-center',
              'gap-6',
            ])}
          >
            {ControlButtons}
          </div>
        </div>
      </nav>
    </HeaderContext.Provider>
  );
};

export default Header;
