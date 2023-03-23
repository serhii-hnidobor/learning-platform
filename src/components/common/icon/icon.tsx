import { SVGProps } from 'react';
import { IconName } from 'common/enum/enum';
import {
  iconBoxVariants,
  IconBoxVariantType,
  iconVariants,
  IconVariantsType,
} from './cva-variants/cva-variants';

import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/magnifying-glass.svg';
import { ReactComponent as UserSuccess } from 'assets/icons/user-success.svg';
import { ReactComponent as Bag } from 'assets/icons/bag.svg';
import { ReactComponent as Bulb } from 'assets/icons/bulb.svg';
import { ReactComponent as Computer } from 'assets/icons/computer.svg';
import { ReactComponent as Users } from 'assets/icons/users.svg';
import { ReactComponent as Devices } from 'assets/icons/devices.svg';
import { ReactComponent as Browser } from 'assets/icons/browser.svg';
import { ReactComponent as Tools } from 'assets/icons/tools.svg';
import { ReactComponent as ChartDots } from 'assets/icons/chart-dots.svg';
import { ReactComponent as ChevronLeft } from 'assets/icons/chevron-left.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as Flame } from 'assets/icons/flame.svg';
import { ReactComponent as School } from 'assets/icons/school.svg';
import { ReactComponent as Rocket } from 'assets/icons/rocket.svg';
import { ReactComponent as PlayerPlay } from 'assets/icons/player-play.svg';
import { ReactComponent as Quotes } from 'assets/icons/quote.svg';
import { ReactComponent as User } from 'assets/icons/user.svg';
import { ReactComponent as NotFound } from 'assets/icons/not-found.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as Eye } from 'assets/icons/eye.svg';
import { ReactComponent as EyeClose } from 'assets/icons/eye-slash.svg';
import { ReactComponent as EmptyStar } from 'assets/icons/empty-start.svg';
import { ReactComponent as Star } from 'assets/icons/star.svg';
import { ReactComponent as HalfStart } from 'assets/icons/half-star.svg';
import { ReactComponent as Download } from 'assets/icons/download.svg';
import { ReactComponent as FileText } from 'assets/icons/file-text.svg';
import { ReactComponent as FileCertificate } from 'assets/icons/file-certificate.svg';
import { ReactComponent as ChevronUp } from 'assets/icons/chevron-up.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/chevron-down.svg';
import { ReactComponent as Clock } from 'assets/icons/clock.svg';
import { ReactComponent as Check } from 'assets/icons/check.svg';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Compass } from 'assets/icons/compass.svg';
import { ReactComponent as Google } from 'assets/icons/google.svg';
import { ReactComponent as Youtube } from 'assets/icons/brand-youtube.svg';
import { ReactComponent as Facebook } from 'assets/icons/brand-facebook.svg';
import { ReactComponent as Instagram } from 'assets/icons/brand-instagram.svg';
import { ReactComponent as Looking } from 'assets/icons/looking.svg';

import { concatClasses } from 'helpers/helpers';
import { AllHtmlElementProps } from 'types/html-elemet-props';

interface IconProps extends SVGProps<SVGElement> {
  name: IconName;
  boxProps?: AllHtmlElementProps<'div', IconBoxVariantType>;
  intent?: NonNullable<IconBoxVariantType['intent']>;
  fill?: NonNullable<IconVariantsType['fill']>;
  className?: string;
  hoverStroke?: NonNullable<IconVariantsType['hoverStroke']>;
  hoverFill?: NonNullable<IconVariantsType['hoverFill']>;
  stroke?: NonNullable<IconVariantsType['stroke']>;
  strokeWidth?: NonNullable<IconVariantsType['strokeWidth']>;
}

const Icon = ({
  width = '20',
  height = '20',
  intent,
  fill,
  name,
  className,
  stroke,
  strokeWidth,
  boxProps,
  hoverStroke,
  hoverFill,
  ...restSvgProps
}: IconProps) => {
  let iconClassName = iconVariants({
    fill,
    stroke,
    intent,
    strokeWidth,
    hoverStroke,
    hoverFill,
  });

  if (className && className.length) {
    iconClassName = concatClasses([className, iconClassName]);
  }

  let iconBoxClassName = iconBoxVariants({ intent });
  const boxPropsClassName = boxProps ? boxProps.className : null;

  if (boxPropsClassName && boxPropsClassName.length) {
    iconBoxClassName = concatClasses([boxPropsClassName, iconBoxClassName]);
  }

  switch (name) {
    case IconName.LOGO: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <LogoIcon
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.SEARCH: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <SearchIcon
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.USER_SUCCESS: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <UserSuccess
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.BAG: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Bag
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }

    case IconName.BULB: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Bulb
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.COMPUTER: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Computer
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.USERS: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Users
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.DEVICES: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Devices
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CHART_DOTS: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <ChartDots
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.BROWSER: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Browser
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.TOOLS: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Tools
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CHEVRON_LEFT: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <ChevronLeft
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CHEVRON_RIGHT: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <ChevronRight
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.FLAME: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Flame
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.SCHOOL: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <School
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.ROCKET: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Rocket
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.PLAYER_PLAY: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <PlayerPlay
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.QUOTE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Quotes
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.USER: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <User
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName['NOT_FOUND']: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <NotFound
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.ERROR: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <ErrorIcon
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CLOSE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <CloseIcon
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.EYE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Eye
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.EYE_CLOSE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <EyeClose
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }

    case IconName.EMPTY_STAR: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <EmptyStar
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }

    case IconName.STAR: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Star
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }

    case IconName.HALF_STAR: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <HalfStart
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.DOWNLOAD: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Download
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.FILE_TEXT: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <FileText
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.FILE_CERTIFICATE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <FileCertificate
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CHEVRON_UP: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <ChevronUp
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CHEVRON_DOWN: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <ChevronDown
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CLOCK: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Clock
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.CHECK: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Check
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.HOME: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Home
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.COMPASS: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Compass
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.GOOGLE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Google
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.FACEBOOK: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Facebook
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.YOUTUBE: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Youtube
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.INSTAGRAM: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Instagram
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    case IconName.LOOKING: {
      return (
        <div {...boxProps} className={iconBoxClassName}>
          <Looking
            {...restSvgProps}
            width={width}
            height={height}
            className={iconClassName}
          />
        </div>
      );
    }
    default: {
      const check: never = name;
      throw new Error(check);
    }
  }
};
export { Icon, type IconProps };
