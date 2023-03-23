import { IconName } from 'common/enum/icons/icons';
import { AppRoutes, AppRouteType } from 'common/enum/app/app';
import { ContentListItem } from 'components/common/header/components/mobile-header/content/content-list-item/content-list-item';
import { useNavigate } from 'hooks/hooks';
import { Button } from 'components/common/button/button';

interface Props {
  curRoute: string;
  handleRedirect: (route: AppRouteType) => void;
  isSignIn: boolean;
  handleSignOut: () => Promise<void>;
}

const MobileDrawerContent = ({
  curRoute,
  handleRedirect,
  isSignIn,
  handleSignOut,
}: Props) => {
  const navigate = useNavigate();

  const redirectSignIn = () => {
    navigate(AppRoutes.SIGN_IN);
  };

  const redirectSignUp = () => {
    navigate(AppRoutes.SIGN_UP);
  };

  let buttons = (
    <div className={'flex flex-col items-center justify-center gap-4'}>
      <Button
        ariaLabel={'sign in button'}
        name="Sign in"
        className={'h-[44px] w-full'}
        textAlign={'center'}
        onClick={redirectSignIn}
      >
        Sign In
      </Button>
      <Button
        ariaLabel={'sign up button'}
        name="Sign up"
        className={'h-[44px] w-full'}
        textAlign={'center'}
        onClick={redirectSignUp}
      >
        Sign up
      </Button>
    </div>
  );

  if (isSignIn) {
    buttons = (
      <Button
        ariaLabel={'sign out button'}
        name="Sign out"
        className={'h-[44px] w-full'}
        textAlign={'center'}
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    );
  }

  return (
    <>
      <ul className={'mb-6 border-b border-b-white/30 pb-2'}>
        <ContentListItem
          name={'home'}
          iconName={IconName.HOME}
          isActive={curRoute === AppRoutes.ROOT}
          onClick={() => handleRedirect(AppRoutes.ROOT)}
        />
        <ContentListItem
          name={'browse'}
          iconName={IconName.COMPASS}
          isActive={curRoute === AppRoutes.BROWSE}
          onClick={() => handleRedirect(AppRoutes.BROWSE)}
        />
      </ul>
      {buttons}
    </>
  );
};

export { MobileDrawerContent };
