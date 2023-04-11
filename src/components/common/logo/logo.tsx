import { SVGProps } from 'react';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { IconName } from 'common/enum/icons/icons';
import { AppRoutes } from 'common/enum/enum';
import { concatClasses } from 'helpers/string/string';
import { useRouter } from 'next/router';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import { Icon, IconProps } from 'components/common/icon/icon';

interface LogoProps extends ComponentBaseProps<'div'> {
  logoIconProps?: Omit<SVGProps<SVGElement>, keyof IconProps>;
  typographyProps?: TypographyProps<HTMLSpanElement>;
  isTitleNeed?: boolean;
  className?: string;
}

const Logo = ({
  logoIconProps,
  typographyProps,
  isTitleNeed = true,
  className,
  ...restWrapperProps
}: LogoProps) => {
  const Router = useRouter();

  const { route: curRoute } = Router;

  let wrapperClassName = 'inline-flex items-center cursor-pointer';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  const handleRootRedirect = async () => {
    if (Router.isReady && curRoute !== AppRoutes.ROOT) {
      await Router.push(AppRoutes.ROOT);
    }
  };
  return (
    <div
      className={wrapperClassName}
      onClick={handleRootRedirect}
      {...restWrapperProps}
    >
      <Icon width={32} height={32} {...logoIconProps} name={IconName.LOGO} />
      {isTitleNeed && (
        <Typography
          className={'ml-4'}
          {...typographyProps}
          styleName={'body2ExtraBold'}
          as={'span'}
          color={'white'}
        >
          learningPlatform
        </Typography>
      )}
    </div>
  );
};

export default Logo;
