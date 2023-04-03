import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import { IconName } from 'common/enum/icons/icons';
import { Icon, IconProps } from 'components/common/icon/icon';

interface ProductInfoListItemProps {
  iconProps?: Omit<IconProps, 'label'>;
  typographyProps?: Omit<TypographyProps<HTMLSpanElement>, 'children'>;
  label: string;
  iconName: IconName;
}

const ProductInfoListItem = ({
  iconProps,
  typographyProps,
  label,
  iconName,
}: ProductInfoListItemProps) => {
  return (
    <div className="flex items-center gap-5">
      <Icon
        {...iconProps}
        width={24}
        height={24}
        name={iconName}
        intent={'squaredTranslucent'}
      />
      <Typography {...typographyProps} styleName={'body2Bold'} color={'white'}>
        {label}
      </Typography>
    </div>
  );
};

export { ProductInfoListItem };
