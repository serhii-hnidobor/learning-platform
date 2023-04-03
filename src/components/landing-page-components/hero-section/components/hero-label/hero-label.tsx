import {
  heroLabelVariants,
  HeroLabelVariantsType,
} from 'components/landing-page-components/hero-section/components/hero-label/cva-variants/cva-variants';
import { concatClasses } from 'helpers/string/string';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/enum';
import { Typography } from 'components/common/typography/typography';
import { CircleProgressBar } from 'components/common/circle-progress-bar/circle-progress-bar';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface HeroLabelProps extends ComponentBaseProps<'div'> {
  label: string;
  description: string;
  progress?: number;
  variant?: HeroLabelVariantsType['variant'];
  iconName?: IconName;
}

const HeroLabel = ({
  className,
  iconName,
  description,
  label,
  variant,
  progress = 0,
  ...restHtmlDivProps
}: HeroLabelProps) => {
  const textAlign = variant === 'vertical' ? 'center' : 'left';
  const infoWrapperDirection = variant === 'vertical' ? '!block' : 'flex-col';

  let illustration: JSX.Element;

  if (variant === 'horizontal') {
    illustration = <Icon name={iconName as IconName} intent={'squaredDark'} />;
  } else {
    illustration = <CircleProgressBar progress={progress} />;
  }

  let labelClassName = heroLabelVariants({ variant });
  if (className && className.length) {
    labelClassName = concatClasses([labelClassName, className]);
  }

  return (
    <div {...restHtmlDivProps} className={labelClassName}>
      {illustration}
      <div className={`flex ${infoWrapperDirection}`}>
        <Typography
          as={'h2'}
          styleName={'h4'}
          color={'white'}
          align={textAlign}
          textTransform={'uppercase'}
        >
          {label}
        </Typography>
        <Typography
          as={'h3'}
          styleName={'body3Regular'}
          color={'grey'}
          textTransform={'capitalize'}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export { HeroLabel };
