import { SVGProps } from 'react';
import { ComponentBaseProps } from 'types/html-elemet-props';
import {
  Icon,
  IconProps,
  Typography,
  TypographyProps,
} from 'components/common/common';
import { IconName } from 'common/enum/icons/icons';
import { useLocation, useNavigate } from 'hooks/hooks';
import { AppRoutes } from 'common/enum/enum';
import { concatClasses } from 'helpers/helpers';

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
  const navigate = useNavigate();
  const { pathname: curRoute } = useLocation();

  let wrapperClassName = 'inline-flex items-center cursor-pointer';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  const handleRootRedirect = () => {
    if (curRoute !== AppRoutes.ROOT) {
      navigate(AppRoutes.ROOT);
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

export { Logo };
