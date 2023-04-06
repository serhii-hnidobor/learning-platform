import { IconName } from 'common/enum/icons/icons';
import { AppRoutes, AppRouteType } from 'common/enum/app/app';
import { ContentListItem } from 'components/common/header/components/mobile-header/content/content-list-item/content-list-item';
import Button from 'components/common/button/button';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { concatClasses } from '../../../../../../helpers/string/concat-classes/concat-classes';

interface Props {
  curRoute: string;
  handleRedirect: (route: AppRouteType) => void;
  isSignIn: boolean;
  isLoading: boolean;
  handleSignOut: () => Promise<void>;
}

const MobileDrawerContent = ({
  curRoute,
  handleRedirect,
  isSignIn,
  handleSignOut,
  isLoading,
}: Props) => {
  const Router = useRouter();

  const redirectSignIn = async () => {
    await Router.push(AppRoutes.SIGN_IN);
  };

  const redirectSignUp = async () => {
    await Router.push(AppRoutes.SIGN_UP);
  };

  let buttons: JSX.Element;

  if (isLoading) {
    buttons = (
      <Skeleton
        className={'h-full w-full'}
        containerClassName={concatClasses([
          'flex',
          'items-center',
          'justify-center',
          '!w-full',
          '!h-[44px]',
        ])}
      />
    );
  } else if (isSignIn) {
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
  } else {
    buttons = (
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
