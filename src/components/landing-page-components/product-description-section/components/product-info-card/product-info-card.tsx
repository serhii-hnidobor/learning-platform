import { IconName } from 'common/enum/icons/icons';
import { Icon, IconProps } from 'components/common/icon/icon';
import { Typography } from 'components/common/typography/typography';
import {
  productInfoCardVariants,
  ProductInfoCardVariantsType,
} from './cva-variants/cva-variants';
import { concatClasses } from 'helpers/string/string';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface ProductInfoCardProps extends ComponentBaseProps<'div'> {
  iconName: IconName;
  title: string;
  text: string;
  variant?: NonNullable<ProductInfoCardVariantsType['variant']>;
  iconProps?: Omit<IconProps, 'name' | 'intent' | 'stokeWidth'>;
}

const ProductInfoCard = ({
  iconName,
  title,
  text,
  iconProps,
  variant,
  className,
  ...wrapperProps
}: ProductInfoCardProps) => {
  const iconClassName = iconProps?.className;
  const iconWrapperClasName = iconClassName ? `mb-6 ${iconClassName}` : 'mb-6';

  let wrapperClassName = productInfoCardVariants({ variant });

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <div {...wrapperProps} className={wrapperClassName}>
      <Icon
        name={iconName}
        intent="rounded"
        strokeWidth={'2'}
        {...iconProps}
        boxProps={{ className: iconWrapperClasName }}
      />
      <Typography
        as={'h2'}
        styleName={'h4'}
        color={'black'}
        className={'mb-3'}
        align={variant === 'vertical' ? 'center' : 'left'}
      >
        {title}
      </Typography>
      <Typography
        as={'p'}
        styleName={'body2Regular'}
        color={'grey'}
        align={variant === 'vertical' ? 'center' : 'left'}
      >
        {text}
      </Typography>
    </div>
  );
};

export { ProductInfoCard };
