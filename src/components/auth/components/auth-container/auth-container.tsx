import { Typography } from 'components/common/typography/typography';
import { concatClasses } from 'helpers/string/string';
import Logo from 'components/common/logo/logo';

interface AuthContainerProps {
  children: JSX.Element;
  title: string;
}

const AuthContainer = ({ children, title }: AuthContainerProps) => {
  return (
    <div
      className={concatClasses([
        'w-full',
        'h-full',
        'flex',
        'flex-col',
        'items-center',
        'justify-start',
        'md:justify-center',
        'bg-green-light',
        'md:bg-gradient-135',
        'md:from-[#302F32_5.14%]',
        'md:to-[#242424_78.54%]',
        'pb-4',
      ])}
    >
      <div
        className={concatClasses([
          'md:w-[595px]',
          'w-full',
          'md:px-[60px]',
          'md:py-[30px]',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'md:bg-green-light/50',
          'bg-green-light',
          'px-5',
          'pt-[30px]',
          'pb-[60px]',
          'md:border-gradient-tl-auth-container-auth-container-background',
          'gradient-border-2',
          'border-transparent',
          'border-solid',
          'border-2',
          'rounded',
        ])}
      >
        <div
          className={
            'mb-8 flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start md:gap-0'
          }
        >
          <Typography
            as={'span'}
            styleName={'h3'}
            color={'white'}
            textTransform={'capitalize'}
          >
            {title}
          </Typography>
          <Logo className={'w-[172px] justify-between'} />
        </div>
        {children}
      </div>
    </div>
  );
};

export { AuthContainer, type AuthContainerProps };
