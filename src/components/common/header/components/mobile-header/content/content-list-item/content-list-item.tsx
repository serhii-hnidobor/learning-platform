import { concatClasses } from 'helpers/string/string';
import { Icon, IconProps } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLLIElement> {
  name: string;
  iconName: IconName;
  iconProps?: Omit<IconProps, 'name'>;
  isActive?: boolean;
  typographyProps?: TypographyProps<HTMLLIElement>;
}

export const ContentListItem = ({
  name,
  iconName,
  iconProps,
  isActive = false,
  typographyProps,
  ...restLiProps
}: Props) => {
  return (
    <Typography
      className={concatClasses([
        'px-5',
        'py-[13px]',
        'flex',
        'items-center',
        'gap-6',
        `${isActive ? 'bg-yellow text-white' : 'bg-transparent'}`,
        'group',
        'cursor-pointer',
        'user-select-none',
      ])}
      styleName={'body2Bold'}
      as={'li'}
      {...restLiProps}
      color={'grey'}
      {...typographyProps}
    >
      <Icon
        name={iconName}
        {...iconProps}
        width={24}
        fill={isActive ? 'white' : 'grey'}
        hoverFill={isActive ? 'none' : 'white'}
        height={24}
      />
      <Typography
        as={'span'}
        textTransform={'capitalize'}
        className={'group-hover:text-white'}
      >
        {name}
      </Typography>
    </Typography>
  );
};
